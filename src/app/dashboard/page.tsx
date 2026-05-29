import { Bookmark, GitCompareArrows, UserRound } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await requireUser();
  const displayName =
    (user.user_metadata.full_name as string | undefined) ?? user.email;
  const favoritesHref = "/favorites" as Route;
  const comparisonsHref = "/comparisons" as Route;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border-b border-border pb-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Bine ai venit, {displayName}. De aici vei gestiona locațiile favorite
          și comparațiile salvate.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="border border-border bg-white p-5 shadow-sm">
          <Bookmark className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="mt-3 text-lg font-semibold text-foreground">
            Favorite
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Salvează țări și orașe pentru a reveni rapid la ele.
          </p>
          <Button asChild className="mt-5" variant="secondary">
            <Link href={favoritesHref}>Vezi favoritele</Link>
          </Button>
        </article>

        <article className="border border-border bg-white p-5 shadow-sm">
          <GitCompareArrows
            className="h-5 w-5 text-primary"
            aria-hidden="true"
          />
          <h2 className="mt-3 text-lg font-semibold text-foreground">
            Comparații
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Compară destinații pe baza costurilor, salariilor și dificultății
            emigrării.
          </p>
          <Button asChild className="mt-5" variant="secondary">
            <Link href={comparisonsHref}>Vezi comparațiile</Link>
          </Button>
        </article>
      </section>
    </main>
  );
}
