"use client";

import { Trash, Loader2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type ComparisonItem = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    kind: string;
    location: { name?: string } | null;
  }>;
};

type ComparisonsListProps = {
  items: ComparisonItem[];
};

export default function ComparisonsList({ items }: ComparisonsListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);

    const response = await fetch(`/api/comparisons/${id}`, {
      method: "DELETE",
    });

    setDeletingId(null);

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    if (!response.ok) {
      alert("Nu s-a putut șterge comparația.");
      return;
    }

    router.refresh();
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nu există comparații salvate.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((comp) => (
        <div
          key={comp.id}
          className="flex items-center justify-between gap-4 border border-border bg-white p-4"
        >
          <Link
            href={`/compare?comparisonId=${comp.id}` as Route}
            className="min-w-0 flex-1"
            aria-label={`Deschide comparația ${comp.title}`}
          >
            <div className="text-sm font-semibold text-foreground">
              {comp.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {comp.items.map((i) => i.location?.name ?? "?").join(", ")}
            </div>
          </Link>

          <div>
            <Button
              variant="ghost"
              onClick={() => handleDelete(comp.id)}
              disabled={deletingId === comp.id}
            >
              {deletingId === comp.id ? (
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
