import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LocationDetailSections } from "@/components/features/locations/location-detail-sections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDifficulty, formatNumber } from "@/lib/formatters";
import { getCityBySlug } from "@/services/locations/queries";

type CityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);

  if (!city) {
    return { title: "Oraș negăsit" };
  }

  return {
    title: city.name,
    description: city.generalDescription,
  };
}

export default async function CityDetailPage({ params }: CityDetailPageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const countryHref = `/countries/${city.countrySlug}` as Route;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{city.countryName}</Badge>
            {city.region ? <Badge>{city.region}</Badge> : null}
            <Badge tone="success">
              Emigrare {formatDifficulty(city.emigrationDifficulty)}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            {city.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {city.generalDescription}
          </p>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground">
          <span>Cost lunar: {formatCurrency(city.monthlyCostEur)}</span>
          <span>Salariu mediu: {formatCurrency(city.averageSalaryEur)}</span>
          <span>Populație: {formatNumber(city.population)}</span>
        </div>
      </section>

      <LocationDetailSections location={city} type="city" />

      <section className="border-t border-border pt-8">
        <Button asChild variant="secondary">
          <Link href={countryHref}>Vezi țara</Link>
        </Button>
      </section>
    </main>
  );
}
