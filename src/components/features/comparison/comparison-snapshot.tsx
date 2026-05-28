"use client";

import { useSyncExternalStore } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CountrySummaryView } from "@/types/explorer";

type ComparisonSnapshotProps = {
  countries: CountrySummaryView[];
};

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ComparisonSnapshot({ countries }: ComparisonSnapshotProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const data = countries.map((country) => ({
    name: country.name,
    cost: country.monthlyCostEur ?? 0,
    salary: country.averageSalaryEur ?? 0,
  }));

  if (!isClient) {
    return <div className="h-80 border border-border bg-white p-4" />;
  }

  return (
    <div className="h-80 border border-border bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={52} />
          <Tooltip formatter={(value) => [`${value} EUR`, ""]} />
          <Legend />
          <Bar dataKey="cost" name="Cost lunar" fill="hsl(var(--accent))" />
          <Bar dataKey="salary" name="Salariu mediu" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
