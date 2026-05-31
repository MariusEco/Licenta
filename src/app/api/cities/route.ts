import type { Prisma } from "@prisma/client";

import { handleRouteError, ok, parseSearchParams } from "@/lib/api/http";
import { serializeCity } from "@/lib/api/serializers";
import { getPrismaClient } from "@/lib/prisma/client";
import { cityListQuerySchema } from "@/validations/locations";

export const dynamic = "force-dynamic";

const cityInclude = {
  country: true,
  costOfLiving: {
    orderBy: { updatedAt: "desc" },
    take: 1,
  },
} satisfies Prisma.CityInclude;

function getCityOrderBy(sort: string): Prisma.CityOrderByWithRelationInput[] {
  if (sort === "difficulty_asc") {
    return [{ country: { emigrationDifficulty: "asc" } }, { name: "asc" }];
  }

  if (sort === "difficulty_desc") {
    return [{ country: { emigrationDifficulty: "desc" } }, { name: "asc" }];
  }

  return [{ name: "asc" }];
}

export async function GET(request: Request) {
  try {
    const query = cityListQuerySchema.parse(parseSearchParams(request));
    const prisma = getPrismaClient();

    const where: Prisma.CityWhereInput = {
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: "insensitive" } },
              { region: { contains: query.search, mode: "insensitive" } },
              {
                country: {
                  name: { contains: query.search, mode: "insensitive" },
                },
              },
            ],
          }
        : {}),
      ...(query.countrySlug ? { country: { slug: query.countrySlug } } : {}),
      ...(query.difficulty
        ? { country: { emigrationDifficulty: query.difficulty } }
        : {}),
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

    const [total, cities] = await Promise.all([
      prisma.city.count({ where }),
      prisma.city.findMany({
        where,
        include: cityInclude,
        orderBy: getCityOrderBy(query.sort),
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

    const sortedCities =
      query.sort === "cost_asc" ||
      query.sort === "cost_desc" ||
      query.sort === "salary_asc" ||
      query.sort === "salary_desc"
        ? [...cities]
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
        : cities;

    return ok(sortedCities.map(serializeCity), {
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
