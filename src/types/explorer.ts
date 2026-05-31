import type { EmigrationDifficulty, LocationKind } from "@prisma/client";

export type CostOfLivingView = {
  averageSalaryEur: number | null;
  rentUtilitiesEur: number | null;
  foodEur: number | null;
  transportEur: number | null;
  totalMonthlyCostEur: number | null;
};

export type OfficialMigrationResourceView = {
  title: string;
  description?: string;
  url: string;
};

export type CountrySummaryView = {
  id: string;
  kind: Extract<LocationKind, "COUNTRY">;
  name: string;
  slug: string;
  continent: string;
  latitude: number | null;
  longitude: number | null;
  population: number | null;
  averageSalaryEur: number | null;
  monthlyCostEur: number | null;
  emigrationDifficulty: EmigrationDifficulty;
  citizenshipDifficulty: EmigrationDifficulty;
};

export type CitySummaryView = {
  id: string;
  kind: Extract<LocationKind, "CITY">;
  name: string;
  slug: string;
  countryName: string;
  countrySlug: string;
  latitude: number | null;
  longitude: number | null;
  averageSalaryEur: number | null;
  monthlyCostEur: number | null;
  emigrationDifficulty: EmigrationDifficulty | null;
  citizenshipDifficulty: EmigrationDifficulty | null;
  currency: string | null;
  officialLanguage: string | null;
};

export type CountryDetailView = CountrySummaryView & {
  isoCode: string;
  capital: string | null;
  currency: string | null;
  officialLanguage: string | null;
  predominantReligion: string | null;
  population: number | null;
  generalDescription: string;
  incomeTaxRate?: number | null;
  taxSummaryUrl: string | null;
  officialResources: OfficialMigrationResourceView[];
  romanianCommunityNotes: string | null;
  jobMarketNotes: string | null;
  costOfLiving: CostOfLivingView | null;
  cities: CitySummaryView[];
};

export type CityDetailView = CitySummaryView & {
  region: string | null;
  population: number | null;
  generalDescription: string;
  romanianCommunityNotes: string | null;
  jobMarketNotes: string | null;
  costOfLiving: CostOfLivingView | null;
};

export type LocationListFilters = {
  search?: string;
  difficulty?: EmigrationDifficulty;
  maxMonthlyCostEur?: number;
  minAverageSalaryEur?: number;
  sort?:
    | "name"
    | "cost_asc"
    | "cost_desc"
    | "salary_asc"
    | "salary_desc"
    | "difficulty_asc"
    | "difficulty_desc";
};

export type PaginatedResult<TItem> = {
  items: TItem[];
  total: number;
  page: number;
  pageSize: number;
};
