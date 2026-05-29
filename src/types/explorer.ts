import type { EmigrationDifficulty, LocationKind, TaxLevel, VisaCategory } from "@prisma/client";

export type CostOfLivingView = {
  rentOneBedroomEur: number | null;
  utilitiesEur: number | null;
  groceriesEur: number | null;
  transportEur: number | null;
  healthcareEur: number | null;
  internetEur: number | null;
  totalMonthlyCostEur: number | null;
  sourceName: string | null;
};

export type VisaInfoView = {
  id: string;
  category: VisaCategory;
  title: string;
  summary: string;
  legalSteps: string[];
  requiredDocuments: string[];
  estimatedDuration: string | null;
  officialUrl: string | null;
};

export type CountrySummaryView = {
  id: string;
  kind: Extract<LocationKind, "COUNTRY">;
  name: string;
  slug: string;
  continent: string;
  latitude: number | null;
  longitude: number | null;
  averageSalaryEur: number | null;
  monthlyCostEur: number | null;
  emigrationDifficulty: EmigrationDifficulty;
  citizenshipDifficulty: EmigrationDifficulty;
  isFeatured: boolean;
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
  isFeatured: boolean;
};

export type CountryDetailView = CountrySummaryView & {
  isoCode: string;
  capital: string | null;
  currency: string | null;
  officialLanguage: string | null;
  predominantReligion: string | null;
  romanianCommunityNotes: string | null;
  jobMarketNotes: string | null;
  localLawNotes: string | null;
  generalDescription: string;
  taxLevel: TaxLevel | null;
  incomeTaxRate: number | null;
  costOfLiving: CostOfLivingView | null;
  cities: CitySummaryView[];
  visaInfos: VisaInfoView[];
};

export type CityDetailView = CitySummaryView & {
  region: string | null;
  population: number | null;
  generalDescription: string;
  romanianCommunityNotes: string | null;
  jobMarketNotes: string | null;
  localLawNotes: string | null;
  predominantReligion: string | null;
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
