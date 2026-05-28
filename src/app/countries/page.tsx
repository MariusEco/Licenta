import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Tari",
  description: "Exploreaza tari pentru emigrare dupa costuri, salarii si vize.",
};

export default function CountriesPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Tari</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Lista tarilor va combina informatii legale, costuri, salarii si
            scoruri de dificultate pentru emigrare.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Search className="h-4 w-4" aria-hidden="true" />
            Cautare
          </Button>
          <Button variant="secondary">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtre
          </Button>
        </div>
      </section>
    </main>
  );
}
