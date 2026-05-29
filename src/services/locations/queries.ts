import type { Prisma } from "@prisma/client";

import {
  serializeCity,
  serializeCountry,
  serializeCountrySummary,
} from "@/lib/api/serializers";
import { getPrismaClient } from "@/lib/prisma/client";
import type {
  CityDetailView,
  CountryDetailView,
  CountrySummaryView,
  LocationListFilters,
  PaginatedResult,
} from "@/types/explorer";

const defaultPageSize = 12;

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function assertDatabaseUrl() {
  if (!hasDatabaseUrl()) {
    throw new Error("DATABASE_URL nu este configurat.");
  }
}

function difficultyRank(value: string | null) {
  const ranks: Record<string, number> = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4,
  };

  return value ? ranks[value] ?? 99 : 99;
}

function getLatestCost(value: { monthlyCostEur: number | null }) {
  return value.monthlyCostEur ?? Number.MAX_SAFE_INTEGER;
}

function getLatestSalary(value: { averageSalaryEur: number | null }) {
  return value.averageSalaryEur ?? 0;
}

function compareByName<TItem extends { name: string }>(first: TItem, second: TItem) {
  return first.name.localeCompare(second.name);
}

function matchesSearch(value: string | null | undefined, search: string) {
  if (!value) {
    return false;
  }

  return normalizeSearchValue(value).includes(normalizeSearchValue(search));
}

function sortLocations<TItem extends {
  name: string;
  monthlyCostEur: number | null;
  averageSalaryEur: number | null;
  emigrationDifficulty: string | null;
}>(items: TItem[], sort: LocationListFilters["sort"]) {
  const sorted = [...items];

  if (sort === "cost_asc") {
    return sorted.sort(
      (first, second) =>
        getLatestCost(first) - getLatestCost(second) || compareByName(first, second),
    );
  }

  if (sort === "cost_desc") {
    return sorted.sort(
      (first, second) =>
        getLatestCost(second) - getLatestCost(first) || compareByName(first, second),
    );
  }

  if (sort === "salary_asc") {
    return sorted.sort(
      (first, second) =>
        getLatestSalary(first) - getLatestSalary(second) || compareByName(first, second),
    );
  }

  if (sort === "salary_desc") {
    return sorted.sort(
      (first, second) =>
        getLatestSalary(second) - getLatestSalary(first) || compareByName(first, second),
    );
  }

  if (sort === "difficulty_asc") {
    return sorted.sort(
      (first, second) =>
        difficultyRank(first.emigrationDifficulty) - difficultyRank(second.emigrationDifficulty) ||
        compareByName(first, second),
    );
  }

  if (sort === "difficulty_desc") {
    return sorted.sort(
      (first, second) =>
        difficultyRank(second.emigrationDifficulty) - difficultyRank(first.emigrationDifficulty) ||
        compareByName(first, second),
    );
  }

  return sorted.sort(compareByName);
}

function paginate<TItem>(
  items: TItem[],
  page = 1,
  pageSize = defaultPageSize,
): PaginatedResult<TItem> {
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

function getCountryOrderBy(sort: LocationListFilters["sort"]): Prisma.CountryOrderByWithRelationInput[] {
  if (sort === "salary_desc") {
    return [{ averageSalaryEur: "desc" }, { name: "asc" }];
  }

  if (sort === "salary_asc") {
    return [{ averageSalaryEur: "asc" }, { name: "asc" }];
  }

  if (sort === "difficulty_asc") {
    return [{ emigrationDifficulty: "asc" }, { name: "asc" }];
  }

  if (sort === "difficulty_desc") {
    return [{ emigrationDifficulty: "desc" }, { name: "asc" }];
  }

  return [{ name: "asc" }];
}

function getCityOrderBy(sort: LocationListFilters["sort"]): Prisma.CityOrderByWithRelationInput[] {
  if (sort === "salary_desc") {
    return [{ averageSalaryEur: "desc" }, { name: "asc" }];
  }

  if (sort === "salary_asc") {
    return [{ averageSalaryEur: "asc" }, { name: "asc" }];
  }

  if (sort === "difficulty_asc") {
    return [{ emigrationDifficulty: "asc" }, { name: "asc" }];
  }

  if (sort === "difficulty_desc") {
    return [{ emigrationDifficulty: "desc" }, { name: "asc" }];
  }

  return [{ name: "asc" }];
}

export async function getCountries(
  filters: LocationListFilters & { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<CountrySummaryView>> {
  assertDatabaseUrl();

  const prisma = getPrismaClient();
  const where: Prisma.CountryWhereInput = {
    ...(filters.difficulty ? { emigrationDifficulty: filters.difficulty } : {}),
    ...(filters.minAverageSalaryEur
      ? { averageSalaryEur: { gte: filters.minAverageSalaryEur } }
      : {}),
    ...(filters.maxMonthlyCostEur
      ? {
          costOfLiving: {
            some: { totalMonthlyCostEur: { lte: filters.maxMonthlyCostEur } },
          },
        }
      : {}),
  };

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? defaultPageSize;
  const sortInMemory = filters.sort === "cost_asc" || filters.sort === "cost_desc";

  const countries = await prisma.country.findMany({
    where,
    include: {
      costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
    },
    orderBy: getCountryOrderBy(filters.sort),
  });

  const serializedCountries = countries.map(serializeCountrySummary);
  const filteredCountries = filters.search
    ? serializedCountries.filter((country) =>
        [country.name, country.continent].some((value) =>
          matchesSearch(value, filters.search ?? ""),
        ),
      )
    : serializedCountries;

  const sortedCountries = sortInMemory
    ? sortLocations(filteredCountries, filters.sort)
    : filteredCountries;

  const total = sortedCountries.length;
  const items = sortedCountries.slice((page - 1) * pageSize, page * pageSize);

  return {
    items,
    total,
    page,
    pageSize,
  };
}

export async function getCountryBySlug(
  slug: string,
): Promise<CountryDetailView | null> {
  assertDatabaseUrl();

  const prisma = getPrismaClient();
  const country = await prisma.country.findUnique({
    where: { slug },
    include: {
      cities: {
        orderBy: { name: "asc" },
        include: { costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 } },
      },
      costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
      visaInfos: { where: { isActive: true }, orderBy: { title: "asc" } },
    },
  });

  return country ? serializeCountry(country) : null;
}

export async function getCities(
  filters: LocationListFilters & { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<CityDetailView>> {
  assertDatabaseUrl();

  const prisma = getPrismaClient();
  const where: Prisma.CityWhereInput = {
    ...(filters.search
      ? {
          OR: [
            { name: { contains: filters.search, mode: "insensitive" } },
            { region: { contains: filters.search, mode: "insensitive" } },
            {
              country: {
                name: { contains: filters.search, mode: "insensitive" },
              },
            },
          ],
        }
      : {}),
    ...(filters.difficulty ? { emigrationDifficulty: filters.difficulty } : {}),
    ...(filters.minAverageSalaryEur
      ? { averageSalaryEur: { gte: filters.minAverageSalaryEur } }
      : {}),
    ...(filters.maxMonthlyCostEur
      ? {
          costOfLiving: {
            some: { totalMonthlyCostEur: { lte: filters.maxMonthlyCostEur } },
          },
        }
      : {}),
  };

  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? defaultPageSize;
  const sortInMemory = filters.sort === "cost_asc" || filters.sort === "cost_desc";

  const [total, cities] = await Promise.all([
    prisma.city.count({ where }),
    prisma.city.findMany({
      where,
      include: {
        country: true,
        costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
      },
      orderBy: getCityOrderBy(filters.sort),
      ...(sortInMemory
        ? {}
        : {
            skip: (page - 1) * pageSize,
            take: pageSize,
          }),
    }),
  ]);

  const serializedCities = cities.map(serializeCity);
  const items = sortInMemory
    ? sortLocations(serializedCities, filters.sort).slice(
        (page - 1) * pageSize,
        page * pageSize,
      )
    : serializedCities;

  return {
    items,
    total,
    page,
    pageSize,
  };
}

export async function getCityBySlug(slug: string): Promise<CityDetailView | null> {
  assertDatabaseUrl();

  const prisma = getPrismaClient();
  const city = await prisma.city.findUnique({
    where: { slug },
    include: {
      country: true,
      costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
    },
  });

  return city ? serializeCity(city) : null;
}