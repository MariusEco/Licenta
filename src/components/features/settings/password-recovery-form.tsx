"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  return payload?.error?.message ?? "A apărut o eroare neașteptată.";
}

export function PasswordRecoveryForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError("Parola trebuie să aibă cel puțin 8 caractere.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      setMessage("Parola a fost schimbată cu succes.");
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.refresh();
      router.push("/login");
    } catch {
      setError("Nu am putut salva parola nouă.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="flex items-start gap-3 border border-border bg-white p-6 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Resetare parolă
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Introdu parola nouă după ce ai ajuns aici din emailul de resetare.
          </p>
        </div>
      </div>

      <section className="border border-border bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          <label>
            <span className="mb-1 block text-sm font-medium text-foreground">
              Parolă nouă
            </span>
            <input
              required
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-foreground">
              Confirmă parola
            </span>
            <input
              required
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
            />
          </label>

          {error ? (
            <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              {message}
            </p>
          ) : null}

          <Button disabled={isSaving} type="submit" className="w-fit">
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            Salvează parola
          </Button>
        </div>
      </section>
    </form>
  );
}