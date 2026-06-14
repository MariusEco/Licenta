import { GitCompareArrows } from "lucide-react";

import ComparisonsList from "@/components/features/comparison/comparisons-list";
import { requireUser } from "@/lib/supabase/server";
import { getPrismaClient } from "@/lib/prisma/client";
import {
  serializeCitySummary,
  serializeCountrySummary,
} from "@/lib/api/serializers";

export const metadata = {
  title: "Comparații salvate",
};

export default async function ComparisonsPage() {
  const user = await requireUser();

  const prisma = getPrismaClient();

  const comparisons = await prisma.comparison.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          country: {
            include: {
              costOfLiving: { orderBy: { updatedAt: "desc" }, take: 1 },
            },
          },
          city: {
            include: {
              country: true,
              costOfLiving: { orderBy: { updatedAt: "desc" }, take: 1 },
            },
          },
        },
        orderBy: { position: "asc" },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const items = comparisons.map((comparison) => ({
    id: comparison.id,
    title: comparison.title,
    createdAt: comparison.createdAt.toISOString(),
    updatedAt: comparison.updatedAt.toISOString(),
    items: comparison.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      position: item.position,
      location:
        item.kind === "COUNTRY" && item.country
          ? serializeCountrySummary(item.country)
          : item.city
            ? serializeCitySummary(item.city)
            : null,
    })),
  }));

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <GitCompareArrows className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">
          Comparații salvate
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Comparațiile salvate în contul tău vor fi afișate aici.
        </p>
      </section>

      <section>
        <ComparisonsList items={items} />
      </section>
    </main>
  );
}
