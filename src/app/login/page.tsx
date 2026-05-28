import Link from "next/link";

import { AuthForm } from "@/components/features/auth/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Autentificare",
};

export default function LoginPage() {
  const isConfigured = isSupabaseConfigured();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6">
      <section className="border border-border bg-white p-6 shadow-sm">
        {isConfigured ? (
          <AuthForm mode="login" />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Autentificare indisponibilă
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Configurează `NEXT_PUBLIC_SUPABASE_URL` și
              `NEXT_PUBLIC_SUPABASE_ANON_KEY` în `.env.local` pentru a activa
              autentificarea.
            </p>
          </div>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Nu ai cont?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Creează unul
          </Link>
        </p>
      </section>
    </main>
  );
}
