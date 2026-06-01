type CountryMetadata = {
  population?: number;
  taxSummaryUrl?: string | null;
};

const countryMetadataBySlug: Record<string, CountryMetadata> = {
  albania: {
    population: 2_862_000,
    taxSummaryUrl: "https://taxsummaries.pwc.com/albania",
  },
  andorra: {
    population: 84_406,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Taxation_in_Andorra",
  },
  armenia: {
    population: 3_076_200,
    taxSummaryUrl: "https://taxsummaries.pwc.com/armenia",
  },
  austria: {
    population: 9_200_931,
    taxSummaryUrl: "https://taxsummaries.pwc.com/austria",
  },
  azerbaidjan: {
    population: 10_241_722,
    taxSummaryUrl: "https://taxsummaries.pwc.com/azerbaijan",
  },
  belarus: {
    population: 9_109_280,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Economy_of_Belarus",
  },
  belgia: {
    population: 11_825_551,
    taxSummaryUrl: "https://taxsummaries.pwc.com/belgium",
  },
  "bosnia-si-hertegovina": {
    population: 3_422_000,
    taxSummaryUrl: "https://taxsummaries.pwc.com/bosnia-and-herzegovina",
  },
  bulgaria: {
    population: 6_437_360,
    taxSummaryUrl: "https://taxsummaries.pwc.com/bulgaria",
  },
  cehia: {
    population: 10_882_341,
    taxSummaryUrl: "https://taxsummaries.pwc.com/czech-republic",
  },
  cipru: {
    population: 1_442_614,
    taxSummaryUrl: "https://taxsummaries.pwc.com/cyprus",
  },
  croatia: {
    population: 3_866_233,
    taxSummaryUrl: "https://taxsummaries.pwc.com/croatia",
  },
  danemarca: {
    population: 6_011_488,
    taxSummaryUrl: "https://taxsummaries.pwc.com/denmark",
  },
  estonia: {
    population: 1_369_995,
    taxSummaryUrl: "https://taxsummaries.pwc.com/estonia",
  },
  finlanda: {
    population: 5_650_325,
    taxSummaryUrl: "https://taxsummaries.pwc.com/finland",
  },
  franta: {
    population: 66_351_959,
    taxSummaryUrl: "https://taxsummaries.pwc.com/france",
  },
  georgia: {
    population: 4_000_921,
    taxSummaryUrl: "https://taxsummaries.pwc.com/georgia",
  },
  germania: {
    population: 83_491_249,
    taxSummaryUrl: "https://taxsummaries.pwc.com/germany",
  },
  grecia: {
    population: 10_400_720,
    taxSummaryUrl: "https://taxsummaries.pwc.com/greece",
  },
  ungaria: {
    population: 9_539_502,
    taxSummaryUrl: "https://taxsummaries.pwc.com/hungary",
  },
  islanda: {
    population: 391_810,
    taxSummaryUrl: "https://taxsummaries.pwc.com/iceland",
  },
  irlanda: {
    population: 5_458_600,
    taxSummaryUrl: "https://taxsummaries.pwc.com/ireland",
  },
  italia: {
    population: 58_927_633,
    taxSummaryUrl: "https://taxsummaries.pwc.com/italy",
  },
  kosovo: {
    population: 1_585_566,
    taxSummaryUrl: "https://taxsummaries.pwc.com/kosovo",
  },
  letonia: {
    population: 1_829_000,
    taxSummaryUrl: "https://taxsummaries.pwc.com/latvia",
  },
  liechtenstein: {
    population: 40_900,
    taxSummaryUrl: "https://taxsummaries.pwc.com/liechtenstein",
  },
  lituania: {
    population: 2_894_886,
    taxSummaryUrl: "https://taxsummaries.pwc.com/lithuania",
  },
  luxemburg: {
    population: 681_973,
    taxSummaryUrl: "https://taxsummaries.pwc.com/luxembourg",
  },
  malta: {
    population: 574_250,
    taxSummaryUrl: "https://taxsummaries.pwc.com/malta",
  },
  moldova: {
    population: 2_749_076,
    taxSummaryUrl: "https://taxsummaries.pwc.com/moldova",
  },
  monaco: {
    population: 38_423,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Economy_of_Monaco",
  },
  muntenegru: {
    population: 623_327,
    taxSummaryUrl: "https://taxsummaries.pwc.com/montenegro",
  },
  "macedonia-de-nord": {
    population: 1_822_612,
    taxSummaryUrl: "https://taxsummaries.pwc.com/north-macedonia",
  },
  "tarile-de-jos": {
    population: 18_100_436,
    taxSummaryUrl: "https://taxsummaries.pwc.com/netherlands",
  },
  norvegia: {
    population: 5_606_944,
    taxSummaryUrl: "https://taxsummaries.pwc.com/norway",
  },
  polonia: {
    population: 37_392_000,
    taxSummaryUrl: "https://taxsummaries.pwc.com/poland",
  },
  portugalia: {
    population: 10_749_635,
    taxSummaryUrl: "https://taxsummaries.pwc.com/portugal",
  },
  romania: {
    population: 19_036_031,
    taxSummaryUrl: "https://taxsummaries.pwc.com/romania",
  },
  rusia: {
    population: 146_028_325,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Taxation_in_Russia",
  },
  "san-marino": {
    population: 34_132,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Economy_of_San_Marino",
  },
  serbia: {
    population: 6_567_783,
    taxSummaryUrl: "https://taxsummaries.pwc.com/serbia",
  },
  slovacia: {
    population: 5_413_813,
    taxSummaryUrl: "https://taxsummaries.pwc.com/slovak-republic",
  },
  slovenia: {
    population: 2_130_638,
    taxSummaryUrl: "https://taxsummaries.pwc.com/slovenia",
  },
  spania: {
    population: 49_315_949,
    taxSummaryUrl: "https://taxsummaries.pwc.com/spain",
  },
  suedia: {
    population: 10_605_098,
    taxSummaryUrl: "https://taxsummaries.pwc.com/sweden",
  },
  elvetia: {
    population: 9_082_848,
    taxSummaryUrl: "https://taxsummaries.pwc.com/switzerland",
  },
  turcia: {
    population: 85_664_944,
    taxSummaryUrl: "https://taxsummaries.pwc.com/turkey",
  },
  ucraina: {
    population: 32_862_000,
    taxSummaryUrl: "https://taxsummaries.pwc.com/ukraine",
  },
  "regatul-unit": {
    population: 69_281_437,
    taxSummaryUrl: "https://taxsummaries.pwc.com/united-kingdom",
  },
  vatican: {
    population: 882,
    taxSummaryUrl: "https://en.wikipedia.org/wiki/Economy_of_Vatican_City",
  },
};

export function getCountryPopulation(slug: string) {
  return countryMetadataBySlug[slug]?.population ?? null;
}

export function getCountryTaxSummaryUrl(slug: string) {
  return (
    countryMetadataBySlug[slug]?.taxSummaryUrl ??
    `https://en.wikipedia.org/wiki/Taxation_in_${slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("_")}`
  );
}
