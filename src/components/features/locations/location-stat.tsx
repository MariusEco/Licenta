type LocationStatProps = {
  label: string;
  value: string;
};

export function LocationStat({ label, value }: LocationStatProps) {
  return (
    <div className="border border-border bg-white p-4">
      <dt className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-lg font-semibold text-foreground">{value}</dd>
    </div>
  );
}
