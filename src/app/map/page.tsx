import type { Route } from "next";
import { MapPinned } from "lucide-react";
import Link from "next/link";

import { InteractiveMap } from "@/components/features/map/interactive-map";
import { Badge } from "@/components/ui/badge";
import { getCountries } from "@/services/locations/queries";

export const metadata = {
  title: "Hartă",
  description: "Hartă interactivă cu țări pentru emigrare.",
};

export default async function MapPage() {
  const countries = await getCountries({ pageSize: 50 });
  const locations = countries.items.filter(
    (country) => country.latitude != null && country.longitude != null,
  );

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
              Explorează țările pe hartă. Click pe marker deschide detaliile
              rapide, click pe numele țării din popup duce la pagina ei, iar
              dublu click merge direct la țară.
            </p>
          </div>

          <Badge tone="success">{locations.length} locații disponibile</Badge>
        </aside>

        <InteractiveMap locations={locations} />
      </section>
    </main>
  );
}
