import { GitCompareArrows } from "lucide-react";

export const metadata = {
  title: "Comparare",
  description: "Compara tari si orase dupa indicatori legali si economici.",
};

export default function ComparePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <GitCompareArrows className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Comparare</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Modulul va permite compararea tarilor si oraselor dupa costul vietii,
          salarii, taxe si dificultatea emigrarii.
        </p>
      </section>
    </main>
  );
}
