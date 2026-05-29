import Link from "next/link";

export function CountryCitySelector({ cities }: { cities: Array<{ id: string; name: string; slug: string }> }) {
  return (
    <section className="border-t border-border pt-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Orașe analizate</h2>
        <p className="mt-2 text-sm text-muted-foreground">Apasă pe un oraș pentru a vedea detaliile.</p>
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
