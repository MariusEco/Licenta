import { Building2, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Orase",
  description: "Exploreaza orase relevante pentru romanii care vor sa emigreze.",
};

export default function CitiesPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Orase</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Datele despre orase vor include chirii, oportunitati de joburi,
            comunitati romanesti si costuri lunare estimate.
          </p>
        </div>
        <Button variant="secondary">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filtre
        </Button>
      </section>
    </main>
  );
}
