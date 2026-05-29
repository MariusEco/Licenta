import { ArrowRight, BriefcaseBusiness, MapPin, WalletCards } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDifficulty } from "@/lib/formatters";
import type { CityDetailView } from "@/types/explorer";
import { FavoriteButton } from "@/components/features/favorites/favorite-button";

type CityCardProps = {
  city: CityDetailView;
};

export function CityCard({ city }: CityCardProps) {
  const href = `/cities/${city.slug}` as Route;

  return (
    <article className="border border-border bg-white p-5 shadow-sm transition hover:border-primary/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {city.countryName}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">
            <Link href={href}>{city.name}</Link>
          </h2>
        </div>
        <Badge tone={city.isFeatured ? "success" : "neutral"}>
          {city.isFeatured ? "Popular" : "Analizat"}
        </Badge>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <WalletCards className="h-4 w-4" aria-hidden="true" />
            Cost lunar
          </dt>
          <dd className="font-semibold text-foreground">
            {formatCurrency(city.monthlyCostEur)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            Salariu mediu
          </dt>
          <dd className="font-semibold text-foreground">
            {formatCurrency(city.averageSalaryEur)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="text-muted-foreground">Dificultate</dt>
          <dd className="font-semibold text-foreground">
            {formatDifficulty(city.emigrationDifficulty)}
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
        <FavoriteButton kind="CITY" cityId={city.id} />
      </div>
    </article>
  );
}
