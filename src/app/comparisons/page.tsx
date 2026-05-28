import { GitCompareArrows } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Comparații salvate",
};

export default async function ComparisonsPage() {
  await requireUser();

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
          Comparațiile create de utilizator vor fi afișate aici și protejate prin
          Supabase Auth.
        </p>
      </section>

      <EmptyState
        title="Nu există comparații salvate încă"
        description="După conectarea completă a fluxului de comparare, vei putea salva seturi de țări și orașe în cont."
      />
    </main>
  );
}
