import type { Prisma } from "@prisma/client";

import { handleRouteError, ok, parseSearchParams } from "@/lib/api/http";
import { serializeCountrySummary } from "@/lib/api/serializers";
import { getPrismaClient } from "@/lib/prisma/client";
import { countryListQuerySchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

const countryInclude = {
  costOfLiving: {
    orderBy: { updatedAt: "desc" },
    take: 1,
  },
} satisfies Prisma.CountryInclude;

function getCountryOrderBy(
  sort: string,
): Prisma.CountryOrderByWithRelationInput[] {
  if (sort === "difficulty_asc") {
    return [{ emigrationDifficulty: "asc" }, { name: "asc" }];
  }

  if (sort === "difficulty_desc") {
    return [{ emigrationDifficulty: "desc" }, { name: "asc" }];
  }

  return [{ name: "asc" }];
}

export async function GET(request: Request) {
  try {
    const query = countryListQuerySchema.parse(parseSearchParams(request));
    const prisma = getPrismaClient();

    const where: Prisma.CountryWhereInput = {
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: "insensitive" } },
              { continent: { contains: query.search, mode: "insensitive" } },
              { capital: { contains: query.search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(query.continent
        ? { continent: { equals: query.continent, mode: "insensitive" } }
        : {}),
      ...(query.difficulty ? { emigrationDifficulty: query.difficulty } : {}),
      ...(query.minAverageSalaryEur
        ? {
            costOfLiving: {
              some: { averageSalaryEur: { gte: query.minAverageSalaryEur } },
            },
          }
        : {}),
      ...(query.maxMonthlyCostEur
        ? {
            costOfLiving: {
              some: { totalMonthlyCostEur: { lte: query.maxMonthlyCostEur } },
            },
          }
        : {}),
    };

    const [total, countries] = await Promise.all([
      prisma.country.count({ where }),
      prisma.country.findMany({
        where,
        include: countryInclude,
        orderBy: getCountryOrderBy(query.sort),
        ...(query.sort === "cost_asc" ||
        query.sort === "cost_desc" ||
        query.sort === "salary_asc" ||
        query.sort === "salary_desc"
          ? {}
          : {
              skip: (query.page - 1) * query.pageSize,
              take: query.pageSize,
            }),
      }),
    ]);

    const sortedCountries =
      query.sort === "cost_asc" ||
      query.sort === "cost_desc" ||
      query.sort === "salary_asc" ||
      query.sort === "salary_desc"
        ? [...countries]
            .sort((first, second) => {
              const firstCost =
                first.costOfLiving[0]?.totalMonthlyCostEur ??
                Number.MAX_SAFE_INTEGER;
              const secondCost =
                second.costOfLiving[0]?.totalMonthlyCostEur ??
                Number.MAX_SAFE_INTEGER;
              const firstSalary = first.costOfLiving[0]?.averageSalaryEur ?? 0;
              const secondSalary =
                second.costOfLiving[0]?.averageSalaryEur ?? 0;

              if (query.sort === "cost_desc") {
                return (
                  secondCost - firstCost ||
                  first.name.localeCompare(second.name)
                );
              }

              if (query.sort === "salary_desc") {
                return (
                  secondSalary - firstSalary ||
                  first.name.localeCompare(second.name)
                );
              }

              if (query.sort === "salary_asc") {
                return (
                  firstSalary - secondSalary ||
                  first.name.localeCompare(second.name)
                );
              }

              return (
                firstCost - secondCost || first.name.localeCompare(second.name)
              );
            })
            .slice(
              (query.page - 1) * query.pageSize,
              query.page * query.pageSize,
            )
        : countries;

    return ok(sortedCountries.map(serializeCountrySummary), {
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
