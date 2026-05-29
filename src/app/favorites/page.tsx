import { Bookmark } from "lucide-react";

import FavoritesList from "@/components/features/favorites/favorites-list";
import { requireUser } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/prisma/client";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";

export const metadata = {
  title: "Favorite",
};

export default async function FavoritesPage() {
  const user = await requireUser();

  const prisma = getPrismaClient();

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      country: {
        include: {
          costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
        },
      },
      city: {
        include: {
          costOfLiving: { orderBy: { collectedAt: "desc" }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const items = favorites.map((favorite) => ({
    id: favorite.id,
    createdAt: favorite.createdAt.toISOString(),
    location:
      favorite.kind === "COUNTRY" && favorite.country
        ? serializeCountrySummary(favorite.country)
        : favorite.city
          ? serializeCitySummary(favorite.city)
          : null,
  }));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Favorite</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Locațiile salvate în contul tău.
        </p>
      </section>

      <section>
        <FavoritesList items={items} />
      </section>
    </main>
  );
}
