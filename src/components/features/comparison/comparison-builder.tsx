"use client";

import {
  GitCompareArrows,
  Loader2,
  RotateCcw,
  Save,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  formatCurrency,
  formatDifficulty,
  formatNumber,
} from "@/lib/formatters";
import type {
  CityDetailView,
  CitySummaryView,
  CountryDetailView,
  CountrySummaryView,
} from "@/types/explorer";

type ComparableLocation = CountrySummaryView | CitySummaryView;
type ComparableDetailLocation = CountryDetailView | CityDetailView;
type ComparisonSide = "left" | "right";

type ComparisonBuilderProps = {
  locations: ComparableLocation[];
  initialSelectedKeys?: string[];
  initialTitle?: string;
};

function getLocationKey(location: ComparableLocation) {
  return `${location.kind}:${location.id}`;
}

function getLocationSubtitle(location: ComparableLocation) {
  return location.kind === "COUNTRY"
    ? location.continent
    : location.countryName;
}

function getLocationDetailPath(location: ComparableLocation) {
  return location.kind === "COUNTRY"
    ? `/api/countries/${location.slug}`
    : `/api/cities/${location.slug}`;
}

function formatMaybeText(value: string | null | undefined) {
  if (!value || !value.trim()) {
    return "Nedisponibil";
  }

  return value;
}

function getCostOfLiving(
  location: ComparableLocation | ComparableDetailLocation | null,
) {
  if (!location || !("costOfLiving" in location)) {
    return null;
  }

  return location.costOfLiving;
}

function getCountryDetail(
  location: ComparableLocation | ComparableDetailLocation | null,
) {
  if (
    !location ||
    location.kind !== "COUNTRY" ||
    !("generalDescription" in location)
  ) {
    return null;
  }

  return location;
}

function getCityDetail(
  location: ComparableLocation | ComparableDetailLocation | null,
) {
  if (
    !location ||
    location.kind !== "CITY" ||
    !("generalDescription" in location)
  ) {
    return null;
  }

  return location;
}

type ComparisonRow = {
  label: string;
  render: (
    location: ComparableLocation | ComparableDetailLocation | null,
  ) => string;
};

const comparisonRows: ComparisonRow[] = [
  {
    label: "Tip",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      return location.kind === "COUNTRY" ? "Țară" : "Oraș";
    },
  },
  {
    label: "Țară",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      return location.kind === "COUNTRY" ? location.name : location.countryName;
    },
  },
  {
    label: "Continent / Regiune",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "COUNTRY") {
        return location.continent;
      }

      return formatMaybeText(getCityDetail(location)?.region);
    },
  },
  {
    label: "Capitală / Oraș",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "COUNTRY") {
        return formatMaybeText(getCountryDetail(location)?.capital);
      }

      return location.name;
    },
  },
  {
    label: "Monedă",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "COUNTRY") {
        return formatMaybeText(getCountryDetail(location)?.currency);
      }

      return formatMaybeText(getCityDetail(location)?.currency);
    },
  },
  {
    label: "Populație",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "CITY") {
        return formatNumber(getCityDetail(location)?.population);
      }

      return formatNumber(location.population);
    },
  },
  {
    label: "Limbă oficială",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      return location.kind === "COUNTRY"
        ? formatMaybeText(getCountryDetail(location)?.officialLanguage)
        : formatMaybeText(getCityDetail(location)?.officialLanguage);
    },
  },
  {
    label: "Dificultate emigrare",
    render: (location) =>
      formatDifficulty(location?.emigrationDifficulty ?? null),
  },
  {
    label: "Dificultate cetățenie",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      return formatDifficulty(location.citizenshipDifficulty ?? null);
    },
  },
  {
    label: "Salariu net mediu",
    render: (location) => formatCurrency(location?.averageSalaryEur ?? null),
  },
  {
    label: "Cost lunar fără chirie",
    render: (location) => formatCurrency(location?.monthlyCostEur ?? null),
  },
  {
    label: "Chirie 1 dormitor",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.rentOneBedroomEur ?? null),
  },
  {
    label: "Utilități",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.utilitiesEur ?? null),
  },
  {
    label: "Mâncare",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.groceriesEur ?? null),
  },
  {
    label: "Transport",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.transportEur ?? null),
  },
  {
    label: "Sănătate",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.healthcareEur ?? null),
  },
  {
    label: "Internet",
    render: (location) =>
      formatCurrency(getCostOfLiving(location)?.internetEur ?? null),
  },
  {
    label: "Comunitate românească",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "COUNTRY") {
        return formatMaybeText(getCountryDetail(location)?.romanianCommunityNotes);
      }

      return formatMaybeText(getCityDetail(location)?.romanianCommunityNotes);
    },
  },
  {
    label: "Piața muncii",
    render: (location) => {
      if (!location) {
        return "Nedisponibil";
      }

      if (location.kind === "COUNTRY") {
        return formatMaybeText(getCountryDetail(location)?.jobMarketNotes);
      }

      return formatMaybeText(getCityDetail(location)?.jobMarketNotes);
    },
  },
];

export function ComparisonBuilder({
  locations,
  initialSelectedKeys,
  initialTitle,
}: ComparisonBuilderProps) {
  const router = useRouter();
  const [leftKey, setLeftKey] = useState<string | null>(
    () => initialSelectedKeys?.[0] ?? null,
  );
  const [rightKey, setRightKey] = useState<string | null>(
    () => initialSelectedKeys?.[1] ?? null,
  );
  const [title, setTitle] = useState(() => initialTitle ?? "Comparație rapidă");
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);
  const [details, setDetails] = useState<
    Record<string, ComparableDetailLocation>
  >({});

  const locationByKey = useMemo(
    () =>
      new Map(
        locations.map(
          (location) => [getLocationKey(location), location] as const,
        ),
      ),
    [locations],
  );

  const [search, setSearch] = useState("");

  // `initialTitle` and `initialSelectedKeys` are used to seed initial state
  // via lazy initializers above. Avoid calling setState synchronously inside
  // effects to satisfy the linter and prevent cascading renders.

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [notification]);

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return locations;
    }

    const countryMatches = new Set<string>();
    const cityMatches = new Set<string>();

    for (const location of locations) {
      const haystack = [
        location.name,
        location.slug,
        getLocationSubtitle(location),
        location.kind,
      ]
        .join(" ")
        .toLowerCase();

      if (haystack.includes(normalizedSearch)) {
        if (location.kind === "COUNTRY") {
          countryMatches.add(location.slug);
        } else {
          cityMatches.add(location.slug);
          countryMatches.add(location.countrySlug);
        }
      }
    }

    const groupedLocations: ComparableLocation[] = [];

    const matchingCountries = locations.filter(
      (location): location is CountrySummaryView =>
        location.kind === "COUNTRY" && countryMatches.has(location.slug),
    );

    matchingCountries.sort((first, second) =>
      first.name.localeCompare(second.name, "ro"),
    );

    for (const country of matchingCountries) {
      groupedLocations.push(country);

      const countryCities = locations
        .filter(
          (location): location is CitySummaryView =>
            location.kind === "CITY" && location.countrySlug === country.slug,
        )
        .filter((city) =>
          cityMatches.size > 0 ? cityMatches.has(city.slug) : true,
        )
        .sort((first, second) => first.name.localeCompare(second.name, "ro"));

      groupedLocations.push(...countryCities);
    }

    return groupedLocations;
  }, [locations, search]);

  const leftLocation = leftKey ? (locationByKey.get(leftKey) ?? null) : null;
  const rightLocation = rightKey ? (locationByKey.get(rightKey) ?? null) : null;

  const leftDisplay = leftKey ? (locationByKey.get(leftKey) ?? null) : null;
  const rightDisplay = rightKey ? (locationByKey.get(rightKey) ?? null) : null;

  const selectedLocations = [leftLocation, rightLocation].filter(
    (location): location is ComparableLocation => Boolean(location),
  );

  useEffect(() => {
    const keysToLoad = [leftKey, rightKey].filter((key): key is string =>
      Boolean(key),
    );

    if (keysToLoad.length === 0) {
      // No keys to load — nothing to do. State clearing is handled by
      // `clearAll()` when the user explicitly resets selections.
      return;
    }

    const controller = new AbortController();
    // Allow setting loading keys for the async fetch sequence. This is
    // intentionally done here to reflect the active fetch keys.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingKeys(keysToLoad);

    Promise.allSettled(
      keysToLoad.map(async (key) => {
        const location = locationByKey.get(key);

        if (!location) {
          return null;
        }

        const response = await fetch(getLocationDetailPath(location), {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `Detaliile pentru ${location.name} nu au putut fi încărcate.`,
          );
        }

        const payload = (await response.json()) as {
          data: ComparableDetailLocation;
        };
        return { key, detail: payload.data };
      }),
    ).then((results) => {
      if (controller.signal.aborted) {
        return;
      }

      const nextDetails: Record<string, ComparableDetailLocation> = {};
      let hadFailure = false;

      for (const result of results) {
        if (result.status === "fulfilled" && result.value) {
          nextDetails[result.value.key] = result.value.detail;
        } else if (result.status === "rejected") {
          hadFailure = true;
        }
      }

      setDetails((current) => ({ ...current, ...nextDetails }));
      setLoadError(
        hadFailure ? "Nu am putut încărca toate detaliile comparației." : null,
      );
      setLoadingKeys([]);
    });

    return () => controller.abort();
  }, [leftKey, locationByKey, rightKey]);

  function assignLocation(side: ComparisonSide, key: string) {
    if (side === "left") {
      setLeftKey(key);
      setRightKey((current) => (current === key ? null : current));
      return;
    }

    setRightKey(key);
    setLeftKey((current) => (current === key ? null : current));
  }

  async function saveComparison() {
    setIsSaving(true);
    setNotification(null);

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
      setIsSaving(false);
      router.push("/login");
      return;
    }

    setIsSaving(false);

    if (!response.ok) {
      setNotification({
        tone: "error",
        message:
          "Comparația nu a putut fi salvată. Asigură-te că folosești date din baza Supabase.",
      });
      return;
    }

    setNotification({
      tone: "success",
      message: "Comparația a fost salvată în cont.",
    });
    router.refresh();
  }

  const leftSelected = leftKey ? (locationByKey.get(leftKey) ?? null) : null;
  const rightSelected = rightKey ? (locationByKey.get(rightKey) ?? null) : null;
  const canSave = Boolean(leftSelected && rightSelected);
  const leftComparisonLocation = leftKey
    ? (details[leftKey] ?? leftSelected)
    : null;
  const rightComparisonLocation = rightKey
    ? (details[rightKey] ?? rightSelected)
    : null;

  function clearAll() {
    setLeftKey(null);
    setRightKey(null);
    setNotification(null);
    setLoadError(null);
  }

  function renderSelectedCard(
    location: ComparableLocation | null,
    side: ComparisonSide,
  ) {
    const key = location ? getLocationKey(location) : null;
    const loading = key ? loadingKeys.includes(key) : false;

    if (!location) {
      return (
        <div className="border border-dashed border-border bg-white p-4">
          <div className="text-sm font-semibold text-foreground">
            {side === "left" ? "Alege prima locație" : "Alege a doua locație"}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Folosește căutarea din stânga pentru a selecta o țară sau un oraș.
          </p>
        </div>
      );
    }

    return (
      <article className="border border-border bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {location.kind === "COUNTRY" ? "Țară" : "Oraș"}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              {location.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getLocationSubtitle(location)}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (side === "left") {
                setLeftKey(null);
              } else {
                setRightKey(null);
              }
            }}
            aria-label={`Șterge selecția ${side}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <div className="text-muted-foreground">Salariu net mediu</div>
            <div className="font-semibold text-foreground">
              {formatCurrency(location.averageSalaryEur)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Cost lunar fără chirie</div>
            <div className="font-semibold text-foreground">
              {formatCurrency(location.monthlyCostEur)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Dificultate</div>
            <div className="font-semibold text-foreground">
              {formatDifficulty(location.emigrationDifficulty)}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Se încarcă detaliile...
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
      <aside className="border border-border bg-white p-4 lg:sticky lg:top-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitCompareArrows
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <h2 className="font-semibold text-foreground">Caută locații</h2>
          </div>
          <Button type="button" variant="ghost" onClick={clearAll}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Resetează
          </Button>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-foreground">
            Titlu
          </span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-foreground">
            Caută țări sau orașe
          </span>
          <div className="flex h-11 items-center gap-2 border border-border bg-white px-3">
            <Search
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Scrie numele unei țări sau al unui oraș"
              className="h-full w-full bg-transparent text-sm outline-none"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-muted-foreground transition hover:text-foreground"
                aria-label="Curăță căutarea"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </label>

        <div className="mt-4 max-h-[680px] space-y-3 overflow-y-auto pr-1">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => {
              const key = getLocationKey(location);
              const isLeft = leftKey === key;
              const isRight = rightKey === key;

              return (
                <article
                  key={key}
                  className={`border bg-white p-3 transition ${
                    isLeft || isRight ? "border-primary" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {location.name}
                        </h3>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {location.kind === "COUNTRY" ? "Țară" : "Oraș"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {getLocationSubtitle(location)}
                      </p>
                    </div>
                    <div className="text-right text-[11px] uppercase tracking-wide text-muted-foreground">
                      {isLeft ? "Stânga" : null}
                      {isRight ? "Dreapta" : null}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={isLeft ? "primary" : "secondary"}
                      onClick={() => assignLocation("left", key)}
                      className="w-full"
                    >
                      Stânga
                    </Button>
                    <Button
                      type="button"
                      variant={isRight ? "primary" : "secondary"}
                      onClick={() => assignLocation("right", key)}
                      className="w-full"
                    >
                      Dreapta
                    </Button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="border border-dashed border-border bg-white p-4 text-sm text-muted-foreground">
              Nu am găsit nicio locație care să se potrivească.
            </div>
          )}
        </div>
      </aside>

      <div className="grid gap-6">
        <section className="grid gap-3 lg:grid-cols-2">
          {renderSelectedCard(leftDisplay, "left")}
          {renderSelectedCard(rightDisplay, "right")}
        </section>

        <section className="border border-border bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Comparație
              </h2>
              <p className="text-sm text-muted-foreground">
                {canSave
                  ? "Două locații sunt pregătite pentru comparație."
                  : "Selectează două locații pentru a vedea comparația completă."}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button
                type="button"
                onClick={saveComparison}
                disabled={isSaving || !canSave}
                className="shrink-0"
              >
                {isSaving ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                Salvează comparația
              </Button>
              {notification ? (
                <div
                  className={`max-w-sm rounded-sm border px-3 py-2 text-xs leading-5 shadow-sm ${
                    notification.tone === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {notification.message}
                </div>
              ) : null}
            </div>
          </div>

          {loadError ? (
            <div className="border-b border-border bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {loadError}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <div className="min-w-[920px]">
              <div className="grid grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-muted/40 text-sm font-semibold text-foreground">
                <div className="px-4 py-3">Specificație</div>
                <div className="px-4 py-3">
                  {leftDisplay ? leftDisplay.name : "Locația din stânga"}
                </div>
                <div className="px-4 py-3">
                  {rightDisplay ? rightDisplay.name : "Locația din dreapta"}
                </div>
              </div>

              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] border-b border-border text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-muted/20"
                  }`}
                >
                  <div className="px-4 py-3 font-medium text-foreground">
                    {row.label}
                  </div>
                  <div className="px-4 py-3 leading-6 text-muted-foreground">
                    {row.render(leftComparisonLocation)}
                  </div>
                  <div className="px-4 py-3 leading-6 text-muted-foreground">
                    {row.render(rightComparisonLocation)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
