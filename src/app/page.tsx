import {
  ArrowRight,
  BarChart3,
  Globe2,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { CountryCard } from "@/components/features/locations/country-card";
import { Button } from "@/components/ui/button";
import { getCountries } from "@/services/locations/queries";

const overviewItems = [
  {
    title: "Informații legale",
    description: "Vize, documente, pași de emigrare și dificultatea cetățeniei.",
    icon: ShieldCheck,
  },
  {
    title: "Date economice",
    description: "Chirii, utilități, costuri alimentare, salarii medii și taxe.",
    icon: BarChart3,
  },
  {
    title: "Hartă globală",
    description: "Țări și orașe pregătite pentru pin-uri interactive.",
    icon: MapPinned,
  },
];

export default async function HomePage() {
  const countries = await getCountries({ pageSize: 3, sort: "salary_desc" });

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid min-h-[calc(100svh-9rem)] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            <Globe2 className="h-4 w-4 text-primary" aria-hidden="true" />
            Analiză structurată pentru decizii reale de emigrare
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
            Migro
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            O platformă web pentru românii care vor să compare țări și orașe pe
            baza costurilor, oportunităților, cerințelor legale și comunităților
            românești.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/countries">
                Explorează țări
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/map">Deschide harta</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {overviewItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="border border-border bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Țări recomandate pentru analiză
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Primele opțiuni sunt alese după salarii, costuri și relevanță
              pentru românii care vor să emigreze.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/countries">Vezi toate țările</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {countries.items.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </section>
    </main>
  );
}
