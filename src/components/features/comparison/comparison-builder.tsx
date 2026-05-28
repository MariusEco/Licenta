"use client";

import { GitCompareArrows, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatDifficulty } from "@/lib/formatters";
import type { CitySummaryView, CountrySummaryView } from "@/types/explorer";

type ComparableLocation = CountrySummaryView | CitySummaryView;

type ComparisonBuilderProps = {
  locations: ComparableLocation[];
};

function getLocationKey(location: ComparableLocation) {
  return `${location.kind}:${location.id}`;
}

export function ComparisonBuilder({ locations }: ComparisonBuilderProps) {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    locations.slice(0, 2).map(getLocationKey),
  );
  const [title, setTitle] = useState("Comparație destinații");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedLocations = useMemo(
    () =>
      locations.filter((location) =>
        selectedKeys.includes(getLocationKey(location)),
      ),
    [locations, selectedKeys],
  );

  function toggleLocation(key: string) {
    setSelectedKeys((current) => {
      if (current.includes(key)) {
        return current.filter((item) => item !== key);
      }

      if (current.length >= 5) {
        return current;
      }

      return [...current, key];
    });
  }

  async function saveComparison() {
    setIsSaving(true);
    setMessage(null);

    const response = await fetch("/api/comparisons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        items: selectedLocations.map((location) => ({
          kind: location.kind,
          countryId: location.kind === "COUNTRY" ? location.id : undefined,
          cityId: location.kind === "CITY" ? location.id : undefined,
        })),
      }),
    });

    if (response.status === 401) {
      router.push("/login");
      return;
    }

    setIsSaving(false);

    if (!response.ok) {
      setMessage(
        "Comparația nu a putut fi salvată. Asigură-te că folosești date din baza Supabase.",
      );
      return;
    }

    setMessage("Comparația a fost salvată în cont.");
    router.refresh();
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="border border-border bg-white p-4">
        <div className="mb-4 flex items-center gap-2">
          <GitCompareArrows className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="font-semibold text-foreground">Construiește comparația</h2>
        </div>

        <label>
          <span className="mb-1 block text-sm font-medium text-foreground">
            Titlu
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
          />
        </label>

        <div className="mt-4 grid gap-2">
          {locations.map((location) => {
            const key = getLocationKey(location);
            const isSelected = selectedKeys.includes(key);

            return (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 border border-border p-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleLocation(key)}
                  className="h-4 w-4 border-border text-primary focus:ring-primary"
                />
                <span>
                  <span className="block font-semibold text-foreground">
                    {location.name}
                  </span>
                  <span className="text-muted-foreground">
                    {location.kind === "COUNTRY" ? "Țară" : "Oraș"}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        <Button
          type="button"
          onClick={saveComparison}
          disabled={isSaving || selectedLocations.length < 2}
          className="mt-4 w-full"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          Salvează comparația
        </Button>

        {message ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{message}</p>
        ) : null}
      </div>

      <div className="grid gap-3">
        {selectedLocations.map((location) => (
          <article key={getLocationKey(location)} className="border border-border bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{location.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Dificultate: {formatDifficulty(location.emigrationDifficulty)}
                </p>
              </div>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Cost lunar</dt>
                  <dd className="font-semibold text-foreground">
                    {formatCurrency(location.monthlyCostEur)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Salariu mediu</dt>
                  <dd className="font-semibold text-foreground">
                    {formatCurrency(location.averageSalaryEur)}
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
