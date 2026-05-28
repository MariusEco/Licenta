import type { Route } from "next";
import { MapPinned } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCities, getCountries } from "@/services/locations/queries";

export const metadata = {
  title: "Hartă",
  description: "Hartă interactivă cu țări și orașe pentru emigrare.",
};

export default async function MapPage() {
  const [countries, cities] = await Promise.all([
    getCountries({ pageSize: 50 }),
    getCities({ pageSize: 50 }),
  ]);
  const locations = [...countries.items, ...cities.items];

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="grid h-fit gap-4">
          <div className="border-b border-border pb-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
              <MapPinned className="h-5 w-5" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground">Hartă</h1>
            <p className="mt-3 text-muted-foreground">
              În etapa dedicată hărții, această zonă va fi înlocuită cu Leaflet
              și pin-uri interactive pentru fiecare locație.
            </p>
          </div>

          <div className="grid gap-2">
            {locations.slice(0, 8).map((location) => (
              <Link
                key={`${location.kind}-${location.id}`}
                href={
                  (location.kind === "COUNTRY"
                    ? `/countries/${location.slug}`
                    : `/cities/${location.slug}`) as Route
                }
                className="border border-border bg-white p-3 text-sm transition hover:border-primary"
              >
                <span className="font-semibold text-foreground">
                  {location.name}
                </span>
                <span className="mt-1 block text-muted-foreground">
                  {location.latitude}, {location.longitude}
                </span>
              </Link>
            ))}
          </div>
        </aside>

        <section className="relative min-h-[560px] overflow-hidden border border-border bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_118_110_/_0.08)_1px,transparent_1px),linear-gradient(0deg,rgb(15_118_110_/_0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="relative flex h-full min-h-[560px] flex-col items-center justify-center gap-4 p-6 text-center">
            <Badge tone="success">{locations.length} locații pregătite</Badge>
            <h2 className="max-w-xl text-2xl font-semibold text-foreground">
              Datele pentru pin-uri sunt pregătite pentru integrarea Leaflet.
            </h2>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Endpoint-ul `/api/map/locations` livrează țări și orașe cu
              coordonate, costuri, salarii și dificultate.
            </p>
            <Button asChild variant="secondary">
              <Link href="/countries">Explorează lista</Link>
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
