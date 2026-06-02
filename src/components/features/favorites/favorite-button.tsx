"use client";

import { Bookmark, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type FavoriteButtonProps = {
  kind: "COUNTRY" | "CITY";
  countryId?: string;
  cityId?: string;
  saveLabel?: string;
  initialFavorited?: boolean;
};

export function FavoriteButton({
  cityId,
  countryId,
  kind,
  initialFavorited,
  saveLabel,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(Boolean(initialFavorited));

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [message]);

  async function handleFavorite() {
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (!isFavorited) {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, countryId, cityId }),
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          setMessage(
            "Nu am putut salva favorita. Verifică baza de date și sesiunea.",
          );
          return;
        }

        setIsFavorited(true);
        setMessage("Locația a fost salvată la favorite.");
        router.refresh();
        return;
      }

      const response = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, countryId, cityId }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        setMessage("Nu am putut elimina favorita.");
        return;
      }

      setIsFavorited(false);
      setMessage("Locația a fost eliminată din favorite.");
      router.refresh();
    } catch {
      setMessage("A apărut o eroare la salvarea favoritei.");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (initialFavorited !== undefined) {
      return;
    }

    let mounted = true;

    async function fetchFavorites() {
      try {
        const res = await fetch("/api/favorites");

        if (res.status === 401) {
          if (mounted) setIsFavorited(false);
          return;
        }

        if (!res.ok) return;

        const payload = await res.json();
        const favorites = Array.isArray(payload) ? payload : payload.data;
        if (!Array.isArray(favorites)) return;

        const match = favorites.find(
          (f: { location?: { kind?: string; id?: string } }) => {
            const loc = f.location;
            if (!loc) return false;
            if (kind === "COUNTRY")
              return loc.kind === "COUNTRY" && loc.id === countryId;
            return loc.kind === "CITY" && loc.id === cityId;
          },
        );

        if (mounted) setIsFavorited(Boolean(match));
      } catch {
        return;
      }
    }

    fetchFavorites();

    return () => {
      mounted = false;
    };
  }, [kind, countryId, cityId, initialFavorited]);

  return (
    <div className="grid gap-2">
      <Button type="button" onClick={handleFavorite} disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        )}
        {isFavorited
          ? "Elimină din favorite"
          : (saveLabel ?? "Salvează favorită")}
      </Button>
      {message ? (
        <p className="text-xs leading-5 text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
