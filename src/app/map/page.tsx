import { MapPinned } from "lucide-react";

export const metadata = {
  title: "Harta",
  description: "Harta interactiva cu tari si orase pentru emigrare.",
};

export default function MapPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-border pb-8">
          <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
            <MapPinned className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground">Harta</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Componenta Leaflet va fi incarcata client-side in etapa dedicata
            hartii interactive.
          </p>
        </div>
      </section>
    </main>
  );
}
