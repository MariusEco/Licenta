"use client";

import { Trash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type FavoriteItem = {
  id: string;
  createdAt: string;
  location: any | null;
};

type FavoritesListProps = {
  items: FavoriteItem[];
};

export default function FavoritesList({ items }: FavoritesListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleRemove(fav: FavoriteItem) {
    if (!fav.location) return;

    setLoadingId(fav.id);

    const body: any = { kind: fav.location.kind };
    if (fav.location.kind === "COUNTRY") body.countryId = fav.location.id;
    if (fav.location.kind === "CITY") body.cityId = fav.location.id;

    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoadingId(null);

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      // keep it simple for now
      alert("Nu s-a putut șterge favorita.");
      return;
    }

    router.refresh();
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nu există favorite.</p>;
  }

  return (
    <div className="grid gap-3">
      {items.map((fav) => (
        <div key={fav.id} className="flex items-center justify-between gap-4 border border-border bg-white p-4">
          <div>
            <div className="text-sm font-semibold text-foreground">
              {fav.location?.name ?? "(Locație necunoscută)"}
            </div>
            <div className="text-xs text-muted-foreground">{fav.location?.kind ?? ""}</div>
          </div>

          <div>
            <Button
              variant="ghost"
              onClick={() => handleRemove(fav)}
              disabled={loadingId === fav.id}
            >
              {loadingId === fav.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
