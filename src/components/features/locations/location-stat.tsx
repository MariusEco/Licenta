import type { ReactNode } from "react";

import { ExternalLink } from "lucide-react";

type LocationStatProps = {
  label: string;
  value: ReactNode;
  href?: string | null;
};

export function LocationStat({ href, label, value }: LocationStatProps) {
  return (
    <div className="border border-border bg-white p-4">
      <dt className="text-xs font-semibold uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-lg font-semibold text-foreground">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
          >
            <span>{value}</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
