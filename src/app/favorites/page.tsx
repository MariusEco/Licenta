import { Bookmark } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Favorite",
};

export default async function FavoritesPage() {
  await requireUser();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Favorite</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Locațiile salvate vor apărea aici după conectarea acțiunilor din
          carduri la API-ul de favorite.
        </p>
      </section>

      <EmptyState
        title="Nu există favorite salvate încă"
        description="După etapa de funcționalități principale, vei putea salva țări și orașe direct din carduri."
      />
    </main>
  );
}
