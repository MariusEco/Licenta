import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-foreground">
        Pagina nu a fost găsită
      </h1>
      <p className="mt-4 text-muted-foreground">
        Linkul accesat nu există sau resursa a fost mutată.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Înapoi la pagina principală</Link>
      </Button>
    </main>
  );
}
