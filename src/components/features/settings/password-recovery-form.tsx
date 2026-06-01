"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const passwordPolicyMessage =
  "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.";

function hasRequiredPasswordClasses(value: string) {
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const hasSymbol = /[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};':"\\|<>\?,\.\/`~]/.test(
    value,
  );

  return hasUpper && hasDigit && hasSymbol;
}

function setPasswordValidity(input: HTMLInputElement) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Te rog introdu o parolă.");
    return;
  }

  if (input.value.length < 8) {
    input.setCustomValidity("Parola trebuie să aibă cel puțin 8 caractere.");
    return;
  }

  if (!hasRequiredPasswordClasses(input.value)) {
    input.setCustomValidity(passwordPolicyMessage);
    return;
  }

  input.setCustomValidity("");
}

function setConfirmPasswordValidity(input: HTMLInputElement, password: string) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Te rog confirmă parola.");
    return;
  }

  if (input.value !== password) {
    input.setCustomValidity("Parolele nu coincid.");
    return;
  }

  input.setCustomValidity("");
}

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  return payload?.error?.message ?? "A apărut o eroare neașteptată.";
}

export function PasswordRecoveryForm() {
  const router = useRouter();
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const passwordInput = passwordInputRef.current;
    const confirmPasswordInput = confirmPasswordInputRef.current;

    if (passwordInput) {
      setPasswordValidity(passwordInput);
    }

    if (confirmPasswordInput) {
      setConfirmPasswordValidity(confirmPasswordInput, password);
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError(null);
    setMessage(null);

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
    <form noValidate onSubmit={handleSubmit} className="grid gap-4">
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
              ref={passwordInputRef}
              type="password"
              autoComplete="new-password"
              value={password}
              onInvalid={(event) => setPasswordValidity(event.currentTarget)}
              onChange={(event) => {
                event.currentTarget.setCustomValidity("");
                setPassword(event.target.value);
              }}
              className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-medium text-foreground">
              Confirmă parola
            </span>
            <input
              required
              ref={confirmPasswordInputRef}
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onInvalid={(event) =>
                setConfirmPasswordValidity(event.currentTarget, password)
              }
              onChange={(event) => {
                event.currentTarget.setCustomValidity("");
                setConfirmPassword(event.target.value);
              }}
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
