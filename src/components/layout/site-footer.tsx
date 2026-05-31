import { ExternalLink, Globe2 } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

const navigationLinks = [
  { href: "/countries", label: "Țări" },
  { href: "/map", label: "Hartă" },
  { href: "/compare", label: "Comparare" },
  { href: "/favorites", label: "Favorite" },
] satisfies Array<{ href: Route; label: string }>;

const sourceLinks = [
  { href: "https://www.numbeo.com/cost-of-living/", label: "Numbeo" },
  { href: "https://livingcost.org/", label: "Livingcost" },
  {
    href: "https://worldpopulationreview.com/",
    label: "World Population Review",
  },
  { href: "https://www.wikipedia.org/", label: "Wikipedia" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <section className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
              <Globe2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>Migro</span>
          </Link>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Platformă web pentru informarea și analiza oportunităților de
            emigrare, construită pentru compararea țărilor și orașelor din
            perspectiva costurilor, documentelor, comunităților și pieței muncii.
          </p>
        </section>

        <nav aria-label="Navigare footer" className="space-y-3">
          <h2 className="text-sm font-semibold">Navigare</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold">Surse de date</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Datele sunt agregate și verificate din mai multe surse publice.
            Valorile pot varia în timp și trebuie tratate ca estimări
            informative, nu ca date oficiale garantate.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {sourceLinks.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition hover:text-foreground"
                >
                  {source.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {currentYear} Migro. Toate drepturile rezervate.</p>
          <p>Proiect academic pentru analiza oportunităților de emigrare.</p>
        </div>
      </div>
    </footer>
  );
}
