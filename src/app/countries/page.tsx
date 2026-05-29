import { Landmark } from "lucide-react";

import { CountryCard } from "@/components/features/locations/country-card";
import { LocationFilters } from "@/components/features/locations/location-filters";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { getCountries } from "@/services/locations/queries";

export const metadata = {
  title: "Țări",
  description: "Explorează țări pentru emigrare după costuri, salarii și vize.",
};

type CountriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const countriesPageSize = 12;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function numberParam(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function buildCountriesQuery(params: Record<string, string | string[] | undefined>) {
  const search = firstParam(params.search);
  const difficulty = firstParam(params.difficulty) as
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VERY_HIGH"
    | undefined;
  const maxMonthlyCostEur = numberParam(firstParam(params.maxMonthlyCostEur));
  const minAverageSalaryEur = numberParam(firstParam(params.minAverageSalaryEur));
  const sort = firstParam(params.sort) as
    | "name"
    | "cost_asc"
    | "cost_desc"
    | "salary_asc"
    | "salary_desc"
    | "difficulty_asc"
    | "difficulty_desc"
    | undefined;
  const page = numberParam(firstParam(params.page)) ?? 1;

  return {
    search,
    difficulty,
    maxMonthlyCostEur,
    minAverageSalaryEur,
    sort,
    page,
  };
}

export default async function CountriesPage({
  searchParams,
}: CountriesPageProps) {
  const params = await searchParams;
  const filters = buildCountriesQuery(params);
  let countries = await getCountries({ ...filters, pageSize: countriesPageSize });
  const totalPages = Math.max(1, Math.ceil(countries.total / countriesPageSize));
  const currentPage = Math.min(filters.page, totalPages);

  if (countries.total > 0 && currentPage !== filters.page) {
    countries = await getCountries({
      ...filters,
      page: currentPage,
      pageSize: countriesPageSize,
    });
  }

  const currentItemsStart =
    countries.total === 0 ? 0 : (currentPage - 1) * countriesPageSize + 1;
  const currentItemsEnd = Math.min(countries.total, currentPage * countriesPageSize);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Țări</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Compară țări după vize, costuri lunare, salarii medii, taxe,
            comunități românești și dificultatea emigrării.
          </p>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          <p>{countries.total} rezultate</p>
          {countries.total > 0 ? (
            <p>
              Afișează {currentItemsStart}-{currentItemsEnd} din {countries.total}
            </p>
          ) : null}
        </div>
      </section>

      <LocationFilters
        search={filters.search}
        difficulty={filters.difficulty}
        maxMonthlyCostEur={firstParam(params.maxMonthlyCostEur)}
        minAverageSalaryEur={firstParam(params.minAverageSalaryEur)}
        sort={filters.sort}
      />

      {countries.items.length > 0 ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {countries.items.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </section>

          <Pagination
            basePath="/countries"
            currentPage={currentPage}
            pageSize={countriesPageSize}
            totalItems={countries.total}
            query={{
              search: filters.search,
              difficulty: filters.difficulty,
              maxMonthlyCostEur: firstParam(params.maxMonthlyCostEur),
              minAverageSalaryEur: firstParam(params.minAverageSalaryEur),
              sort: filters.sort,
            }}
          />
        </>
      ) : (
        <EmptyState
          title="Nu am găsit țări pentru filtrele selectate"
          description="Ajustează bugetul, salariul minim sau criteriul de dificultate pentru a vedea mai multe opțiuni."
        />
      )}
    </main>
  );
}
