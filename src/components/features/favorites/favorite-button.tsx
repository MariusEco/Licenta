"use client";

import { Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type FavoriteButtonProps = {
  kind: "COUNTRY" | "CITY";
  countryId?: string;
  cityId?: string;
};

export function FavoriteButton({ cityId, countryId, kind }: FavoriteButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFavorite() {
    setIsSubmitting(true);
    setMessage(null);

    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kind, countryId, cityId }),
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    setIsSubmitting(false);

    if (!response.ok) {
      setMessage("Nu am putut salva favorita. Verifică baza de date și sesiunea.");
      return;
    }

    setMessage("Locația a fost salvată la favorite.");
    router.refresh();
  }

  return (
    <div className="grid gap-2">
      <Button type="button" onClick={handleFavorite} disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        )}
        Salvează favorită
      </Button>
      {message ? (
        <p className="text-xs leading-5 text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
