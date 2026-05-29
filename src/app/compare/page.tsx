import { GitCompareArrows } from "lucide-react";

import { ComparisonBuilder } from "@/components/features/comparison/comparison-builder";
import { getPrismaClient } from "@/lib/prisma/client";
import { getCurrentUser } from "@/lib/supabase/server";
import { getCities, getCountries } from "@/services/locations/queries";

type ComparePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const metadata = {
  title: "Comparare",
  description: "Compară două țări, două orașe sau o țară cu un oraș.",
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const comparisonId = firstParam(params.comparisonId);

  const [countries, cities] = await Promise.all([
    getCountries({ pageSize: 500, sort: "name" }),
    getCities({ pageSize: 500, sort: "name" }),
  ]);
  const comparableLocations = [...countries.items, ...cities.items].sort((first, second) =>
    first.name.localeCompare(second.name, "ro"),
  );

  let initialSelectedKeys: string[] = [];
  let initialTitle: string | undefined;

  if (comparisonId) {
    const user = await getCurrentUser();

    if (user) {
      const prisma = getPrismaClient();
      const comparison = await prisma.comparison.findFirst({
        where: { id: comparisonId, userId: user.id },
        include: {
          items: {
            orderBy: { position: "asc" },
          },
        },
      });

      if (comparison) {
        initialTitle = comparison.title;
        initialSelectedKeys = comparison.items
          .map((item) => {
            if (item.kind === "COUNTRY" && item.countryId) {
              return `COUNTRY:${item.countryId}`;
            }

            if (item.kind === "CITY" && item.cityId) {
              return `CITY:${item.cityId}`;
            }

            return null;
          })
          .filter((key): key is string => Boolean(key))
          .slice(0, 2);
      }
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <GitCompareArrows className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Comparare</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Compară două țări, două orașe sau o țară cu un oraș. Caută în stânga
          locațiile dorite, apoi compară-le într-un format compact.
        </p>
      </section>

      <ComparisonBuilder
        locations={comparableLocations}
        initialSelectedKeys={initialSelectedKeys}
        initialTitle={initialTitle}
      />
    </main>
  );
}
