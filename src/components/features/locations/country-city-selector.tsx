"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CityDetailView } from "@/types/explorer";

export function CountryCitySelector({ cities }: { cities: Array<{ id: string; name: string; slug: string }> }) {
  const router = useRouter();

  return (
    <section className="border-t border-border pt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Orașe analizate</h2>
          <p className="mt-2 text-sm text-muted-foreground">Selectează un oraș pentru a vedea detaliile.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            defaultValue=""
            onChange={(e) => {
              const slug = e.target.value;
              if (slug) {
                router.push(`/cities/${slug}`);
              }
            }}
            className="rounded border px-3 py-2 text-sm"
          >
            <option value="">Selectează oraș</option>
            {cities.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cities.map((c) => (
          <Link
            key={c.id}
            href={`/cities/${c.slug}`}
            className="block rounded border border-border bg-white p-4 text-sm hover:shadow"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
