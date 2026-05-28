export type EmigrationDifficulty = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";

export type LocationKind = "COUNTRY" | "CITY";

export type LocationSummary = {
  id: string;
  kind: LocationKind;
  name: string;
  slug: string;
  countryName?: string;
  latitude: number;
  longitude: number;
  averageSalaryEur?: number;
  monthlyCostEur?: number;
  emigrationDifficulty?: EmigrationDifficulty;
};
