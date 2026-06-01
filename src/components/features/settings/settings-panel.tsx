"use client";

import { Loader2, MailCheck, Save, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type SettingsPanelProps = {
  email: string;
  username: string | null;
};

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  return payload?.error?.message ?? "A apărut o eroare neașteptată.";
}

export function SettingsPanel({ email, username }: SettingsPanelProps) {
  const [name, setName] = useState(username ?? "");
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setNameMessage(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [nameMessage]);

  useEffect(() => {
    if (!resetMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setResetMessage(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [resetMessage]);

  async function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameError(null);
    setNameMessage(null);

    const normalized = name.trim();

    if (normalized.length < 2) {
      setNameError("Numele trebuie să aibă cel puțin 2 caractere.");
      return;
    }

    setIsSavingName(true);

    try {
      const response = await fetch("/api/settings/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: normalized }),
      });

      if (!response.ok) {
        setNameError(await readApiError(response));
        return;
      }

      setNameMessage("Numele a fost actualizat.");
    } catch {
      setNameError("Nu am putut actualiza numele.");
    } finally {
      setIsSavingName(false);
    }
  }

  async function handlePasswordReset() {
    setResetError(null);
    setResetMessage(null);
    setIsSendingReset(true);

    try {
      const response = await fetch("/api/settings/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        setResetError(await readApiError(response));
        return;
      }

      setResetMessage(
        "Am trimis un email cu linkul de resetare a parolei la adresa ta.",
      );
    } catch {
      setResetError("Nu am putut trimite emailul de resetare.");
    } finally {
      setIsSendingReset(false);
    }
  }

  return (
    <div className="grid gap-6">
      <section className="border border-border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              Profil cont
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <form onSubmit={handleNameSubmit} className="mt-5 grid gap-3">
          <label>
            <span className="mb-1 block text-sm font-medium text-foreground">
              Nume utilizator
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
              autoComplete="name"
            />
          </label>

          {nameError ? (
            <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {nameError}
            </p>
          ) : null}

          {nameMessage ? (
            <p className="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              {nameMessage}
            </p>
          ) : null}

          <Button disabled={isSavingName} type="submit" className="w-fit">
            {isSavingName ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="h-4 w-4" aria-hidden="true" />
            )}
            Salvează numele
          </Button>
        </form>
      </section>

      <section className="border border-border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
            <MailCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Resetare parolă
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Vei primi un email cu linkul de resetare. După ce îl deschizi, vei
              putea alege o parolă nouă.
            </p>
          </div>
        </div>

        {resetError ? (
          <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {resetError}
          </p>
        ) : null}

        {resetMessage ? (
          <p className="mt-5 border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {resetMessage}
          </p>
        ) : null}

        <Button
          type="button"
          onClick={handlePasswordReset}
          disabled={isSendingReset}
          className="mt-5"
        >
          {isSendingReset ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : null}
          Trimite email pentru resetare
        </Button>
      </section>
    </div>
  );
}
