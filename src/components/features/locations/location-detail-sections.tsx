import {
  BookOpenText,
  BriefcaseBusiness,
  FileText,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CostBreakdownChart } from "@/components/features/locations/cost-breakdown-chart";
import { LocationStat } from "@/components/features/locations/location-stat";
import {
  formatCurrency,
  formatDifficulty,
  formatNumber,
  formatTaxLevel,
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
  type,
}: LocationDetailSectionsProps) {
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
          <InfoPanel
            icon={Scale}
            title="Legi locale relevante"
            content={location.localLawNotes}
          />
          <InfoPanel
            icon={BookOpenText}
            title="Religie predominantă"
            content={location.predominantReligion}
          />
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">
              Costuri lunare estimate
            </h2>
            {location.costOfLiving?.sourceName ? (
              <Badge>{location.costOfLiving.sourceName}</Badge>
            ) : null}
          </div>
          <CostBreakdownChart cost={location.costOfLiving} />
        </section>

        {isCountry(location) && location.visaInfos.length > 0 ? (
          <section className="grid gap-3">
            <h2 className="text-xl font-semibold text-foreground">
              Vize și pași legali
            </h2>
            {location.visaInfos.map((visa) => (
              <article key={visa.id} className="border border-border bg-white p-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">{visa.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {visa.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Checklist title="Pași legali" items={visa.legalSteps} />
                  <Checklist
                    title="Documente necesare"
                    items={visa.requiredDocuments}
                  />
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </section>

      <aside className="grid h-fit gap-3">
        <LocationStat
          label="Cost lunar"
          value={formatCurrency(location.monthlyCostEur)}
        />
        <LocationStat
          label="Salariu mediu"
          value={formatCurrency(location.averageSalaryEur)}
        />
        <LocationStat
          label="Dificultate emigrare"
          value={formatDifficulty(location.emigrationDifficulty)}
        />
        {isCountry(location) ? (
          <>
            <LocationStat
              label="Dificultate cetățenie"
              value={formatDifficulty(location.citizenshipDifficulty)}
            />
            <LocationStat label="Taxare" value={formatTaxLevel(location.taxLevel)} />
          </>
        ) : (
          <LocationStat
            label="Populație"
            value={formatNumber(location.population)}
          />
        )}
        <LocationStat
          label={type === "country" ? "Coordonate țară" : "Coordonate oraș"}
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

function Checklist({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="border-l-2 border-primary pl-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
