import type { City, CostOfLiving, Country } from "@prisma/client";

import {
  getCountryPopulation,
  getCountryTaxSummaryUrl,
} from "@/lib/locations/country-metadata";
import { getOfficialMigrationResources } from "@/lib/locations/official-migration-resources";

function toNumber(value: unknown) {
  return value === null || value === undefined ? null : Number(value);
}

export function serializeCostOfLiving(cost: CostOfLiving | null) {
  if (!cost) {
    return null;
  }

  return {
    id: cost.id,
    rentOneBedroomEur: cost.rentOneBedroomEur,
    utilitiesEur: cost.utilitiesEur,
    groceriesEur: cost.groceriesEur,
    transportEur: cost.transportEur,
    healthcareEur: cost.healthcareEur,
    internetEur: cost.internetEur,
    totalMonthlyCostEur: cost.totalMonthlyCostEur,
  };
}

export function serializeCountry(
  country: Country & {
    costOfLiving?: CostOfLiving[];
    cities?: City[];
  },
) {
  return {
    id: country.id,
    kind: "COUNTRY" as const,
    name: country.name,
    slug: country.slug,
    isoCode: country.isoCode,
    continent: country.continent,
    capital: country.capital,
    currency: country.currency,
    officialLanguage: country.officialLanguage,
    predominantReligion: country.predominantReligion,
    population: country.population ?? getCountryPopulation(country.slug),
    latitude: toNumber(country.latitude),
    longitude: toNumber(country.longitude),
    generalDescription: country.generalDescription,
    citizenshipDifficulty: country.citizenshipDifficulty,
    emigrationDifficulty: country.emigrationDifficulty,
    averageSalaryEur: country.averageSalaryEur,
    monthlyCostEur: country.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    taxSummaryUrl: getCountryTaxSummaryUrl(country.slug),
    officialResources: getOfficialMigrationResources(country.slug),
    costOfLiving: serializeCostOfLiving(country.costOfLiving?.[0] ?? null),
    cities:
      country.cities?.map((city) =>
        serializeCitySummary({
          ...city,
          countryName: country.name,
          countrySlug: country.slug,
          countryEmigrationDifficulty: country.emigrationDifficulty,
        }),
      ) ?? [],
  };
}

export function serializeCountrySummary(
  country: Country & { costOfLiving?: CostOfLiving[] },
) {
  return {
    id: country.id,
    kind: "COUNTRY" as const,
    name: country.name,
    slug: country.slug,
    continent: country.continent,
    latitude: toNumber(country.latitude),
    longitude: toNumber(country.longitude),
    averageSalaryEur: country.averageSalaryEur,
    monthlyCostEur: country.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    emigrationDifficulty: country.emigrationDifficulty,
    citizenshipDifficulty: country.citizenshipDifficulty,
    // isFeatured removed from Country model; omit from summary
  };
}

export function serializeCity(
  city: City & {
    country: Country;
    costOfLiving?: CostOfLiving[];
  },
) {
  return {
    id: city.id,
    kind: "CITY" as const,
    name: city.name,
    slug: city.slug,
    region: city.region,
    countryName: city.country.name,
    countrySlug: city.country.slug,
    country: {
      id: city.country.id,
      name: city.country.name,
      slug: city.country.slug,
      isoCode: city.country.isoCode,
    },
    latitude: toNumber(city.latitude),
    longitude: toNumber(city.longitude),
    population: city.population,
    generalDescription: city.generalDescription,
    romanianCommunityNotes: city.romanianCommunityNotes,
    jobMarketNotes: city.jobMarketNotes,
    emigrationDifficulty: city.country.emigrationDifficulty,
    averageSalaryEur: city.averageSalaryEur,
    monthlyCostEur: city.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    costOfLiving: serializeCostOfLiving(city.costOfLiving?.[0] ?? null),
  };
}

export function serializeCitySummary(
  city: City & {
    costOfLiving?: CostOfLiving[];
    country?: Country;
    countryName?: string;
    countrySlug?: string;
    countryEmigrationDifficulty?: Country["emigrationDifficulty"];
  },
) {
  return {
    id: city.id,
    kind: "CITY" as const,
    name: city.name,
    slug: city.slug,
    countryName: city.countryName ?? "",
    countrySlug: city.countrySlug ?? "",
    latitude: toNumber(city.latitude),
    longitude: toNumber(city.longitude),
    averageSalaryEur: city.averageSalaryEur,
    monthlyCostEur: city.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    emigrationDifficulty:
      city.countryEmigrationDifficulty ??
      city.country?.emigrationDifficulty ??
      null,
  };
}
