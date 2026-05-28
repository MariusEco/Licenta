import type {
  CityDetailView,
  CountryDetailView,
} from "@/types/explorer";

export const demoCountries: CountryDetailView[] = [
  {
    id: "demo-germany",
    kind: "COUNTRY",
    name: "Germania",
    slug: "germania",
    isoCode: "DE",
    continent: "Europa",
    capital: "Berlin",
    currency: "EUR",
    officialLanguage: "Germană",
    predominantReligion: "Creștinism",
    romanianCommunityNotes:
      "Comunități românești active în Berlin, München, Frankfurt și zona Ruhr.",
    jobMarketNotes:
      "Cerere ridicată în IT, inginerie, sănătate, logistică și servicii.",
    localLawNotes:
      "Înregistrarea domiciliului și asigurarea medicală sunt pași administrativi importanți după mutare.",
    generalDescription:
      "Germania este o destinație stabilă pentru muncă, studii și relocare pe termen lung, cu infrastructură bună și oportunități profesionale variate.",
    citizenshipDifficulty: "MEDIUM",
    emigrationDifficulty: "MEDIUM",
    latitude: 51.165691,
    longitude: 10.451526,
    averageSalaryEur: 4100,
    monthlyCostEur: 2235,
    taxLevel: "HIGH",
    incomeTaxRate: 42,
    isFeatured: true,
    costOfLiving: {
      rentOneBedroomEur: 1250,
      utilitiesEur: 280,
      groceriesEur: 360,
      transportEur: 90,
      healthcareEur: 220,
      internetEur: 35,
      totalMonthlyCostEur: 2235,
      sourceName: "Date demonstrative",
    },
    cities: [],
    visaInfos: [
      {
        id: "demo-germany-work",
        category: "WORK",
        title: "Drept de muncă pentru cetățeni UE",
        summary:
          "Cetățenii români pot lucra în Germania fără viză, dar trebuie să respecte pașii administrativi locali.",
        legalSteps: [
          "Înregistrarea domiciliului.",
          "Activarea asigurării medicale.",
          "Înregistrarea contractului de muncă sau a activității independente.",
        ],
        requiredDocuments: [
          "Carte de identitate sau pașaport",
          "Contract de închiriere",
          "Contract de muncă sau dovadă venit",
        ],
        estimatedDuration: "1-4 săptămâni",
        officialUrl: "https://www.make-it-in-germany.com/",
      },
    ],
  },
  {
    id: "demo-netherlands",
    kind: "COUNTRY",
    name: "Țările de Jos",
    slug: "tarile-de-jos",
    isoCode: "NL",
    continent: "Europa",
    capital: "Amsterdam",
    currency: "EUR",
    officialLanguage: "Neerlandeză",
    predominantReligion: "Creștinism",
    romanianCommunityNotes:
      "Comunități românești vizibile în Amsterdam, Rotterdam, Haga și Eindhoven.",
    jobMarketNotes:
      "Piață bună pentru IT, inginerie, logistică, agricultură tehnologică și servicii internaționale.",
    localLawNotes:
      "Înregistrarea la municipalitate și obținerea BSN sunt pași esențiali.",
    generalDescription:
      "Țările de Jos oferă oportunități profesionale bune, un mediu internațional și servicii publice eficiente, dar costurile locuințelor sunt ridicate.",
    citizenshipDifficulty: "HIGH",
    emigrationDifficulty: "MEDIUM",
    latitude: 52.132633,
    longitude: 5.291266,
    averageSalaryEur: 4300,
    monthlyCostEur: 2520,
    taxLevel: "HIGH",
    incomeTaxRate: 49.5,
    isFeatured: true,
    costOfLiving: {
      rentOneBedroomEur: 1500,
      utilitiesEur: 260,
      groceriesEur: 410,
      transportEur: 120,
      healthcareEur: 190,
      internetEur: 40,
      totalMonthlyCostEur: 2520,
      sourceName: "Date demonstrative",
    },
    cities: [],
    visaInfos: [],
  },
  {
    id: "demo-spain",
    kind: "COUNTRY",
    name: "Spania",
    slug: "spania",
    isoCode: "ES",
    continent: "Europa",
    capital: "Madrid",
    currency: "EUR",
    officialLanguage: "Spaniolă",
    predominantReligion: "Catolicism",
    romanianCommunityNotes:
      "Una dintre cele mai mari comunități românești din Europa de Vest.",
    jobMarketNotes:
      "Oportunități în turism, servicii, construcții, sănătate și tehnologie în marile orașe.",
    localLawNotes:
      "Obținerea NIE este importantă pentru muncă, chirie și servicii bancare.",
    generalDescription:
      "Spania are costuri mai accesibile decât multe țări vest-europene, climă prietenoasă și o comunitate românească numeroasă.",
    citizenshipDifficulty: "MEDIUM",
    emigrationDifficulty: "LOW",
    latitude: 40.463667,
    longitude: -3.74922,
    averageSalaryEur: 2600,
    monthlyCostEur: 1650,
    taxLevel: "MEDIUM",
    incomeTaxRate: 37,
    isFeatured: false,
    costOfLiving: {
      rentOneBedroomEur: 900,
      utilitiesEur: 170,
      groceriesEur: 330,
      transportEur: 55,
      healthcareEur: 150,
      internetEur: 45,
      totalMonthlyCostEur: 1650,
      sourceName: "Date demonstrative",
    },
    cities: [],
    visaInfos: [],
  },
];

export const demoCities: CityDetailView[] = [
  {
    id: "demo-berlin",
    kind: "CITY",
    name: "Berlin",
    slug: "berlin",
    countryName: "Germania",
    countrySlug: "germania",
    region: "Berlin",
    latitude: 52.52,
    longitude: 13.405,
    population: 3677000,
    generalDescription:
      "Berlin este un oraș cosmopolit, potrivit pentru tehnologie, industrii creative și servicii internaționale.",
    romanianCommunityNotes:
      "Comunitate românească activă, cu grupuri locale și evenimente culturale.",
    jobMarketNotes:
      "Oportunități bune în IT, startup-uri, cercetare, ospitalitate și servicii.",
    localLawNotes:
      "Procesul de Anmeldung este important pentru acces la servicii administrative.",
    predominantReligion: "Creștinism",
    emigrationDifficulty: "MEDIUM",
    averageSalaryEur: 3900,
    monthlyCostEur: 2235,
    isFeatured: true,
    costOfLiving: demoCountries[0].costOfLiving,
  },
  {
    id: "demo-amsterdam",
    kind: "CITY",
    name: "Amsterdam",
    slug: "amsterdam",
    countryName: "Țările de Jos",
    countrySlug: "tarile-de-jos",
    region: "Olanda de Nord",
    latitude: 52.3676,
    longitude: 4.9041,
    population: 921000,
    generalDescription:
      "Amsterdam este un centru internațional pentru tehnologie, finanțe, cercetare și servicii.",
    romanianCommunityNotes:
      "Comunități românești active în zona Randstad.",
    jobMarketNotes:
      "Piață competitivă, dar puternică pentru roluri internaționale și tehnice.",
    localLawNotes:
      "BSN și înregistrarea municipală sunt necesare pentru majoritatea serviciilor.",
    predominantReligion: "Creștinism",
    emigrationDifficulty: "MEDIUM",
    averageSalaryEur: 4500,
    monthlyCostEur: 2700,
    isFeatured: true,
    costOfLiving: {
      rentOneBedroomEur: 1650,
      utilitiesEur: 260,
      groceriesEur: 420,
      transportEur: 120,
      healthcareEur: 210,
      internetEur: 40,
      totalMonthlyCostEur: 2700,
      sourceName: "Date demonstrative",
    },
  },
  {
    id: "demo-madrid",
    kind: "CITY",
    name: "Madrid",
    slug: "madrid",
    countryName: "Spania",
    countrySlug: "spania",
    region: "Comunitatea Madrid",
    latitude: 40.4168,
    longitude: -3.7038,
    population: 3280000,
    generalDescription:
      "Madrid oferă o combinație bună între oportunități profesionale, comunități internaționale și costuri moderate.",
    romanianCommunityNotes:
      "Comunitate românească numeroasă și bine integrată.",
    jobMarketNotes:
      "Oportunități în servicii, sănătate, turism, tehnologie și administrație.",
    localLawNotes:
      "NIE este necesar pentru contracte, bancă și formalități de muncă.",
    predominantReligion: "Catolicism",
    emigrationDifficulty: "LOW",
    averageSalaryEur: 2800,
    monthlyCostEur: 1750,
    isFeatured: false,
    costOfLiving: {
      rentOneBedroomEur: 1000,
      utilitiesEur: 170,
      groceriesEur: 340,
      transportEur: 55,
      healthcareEur: 140,
      internetEur: 45,
      totalMonthlyCostEur: 1750,
      sourceName: "Date demonstrative",
    },
  },
];

demoCountries[0].cities = [demoCities[0]];
demoCountries[1].cities = [demoCities[1]];
demoCountries[2].cities = [demoCities[2]];
