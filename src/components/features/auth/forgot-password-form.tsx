"use client";

import { AlertCircle, Loader2, MailCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

async function readApiError(response: Response) {
  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  return payload?.error?.message ?? "Nu am putut trimite emailul de resetare.";
}

function setEmailValidity(input: HTMLInputElement) {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Te rog completează adresa de email.");
    return;
  }

  if (input.validity.typeMismatch || !input.value.includes("@")) {
    input.setCustomValidity("Te rog introdu o adresă de email validă.");
    return;
  }

  input.setCustomValidity("");
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = emailInputRef.current;

    if (emailInput) {
      if (!email.trim()) {
        emailInput.setCustomValidity("Te rog completează adresa de email.");
      } else if (!emailInput.checkValidity()) {
        emailInput.setCustomValidity(
          "Te rog introdu o adresă de email validă.",
        );
      } else {
        emailInput.setCustomValidity("");
      }

      if (!emailInput.checkValidity()) {
        form.reportValidity();
        return;
      }
    }

    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }

      setMessage(
        "Dacă există un cont cu acest email, s-a trimis un link de resetare a parolei.",
      );
      setEmail("");
    } catch {
      setError("Nu am putut trimite emailul de resetare.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-4">
      <div className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
        <MailCheck className="h-5 w-5" aria-hidden="true" />
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Resetare parolă
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Introdu adresa de email a contului tău. Dacă există un cont asociat,
          vei primi un link pentru alegerea unei parole noi.
        </p>
      </div>

      <label>
        <span className="mb-1 block text-sm font-medium text-foreground">
          Email
        </span>
        <input
          required
          ref={emailInputRef}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onInvalid={(event) => setEmailValidity(event.currentTarget)}
          onChange={(event) => {
            event.currentTarget.setCustomValidity("");
            setEmail(event.target.value);
          }}
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
          <MailCheck className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Se trimite emailul" : "Trimite link de resetare"}
      </Button>
    </form>
  );
}
