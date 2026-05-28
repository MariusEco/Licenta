import { Building2 } from "lucide-react";

import { CityCard } from "@/components/features/locations/city-card";
import { LocationFilters } from "@/components/features/locations/location-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { getCities } from "@/services/locations/queries";

export const metadata = {
  title: "Orașe",
  description: "Explorează orașe relevante pentru românii care vor să emigreze.",
};

type CitiesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function numberParam(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export default async function CitiesPage({ searchParams }: CitiesPageProps) {
  const params = await searchParams;
  const filters = {
    search: firstParam(params.search),
    difficulty: firstParam(params.difficulty) as
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "VERY_HIGH"
      | undefined,
    maxMonthlyCostEur: numberParam(firstParam(params.maxMonthlyCostEur)),
    minAverageSalaryEur: numberParam(firstParam(params.minAverageSalaryEur)),
    sort: firstParam(params.sort) as
      | "name"
      | "cost_asc"
      | "salary_desc"
      | "difficulty_asc"
      | undefined,
  };
  const cities = await getCities(filters);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Orașe</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Analizează orașe după chirii, costuri alimentare, salarii,
            comunități românești și oportunități de joburi.
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {cities.total} rezultate
        </p>
      </section>

      <LocationFilters
        search={filters.search}
        difficulty={filters.difficulty}
        maxMonthlyCostEur={firstParam(params.maxMonthlyCostEur)}
        minAverageSalaryEur={firstParam(params.minAverageSalaryEur)}
        sort={filters.sort}
      />

      {cities.items.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.items.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="Nu am găsit orașe pentru filtrele selectate"
          description="Ajustează bugetul, salariul minim sau criteriul de dificultate pentru a extinde lista."
        />
      )}
    </main>
  );
}
