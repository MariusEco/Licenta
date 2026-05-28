import { GitCompareArrows } from "lucide-react";

import { ComparisonSnapshot } from "@/components/features/comparison/comparison-snapshot";
import { CountryCard } from "@/components/features/locations/country-card";
import { getCountries } from "@/services/locations/queries";

export const metadata = {
  title: "Comparare",
  description: "Compară țări și orașe după indicatori legali și economici.",
};

export default async function ComparePage() {
  const countries = await getCountries({ pageSize: 3, sort: "salary_desc" });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <GitCompareArrows className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Comparare</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Compară rapid țările după costul vieții, salarii medii și dificultatea
          emigrării. În etapa de autentificare, comparațiile vor putea fi
          salvate în contul utilizatorului.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_420px]">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Indicatori economici
          </h2>
          <ComparisonSnapshot countries={countries.items} />
        </div>
        <div className="grid gap-4">
          {countries.items.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>
    </main>
  );
}
