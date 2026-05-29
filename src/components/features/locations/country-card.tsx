import { ArrowRight, Euro, Landmark, WalletCards } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDifficulty } from "@/lib/formatters";
import type { CountrySummaryView } from "@/types/explorer";
import { FavoriteButton } from "@/components/features/favorites/favorite-button";

type CountryCardProps = {
  country: CountrySummaryView;
};

export function CountryCard({ country }: CountryCardProps) {
  const href = `/countries/${country.slug}` as Route;

  return (
    <article className="border border-border bg-white p-5 shadow-sm transition hover:border-primary/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {country.continent}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">
            <Link href={href}>{country.name}</Link>
          </h2>
        </div>
        <Badge tone={country.isFeatured ? "success" : "neutral"}>
          {country.isFeatured ? "Recomandată" : "Analizată"}
        </Badge>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <WalletCards className="h-4 w-4" aria-hidden="true" />
            Cost lunar
          </dt>
          <dd className="font-semibold text-foreground">
            {formatCurrency(country.monthlyCostEur)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <Euro className="h-4 w-4" aria-hidden="true" />
            Salariu mediu
          </dt>
          <dd className="font-semibold text-foreground">
            {formatCurrency(country.averageSalaryEur)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <Landmark className="h-4 w-4" aria-hidden="true" />
            Emigrare
          </dt>
          <dd className="font-semibold text-foreground">
            {formatDifficulty(country.emigrationDifficulty)}
          </dd>
        </div>
      </dl>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        Vezi detalii
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <div className="mt-3">
        <FavoriteButton kind="COUNTRY" countryId={country.id} />
      </div>
    </article>
  );
}
