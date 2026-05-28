import Link from "next/link";

import { AuthForm } from "@/components/features/auth/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Cont nou",
};

export default function RegisterPage() {
  const isConfigured = isSupabaseConfigured();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6">
      <section className="border border-border bg-white p-6 shadow-sm">
        {isConfigured ? (
          <AuthForm mode="register" />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Cont nou</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Configurează variabilele Supabase în `.env.local` pentru a activa
              înregistrarea utilizatorilor.
            </p>
          </div>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ai deja cont?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Autentifică-te
          </Link>
        </p>
      </section>
    </main>
  );
}
