import {
  BriefcaseBusiness,
  ExternalLink,
  Users,
  type LucideIcon,
} from "lucide-react";

import { CostBreakdownChart } from "@/components/features/locations/cost-breakdown-chart";
import { LocationStat } from "@/components/features/locations/location-stat";
import {
  formatCurrency,
  formatDifficulty,
  formatNumber,
} from "@/lib/formatters";
import type { CityDetailView, CountryDetailView } from "@/types/explorer";

type LocationDetailSectionsProps = {
  location: CountryDetailView | CityDetailView;
  type: "country" | "city";
};

function isCountry(
  location: CountryDetailView | CityDetailView,
): location is CountryDetailView {
  return "isoCode" in location;
}

export function LocationDetailSections({
  location,
}: LocationDetailSectionsProps) {
  if (isCountry(location)) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-6">
          <div className="border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Descriere generală
            </h2>
            <div className="mt-3 leading-7 text-muted-foreground">
              <p>{location.generalDescription}</p>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <InfoStat label="Capitală" value={location.capital} />
              <InfoStat label="Monedă" value={location.currency} />
              <InfoStat
                label="Limba oficială"
                value={location.officialLanguage}
              />
              <InfoStat
                label="Religia predominantă"
                value={location.predominantReligion}
              />
              <InfoStat
                label="Populație"
                value={formatNumber(location.population)}
              />
            </dl>
          </div>

          {location.officialResources.length > 0 ? (
            <section className="grid gap-3">
              <h2 className="text-xl font-semibold text-foreground">
                Linkuri oficiale utile
              </h2>
              <div className="grid gap-3">
                {location.officialResources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-1 border border-border bg-white p-4 transition hover:border-primary/50 hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      {resource.title}
                      <ExternalLink
                        className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    {resource.description ? (
                      <span className="text-sm leading-6 text-muted-foreground">
                        {resource.description}
                      </span>
                    ) : null}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </section>

        <aside className="grid h-fit gap-3">
          <LocationStat
            label="Dificultate emigrare"
            value={formatDifficulty(location.emigrationDifficulty)}
          />
          <LocationStat
            label="Dificultate cetățenie"
            value={formatDifficulty(location.citizenshipDifficulty)}
          />
          <LocationStat
            label="Salariu net mediu"
            value={formatCurrency(location.averageSalaryEur)}
          />
          <LocationStat
            label="Cost lunar fără chirie"
            value={formatCurrency(location.monthlyCostEur)}
          />
          <LocationStat
            label="Taxare"
            // Always show a static call-to-action and link to the tax summary (PwC when available,
            // otherwise Wikipedia fallback provided by country-metadata).
            value={"Vezi mai multe detalii"}
            href={location.taxSummaryUrl ?? null}
          />
        </aside>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="grid gap-6">
        <div className="border border-border bg-white p-6">
          <h2 className="text-xl font-semibold text-foreground">
            Descriere generală
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {location.generalDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoPanel
            icon={Users}
            title="Comunități românești"
            content={location.romanianCommunityNotes}
          />
          <InfoPanel
            icon={BriefcaseBusiness}
            title="Oportunități de joburi"
            content={location.jobMarketNotes}
          />
        </div>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-foreground">
            Costuri lunare estimate
          </h2>
          <CostBreakdownChart cost={location.costOfLiving} />
        </section>
      </section>

      <aside className="grid h-fit gap-3">
        <LocationStat
          label="Cost lunar fără chirie"
          value={formatCurrency(location.monthlyCostEur)}
        />
        <LocationStat
          label="Salariu net mediu"
          value={formatCurrency(location.averageSalaryEur)}
        />
        <LocationStat
          label="Populație"
          value={formatNumber(location.population)}
        />
        <LocationStat
          label="Coordonate oraș"
          value={`${location.latitude ?? "?"}, ${location.longitude ?? "?"}`}
        />
      </aside>
    </div>
  );
}

function InfoPanel({
  content,
  icon: Icon,
  title,
}: {
  content: string | null;
  icon: LucideIcon;
  title: string;
}) {
  return (
    <article className="border border-border bg-white p-5">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {content ?? "Informația va fi completată după actualizarea surselor."}
      </p>
    </article>
  );
}

function InfoStat({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="border border-border bg-slate-50 px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">
        {value ?? "Nedisponibil"}
      </dd>
    </div>
  );
}
