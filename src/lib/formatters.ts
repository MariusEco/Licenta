export function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "Nedisponibil";
  }

  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "Nedisponibil";
  }

  return new Intl.NumberFormat("ro-RO").format(value);
}

export function formatDifficulty(value: string | null | undefined) {
  const labels: Record<string, string> = {
    SCAZUTA: "Scăzută",
    MEDIE: "Medie",
    RIDICATA: "Ridicată",
    FOARTE_RIDICATA: "Foarte ridicată",
    Scăzută: "Scăzută",
    Medie: "Medie",
    Ridicată: "Ridicată",
    "Foarte ridicată": "Foarte ridicată",
    LOW: "Scăzută",
    MEDIUM: "Medie",
    HIGH: "Ridicată",
    VERY_HIGH: "Foarte ridicată",
  };

  return value ? (labels[value] ?? value) : "Nedisponibilă";
}

export function formatTaxLevel(value: string | null | undefined) {
  const labels: Record<string, string> = {
    LOW: "Scăzută",
    MEDIUM: "Medie",
    HIGH: "Ridicată",
  };

  return value ? (labels[value] ?? value) : "Nedisponibil";
}
