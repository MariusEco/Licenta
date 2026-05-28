import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LocationDetailSections } from "@/components/features/locations/location-detail-sections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatDifficulty,
  formatTaxLevel,
} from "@/lib/formatters";
import { getCountryBySlug } from "@/services/locations/queries";

type CountryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CountryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    return { title: "Țară negăsită" };
  }

  return {
    title: country.name,
    description: country.generalDescription,
  };
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{country.continent}</Badge>
            <Badge>{country.isoCode}</Badge>
            <Badge tone="success">
              Emigrare {formatDifficulty(country.emigrationDifficulty)}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            {country.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {country.generalDescription}
          </p>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground">
          <span>Cost lunar: {formatCurrency(country.monthlyCostEur)}</span>
          <span>Salariu mediu: {formatCurrency(country.averageSalaryEur)}</span>
          <span>Taxare: {formatTaxLevel(country.taxLevel)}</span>
        </div>
      </section>

      <LocationDetailSections location={country} type="country" />

      {country.cities.length > 0 ? (
        <section className="border-t border-border pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Orașe analizate
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Orașe disponibile pentru această țară.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href={`/cities?search=${encodeURIComponent(country.name)}`}>
                Vezi orașele
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
