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

function setFieldValidity(input: HTMLInputElement | null, message: string | null) {
  if (!input) {
    return;
  }

  input.setCustomValidity(message ?? "");
}

function validateRegisterField(input: HTMLInputElement | null, message: string) {
  if (!input) {
    return true;
  }

  if (!input.value.trim()) {
    input.setCustomValidity(message);
    return false;
  }

  input.setCustomValidity("");
  return true;
}

function validateEmailField(input: HTMLInputElement | null) {
  if (!input) {
    return true;
  }

  if (!input.value.trim()) {
    input.setCustomValidity("Te rog completează adresa de email.");
    return false;
  }

  if (!input.checkValidity()) {
    input.setCustomValidity("Te rog introdu o adresă de email validă.");
    return false;
  }

  input.setCustomValidity("");
  return true;
}

function validatePasswordField(input: HTMLInputElement | null) {
  if (!input) {
    return true;
  }

  if (!input.value.trim()) {
    input.setCustomValidity("Te rog introdu o parolă.");
    return false;
  }

  if (input.value.length < 8) {
    input.setCustomValidity("Parola trebuie să aibă cel puțin 8 caractere.");
    return false;
  }

  input.setCustomValidity("");
  return true;
}

function validatePasswordPresence(input: HTMLInputElement | null) {
  if (!input) return true;

  if (!input.value.trim()) {
    input.setCustomValidity("Te rog introdu o parolă.");
    return false;
  }

  input.setCustomValidity("");
  return true;
}

async function checkEmailAvailability(email: string) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (response.status === 409) {
    const payload = (await response.json()) as { error?: { message?: string } };
    return { available: false, message: payload.error?.message ?? "Există deja un cont cu această adresă de email." };
  }

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;

    return {
      available: false,
      message:
        payload?.error?.message ??
        "Nu am putut verifica dacă adresa de email este disponibilă.",
    };
  }

  return { available: true, message: null as string | null };
}

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

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const fullName = String(formData.get("fullName") ?? "");
    const fullNameInput = form.elements.namedItem("fullName") as HTMLInputElement | null;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;

    const isFullNameValid =
      mode === "register"
        ? validateRegisterField(fullNameInput, "Te rog introdu un nume de utilizator.")
        : true;
    const isEmailValid = validateEmailField(emailInput);
    const isPasswordValid = mode === "register" ? validatePasswordField(passwordInput) : validatePasswordPresence(passwordInput);

    if (!isFullNameValid || !isEmailValid || !isPasswordValid) {
      form.reportValidity();
      setIsSubmitting(false);
      return;
    }

    // Additional client-side policy check for registration: require uppercase, digit and symbol.
    if (mode === "register" && passwordInput) {
      const pwd = String(password ?? "");
      const hasUpper = /[A-Z]/.test(pwd);
      const hasDigit = /[0-9]/.test(pwd);
      const hasSymbol = /[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};':"\\|<>\?,\.\/`~]/.test(pwd);

      if (pwd.length >= 8 && (!hasUpper || !hasDigit || !hasSymbol)) {
        setFieldValidity(
          passwordInput,
          "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.",
        );
        form.reportValidity();
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const supabase = createSupabaseBrowserClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          const msg = translateAuthError(error);
          setError(msg);
          setIsSubmitting(false);
          return;
        }

        router.replace(redirectTo as Route);
        router.refresh();
        return;
      }

      const emailCheck = await checkEmailAvailability(email);

      if (!emailCheck.available) {
        setError(emailCheck.message ?? "Există deja un cont cu această adresă de email.");
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
        const mapped = translateSignUpError(error);
        // If this is a password field-specific message, show it as native validation
        if (mapped?.asField === "password" && passwordInput) {
          setFieldValidity(passwordInput, mapped.message);
          form.reportValidity();
          setIsSubmitting(false);
          return;
        }

        setError(mapped.message ?? "A apărut o eroare la crearea contului.");
        setIsSubmitting(false);
        return;
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

  function translateAuthError(err: any) {
    const fallback = "Email sau parolă incorecte.";

    if (!err) return fallback;
    const msg = String(err.message ?? err).toLowerCase();

    if (msg.includes("invalid login credentials") || msg.includes("invalid email or password") || msg.includes("invalid_credentials")) {
      return "Email sau parolă incorecte.";
    }

    if (msg.includes("user not found") || msg.includes("no user")) {
      return "Cont inexistent.";
    }

    return err.message ?? fallback;
  }

  function translateSignUpError(err: any) {
    const fallback = "A apărut o eroare la crearea contului.";

    if (!err) return { message: fallback };
    const raw = String(err.message ?? err).toLowerCase();

    if (raw.includes("already registered") || raw.includes("already been registered") || raw.includes("user already")) {
      return { message: "Există deja un cont cu această adresă de email." };
    }

    // Detect password policy messages. If the password length is the issue, keep the existing message.
    if (raw.includes("password")) {
      // Detect Supabase-style class lists like: "abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$..."
      const hasLower = raw.includes("abcdefghijklmnopqrstuvwxyz");
      const hasUpper = raw.includes("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      const hasDigits = raw.includes("0123456789");
      const hasSymbols = /[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};':"\\|<>\?,\.\/`~]/.test(raw);

      if ((hasLower || hasUpper || hasDigits || hasSymbols) && (hasUpper || hasDigits || hasSymbols)) {
        return {
          message: "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.",
          asField: "password",
        };
      }

      // If message mentions length, map to length message (inline behavior handled elsewhere).
      if (raw.includes("8") || raw.includes("length") || raw.includes("at least 8")) {
        return { message: "Parola trebuie să aibă cel puțin 8 caractere." };
      }

      // Generic password problem fallback
      return { message: "Parola nu respectă politica de securitate." };
    }

    if (raw.includes("invalid email") || raw.includes("email")) {
      return { message: "Te rog introdu o adresă de email validă." };
    }

    return { message: err.message ?? fallback };
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-4">
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
            Nume utilizator
          </span>
          <input
            required
            name="fullName"
            autoComplete="name"
            onInput={(event) => setFieldValidity(event.currentTarget, null)}
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
          onInput={(event) => setFieldValidity(event.currentTarget, null)}
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
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          onInput={(event) => {
            const val = event.currentTarget.value ?? "";
            if (mode === "login" && !val.trim()) {
              setFieldValidity(event.currentTarget, "Te rog introdu o parolă.");
            } else {
              setFieldValidity(event.currentTarget, null);
            }
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
          <Icon className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? copy.loading : copy.submit}
      </Button>
    </form>
  );
}
