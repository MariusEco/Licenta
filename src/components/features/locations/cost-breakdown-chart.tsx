"use client";

import { useSyncExternalStore } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CostOfLivingView } from "@/types/explorer";

type CostBreakdownChartProps = {
  cost: CostOfLivingView | null;
};

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function CostBreakdownChart({ cost }: CostBreakdownChartProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const data = [
    { name: "Chirie + utilități", value: cost?.rentUtilitiesEur ?? 0 },
    { name: "Alimente", value: cost?.foodEur ?? 0 },
    { name: "Transport", value: cost?.transportEur ?? 0 },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center border border-dashed border-border bg-white text-sm text-muted-foreground">
        Nu există încă date suficiente pentru grafic.
      </div>
    );
  }

  if (!isClient) {
    return <div className="h-72 border border-border bg-white p-4" />;
  }

  return (
    <div className="h-72 border border-border bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={48} />
          <Tooltip
            formatter={(value) => [`${value} EUR`, "Cost lunar"]}
            cursor={{ fill: "rgb(15 118 110 / 0.08)" }}
          />
          <Bar
            dataKey="value"
            fill="hsl(var(--primary))"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
