export type EmigrationDifficulty =
  | "SCAZUTA"
  | "MEDIE"
  | "RIDICATA"
  | "FOARTE_RIDICATA";

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
