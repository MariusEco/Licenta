import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Autentificare",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6">
      <section className="border border-border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">
          Autentificare
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Formularul Supabase Auth va fi conectat in etapa de autentificare.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/dashboard">Continua</Link>
        </Button>
      </section>
    </main>
  );
}
