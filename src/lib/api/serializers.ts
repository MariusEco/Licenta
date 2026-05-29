import type {
  City,
  CostOfLiving,
  Country,
  VisaInfo,
} from "@prisma/client";

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
    sourceName: cost.sourceName,
    sourceUrl: cost.sourceUrl,
    collectedAt: cost.collectedAt?.toISOString() ?? null,
  };
}

export function serializeVisaInfo(visaInfo: VisaInfo) {
  return {
    id: visaInfo.id,
    category: visaInfo.category,
    title: visaInfo.title,
    summary: visaInfo.summary,
    legalSteps: visaInfo.legalSteps,
    requiredDocuments: visaInfo.requiredDocuments,
    estimatedDuration: visaInfo.estimatedDuration,
    officialUrl: visaInfo.officialUrl,
  };
}

export function serializeCountry(
  country: Country & {
    costOfLiving?: CostOfLiving[];
    cities?: City[];
    visaInfos?: VisaInfo[];
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
    latitude: toNumber(country.latitude),
    longitude: toNumber(country.longitude),
    romanianCommunityNotes: country.romanianCommunityNotes,
    jobMarketNotes: country.jobMarketNotes,
    localLawNotes: country.localLawNotes,
    generalDescription: country.generalDescription,
    citizenshipDifficulty: country.citizenshipDifficulty,
    emigrationDifficulty: country.emigrationDifficulty,
    averageSalaryEur: country.averageSalaryEur,
    monthlyCostEur: country.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    taxLevel: country.taxLevel,
    incomeTaxRate: toNumber(country.incomeTaxRate),
    isFeatured: country.isFeatured,
    costOfLiving: serializeCostOfLiving(country.costOfLiving?.[0] ?? null),
    cities:
      country.cities?.map((city) =>
        serializeCitySummary({
          ...city,
          countryName: country.name,
          countrySlug: country.slug,
        }),
      ) ?? [],
    visaInfos: country.visaInfos?.map(serializeVisaInfo) ?? [],
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
    isFeatured: country.isFeatured,
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
    localLawNotes: city.localLawNotes,
    predominantReligion: city.predominantReligion,
    emigrationDifficulty: city.emigrationDifficulty,
    averageSalaryEur: city.averageSalaryEur,
    monthlyCostEur: city.costOfLiving?.[0]?.totalMonthlyCostEur ?? null,
    isFeatured: city.isFeatured,
    costOfLiving: serializeCostOfLiving(city.costOfLiving?.[0] ?? null),
  };
}

export function serializeCitySummary(
  city: City & {
    costOfLiving?: CostOfLiving[];
    countryName?: string;
    countrySlug?: string;
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
    emigrationDifficulty: city.emigrationDifficulty,
    isFeatured: city.isFeatured,
  };
}
