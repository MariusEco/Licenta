import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/features/favorites/favorite-button";
import { LocationDetailSections } from "@/components/features/locations/location-detail-sections";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/prisma/client";
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
  const user = await getCurrentUser();
  let isFavorited = false;

  if (user) {
    const prisma = getPrismaClient();
    isFavorited = Boolean(
      await prisma.favorite.findFirst({
        where: { userId: user.id, cityId: city.id },
        select: { id: true },
      }),
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{city.countryName}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            {city.name}
          </h1>
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground">
          <Button asChild variant="secondary">
            <Link href={countryHref}>Vezi țara</Link>
          </Button>
          <FavoriteButton
            kind="CITY"
            cityId={city.id}
            saveLabel="Salvează favorit"
            initialFavorited={isFavorited}
          />
        </div>
      </section>

      <LocationDetailSections location={city} type="city" />
    </main>
  );
}
