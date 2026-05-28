import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Cont nou",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6">
      <section className="border border-border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground">Cont nou</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          In etapa de autentificare vom conecta inregistrarea prin Supabase
          Auth si validarea formularului.
        </p>
        <Button asChild className="mt-6 w-full">
          <Link href="/login">Am deja cont</Link>
        </Button>
      </section>
    </main>
  );
}
