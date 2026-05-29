import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/features/favorites/favorite-button";
import { CountryCitySelector } from "@/components/features/locations/country-city-selector";
import { LocationDetailSections } from "@/components/features/locations/location-detail-sections";
import { Badge } from "@/components/ui/badge";
import { formatDifficulty } from "@/lib/formatters";
import { getCurrentUser } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/prisma/client";
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

  const user = await getCurrentUser();
  let isFavorited = false;

  if (user) {
    const prisma = getPrismaClient();
    isFavorited = Boolean(
      (await prisma.favorite.findFirst({
        where: { userId: user.id, countryId: country.id },
        select: { id: true },
      })),
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{country.continent}</Badge>
            <Badge>{country.isoCode}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            {country.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {country.generalDescription}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground">
          <FavoriteButton
            kind="COUNTRY"
            countryId={country.id}
            initialFavorited={isFavorited}
          />
        </div>
      </section>
      <LocationDetailSections location={country} type="country" />
      {country.cities.length > 0 ? (
        <CountryCitySelector cities={country.cities} />
      ) : null}
    </main>
  );
}
