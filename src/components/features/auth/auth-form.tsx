"use client";

import { AlertCircle, Loader2, LogIn, UserPlus } from "lucide-react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

const authCopy = {
  login: {
    title: "Autentificare",
    description: "Intră în cont pentru a accesa favoritele și comparațiile salvate.",
    submit: "Autentifică-te",
    loading: "Se verifică datele",
    icon: LogIn,
  },
  register: {
    title: "Cont nou",
    description: "Creează un cont pentru a salva locații și comparații.",
    submit: "Creează cont",
    loading: "Se creează contul",
    icon: UserPlus,
  },
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = authCopy[mode];
  const Icon = copy.icon;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const fullName = String(formData.get("fullName") ?? "");

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        router.replace(redirectTo as Route);
        router.refresh();
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        throw error;
      }

      setMessage(
        "Contul a fost creat. Dacă proiectul Supabase cere confirmare pe email, verifică inbox-ul înainte de autentificare.",
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "A apărut o eroare la autentificare.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{copy.title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {copy.description}
        </p>
      </div>

      {mode === "register" ? (
        <label>
          <span className="mb-1 block text-sm font-medium text-foreground">
            Nume complet
          </span>
          <input
            name="fullName"
            autoComplete="name"
            className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
          />
        </label>
      ) : null}

      <label>
        <span className="mb-1 block text-sm font-medium text-foreground">
          Email
        </span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        />
      </label>

      <label>
        <span className="mb-1 block text-sm font-medium text-foreground">
          Parolă
        </span>
        <input
          required
          name="password"
          type="password"
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        />
      </label>

      {error ? (
        <p className="flex gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}

      <Button disabled={isSubmitting} type="submit" className="w-full">
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Icon className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? copy.loading : copy.submit}
      </Button>
    </form>
  );
}
