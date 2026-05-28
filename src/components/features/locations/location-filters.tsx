import { Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type LocationFiltersProps = {
  search?: string;
  difficulty?: string;
  maxMonthlyCostEur?: string;
  minAverageSalaryEur?: string;
  sort?: string;
};

export function LocationFilters({
  search,
  difficulty,
  maxMonthlyCostEur,
  minAverageSalaryEur,
  sort = "name",
}: LocationFiltersProps) {
  return (
    <form className="grid gap-3 border border-border bg-white p-4 shadow-sm lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
      <label className="min-w-0">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
          Căutare
        </span>
        <span className="relative block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            name="search"
            defaultValue={search}
            placeholder="Țară, oraș sau regiune"
            className="h-11 w-full border border-border bg-white pl-9 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </span>
      </label>

      <label>
        <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
          Dificultate
        </span>
        <select
          name="difficulty"
          defaultValue={difficulty ?? ""}
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        >
          <option value="">Toate</option>
          <option value="LOW">Scăzută</option>
          <option value="MEDIUM">Medie</option>
          <option value="HIGH">Ridicată</option>
          <option value="VERY_HIGH">Foarte ridicată</option>
        </select>
      </label>

      <label>
        <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
          Buget maxim
        </span>
        <input
          name="maxMonthlyCostEur"
          defaultValue={maxMonthlyCostEur}
          inputMode="numeric"
          placeholder="EUR/lună"
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        />
      </label>

      <label>
        <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
          Salariu minim
        </span>
        <input
          name="minAverageSalaryEur"
          defaultValue={minAverageSalaryEur}
          inputMode="numeric"
          placeholder="EUR/lună"
          className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
            Sortare
          </span>
          <select
            name="sort"
            defaultValue={sort}
            className="h-11 w-full border border-border bg-white px-3 text-sm outline-none transition focus:border-primary"
          >
            <option value="name">Nume</option>
            <option value="cost_asc">Cost crescător</option>
            <option value="salary_desc">Salariu descrescător</option>
            <option value="difficulty_asc">Dificultate crescătoare</option>
          </select>
        </label>
        <Button className="mt-auto" type="submit">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Aplică
        </Button>
      </div>
    </form>
  );
}
