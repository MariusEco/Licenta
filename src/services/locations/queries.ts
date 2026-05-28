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
import { demoCities, demoCountries } from "@/services/locations/demo-data";

const defaultPageSize = 12;

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

function shouldFallbackToDemoData() {
  return process.env.NODE_ENV !== "production";
}

function logDemoFallback(operation: string, error: unknown) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  console.warn(`[locations] Falling back to demo data for ${operation}`, error);
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

function filterCountries(filters: LocationListFilters) {
  return demoCountries.filter((country) => {
    const search = filters.search?.toLowerCase();

    return (
      (!search ||
        country.name.toLowerCase().includes(search) ||
        country.continent.toLowerCase().includes(search) ||
        country.capital?.toLowerCase().includes(search)) &&
      (!filters.difficulty ||
        country.emigrationDifficulty === filters.difficulty) &&
      (!filters.maxMonthlyCostEur ||
        (country.monthlyCostEur ?? Number.MAX_SAFE_INTEGER) <=
          filters.maxMonthlyCostEur) &&
      (!filters.minAverageSalaryEur ||
        (country.averageSalaryEur ?? 0) >= filters.minAverageSalaryEur)
    );
  });
}

function filterCities(filters: LocationListFilters) {
  return demoCities.filter((city) => {
    const search = filters.search?.toLowerCase();

    return (
      (!search ||
        city.name.toLowerCase().includes(search) ||
        city.countryName.toLowerCase().includes(search) ||
        city.region?.toLowerCase().includes(search)) &&
      (!filters.difficulty || city.emigrationDifficulty === filters.difficulty) &&
      (!filters.maxMonthlyCostEur ||
        (city.monthlyCostEur ?? Number.MAX_SAFE_INTEGER) <=
          filters.maxMonthlyCostEur) &&
      (!filters.minAverageSalaryEur ||
        (city.averageSalaryEur ?? 0) >= filters.minAverageSalaryEur)
    );
  });
}

function sortLocations<TItem extends { name: string; monthlyCostEur: number | null; averageSalaryEur: number | null; emigrationDifficulty: string | null }>(
  items: TItem[],
  sort: LocationListFilters["sort"],
) {
  const sorted = [...items];

  if (sort === "cost_asc") {
    return sorted.sort(
      (first, second) =>
        (first.monthlyCostEur ?? Number.MAX_SAFE_INTEGER) -
          (second.monthlyCostEur ?? Number.MAX_SAFE_INTEGER) ||
        first.name.localeCompare(second.name),
    );
  }

  if (sort === "salary_desc") {
    return sorted.sort(
      (first, second) =>
        (second.averageSalaryEur ?? 0) - (first.averageSalaryEur ?? 0) ||
        first.name.localeCompare(second.name),
    );
  }

  if (sort === "difficulty_asc") {
    return sorted.sort(
      (first, second) =>
        difficultyRank(first.emigrationDifficulty) -
          difficultyRank(second.emigrationDifficulty) ||
        first.name.localeCompare(second.name),
    );
  }

  return sorted.sort((first, second) => first.name.localeCompare(second.name));
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

export async function getCountries(
  filters: LocationListFilters & { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<CountrySummaryView>> {
  if (!hasDatabaseUrl()) {
    return paginate(
      sortLocations(filterCountries(filters), filters.sort),
      filters.page,
      filters.pageSize,
    );
  }

  try {
    const prisma = getPrismaClient();
    const where: Prisma.CountryWhereInput = {
      ...(filters.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: "insensitive" } },
              { continent: { contains: filters.search, mode: "insensitive" } },
              { capital: { contains: filters.search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(filters.difficulty
        ? { emigrationDifficulty: filters.difficulty }
        : {}),
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

    const [total, countries] = await Promise.all([
      prisma.country.count({ where }),
      prisma.country.findMany({
        where,
        include: {
          costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
        },
        orderBy:
          filters.sort === "salary_desc"
            ? [{ averageSalaryEur: "desc" }, { name: "asc" }]
            : filters.sort === "difficulty_asc"
              ? [{ emigrationDifficulty: "asc" }, { name: "asc" }]
              : [{ name: "asc" }],
        skip: ((filters.page ?? 1) - 1) * (filters.pageSize ?? defaultPageSize),
        take: filters.pageSize ?? defaultPageSize,
      }),
    ]);

    return {
      items: countries.map(serializeCountrySummary),
      total,
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? defaultPageSize,
    };
  } catch (error) {
    if (!shouldFallbackToDemoData()) {
      throw error;
    }

    logDemoFallback("getCountries", error);
    return paginate(
      sortLocations(filterCountries(filters), filters.sort),
      filters.page,
      filters.pageSize,
    );
  }
}

export async function getCountryBySlug(
  slug: string,
): Promise<CountryDetailView | null> {
  if (!hasDatabaseUrl()) {
    return demoCountries.find((country) => country.slug === slug) ?? null;
  }

  try {
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
  } catch (error) {
    if (!shouldFallbackToDemoData()) {
      throw error;
    }

    logDemoFallback("getCountryBySlug", error);
    return demoCountries.find((country) => country.slug === slug) ?? null;
  }
}

export async function getCities(
  filters: LocationListFilters & { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<CityDetailView>> {
  if (!hasDatabaseUrl()) {
    return paginate(
      sortLocations(filterCities(filters), filters.sort),
      filters.page,
      filters.pageSize,
    );
  }

  try {
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
      ...(filters.difficulty
        ? { emigrationDifficulty: filters.difficulty }
        : {}),
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

    const [total, cities] = await Promise.all([
      prisma.city.count({ where }),
      prisma.city.findMany({
        where,
        include: {
          country: true,
          costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
        },
        orderBy:
          filters.sort === "salary_desc"
            ? [{ averageSalaryEur: "desc" }, { name: "asc" }]
            : filters.sort === "difficulty_asc"
              ? [{ emigrationDifficulty: "asc" }, { name: "asc" }]
              : [{ name: "asc" }],
        skip: ((filters.page ?? 1) - 1) * (filters.pageSize ?? defaultPageSize),
        take: filters.pageSize ?? defaultPageSize,
      }),
    ]);

    return {
      items: cities.map(serializeCity),
      total,
      page: filters.page ?? 1,
      pageSize: filters.pageSize ?? defaultPageSize,
    };
  } catch (error) {
    if (!shouldFallbackToDemoData()) {
      throw error;
    }

    logDemoFallback("getCities", error);
    return paginate(
      sortLocations(filterCities(filters), filters.sort),
      filters.page,
      filters.pageSize,
    );
  }
}

export async function getCityBySlug(slug: string): Promise<CityDetailView | null> {
  if (!hasDatabaseUrl()) {
    return demoCities.find((city) => city.slug === slug) ?? null;
  }

  try {
    const prisma = getPrismaClient();
    const city = await prisma.city.findUnique({
      where: { slug },
      include: {
        country: true,
        costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
      },
    });

    return city ? serializeCity(city) : null;
  } catch (error) {
    if (!shouldFallbackToDemoData()) {
      throw error;
    }

    logDemoFallback("getCityBySlug", error);
    return demoCities.find((city) => city.slug === slug) ?? null;
  }
}
