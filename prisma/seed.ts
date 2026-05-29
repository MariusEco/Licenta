import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL nu este configurat.");
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

type Difficulty = "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
type SeedTaxLevel = "LOW" | "MEDIUM" | "HIGH";

type SeedCountry = {
  name: string;
  slug: string;
  isoCode: string;
  capital: string;
  currency: string;
  officialLanguage: string;
  predominantReligion: string;
  latitude: number;
  longitude: number;
  averageSalaryEur: number;
  taxLevel: SeedTaxLevel;
  incomeTaxRate: number;
  citizenshipDifficulty: Difficulty;
  emigrationDifficulty: Difficulty;
  generalDescription: string;
};

type SeedCity = {
  countrySlug: string;
  name: string;
  slug: string;
  region: string;
  latitude: number;
  longitude: number;
  population: number;
  averageSalaryEur: number;
  emigrationDifficulty: Difficulty;
  generalDescription: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function buildCountryCostFromSalary(salaryEur: number) {
  const salary = Math.max(salaryEur, 900);
  const rentOneBedroomEur = Math.round(clamp(salary * 0.4, 450, 2600));
  const utilitiesEur = Math.round(clamp(salary * 0.08, 90, 360));
  const groceriesEur = Math.round(clamp(salary * 0.11, 180, 520));
  const transportEur = Math.round(clamp(salary * 0.03, 25, 130));
  const healthcareEur = Math.round(clamp(salary * 0.05, 60, 260));
  const internetEur = Math.round(clamp(salary * 0.01, 20, 65));
  const totalMonthlyCostEur =
    rentOneBedroomEur +
    utilitiesEur +
    groceriesEur +
    transportEur +
    healthcareEur +
    internetEur;

  return {
    rentOneBedroomEur,
    utilitiesEur,
    groceriesEur,
    transportEur,
    healthcareEur,
    internetEur,
    totalMonthlyCostEur,
  };
}

function buildCityCostFromSalary(salaryEur: number) {
  const salary = Math.max(salaryEur, 850);
  const rentOneBedroomEur = Math.round(clamp(salary * 0.45, 420, 2900));
  const utilitiesEur = Math.round(clamp(salary * 0.08, 85, 380));
  const groceriesEur = Math.round(clamp(salary * 0.12, 170, 600));
  const transportEur = Math.round(clamp(salary * 0.03, 20, 140));
  const healthcareEur = Math.round(clamp(salary * 0.05, 50, 280));
  const internetEur = Math.round(clamp(salary * 0.01, 18, 70));
  const totalMonthlyCostEur =
    rentOneBedroomEur +
    utilitiesEur +
    groceriesEur +
    transportEur +
    healthcareEur +
    internetEur;

  return {
    rentOneBedroomEur,
    utilitiesEur,
    groceriesEur,
    transportEur,
    healthcareEur,
    internetEur,
    totalMonthlyCostEur,
  };
}

async function main() {
  const germany = await prisma.country.upsert({
    where: { slug: "germania" },
    update: {
      name: "Germania",
      isoCode: "DE",
      continent: "Europa",
      capital: "Berlin",
      currency: "EUR",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      latitude: 51.165691,
      longitude: 10.451526,
      romanianCommunityNotes:
        "Comunități românești active în Berlin, München, Frankfurt și zona Ruhr.",
      jobMarketNotes:
        "Piață bună pentru IT, inginerie, logistică, producție și servicii medicale.",
      localLawNotes:
        "Înregistrarea domiciliului (Anmeldung) și asigurarea medicală sunt pași administrativi obligatorii la relocare.",
      generalDescription:
        "Germania rămâne una dintre cele mai stabile destinații europene pentru muncă și relocare pe termen lung.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3123,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      isFeatured: true,
    },
    create: {
      name: "Germania",
      slug: "germania",
      isoCode: "DE",
      continent: "Europa",
      capital: "Berlin",
      currency: "EUR",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      latitude: 51.165691,
      longitude: 10.451526,
      romanianCommunityNotes:
        "Comunități românești active în Berlin, München, Frankfurt și zona Ruhr.",
      jobMarketNotes:
        "Piață bună pentru IT, inginerie, logistică, producție și servicii medicale.",
      localLawNotes:
        "Înregistrarea domiciliului (Anmeldung) și asigurarea medicală sunt pași administrativi obligatorii la relocare.",
      generalDescription:
        "Germania rămâne una dintre cele mai stabile destinații europene pentru muncă și relocare pe termen lung.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3123,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      isFeatured: true,
    },
  });

  const netherlands = await prisma.country.upsert({
    where: { slug: "tarile-de-jos" },
    update: {
      name: "Țările de Jos",
      isoCode: "NL",
      continent: "Europa",
      capital: "Amsterdam",
      currency: "EUR",
      officialLanguage: "Neerlandeză",
      predominantReligion: "Creștinism",
      latitude: 52.132633,
      longitude: 5.291266,
      romanianCommunityNotes:
        "Comunități românești vizibile în Amsterdam, Rotterdam, Haga și Eindhoven.",
      jobMarketNotes:
        "Cerere ridicată în tehnologie, logistică, inginerie și servicii internaționale.",
      localLawNotes:
        "Înregistrarea la municipalitate și obținerea BSN sunt esențiale pentru muncă și servicii publice.",
      generalDescription:
        "Țările de Jos oferă o piață a muncii competitivă, infrastructură foarte bună și servicii publice eficiente.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 4335,
      taxLevel: "HIGH",
      incomeTaxRate: 49.5,
      isFeatured: true,
    },
    create: {
      name: "Țările de Jos",
      slug: "tarile-de-jos",
      isoCode: "NL",
      continent: "Europa",
      capital: "Amsterdam",
      currency: "EUR",
      officialLanguage: "Neerlandeză",
      predominantReligion: "Creștinism",
      latitude: 52.132633,
      longitude: 5.291266,
      romanianCommunityNotes:
        "Comunități românești vizibile în Amsterdam, Rotterdam, Haga și Eindhoven.",
      jobMarketNotes:
        "Cerere ridicată în tehnologie, logistică, inginerie și servicii internaționale.",
      localLawNotes:
        "Înregistrarea la municipalitate și obținerea BSN sunt esențiale pentru muncă și servicii publice.",
      generalDescription:
        "Țările de Jos oferă o piață a muncii competitivă, infrastructură foarte bună și servicii publice eficiente.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 4335,
      taxLevel: "HIGH",
      incomeTaxRate: 49.5,
      isFeatured: true,
    },
  });

  const spain = await prisma.country.upsert({
    where: { slug: "spania" },
    update: {
      name: "Spania",
      isoCode: "ES",
      continent: "Europa",
      capital: "Madrid",
      currency: "EUR",
      officialLanguage: "Spaniolă",
      predominantReligion: "Catolicism",
      latitude: 40.463667,
      longitude: -3.74922,
      romanianCommunityNotes:
        "Spania are una dintre cele mai mari comunități românești din Europa de Vest.",
      jobMarketNotes:
        "Oportunități în servicii, turism, logistică, construcții, sănătate și IT.",
      localLawNotes:
        "Pentru formalități administrative este necesar de regulă NIE și înregistrare locală.",
      generalDescription:
        "Spania oferă un echilibru bun între costul vieții, climă și integrarea în comunități internaționale.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1763,
      taxLevel: "HIGH",
      incomeTaxRate: 47,
      isFeatured: true,
    },
    create: {
      name: "Spania",
      slug: "spania",
      isoCode: "ES",
      continent: "Europa",
      capital: "Madrid",
      currency: "EUR",
      officialLanguage: "Spaniolă",
      predominantReligion: "Catolicism",
      latitude: 40.463667,
      longitude: -3.74922,
      romanianCommunityNotes:
        "Spania are una dintre cele mai mari comunități românești din Europa de Vest.",
      jobMarketNotes:
        "Oportunități în servicii, turism, logistică, construcții, sănătate și IT.",
      localLawNotes:
        "Pentru formalități administrative este necesar de regulă NIE și înregistrare locală.",
      generalDescription:
        "Spania oferă un echilibru bun între costul vieții, climă și integrarea în comunități internaționale.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1763,
      taxLevel: "HIGH",
      incomeTaxRate: 47,
      isFeatured: true,
    },
  });

  const france = await prisma.country.upsert({
    where: { slug: "franta" },
    update: {
      name: "Franța",
      isoCode: "FR",
      continent: "Europa",
      capital: "Paris",
      currency: "EUR",
      officialLanguage: "Franceză",
      predominantReligion: "Creștinism",
      latitude: 48.8566,
      longitude: 2.3522,
      romanianCommunityNotes:
        "Comunități românești consistente în Paris, Lyon, Marseille și Toulouse.",
      jobMarketNotes:
        "Piață puternică în servicii, IT, inginerie, finanțe și sănătate.",
      localLawNotes:
        "Pentru integrare administrativă sunt utile înregistrarea locală și formalitățile pentru sistemul fiscal și medical.",
      generalDescription:
        "Franța oferă o economie mare și diversificată, cu oportunități solide în marile centre urbane.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2740,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      isFeatured: true,
    },
    create: {
      name: "Franța",
      slug: "franta",
      isoCode: "FR",
      continent: "Europa",
      capital: "Paris",
      currency: "EUR",
      officialLanguage: "Franceză",
      predominantReligion: "Creștinism",
      latitude: 48.8566,
      longitude: 2.3522,
      romanianCommunityNotes:
        "Comunități românești consistente în Paris, Lyon, Marseille și Toulouse.",
      jobMarketNotes:
        "Piață puternică în servicii, IT, inginerie, finanțe și sănătate.",
      localLawNotes:
        "Pentru integrare administrativă sunt utile înregistrarea locală și formalitățile pentru sistemul fiscal și medical.",
      generalDescription:
        "Franța oferă o economie mare și diversificată, cu oportunități solide în marile centre urbane.",
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2740,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      isFeatured: true,
    },
  });

  const italy = await prisma.country.upsert({
    where: { slug: "italia" },
    update: {
      name: "Italia",
      isoCode: "IT",
      continent: "Europa",
      capital: "Roma",
      currency: "EUR",
      officialLanguage: "Italiană",
      predominantReligion: "Catolicism",
      latitude: 41.9028,
      longitude: 12.4964,
      romanianCommunityNotes:
        "Italia găzduiește o comunitate românească numeroasă în Roma, Milano, Torino și Bologna.",
      jobMarketNotes:
        "Oportunități în producție, logistică, servicii, construcții, sănătate și IT.",
      localLawNotes:
        "Înregistrarea rezidenței și formalitățile fiscale locale sunt pași importanți pentru stabilire.",
      generalDescription:
        "Italia combină centre economice dezvoltate cu un cost al vieții variabil între nord și sud.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      taxLevel: "HIGH",
      incomeTaxRate: 43,
      isFeatured: true,
    },
    create: {
      name: "Italia",
      slug: "italia",
      isoCode: "IT",
      continent: "Europa",
      capital: "Roma",
      currency: "EUR",
      officialLanguage: "Italiană",
      predominantReligion: "Catolicism",
      latitude: 41.9028,
      longitude: 12.4964,
      romanianCommunityNotes:
        "Italia găzduiește o comunitate românească numeroasă în Roma, Milano, Torino și Bologna.",
      jobMarketNotes:
        "Oportunități în producție, logistică, servicii, construcții, sănătate și IT.",
      localLawNotes:
        "Înregistrarea rezidenței și formalitățile fiscale locale sunt pași importanți pentru stabilire.",
      generalDescription:
        "Italia combină centre economice dezvoltate cu un cost al vieții variabil între nord și sud.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      taxLevel: "HIGH",
      incomeTaxRate: 43,
      isFeatured: true,
    },
  });

  const portugal = await prisma.country.upsert({
    where: { slug: "portugalia" },
    update: {
      name: "Portugalia",
      isoCode: "PT",
      continent: "Europa",
      capital: "Lisabona",
      currency: "EUR",
      officialLanguage: "Portugheză",
      predominantReligion: "Catolicism",
      latitude: 38.7223,
      longitude: -9.1393,
      romanianCommunityNotes:
        "Comunități românești prezente în Lisabona, Porto și Setubal.",
      jobMarketNotes:
        "Cerere bună în turism, servicii, centre de suport, logistică și tehnologie.",
      localLawNotes:
        "Sunt necesare formalități administrative locale pentru rezidență fiscală și acces la servicii.",
      generalDescription:
        "Portugalia este atractivă pentru climă, siguranță și costuri relativ echilibrate față de alte vest-europene.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1330,
      taxLevel: "MEDIUM",
      incomeTaxRate: 48,
      isFeatured: true,
    },
    create: {
      name: "Portugalia",
      slug: "portugalia",
      isoCode: "PT",
      continent: "Europa",
      capital: "Lisabona",
      currency: "EUR",
      officialLanguage: "Portugheză",
      predominantReligion: "Catolicism",
      latitude: 38.7223,
      longitude: -9.1393,
      romanianCommunityNotes:
        "Comunități românești prezente în Lisabona, Porto și Setubal.",
      jobMarketNotes:
        "Cerere bună în turism, servicii, centre de suport, logistică și tehnologie.",
      localLawNotes:
        "Sunt necesare formalități administrative locale pentru rezidență fiscală și acces la servicii.",
      generalDescription:
        "Portugalia este atractivă pentru climă, siguranță și costuri relativ echilibrate față de alte vest-europene.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1330,
      taxLevel: "MEDIUM",
      incomeTaxRate: 48,
      isFeatured: true,
    },
  });

  await prisma.costOfLiving.deleteMany({
    where: {
      countryId: {
        in: [
          germany.id,
          netherlands.id,
          spain.id,
          france.id,
          italy.id,
          portugal.id,
        ],
      },
      cityId: null,
    },
  });

  await prisma.costOfLiving.createMany({
    data: [
      {
        countryId: germany.id,
        rentOneBedroomEur: 1270,
        utilitiesEur: 350,
        groceriesEur: 360,
        transportEur: 63,
        healthcareEur: 220,
        internetEur: 44,
        totalMonthlyCostEur: 2307,
        sourceName: "Numbeo - Berlin (27 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Berlin",
        collectedAt: new Date("2026-05-28"),
      },
      {
        countryId: netherlands.id,
        rentOneBedroomEur: 2225,
        utilitiesEur: 261,
        groceriesEur: 420,
        transportEur: 100,
        healthcareEur: 210,
        internetEur: 47,
        totalMonthlyCostEur: 3263,
        sourceName: "Numbeo - Amsterdam (28 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Amsterdam",
        collectedAt: new Date("2026-05-28"),
      },
      {
        countryId: spain.id,
        rentOneBedroomEur: 907,
        utilitiesEur: 133,
        groceriesEur: 250,
        transportEur: 30,
        healthcareEur: 120,
        internetEur: 29,
        totalMonthlyCostEur: 1469,
        sourceName: "Numbeo - Spain (28 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/country_result.jsp?country=Spain",
        collectedAt: new Date("2026-05-28"),
      },
      {
        countryId: france.id,
        rentOneBedroomEur: 1200,
        utilitiesEur: 190,
        groceriesEur: 320,
        transportEur: 85,
        healthcareEur: 160,
        internetEur: 32,
        totalMonthlyCostEur: 1987,
        sourceName: "Numbeo - Paris (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Paris",
        collectedAt: new Date("2026-05-28"),
      },
      {
        countryId: italy.id,
        rentOneBedroomEur: 1050,
        utilitiesEur: 190,
        groceriesEur: 280,
        transportEur: 39,
        healthcareEur: 140,
        internetEur: 29,
        totalMonthlyCostEur: 1728,
        sourceName: "Numbeo - Milan (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Milan",
        collectedAt: new Date("2026-05-28"),
      },
      {
        countryId: portugal.id,
        rentOneBedroomEur: 1280,
        utilitiesEur: 120,
        groceriesEur: 250,
        transportEur: 40,
        healthcareEur: 120,
        internetEur: 37,
        totalMonthlyCostEur: 1847,
        sourceName: "Numbeo - Lisbon (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Lisbon",
        collectedAt: new Date("2026-05-28"),
      },
    ],
  });

  const berlin = await prisma.city.upsert({
    where: { slug: "berlin" },
    update: {
      countryId: germany.id,
      name: "Berlin",
      region: "Berlin",
      latitude: 52.52,
      longitude: 13.405,
      population: 3677000,
      generalDescription:
        "Berlin este un centru european important pentru tehnologie, startup-uri, industrii creative și cercetare.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu grupuri profesionale și evenimente culturale.",
      jobMarketNotes:
        "Cerere ridicată pentru specialiști IT, ingineri, personal medical și logistică.",
      localLawNotes:
        "Anmeldung și înregistrarea la casa de asigurări sunt pași obligatorii după mutare.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3123,
      isFeatured: true,
    },
    create: {
      countryId: germany.id,
      name: "Berlin",
      slug: "berlin",
      region: "Berlin",
      latitude: 52.52,
      longitude: 13.405,
      population: 3677000,
      generalDescription:
        "Berlin este un centru european important pentru tehnologie, startup-uri, industrii creative și cercetare.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu grupuri profesionale și evenimente culturale.",
      jobMarketNotes:
        "Cerere ridicată pentru specialiști IT, ingineri, personal medical și logistică.",
      localLawNotes:
        "Anmeldung și înregistrarea la casa de asigurări sunt pași obligatorii după mutare.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3123,
      isFeatured: true,
    },
  });

  const amsterdam = await prisma.city.upsert({
    where: { slug: "amsterdam" },
    update: {
      countryId: netherlands.id,
      name: "Amsterdam",
      region: "Olanda de Nord",
      latitude: 52.3676,
      longitude: 4.9041,
      population: 921000,
      generalDescription:
        "Amsterdam este un hub internațional pentru servicii, tehnologie, finanțe și industrii creative.",
      romanianCommunityNotes:
        "Comunitate românească activă în Amsterdam și zona Randstad.",
      jobMarketNotes:
        "Piață competitivă cu cerere bună pentru roluri tech, data, logistică și servicii internaționale.",
      localLawNotes:
        "BSN și înregistrarea la municipalitate sunt necesare pentru majoritatea serviciilor.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 4335,
      isFeatured: true,
    },
    create: {
      countryId: netherlands.id,
      name: "Amsterdam",
      slug: "amsterdam",
      region: "Olanda de Nord",
      latitude: 52.3676,
      longitude: 4.9041,
      population: 921000,
      generalDescription:
        "Amsterdam este un hub internațional pentru servicii, tehnologie, finanțe și industrii creative.",
      romanianCommunityNotes:
        "Comunitate românească activă în Amsterdam și zona Randstad.",
      jobMarketNotes:
        "Piață competitivă cu cerere bună pentru roluri tech, data, logistică și servicii internaționale.",
      localLawNotes:
        "BSN și înregistrarea la municipalitate sunt necesare pentru majoritatea serviciilor.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 4335,
      isFeatured: true,
    },
  });

  const madrid = await prisma.city.upsert({
    where: { slug: "madrid" },
    update: {
      countryId: spain.id,
      name: "Madrid",
      region: "Comunitatea Madrid",
      latitude: 40.4168,
      longitude: -3.7038,
      population: 3280000,
      generalDescription:
        "Madrid combină oportunități bune de muncă cu costuri mai accesibile decât multe capitale vest-europene.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și bine integrată.",
      jobMarketNotes:
        "Cerere în servicii, sănătate, logistică, turism și roluri tehnice în companii internaționale.",
      localLawNotes:
        "NIE și înregistrarea locală sunt pași uzuali pentru muncă, bancă și formalități administrative.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2200,
      isFeatured: true,
    },
    create: {
      countryId: spain.id,
      name: "Madrid",
      slug: "madrid",
      region: "Comunitatea Madrid",
      latitude: 40.4168,
      longitude: -3.7038,
      population: 3280000,
      generalDescription:
        "Madrid combină oportunități bune de muncă cu costuri mai accesibile decât multe capitale vest-europene.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și bine integrată.",
      jobMarketNotes:
        "Cerere în servicii, sănătate, logistică, turism și roluri tehnice în companii internaționale.",
      localLawNotes:
        "NIE și înregistrarea locală sunt pași uzuali pentru muncă, bancă și formalități administrative.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2200,
      isFeatured: true,
    },
  });

  const paris = await prisma.city.upsert({
    where: { slug: "paris" },
    update: {
      countryId: france.id,
      name: "Paris",
      region: "Ile-de-France",
      latitude: 48.8566,
      longitude: 2.3522,
      population: 2161000,
      generalDescription:
        "Paris este unul dintre cele mai mari centre europene pentru finanțe, tehnologie, servicii și industrii creative.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu rețele profesionale și organizații culturale.",
      jobMarketNotes:
        "Cerere ridicată în servicii, tech, consulting, retail premium și sănătate.",
      localLawNotes:
        "Formalitățile administrative locale sunt importante pentru contracte, taxe și asigurare medicală.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2740,
      isFeatured: true,
    },
    create: {
      countryId: france.id,
      name: "Paris",
      slug: "paris",
      region: "Ile-de-France",
      latitude: 48.8566,
      longitude: 2.3522,
      population: 2161000,
      generalDescription:
        "Paris este unul dintre cele mai mari centre europene pentru finanțe, tehnologie, servicii și industrii creative.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu rețele profesionale și organizații culturale.",
      jobMarketNotes:
        "Cerere ridicată în servicii, tech, consulting, retail premium și sănătate.",
      localLawNotes:
        "Formalitățile administrative locale sunt importante pentru contracte, taxe și asigurare medicală.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2740,
      isFeatured: true,
    },
  });

  const milan = await prisma.city.upsert({
    where: { slug: "milano" },
    update: {
      countryId: italy.id,
      name: "Milano",
      region: "Lombardia",
      latitude: 45.4642,
      longitude: 9.19,
      population: 1366000,
      generalDescription:
        "Milano este motor economic al Italiei, cu oportunități în finanțe, modă, servicii și tehnologie.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă în Milano și zona metropolitană.",
      jobMarketNotes:
        "Cerere ridicată pentru servicii, logistică, finanțe, construcții și roluri tehnice.",
      localLawNotes:
        "Sunt necesare formalități administrative locale pentru rezidență, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2100,
      isFeatured: true,
    },
    create: {
      countryId: italy.id,
      name: "Milano",
      slug: "milano",
      region: "Lombardia",
      latitude: 45.4642,
      longitude: 9.19,
      population: 1366000,
      generalDescription:
        "Milano este motor economic al Italiei, cu oportunități în finanțe, modă, servicii și tehnologie.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă în Milano și zona metropolitană.",
      jobMarketNotes:
        "Cerere ridicată pentru servicii, logistică, finanțe, construcții și roluri tehnice.",
      localLawNotes:
        "Sunt necesare formalități administrative locale pentru rezidență, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2100,
      isFeatured: true,
    },
  });

  const lisbon = await prisma.city.upsert({
    where: { slug: "lisabona" },
    update: {
      countryId: portugal.id,
      name: "Lisabona",
      region: "Lisabona",
      latitude: 38.7223,
      longitude: -9.1393,
      population: 545000,
      generalDescription:
        "Lisabona atrage tot mai mulți profesioniști internaționali prin ecosistemul tech și calitatea vieții.",
      romanianCommunityNotes:
        "Comunitate românească în creștere, activă în servicii și domenii tehnice.",
      jobMarketNotes:
        "Roluri căutate în IT, BPO, turism, logistică și servicii pentru piețe externe.",
      localLawNotes:
        "Formalitățile locale includ înregistrări administrative pentru muncă, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1700,
      isFeatured: true,
    },
    create: {
      countryId: portugal.id,
      name: "Lisabona",
      slug: "lisabona",
      region: "Lisabona",
      latitude: 38.7223,
      longitude: -9.1393,
      population: 545000,
      generalDescription:
        "Lisabona atrage tot mai mulți profesioniști internaționali prin ecosistemul tech și calitatea vieții.",
      romanianCommunityNotes:
        "Comunitate românească în creștere, activă în servicii și domenii tehnice.",
      jobMarketNotes:
        "Roluri căutate în IT, BPO, turism, logistică și servicii pentru piețe externe.",
      localLawNotes:
        "Formalitățile locale includ înregistrări administrative pentru muncă, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1700,
      isFeatured: true,
    },
  });

  const munich = await prisma.city.upsert({
    where: { slug: "munchen" },
    update: {
      countryId: germany.id,
      name: "München",
      region: "Bavaria",
      latitude: 48.1351,
      longitude: 11.582,
      population: 1512000,
      generalDescription:
        "München este un centru economic major în Germania, puternic în industrie, auto, IT și cercetare.",
      romanianCommunityNotes:
        "Comunitate românească bine reprezentată în zona metropolitană München.",
      jobMarketNotes:
        "Cerere ridicată pentru ingineri, specialiști IT, personal medical și logistică.",
      localLawNotes:
        "Procedurile administrative locale includ înregistrarea adresei și asigurarea medicală obligatorie.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3500,
      isFeatured: true,
    },
    create: {
      countryId: germany.id,
      name: "München",
      slug: "munchen",
      region: "Bavaria",
      latitude: 48.1351,
      longitude: 11.582,
      population: 1512000,
      generalDescription:
        "München este un centru economic major în Germania, puternic în industrie, auto, IT și cercetare.",
      romanianCommunityNotes:
        "Comunitate românească bine reprezentată în zona metropolitană München.",
      jobMarketNotes:
        "Cerere ridicată pentru ingineri, specialiști IT, personal medical și logistică.",
      localLawNotes:
        "Procedurile administrative locale includ înregistrarea adresei și asigurarea medicală obligatorie.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3500,
      isFeatured: true,
    },
  });

  const frankfurt = await prisma.city.upsert({
    where: { slug: "frankfurt" },
    update: {
      countryId: germany.id,
      name: "Frankfurt",
      region: "Hesse",
      latitude: 50.1109,
      longitude: 8.6821,
      population: 773000,
      generalDescription:
        "Frankfurt este centru financiar european și hub logistic important.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Rhein-Main.",
      jobMarketNotes:
        "Oportunități bune în finanțe, IT, logistică și servicii corporate.",
      localLawNotes:
        "Sunt necesare formalități administrative standard pentru rezidență și muncă.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3400,
      isFeatured: true,
    },
    create: {
      countryId: germany.id,
      name: "Frankfurt",
      slug: "frankfurt",
      region: "Hesse",
      latitude: 50.1109,
      longitude: 8.6821,
      population: 773000,
      generalDescription:
        "Frankfurt este centru financiar european și hub logistic important.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Rhein-Main.",
      jobMarketNotes:
        "Oportunități bune în finanțe, IT, logistică și servicii corporate.",
      localLawNotes:
        "Sunt necesare formalități administrative standard pentru rezidență și muncă.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3400,
      isFeatured: true,
    },
  });

  const rotterdam = await prisma.city.upsert({
    where: { slug: "rotterdam" },
    update: {
      countryId: netherlands.id,
      name: "Rotterdam",
      region: "Olanda de Sud",
      latitude: 51.9244,
      longitude: 4.4777,
      population: 663000,
      generalDescription:
        "Rotterdam este un oraș-port major, cu economie puternică în logistică, industrie și servicii.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în Rotterdam și împrejurimi.",
      jobMarketNotes:
        "Cerere bună în logistică portuară, inginerie, tehnologie și servicii.",
      localLawNotes:
        "BSN și înregistrarea locală sunt pași esențiali după relocare.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3800,
      isFeatured: true,
    },
    create: {
      countryId: netherlands.id,
      name: "Rotterdam",
      slug: "rotterdam",
      region: "Olanda de Sud",
      latitude: 51.9244,
      longitude: 4.4777,
      population: 663000,
      generalDescription:
        "Rotterdam este un oraș-port major, cu economie puternică în logistică, industrie și servicii.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în Rotterdam și împrejurimi.",
      jobMarketNotes:
        "Cerere bună în logistică portuară, inginerie, tehnologie și servicii.",
      localLawNotes:
        "BSN și înregistrarea locală sunt pași esențiali după relocare.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3800,
      isFeatured: true,
    },
  });

  const haga = await prisma.city.upsert({
    where: { slug: "haga" },
    update: {
      countryId: netherlands.id,
      name: "Haga",
      region: "Olanda de Sud",
      latitude: 52.0705,
      longitude: 4.3007,
      population: 563000,
      generalDescription:
        "Haga este centru administrativ și internațional, cu multe instituții europene și globale.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Haga-Rotterdam.",
      jobMarketNotes:
        "Oportunități în servicii publice, juridic, IT și organizații internaționale.",
      localLawNotes:
        "Formalitățile administrative locale urmează regulile generale pentru cetățeni UE.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3900,
      isFeatured: true,
    },
    create: {
      countryId: netherlands.id,
      name: "Haga",
      slug: "haga",
      region: "Olanda de Sud",
      latitude: 52.0705,
      longitude: 4.3007,
      population: 563000,
      generalDescription:
        "Haga este centru administrativ și internațional, cu multe instituții europene și globale.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Haga-Rotterdam.",
      jobMarketNotes:
        "Oportunități în servicii publice, juridic, IT și organizații internaționale.",
      localLawNotes:
        "Formalitățile administrative locale urmează regulile generale pentru cetățeni UE.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3900,
      isFeatured: true,
    },
  });

  const barcelona = await prisma.city.upsert({
    where: { slug: "barcelona" },
    update: {
      countryId: spain.id,
      name: "Barcelona",
      region: "Catalonia",
      latitude: 41.3851,
      longitude: 2.1734,
      population: 1664000,
      generalDescription:
        "Barcelona este un hub economic și tehnologic major, cu sector puternic în servicii și turism.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și activă în Barcelona.",
      jobMarketNotes:
        "Cerere bună în IT, turism, retail, logistică și servicii.",
      localLawNotes:
        "Pentru muncă și servicii locale sunt necesare formalități administrative standard.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2300,
      isFeatured: true,
    },
    create: {
      countryId: spain.id,
      name: "Barcelona",
      slug: "barcelona",
      region: "Catalonia",
      latitude: 41.3851,
      longitude: 2.1734,
      population: 1664000,
      generalDescription:
        "Barcelona este un hub economic și tehnologic major, cu sector puternic în servicii și turism.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și activă în Barcelona.",
      jobMarketNotes:
        "Cerere bună în IT, turism, retail, logistică și servicii.",
      localLawNotes:
        "Pentru muncă și servicii locale sunt necesare formalități administrative standard.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2300,
      isFeatured: true,
    },
  });

  const valencia = await prisma.city.upsert({
    where: { slug: "valencia" },
    update: {
      countryId: spain.id,
      name: "Valencia",
      region: "Valencia",
      latitude: 39.4699,
      longitude: -0.3763,
      population: 792000,
      generalDescription:
        "Valencia are costuri relativ echilibrate și o piață locală bună în servicii și logistică.",
      romanianCommunityNotes:
        "Comunitate românească stabilă și activă în regiune.",
      jobMarketNotes:
        "Oportunități în logistică, servicii, turism, construcții și sănătate.",
      localLawNotes:
        "Formalitățile UE de rezidență și muncă se aplică în mod standard.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      isFeatured: true,
    },
    create: {
      countryId: spain.id,
      name: "Valencia",
      slug: "valencia",
      region: "Valencia",
      latitude: 39.4699,
      longitude: -0.3763,
      population: 792000,
      generalDescription:
        "Valencia are costuri relativ echilibrate și o piață locală bună în servicii și logistică.",
      romanianCommunityNotes:
        "Comunitate românească stabilă și activă în regiune.",
      jobMarketNotes:
        "Oportunități în logistică, servicii, turism, construcții și sănătate.",
      localLawNotes:
        "Formalitățile UE de rezidență și muncă se aplică în mod standard.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      isFeatured: true,
    },
  });

  const lyon = await prisma.city.upsert({
    where: { slug: "lyon" },
    update: {
      countryId: france.id,
      name: "Lyon",
      region: "Auvergne-Rhone-Alpes",
      latitude: 45.764,
      longitude: 4.8357,
      population: 522000,
      generalDescription:
        "Lyon este un pol economic important în Franța, cu industrie, sănătate și servicii dezvoltate.",
      romanianCommunityNotes:
        "Comunitate românească activă în Lyon și zonele apropiate.",
      jobMarketNotes:
        "Cerere bună în inginerie, pharma, servicii și IT.",
      localLawNotes:
        "Procedurile administrative locale sunt similare cu cele din restul Franței.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2500,
      isFeatured: true,
    },
    create: {
      countryId: france.id,
      name: "Lyon",
      slug: "lyon",
      region: "Auvergne-Rhone-Alpes",
      latitude: 45.764,
      longitude: 4.8357,
      population: 522000,
      generalDescription:
        "Lyon este un pol economic important în Franța, cu industrie, sănătate și servicii dezvoltate.",
      romanianCommunityNotes:
        "Comunitate românească activă în Lyon și zonele apropiate.",
      jobMarketNotes:
        "Cerere bună în inginerie, pharma, servicii și IT.",
      localLawNotes:
        "Procedurile administrative locale sunt similare cu cele din restul Franței.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2500,
      isFeatured: true,
    },
  });

  const marseille = await prisma.city.upsert({
    where: { slug: "marseille" },
    update: {
      countryId: france.id,
      name: "Marseille",
      region: "Provence-Alpes-Cote d'Azur",
      latitude: 43.2965,
      longitude: 5.3698,
      population: 877000,
      generalDescription:
        "Marseille este un oraș-port major, cu economie în servicii, transport și comerț.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în zona metropolitană Marseille.",
      jobMarketNotes:
        "Oportunități în logistică, servicii, sănătate și turism.",
      localLawNotes:
        "Formalitățile administrative locale urmează cadrul național francez.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2300,
      isFeatured: true,
    },
    create: {
      countryId: france.id,
      name: "Marseille",
      slug: "marseille",
      region: "Provence-Alpes-Cote d'Azur",
      latitude: 43.2965,
      longitude: 5.3698,
      population: 877000,
      generalDescription:
        "Marseille este un oraș-port major, cu economie în servicii, transport și comerț.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în zona metropolitană Marseille.",
      jobMarketNotes:
        "Oportunități în logistică, servicii, sănătate și turism.",
      localLawNotes:
        "Formalitățile administrative locale urmează cadrul național francez.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 2300,
      isFeatured: true,
    },
  });

  const rome = await prisma.city.upsert({
    where: { slug: "roma" },
    update: {
      countryId: italy.id,
      name: "Roma",
      region: "Lazio",
      latitude: 41.9028,
      longitude: 12.4964,
      population: 2873000,
      generalDescription:
        "Roma este centrul administrativ al Italiei, cu o economie variată în servicii și turism.",
      romanianCommunityNotes:
        "Comunitate românească foarte numeroasă și bine organizată.",
      jobMarketNotes:
        "Cerere în servicii, turism, sănătate, retail și administrație.",
      localLawNotes:
        "Sunt necesare formalități locale pentru rezidență, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2000,
      isFeatured: true,
    },
    create: {
      countryId: italy.id,
      name: "Roma",
      slug: "roma",
      region: "Lazio",
      latitude: 41.9028,
      longitude: 12.4964,
      population: 2873000,
      generalDescription:
        "Roma este centrul administrativ al Italiei, cu o economie variată în servicii și turism.",
      romanianCommunityNotes:
        "Comunitate românească foarte numeroasă și bine organizată.",
      jobMarketNotes:
        "Cerere în servicii, turism, sănătate, retail și administrație.",
      localLawNotes:
        "Sunt necesare formalități locale pentru rezidență, fiscalitate și sănătate.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 2000,
      isFeatured: true,
    },
  });

  const turin = await prisma.city.upsert({
    where: { slug: "torino" },
    update: {
      countryId: italy.id,
      name: "Torino",
      region: "Piemonte",
      latitude: 45.0703,
      longitude: 7.6869,
      population: 848000,
      generalDescription:
        "Torino este un oraș industrial important, cu tradiție în automotive și inginerie.",
      romanianCommunityNotes:
        "Comunitate românească activă în Torino și suburbii.",
      jobMarketNotes:
        "Oportunități în industrie, logistică, servicii și IT.",
      localLawNotes:
        "Formalitățile locale sunt similare cu restul marilor orașe italiene.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      isFeatured: true,
    },
    create: {
      countryId: italy.id,
      name: "Torino",
      slug: "torino",
      region: "Piemonte",
      latitude: 45.0703,
      longitude: 7.6869,
      population: 848000,
      generalDescription:
        "Torino este un oraș industrial important, cu tradiție în automotive și inginerie.",
      romanianCommunityNotes:
        "Comunitate românească activă în Torino și suburbii.",
      jobMarketNotes:
        "Oportunități în industrie, logistică, servicii și IT.",
      localLawNotes:
        "Formalitățile locale sunt similare cu restul marilor orașe italiene.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1900,
      isFeatured: true,
    },
  });

  const porto = await prisma.city.upsert({
    where: { slug: "porto" },
    update: {
      countryId: portugal.id,
      name: "Porto",
      region: "Porto",
      latitude: 41.1579,
      longitude: -8.6291,
      population: 237000,
      generalDescription:
        "Porto este un centru economic din nordul Portugaliei, cu servicii, comerț și industrie ușoară.",
      romanianCommunityNotes:
        "Comunitate românească prezentă și în creștere în zona Porto.",
      jobMarketNotes:
        "Cerere în servicii, logistică, turism și suport tehnic.",
      localLawNotes:
        "Formalitățile administrative locale urmează cadrul național portughez.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1450,
      isFeatured: true,
    },
    create: {
      countryId: portugal.id,
      name: "Porto",
      slug: "porto",
      region: "Porto",
      latitude: 41.1579,
      longitude: -8.6291,
      population: 237000,
      generalDescription:
        "Porto este un centru economic din nordul Portugaliei, cu servicii, comerț și industrie ușoară.",
      romanianCommunityNotes:
        "Comunitate românească prezentă și în creștere în zona Porto.",
      jobMarketNotes:
        "Cerere în servicii, logistică, turism și suport tehnic.",
      localLawNotes:
        "Formalitățile administrative locale urmează cadrul național portughez.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1450,
      isFeatured: true,
    },
  });

  const coimbra = await prisma.city.upsert({
    where: { slug: "coimbra" },
    update: {
      countryId: portugal.id,
      name: "Coimbra",
      region: "Coimbra",
      latitude: 40.2033,
      longitude: -8.4103,
      population: 143000,
      generalDescription:
        "Coimbra este cunoscut pentru mediul universitar și costuri relativ moderate.",
      romanianCommunityNotes:
        "Comunitate românească mai mică, dar activă în zona universitară.",
      jobMarketNotes:
        "Oportunități în educație, servicii, sănătate și roluri locale tech.",
      localLawNotes:
        "Procedurile administrative locale sunt accesibile și similare cu restul Portugaliei.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1300,
      isFeatured: true,
    },
    create: {
      countryId: portugal.id,
      name: "Coimbra",
      slug: "coimbra",
      region: "Coimbra",
      latitude: 40.2033,
      longitude: -8.4103,
      population: 143000,
      generalDescription:
        "Coimbra este cunoscut pentru mediul universitar și costuri relativ moderate.",
      romanianCommunityNotes:
        "Comunitate românească mai mică, dar activă în zona universitară.",
      jobMarketNotes:
        "Oportunități în educație, servicii, sănătate și roluri locale tech.",
      localLawNotes:
        "Procedurile administrative locale sunt accesibile și similare cu restul Portugaliei.",
      predominantReligion: "Catolicism",
      emigrationDifficulty: "LOW",
      averageSalaryEur: 1300,
      isFeatured: true,
    },
  });

  await prisma.costOfLiving.deleteMany({
    where: {
      cityId: {
        in: [
          berlin.id,
          amsterdam.id,
          madrid.id,
          paris.id,
          milan.id,
          lisbon.id,
          munich.id,
          frankfurt.id,
          rotterdam.id,
          haga.id,
          barcelona.id,
          valencia.id,
          lyon.id,
          marseille.id,
          rome.id,
          turin.id,
          porto.id,
          coimbra.id,
        ],
      },
    },
  });

  await prisma.costOfLiving.createMany({
    data: [
      {
        cityId: berlin.id,
        rentOneBedroomEur: 1270,
        utilitiesEur: 350,
        groceriesEur: 360,
        transportEur: 63,
        healthcareEur: 220,
        internetEur: 44,
        totalMonthlyCostEur: 2307,
        sourceName: "Numbeo - Berlin (27 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Berlin",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: amsterdam.id,
        rentOneBedroomEur: 2225,
        utilitiesEur: 261,
        groceriesEur: 420,
        transportEur: 100,
        healthcareEur: 210,
        internetEur: 47,
        totalMonthlyCostEur: 3263,
        sourceName: "Numbeo - Amsterdam (28 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Amsterdam",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: madrid.id,
        rentOneBedroomEur: 1298,
        utilitiesEur: 168,
        groceriesEur: 300,
        transportEur: 35,
        healthcareEur: 120,
        internetEur: 31,
        totalMonthlyCostEur: 1952,
        sourceName: "Numbeo - Madrid (25 May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Madrid",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: paris.id,
        rentOneBedroomEur: 1463,
        utilitiesEur: 196,
        groceriesEur: 350,
        transportEur: 86,
        healthcareEur: 160,
        internetEur: 33,
        totalMonthlyCostEur: 2288,
        sourceName: "Numbeo - Paris (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Paris",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: milan.id,
        rentOneBedroomEur: 1322,
        utilitiesEur: 191,
        groceriesEur: 300,
        transportEur: 39,
        healthcareEur: 140,
        internetEur: 29,
        totalMonthlyCostEur: 2021,
        sourceName: "Numbeo - Milan (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Milan",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: lisbon.id,
        rentOneBedroomEur: 1410,
        utilitiesEur: 119,
        groceriesEur: 270,
        transportEur: 40,
        healthcareEur: 120,
        internetEur: 37,
        totalMonthlyCostEur: 1996,
        sourceName: "Numbeo - Lisbon (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Lisbon",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: munich.id,
        rentOneBedroomEur: 1550,
        utilitiesEur: 320,
        groceriesEur: 380,
        transportEur: 65,
        healthcareEur: 220,
        internetEur: 45,
        totalMonthlyCostEur: 2580,
        sourceName: "Numbeo - Munich (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Munich",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: frankfurt.id,
        rentOneBedroomEur: 1300,
        utilitiesEur: 300,
        groceriesEur: 350,
        transportEur: 60,
        healthcareEur: 220,
        internetEur: 42,
        totalMonthlyCostEur: 2272,
        sourceName: "Numbeo - Frankfurt (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Frankfurt",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: rotterdam.id,
        rentOneBedroomEur: 1600,
        utilitiesEur: 220,
        groceriesEur: 360,
        transportEur: 95,
        healthcareEur: 210,
        internetEur: 45,
        totalMonthlyCostEur: 2530,
        sourceName: "Numbeo - Rotterdam (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Rotterdam",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: haga.id,
        rentOneBedroomEur: 1500,
        utilitiesEur: 210,
        groceriesEur: 340,
        transportEur: 85,
        healthcareEur: 210,
        internetEur: 44,
        totalMonthlyCostEur: 2389,
        sourceName: "Numbeo - The Hague (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/The-Hague-Den-Haag",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: barcelona.id,
        rentOneBedroomEur: 1350,
        utilitiesEur: 165,
        groceriesEur: 320,
        transportEur: 45,
        healthcareEur: 120,
        internetEur: 33,
        totalMonthlyCostEur: 2033,
        sourceName: "Numbeo - Barcelona (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Barcelona",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: valencia.id,
        rentOneBedroomEur: 900,
        utilitiesEur: 130,
        groceriesEur: 250,
        transportEur: 35,
        healthcareEur: 120,
        internetEur: 30,
        totalMonthlyCostEur: 1465,
        sourceName: "Numbeo - Valencia (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Valencia",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: lyon.id,
        rentOneBedroomEur: 1000,
        utilitiesEur: 170,
        groceriesEur: 300,
        transportEur: 70,
        healthcareEur: 160,
        internetEur: 32,
        totalMonthlyCostEur: 1732,
        sourceName: "Numbeo - Lyon (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Lyon",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: marseille.id,
        rentOneBedroomEur: 900,
        utilitiesEur: 170,
        groceriesEur: 290,
        transportEur: 55,
        healthcareEur: 150,
        internetEur: 31,
        totalMonthlyCostEur: 1596,
        sourceName: "Numbeo - Marseille (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Marseille",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: rome.id,
        rentOneBedroomEur: 1150,
        utilitiesEur: 190,
        groceriesEur: 290,
        transportEur: 40,
        healthcareEur: 140,
        internetEur: 30,
        totalMonthlyCostEur: 1840,
        sourceName: "Numbeo - Rome (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Rome",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: turin.id,
        rentOneBedroomEur: 850,
        utilitiesEur: 180,
        groceriesEur: 260,
        transportEur: 38,
        healthcareEur: 140,
        internetEur: 28,
        totalMonthlyCostEur: 1496,
        sourceName: "Numbeo - Turin (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Turin",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: porto.id,
        rentOneBedroomEur: 1100,
        utilitiesEur: 110,
        groceriesEur: 240,
        transportEur: 40,
        healthcareEur: 120,
        internetEur: 35,
        totalMonthlyCostEur: 1645,
        sourceName: "Numbeo - Porto (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Porto",
        collectedAt: new Date("2026-05-28"),
      },
      {
        cityId: coimbra.id,
        rentOneBedroomEur: 700,
        utilitiesEur: 95,
        groceriesEur: 220,
        transportEur: 30,
        healthcareEur: 110,
        internetEur: 30,
        totalMonthlyCostEur: 1185,
        sourceName: "Numbeo - Coimbra (May 2026)",
        sourceUrl: "https://www.numbeo.com/cost-of-living/in/Coimbra",
        collectedAt: new Date("2026-05-28"),
      },
    ],
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {
      countryId: germany.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români, ca cetățeni UE, pot locui și munci în Germania fără viză, cu respectarea formalităților locale.",
      legalSteps: [
        "Înregistrarea adresei de domiciliu la autoritatea locală.",
        "Înregistrarea pentru asigurare medicală.",
        "Înregistrarea contractului de muncă sau a activității independente.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Contract de închiriere sau dovadă adresă",
        "Contract de muncă sau dovadă venit",
      ],
      estimatedDuration: "1-4 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      countryId: germany.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români, ca cetățeni UE, pot locui și munci în Germania fără viză, cu respectarea formalităților locale.",
      legalSteps: [
        "Înregistrarea adresei de domiciliu la autoritatea locală.",
        "Înregistrarea pentru asigurare medicală.",
        "Înregistrarea contractului de muncă sau a activității independente.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Contract de închiriere sau dovadă adresă",
        "Contract de muncă sau dovadă venit",
      ],
      estimatedDuration: "1-4 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000002" },
    update: {
      countryId: netherlands.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români au drept de muncă în Țările de Jos fără viză, cu înregistrare administrativă locală.",
      legalSteps: [
        "Înregistrarea la municipalitate.",
        "Obținerea BSN pentru acces la servicii și angajare.",
        "Activarea asigurării medicale obligatorii.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Țările de Jos",
        "Contract de muncă sau dovadă resurse financiare",
      ],
      estimatedDuration: "1-3 săptămâni",
      officialUrl: "https://ind.nl/en/eu-eea-or-swiss-citizens",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000002",
      countryId: netherlands.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români au drept de muncă în Țările de Jos fără viză, cu înregistrare administrativă locală.",
      legalSteps: [
        "Înregistrarea la municipalitate.",
        "Obținerea BSN pentru acces la servicii și angajare.",
        "Activarea asigurării medicale obligatorii.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Țările de Jos",
        "Contract de muncă sau dovadă resurse financiare",
      ],
      estimatedDuration: "1-3 săptămâni",
      officialUrl: "https://ind.nl/en/eu-eea-or-swiss-citizens",
      isActive: true,
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000003" },
    update: {
      countryId: spain.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și lucra în Spania fără viză, fiind necesare formalități de înregistrare locale.",
      legalSteps: [
        "Înregistrare locală pentru rezidență (după stabilire).",
        "Obținerea numărului fiscal/identificatorului administrativ pentru formalități.",
        "Înregistrarea pentru asigurare medicală și contract de muncă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Spania",
        "Contract de muncă sau dovadă mijloace financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000003",
      countryId: spain.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și lucra în Spania fără viză, fiind necesare formalități de înregistrare locale.",
      legalSteps: [
        "Înregistrare locală pentru rezidență (după stabilire).",
        "Obținerea numărului fiscal/identificatorului administrativ pentru formalități.",
        "Înregistrarea pentru asigurare medicală și contract de muncă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Spania",
        "Contract de muncă sau dovadă mijloace financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000004" },
    update: {
      countryId: france.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și lucra în Franța fără viză, cu formalități administrative locale.",
      legalSteps: [
        "Înregistrare administrativă locală după stabilire.",
        "Înregistrare fiscală și acces la asigurare medicală.",
        "Contract de muncă sau dovadă de activitate independentă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Franța",
        "Contract de muncă sau dovadă resurse financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000004",
      countryId: france.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și lucra în Franța fără viză, cu formalități administrative locale.",
      legalSteps: [
        "Înregistrare administrativă locală după stabilire.",
        "Înregistrare fiscală și acces la asigurare medicală.",
        "Contract de muncă sau dovadă de activitate independentă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Franța",
        "Contract de muncă sau dovadă resurse financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000005" },
    update: {
      countryId: italy.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot lucra și locui în Italia fără viză, cu înregistrare locală unde este necesar.",
      legalSteps: [
        "Înregistrare locală după stabilire.",
        "Înregistrare pentru fiscalitate și sistemul medical.",
        "Contract de muncă sau dovadă activitate independentă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Italia",
        "Contract de muncă sau dovadă venit",
      ],
      estimatedDuration: "2-5 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000005",
      countryId: italy.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot lucra și locui în Italia fără viză, cu înregistrare locală unde este necesar.",
      legalSteps: [
        "Înregistrare locală după stabilire.",
        "Înregistrare pentru fiscalitate și sistemul medical.",
        "Contract de muncă sau dovadă activitate independentă.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Italia",
        "Contract de muncă sau dovadă venit",
      ],
      estimatedDuration: "2-5 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000006" },
    update: {
      countryId: portugal.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și munci în Portugalia fără viză, conform drepturilor UE de liberă circulație.",
      legalSteps: [
        "Înregistrare administrativă locală după stabilire.",
        "Înregistrare fiscală și pentru sănătate.",
        "Contract de muncă sau dovadă activitate economică.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Portugalia",
        "Contract de muncă sau dovadă mijloace financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000006",
      countryId: portugal.id,
      category: "WORK",
      title: "Drept de ședere și muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot locui și munci în Portugalia fără viză, conform drepturilor UE de liberă circulație.",
      legalSteps: [
        "Înregistrare administrativă locală după stabilire.",
        "Înregistrare fiscală și pentru sănătate.",
        "Contract de muncă sau dovadă activitate economică.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport valabil",
        "Dovadă adresă în Portugalia",
        "Contract de muncă sau dovadă mijloace financiare",
      ],
      estimatedDuration: "2-6 săptămâni",
      officialUrl:
        "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    },
  });

  const additionalEuropeanCountries: SeedCountry[] = [
    {
      name: "Albania",
      slug: "albania",
      isoCode: "AL",
      capital: "Tirana",
      currency: "ALL",
      officialLanguage: "Albaneză",
      predominantReligion: "Islam",
      latitude: 41.1533,
      longitude: 20.1683,
      averageSalaryEur: 950,
      taxLevel: "LOW",
      incomeTaxRate: 23,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Albania oferă costuri de viață mai reduse și oportunități în servicii, turism și construcții.",
    },
    {
      name: "Andorra",
      slug: "andorra",
      isoCode: "AD",
      capital: "Andorra la Vella",
      currency: "EUR",
      officialLanguage: "Catalană",
      predominantReligion: "Catolicism",
      latitude: 42.5063,
      longitude: 1.5218,
      averageSalaryEur: 2200,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Andorra este o economie mică axată pe turism, retail și servicii financiare.",
    },
    {
      name: "Armenia",
      slug: "armenia",
      isoCode: "AM",
      capital: "Yerevan",
      currency: "AMD",
      officialLanguage: "Armeană",
      predominantReligion: "Creștinism",
      latitude: 40.0691,
      longitude: 45.0382,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Armenia are o piață în creștere în IT, servicii și industrii creative.",
    },
    {
      name: "Austria",
      slug: "austria",
      isoCode: "AT",
      capital: "Viena",
      currency: "EUR",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      latitude: 47.5162,
      longitude: 14.5501,
      averageSalaryEur: 3400,
      taxLevel: "HIGH",
      incomeTaxRate: 55,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Austria oferă stabilitate economică și oportunități bune în industrie, sănătate și servicii.",
    },
    {
      name: "Azerbaidjan",
      slug: "azerbaidjan",
      isoCode: "AZ",
      capital: "Baku",
      currency: "AZN",
      officialLanguage: "Azeră",
      predominantReligion: "Islam",
      latitude: 40.1431,
      longitude: 47.5769,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 25,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Azerbaidjan are economie orientată spre energie, servicii și infrastructură urbană.",
    },
    {
      name: "Belarus",
      slug: "belarus",
      isoCode: "BY",
      capital: "Minsk",
      currency: "BYN",
      officialLanguage: "Belarusă",
      predominantReligion: "Creștinism",
      latitude: 53.7098,
      longitude: 27.9534,
      averageSalaryEur: 800,
      taxLevel: "LOW",
      incomeTaxRate: 13,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Belarus are costuri moderate și o piață locală concentrată în industrie și servicii.",
    },
    {
      name: "Belgia",
      slug: "belgia",
      isoCode: "BE",
      capital: "Bruxelles",
      currency: "EUR",
      officialLanguage: "Neerlandeză/Franceză",
      predominantReligion: "Creștinism",
      latitude: 50.5039,
      longitude: 4.4699,
      averageSalaryEur: 3600,
      taxLevel: "HIGH",
      incomeTaxRate: 50,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Belgia este un centru european pentru servicii, instituții internaționale și logistică.",
    },
    {
      name: "Bosnia și Herțegovina",
      slug: "bosnia-si-hertegovina",
      isoCode: "BA",
      capital: "Sarajevo",
      currency: "BAM",
      officialLanguage: "Bosniacă",
      predominantReligion: "Islam",
      latitude: 43.9159,
      longitude: 17.6791,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Bosnia și Herțegovina are costuri reduse și oportunități în servicii și industrie locală.",
    },
    {
      name: "Bulgaria",
      slug: "bulgaria",
      isoCode: "BG",
      capital: "Sofia",
      currency: "BGN",
      officialLanguage: "Bulgară",
      predominantReligion: "Creștinism",
      latitude: 42.7339,
      longitude: 25.4858,
      averageSalaryEur: 1200,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Bulgaria oferă costuri moderate și cerere bună în IT, servicii și outsourcing.",
    },
    {
      name: "Croația",
      slug: "croatia",
      isoCode: "HR",
      capital: "Zagreb",
      currency: "EUR",
      officialLanguage: "Croată",
      predominantReligion: "Catolicism",
      latitude: 45.1,
      longitude: 15.2,
      averageSalaryEur: 1500,
      taxLevel: "MEDIUM",
      incomeTaxRate: 30,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Croația combină economie turistică puternică cu servicii și industrie locală.",
    },
    {
      name: "Cipru",
      slug: "cipru",
      isoCode: "CY",
      capital: "Nicosia",
      currency: "EUR",
      officialLanguage: "Greacă",
      predominantReligion: "Creștinism",
      latitude: 35.1264,
      longitude: 33.4299,
      averageSalaryEur: 2200,
      taxLevel: "MEDIUM",
      incomeTaxRate: 35,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Cipru are economie orientată spre servicii, turism, finanțe și shipping.",
    },
    {
      name: "Cehia",
      slug: "cehia",
      isoCode: "CZ",
      capital: "Praga",
      currency: "CZK",
      officialLanguage: "Cehă",
      predominantReligion: "Creștinism",
      latitude: 49.8175,
      longitude: 15.473,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 23,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Cehia are piață solidă în producție, IT, automotive și servicii.",
    },
    {
      name: "Danemarca",
      slug: "danemarca",
      isoCode: "DK",
      capital: "Copenhaga",
      currency: "DKK",
      officialLanguage: "Daneză",
      predominantReligion: "Creștinism",
      latitude: 56.2639,
      longitude: 9.5018,
      averageSalaryEur: 4700,
      taxLevel: "HIGH",
      incomeTaxRate: 55,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Danemarca oferă salarii mari, servicii publice puternice și piață competitivă.",
    },
    {
      name: "Estonia",
      slug: "estonia",
      isoCode: "EE",
      capital: "Tallinn",
      currency: "EUR",
      officialLanguage: "Estonă",
      predominantReligion: "Creștinism",
      latitude: 58.5953,
      longitude: 25.0136,
      averageSalaryEur: 2200,
      taxLevel: "MEDIUM",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Estonia este recunoscută pentru digitalizare, tehnologie și administrație eficientă.",
    },
    {
      name: "Finlanda",
      slug: "finlanda",
      isoCode: "FI",
      capital: "Helsinki",
      currency: "EUR",
      officialLanguage: "Finlandeză",
      predominantReligion: "Creștinism",
      latitude: 61.9241,
      longitude: 25.7482,
      averageSalaryEur: 3900,
      taxLevel: "HIGH",
      incomeTaxRate: 51,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Finlanda oferă calitate ridicată a vieții și oportunități în tech, industrie și servicii.",
    },
    {
      name: "Georgia",
      slug: "georgia",
      isoCode: "GE",
      capital: "Tbilisi",
      currency: "GEL",
      officialLanguage: "Georgiană",
      predominantReligion: "Creștinism",
      latitude: 42.3154,
      longitude: 43.3569,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Georgia are costuri accesibile și un sector de servicii în creștere.",
    },
    {
      name: "Grecia",
      slug: "grecia",
      isoCode: "GR",
      capital: "Atena",
      currency: "EUR",
      officialLanguage: "Greacă",
      predominantReligion: "Creștinism",
      latitude: 39.0742,
      longitude: 21.8243,
      averageSalaryEur: 1500,
      taxLevel: "HIGH",
      incomeTaxRate: 44,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Grecia oferă oportunități în turism, servicii, shipping și comerț.",
    },
    {
      name: "Ungaria",
      slug: "ungaria",
      isoCode: "HU",
      capital: "Budapesta",
      currency: "HUF",
      officialLanguage: "Maghiară",
      predominantReligion: "Creștinism",
      latitude: 47.1625,
      longitude: 19.5033,
      averageSalaryEur: 1700,
      taxLevel: "MEDIUM",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Ungaria are o piață industrială și de servicii stabilă, concentrată urban.",
    },
    {
      name: "Islanda",
      slug: "islanda",
      isoCode: "IS",
      capital: "Reykjavik",
      currency: "ISK",
      officialLanguage: "Islandeză",
      predominantReligion: "Creștinism",
      latitude: 64.9631,
      longitude: -19.0208,
      averageSalaryEur: 4300,
      taxLevel: "HIGH",
      incomeTaxRate: 46,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Islanda oferă salarii ridicate și piață locală orientată spre servicii și energie.",
    },
    {
      name: "Irlanda",
      slug: "irlanda",
      isoCode: "IE",
      capital: "Dublin",
      currency: "EUR",
      officialLanguage: "Engleză",
      predominantReligion: "Creștinism",
      latitude: 53.1424,
      longitude: -7.6921,
      averageSalaryEur: 4200,
      taxLevel: "HIGH",
      incomeTaxRate: 40,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Irlanda este un hub european pentru tech, pharma și servicii financiare.",
    },
    {
      name: "Kosovo",
      slug: "kosovo",
      isoCode: "XK",
      capital: "Pristina",
      currency: "EUR",
      officialLanguage: "Albaneză",
      predominantReligion: "Islam",
      latitude: 42.6026,
      longitude: 20.903,
      averageSalaryEur: 700,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Kosovo are costuri reduse și oportunități în servicii, comerț și sector public.",
    },
    {
      name: "Letonia",
      slug: "letonia",
      isoCode: "LV",
      capital: "Riga",
      currency: "EUR",
      officialLanguage: "Letonă",
      predominantReligion: "Creștinism",
      latitude: 56.8796,
      longitude: 24.6032,
      averageSalaryEur: 1700,
      taxLevel: "MEDIUM",
      incomeTaxRate: 31,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Letonia are o economie deschisă, cu accent pe servicii, transport și tehnologie.",
    },
    {
      name: "Liechtenstein",
      slug: "liechtenstein",
      isoCode: "LI",
      capital: "Vaduz",
      currency: "CHF",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      latitude: 47.166,
      longitude: 9.5554,
      averageSalaryEur: 5600,
      taxLevel: "LOW",
      incomeTaxRate: 22,
      citizenshipDifficulty: "VERY_HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Liechtenstein este o economie mică și foarte competitivă, axată pe industrie și finanțe.",
    },
    {
      name: "Lituania",
      slug: "lituania",
      isoCode: "LT",
      capital: "Vilnius",
      currency: "EUR",
      officialLanguage: "Lituaniană",
      predominantReligion: "Creștinism",
      latitude: 55.1694,
      longitude: 23.8813,
      averageSalaryEur: 1900,
      taxLevel: "MEDIUM",
      incomeTaxRate: 32,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Lituania are piață de muncă în creștere în servicii, fintech și logistică.",
    },
    {
      name: "Luxemburg",
      slug: "luxemburg",
      isoCode: "LU",
      capital: "Luxemburg",
      currency: "EUR",
      officialLanguage: "Franceză",
      predominantReligion: "Creștinism",
      latitude: 49.8153,
      longitude: 6.1296,
      averageSalaryEur: 5900,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Luxemburg oferă salarii foarte ridicate și oportunități în finanțe și servicii premium.",
    },
    {
      name: "Malta",
      slug: "malta",
      isoCode: "MT",
      capital: "Valletta",
      currency: "EUR",
      officialLanguage: "Engleză",
      predominantReligion: "Catolicism",
      latitude: 35.9375,
      longitude: 14.3754,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 35,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Malta este atractivă pentru servicii, gaming, fintech și turism.",
    },
    {
      name: "Moldova",
      slug: "moldova",
      isoCode: "MD",
      capital: "Chișinău",
      currency: "MDL",
      officialLanguage: "Română",
      predominantReligion: "Creștinism",
      latitude: 47.4116,
      longitude: 28.3699,
      averageSalaryEur: 700,
      taxLevel: "LOW",
      incomeTaxRate: 12,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Moldova oferă costuri reduse și oportunități în servicii, agricultură și IT local.",
    },
    {
      name: "Monaco",
      slug: "monaco",
      isoCode: "MC",
      capital: "Monaco",
      currency: "EUR",
      officialLanguage: "Franceză",
      predominantReligion: "Catolicism",
      latitude: 43.7384,
      longitude: 7.4246,
      averageSalaryEur: 4500,
      taxLevel: "LOW",
      incomeTaxRate: 0,
      citizenshipDifficulty: "VERY_HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Monaco este un microstat premium orientat spre servicii financiare și ospitalitate.",
    },
    {
      name: "Muntenegru",
      slug: "muntenegru",
      isoCode: "ME",
      capital: "Podgorica",
      currency: "EUR",
      officialLanguage: "Muntenegreană",
      predominantReligion: "Creștinism",
      latitude: 42.7087,
      longitude: 19.3744,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Muntenegru are economie bazată pe turism, servicii și investiții imobiliare.",
    },
    {
      name: "Macedonia de Nord",
      slug: "macedonia-de-nord",
      isoCode: "MK",
      capital: "Skopje",
      currency: "MKD",
      officialLanguage: "Macedoneană",
      predominantReligion: "Creștinism",
      latitude: 41.6086,
      longitude: 21.7453,
      averageSalaryEur: 850,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Macedonia de Nord oferă costuri moderate și oportunități în servicii și industrie ușoară.",
    },
    {
      name: "Norvegia",
      slug: "norvegia",
      isoCode: "NO",
      capital: "Oslo",
      currency: "NOK",
      officialLanguage: "Norvegiană",
      predominantReligion: "Creștinism",
      latitude: 60.472,
      longitude: 8.4689,
      averageSalaryEur: 5200,
      taxLevel: "HIGH",
      incomeTaxRate: 47,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Norvegia are salarii ridicate și oportunități în energie, tehnologie și servicii.",
    },
    {
      name: "Polonia",
      slug: "polonia",
      isoCode: "PL",
      capital: "Varșovia",
      currency: "PLN",
      officialLanguage: "Poloneză",
      predominantReligion: "Catolicism",
      latitude: 51.9194,
      longitude: 19.1451,
      averageSalaryEur: 1800,
      taxLevel: "MEDIUM",
      incomeTaxRate: 32,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Polonia este una dintre cele mai dinamice economii europene în industrie și servicii.",
    },
    {
      name: "România",
      slug: "romania",
      isoCode: "RO",
      capital: "București",
      currency: "RON",
      officialLanguage: "Română",
      predominantReligion: "Creștinism",
      latitude: 45.9432,
      longitude: 24.9668,
      averageSalaryEur: 1500,
      taxLevel: "MEDIUM",
      incomeTaxRate: 10,
      citizenshipDifficulty: "LOW",
      emigrationDifficulty: "LOW",
      generalDescription:
        "România are centre urbane puternice în IT, servicii, industrie și logistică.",
    },
    {
      name: "Rusia",
      slug: "rusia",
      isoCode: "RU",
      capital: "Moscova",
      currency: "RUB",
      officialLanguage: "Rusă",
      predominantReligion: "Creștinism",
      latitude: 61.524,
      longitude: 105.3188,
      averageSalaryEur: 1300,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Rusia are piețe urbane mari, cu oportunități în industrie, energie și servicii.",
    },
    {
      name: "San Marino",
      slug: "san-marino",
      isoCode: "SM",
      capital: "San Marino",
      currency: "EUR",
      officialLanguage: "Italiană",
      predominantReligion: "Catolicism",
      latitude: 43.9424,
      longitude: 12.4578,
      averageSalaryEur: 2300,
      taxLevel: "LOW",
      incomeTaxRate: 35,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "San Marino este microstat european cu economie de servicii și turism.",
    },
    {
      name: "Serbia",
      slug: "serbia",
      isoCode: "RS",
      capital: "Belgrad",
      currency: "RSD",
      officialLanguage: "Sârbă",
      predominantReligion: "Creștinism",
      latitude: 44.0165,
      longitude: 21.0059,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Serbia are costuri moderate și oportunități în servicii, IT și producție.",
    },
    {
      name: "Slovacia",
      slug: "slovacia",
      isoCode: "SK",
      capital: "Bratislava",
      currency: "EUR",
      officialLanguage: "Slovacă",
      predominantReligion: "Creștinism",
      latitude: 48.669,
      longitude: 19.699,
      averageSalaryEur: 1800,
      taxLevel: "MEDIUM",
      incomeTaxRate: 25,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Slovacia are economie industrială puternică și cerere bună în servicii.",
    },
    {
      name: "Slovenia",
      slug: "slovenia",
      isoCode: "SI",
      capital: "Ljubljana",
      currency: "EUR",
      officialLanguage: "Slovenă",
      predominantReligion: "Catolicism",
      latitude: 46.1512,
      longitude: 14.9955,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 50,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "LOW",
      generalDescription:
        "Slovenia oferă echilibru între costuri, servicii publice și piață de muncă stabilă.",
    },
    {
      name: "Suedia",
      slug: "suedia",
      isoCode: "SE",
      capital: "Stockholm",
      currency: "SEK",
      officialLanguage: "Suedeză",
      predominantReligion: "Creștinism",
      latitude: 60.1282,
      longitude: 18.6435,
      averageSalaryEur: 4200,
      taxLevel: "HIGH",
      incomeTaxRate: 52,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Suedia are economie avansată în tehnologie, industrie și servicii publice.",
    },
    {
      name: "Elveția",
      slug: "elvetia",
      isoCode: "CH",
      capital: "Berna",
      currency: "CHF",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      latitude: 46.8182,
      longitude: 8.2275,
      averageSalaryEur: 6400,
      taxLevel: "MEDIUM",
      incomeTaxRate: 40,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Elveția oferă salarii foarte ridicate și o piață premium în finanțe, pharma și tehnologie.",
    },
    {
      name: "Turcia",
      slug: "turcia",
      isoCode: "TR",
      capital: "Ankara",
      currency: "TRY",
      officialLanguage: "Turcă",
      predominantReligion: "Islam",
      latitude: 38.9637,
      longitude: 35.2433,
      averageSalaryEur: 1100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 40,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Turcia are centre urbane mari și economie diversificată în industrie și servicii.",
    },
    {
      name: "Ucraina",
      slug: "ucraina",
      isoCode: "UA",
      capital: "Kiev",
      currency: "UAH",
      officialLanguage: "Ucraineană",
      predominantReligion: "Creștinism",
      latitude: 48.3794,
      longitude: 31.1656,
      averageSalaryEur: 800,
      taxLevel: "LOW",
      incomeTaxRate: 18,
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      generalDescription:
        "Ucraina are potențial ridicat în servicii, tehnologie și reconstrucție economică.",
    },
    {
      name: "Regatul Unit",
      slug: "regatul-unit",
      isoCode: "GB",
      capital: "Londra",
      currency: "GBP",
      officialLanguage: "Engleză",
      predominantReligion: "Creștinism",
      latitude: 55.3781,
      longitude: -3.436,
      averageSalaryEur: 3900,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      citizenshipDifficulty: "HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Regatul Unit oferă oportunități extinse în finanțe, tehnologie, sănătate și servicii.",
    },
    {
      name: "Vatican",
      slug: "vatican",
      isoCode: "VA",
      capital: "Vatican",
      currency: "EUR",
      officialLanguage: "Italiană",
      predominantReligion: "Catolicism",
      latitude: 41.9029,
      longitude: 12.4534,
      averageSalaryEur: 2400,
      taxLevel: "LOW",
      incomeTaxRate: 0,
      citizenshipDifficulty: "VERY_HIGH",
      emigrationDifficulty: "HIGH",
      generalDescription:
        "Vatican este un microstat religios cu economie instituțională foarte restrânsă.",
    },
  ];

  const additionalEuropeanCities: SeedCity[] = [
    { countrySlug: "albania", name: "Tirana", slug: "tirana", region: "Tirana", latitude: 41.3275, longitude: 19.8187, population: 557000, averageSalaryEur: 1000, emigrationDifficulty: "LOW", generalDescription: "Principalul centru economic și administrativ al Albaniei." },
    { countrySlug: "albania", name: "Durres", slug: "durres", region: "Durres", latitude: 41.3231, longitude: 19.4414, population: 122000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Oraș-port important pentru logistică și servicii." },
    { countrySlug: "albania", name: "Vlore", slug: "vlore", region: "Vlore", latitude: 40.4661, longitude: 19.4914, population: 84000, averageSalaryEur: 850, emigrationDifficulty: "LOW", generalDescription: "Centru turistic și comercial pe litoralul albanez." },

    { countrySlug: "andorra", name: "Andorra la Vella", slug: "andorra-la-vella", region: "Andorra la Vella", latitude: 42.5063, longitude: 1.5218, population: 23000, averageSalaryEur: 2400, emigrationDifficulty: "MEDIUM", generalDescription: "Capitala administrativă și comercială a Andorrei." },
    { countrySlug: "andorra", name: "Escaldes-Engordany", slug: "escaldes-engordany", region: "Escaldes-Engordany", latitude: 42.51, longitude: 1.54, population: 14000, averageSalaryEur: 2300, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș orientat spre servicii, wellness și turism." },
    { countrySlug: "andorra", name: "Encamp", slug: "encamp", region: "Encamp", latitude: 42.5347, longitude: 1.5801, population: 12000, averageSalaryEur: 2200, emigrationDifficulty: "MEDIUM", generalDescription: "Localitate montană cu activitate turistică sezonieră." },

    { countrySlug: "armenia", name: "Yerevan", slug: "yerevan", region: "Yerevan", latitude: 40.1792, longitude: 44.4991, population: 1080000, averageSalaryEur: 1000, emigrationDifficulty: "MEDIUM", generalDescription: "Principal centru economic și tehnologic al Armeniei." },
    { countrySlug: "armenia", name: "Gyumri", slug: "gyumri", region: "Shirak", latitude: 40.7894, longitude: 43.8475, population: 110000, averageSalaryEur: 850, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș regional cu servicii și industrie locală." },
    { countrySlug: "armenia", name: "Vanadzor", slug: "vanadzor", region: "Lori", latitude: 40.8128, longitude: 44.4883, population: 76000, averageSalaryEur: 800, emigrationDifficulty: "MEDIUM", generalDescription: "Centru regional în dezvoltare pentru servicii și educație." },

    { countrySlug: "austria", name: "Viena", slug: "viena", region: "Viena", latitude: 48.2082, longitude: 16.3738, population: 2000000, averageSalaryEur: 3600, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală europeană cu piață puternică în servicii și sănătate." },
    { countrySlug: "austria", name: "Graz", slug: "graz", region: "Stiria", latitude: 47.0707, longitude: 15.4395, population: 300000, averageSalaryEur: 3100, emigrationDifficulty: "MEDIUM", generalDescription: "Centru universitar și industrial în sudul Austriei." },
    { countrySlug: "austria", name: "Linz", slug: "linz", region: "Austria Superioară", latitude: 48.3069, longitude: 14.2858, population: 210000, averageSalaryEur: 3000, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș industrial și tehnologic în creștere." },

    { countrySlug: "azerbaidjan", name: "Baku", slug: "baku", region: "Absheron", latitude: 40.4093, longitude: 49.8671, population: 2300000, averageSalaryEur: 1100, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală energetică și centru financiar național." },
    { countrySlug: "azerbaidjan", name: "Ganja", slug: "ganja", region: "Ganja", latitude: 40.6828, longitude: 46.3606, population: 330000, averageSalaryEur: 900, emigrationDifficulty: "MEDIUM", generalDescription: "Centru regional cu industrie și servicii." },
    { countrySlug: "azerbaidjan", name: "Sumqayit", slug: "sumqayit", region: "Sumqayit", latitude: 40.5897, longitude: 49.6686, population: 345000, averageSalaryEur: 900, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș industrial aproape de capitală." },

    { countrySlug: "belarus", name: "Minsk", slug: "minsk", region: "Minsk", latitude: 53.9, longitude: 27.5667, population: 2000000, averageSalaryEur: 900, emigrationDifficulty: "HIGH", generalDescription: "Capitală administrativă și economică a Belarusului." },
    { countrySlug: "belarus", name: "Gomel", slug: "gomel", region: "Gomel", latitude: 52.4345, longitude: 30.9754, population: 500000, averageSalaryEur: 750, emigrationDifficulty: "HIGH", generalDescription: "Centru urban important în estul țării." },
    { countrySlug: "belarus", name: "Brest", slug: "brest-belarus", region: "Brest", latitude: 52.0976, longitude: 23.6878, population: 340000, averageSalaryEur: 730, emigrationDifficulty: "HIGH", generalDescription: "Oraș regional cu comerț și logistică." },

    { countrySlug: "belgia", name: "Bruxelles", slug: "bruxelles", region: "Bruxelles-Capitală", latitude: 50.8503, longitude: 4.3517, population: 1220000, averageSalaryEur: 3900, emigrationDifficulty: "MEDIUM", generalDescription: "Centru european major pentru instituții și servicii." },
    { countrySlug: "belgia", name: "Antwerp", slug: "antwerp", region: "Flandra", latitude: 51.2194, longitude: 4.4025, population: 530000, averageSalaryEur: 3600, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș-port cheie pentru logistică și comerț." },
    { countrySlug: "belgia", name: "Ghent", slug: "ghent", region: "Flandra", latitude: 51.0543, longitude: 3.7174, population: 265000, averageSalaryEur: 3400, emigrationDifficulty: "MEDIUM", generalDescription: "Centru universitar și tehnologic din Belgia." },

    { countrySlug: "bosnia-si-hertegovina", name: "Sarajevo", slug: "sarajevo", region: "Sarajevo", latitude: 43.8563, longitude: 18.4131, population: 275000, averageSalaryEur: 950, emigrationDifficulty: "LOW", generalDescription: "Capitala și principalul centru de servicii." },
    { countrySlug: "bosnia-si-hertegovina", name: "Banja Luka", slug: "banja-luka", region: "Republika Srpska", latitude: 44.7722, longitude: 17.191, population: 185000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Oraș regional cu administrație și servicii." },
    { countrySlug: "bosnia-si-hertegovina", name: "Mostar", slug: "mostar", region: "Herțegovina", latitude: 43.3438, longitude: 17.8078, population: 105000, averageSalaryEur: 850, emigrationDifficulty: "LOW", generalDescription: "Centru turistic și comercial în sudul țării." },

    { countrySlug: "bulgaria", name: "Sofia", slug: "sofia", region: "Sofia", latitude: 42.6977, longitude: 23.3219, population: 1280000, averageSalaryEur: 1400, emigrationDifficulty: "LOW", generalDescription: "Principalul centru economic și IT al Bulgariei." },
    { countrySlug: "bulgaria", name: "Plovdiv", slug: "plovdiv", region: "Plovdiv", latitude: 42.1354, longitude: 24.7453, population: 345000, averageSalaryEur: 1200, emigrationDifficulty: "LOW", generalDescription: "Oraș industrial și logistic important." },
    { countrySlug: "bulgaria", name: "Varna", slug: "varna", region: "Varna", latitude: 43.2141, longitude: 27.9147, population: 335000, averageSalaryEur: 1200, emigrationDifficulty: "LOW", generalDescription: "Centru portuar și turistic la Marea Neagră." },

    { countrySlug: "croatia", name: "Zagreb", slug: "zagreb", region: "Zagreb", latitude: 45.815, longitude: 15.9819, population: 769000, averageSalaryEur: 1600, emigrationDifficulty: "LOW", generalDescription: "Capitala administrativă și economică a Croației." },
    { countrySlug: "croatia", name: "Split", slug: "split", region: "Dalmația", latitude: 43.5081, longitude: 16.4402, population: 160000, averageSalaryEur: 1450, emigrationDifficulty: "LOW", generalDescription: "Centru turistic și portuar în sudul Croației." },
    { countrySlug: "croatia", name: "Rijeka", slug: "rijeka", region: "Primorje-Gorski Kotar", latitude: 45.3271, longitude: 14.4422, population: 108000, averageSalaryEur: 1400, emigrationDifficulty: "LOW", generalDescription: "Oraș-port cu activitate logistică și industrială." },

    { countrySlug: "cipru", name: "Nicosia", slug: "nicosia", region: "Nicosia", latitude: 35.1856, longitude: 33.3823, population: 330000, averageSalaryEur: 2300, emigrationDifficulty: "LOW", generalDescription: "Capitală administrativă și centru de servicii." },
    { countrySlug: "cipru", name: "Limassol", slug: "limassol", region: "Limassol", latitude: 34.7071, longitude: 33.0226, population: 240000, averageSalaryEur: 2200, emigrationDifficulty: "LOW", generalDescription: "Centru financiar și maritim al Ciprului." },
    { countrySlug: "cipru", name: "Larnaca", slug: "larnaca", region: "Larnaca", latitude: 34.9003, longitude: 33.6232, population: 85000, averageSalaryEur: 2000, emigrationDifficulty: "LOW", generalDescription: "Oraș portuar cu servicii și turism." },

    { countrySlug: "cehia", name: "Praga", slug: "praga", region: "Boemia Centrală", latitude: 50.0755, longitude: 14.4378, population: 1380000, averageSalaryEur: 2400, emigrationDifficulty: "LOW", generalDescription: "Capitală central-europeană puternică în IT și servicii." },
    { countrySlug: "cehia", name: "Brno", slug: "brno", region: "Moravia de Sud", latitude: 49.1951, longitude: 16.6068, population: 400000, averageSalaryEur: 2000, emigrationDifficulty: "LOW", generalDescription: "Centru universitar și tehnologic în creștere." },
    { countrySlug: "cehia", name: "Ostrava", slug: "ostrava", region: "Moravia-Silezia", latitude: 49.8209, longitude: 18.2625, population: 285000, averageSalaryEur: 1800, emigrationDifficulty: "LOW", generalDescription: "Oraș industrial cu sector servicii în dezvoltare." },

    { countrySlug: "danemarca", name: "Copenhaga", slug: "copenhaga", region: "Hovedstaden", latitude: 55.6761, longitude: 12.5683, population: 653000, averageSalaryEur: 5000, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală nordică cu economie inovatoare și salarii mari." },
    { countrySlug: "danemarca", name: "Aarhus", slug: "aarhus", region: "Midtjylland", latitude: 56.1629, longitude: 10.2039, population: 285000, averageSalaryEur: 4400, emigrationDifficulty: "MEDIUM", generalDescription: "Centru universitar și tehnologic în Danemarca." },
    { countrySlug: "danemarca", name: "Odense", slug: "odense", region: "Syddanmark", latitude: 55.4038, longitude: 10.4024, population: 180000, averageSalaryEur: 4200, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș cu industrie și servicii avansate." },

    { countrySlug: "estonia", name: "Tallinn", slug: "tallinn", region: "Harju", latitude: 59.437, longitude: 24.7536, population: 460000, averageSalaryEur: 2400, emigrationDifficulty: "LOW", generalDescription: "Capitală digitală cu ecosistem puternic de startup-uri." },
    { countrySlug: "estonia", name: "Tartu", slug: "tartu", region: "Tartu", latitude: 58.3776, longitude: 26.729, population: 98000, averageSalaryEur: 2000, emigrationDifficulty: "LOW", generalDescription: "Centru universitar și de cercetare recunoscut." },
    { countrySlug: "estonia", name: "Parnu", slug: "parnu", region: "Parnu", latitude: 58.3859, longitude: 24.4971, population: 40000, averageSalaryEur: 1700, emigrationDifficulty: "LOW", generalDescription: "Oraș turistic și de servicii pe litoral." },

    { countrySlug: "finlanda", name: "Helsinki", slug: "helsinki", region: "Uusimaa", latitude: 60.1699, longitude: 24.9384, population: 672000, averageSalaryEur: 4200, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală nordică cu sectoare puternice în tehnologie și servicii." },
    { countrySlug: "finlanda", name: "Tampere", slug: "tampere", region: "Pirkanmaa", latitude: 61.4978, longitude: 23.761, population: 255000, averageSalaryEur: 3600, emigrationDifficulty: "MEDIUM", generalDescription: "Centru industrial și tech în sudul Finlandei." },
    { countrySlug: "finlanda", name: "Turku", slug: "turku", region: "Finlanda Propriu-zisă", latitude: 60.4518, longitude: 22.2666, population: 195000, averageSalaryEur: 3400, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș-port cu servicii și industrie locală." },

    { countrySlug: "georgia", name: "Tbilisi", slug: "tbilisi", region: "Tbilisi", latitude: 41.7151, longitude: 44.8271, population: 1200000, averageSalaryEur: 1000, emigrationDifficulty: "LOW", generalDescription: "Capitala și principalul centru economic al Georgiei." },
    { countrySlug: "georgia", name: "Batumi", slug: "batumi", region: "Adjara", latitude: 41.6168, longitude: 41.6367, population: 180000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Oraș-port și centru turistic la Marea Neagră." },
    { countrySlug: "georgia", name: "Kutaisi", slug: "kutaisi", region: "Imereti", latitude: 42.2662, longitude: 42.718, population: 135000, averageSalaryEur: 850, emigrationDifficulty: "LOW", generalDescription: "Centru regional pentru servicii și educație." },

    { countrySlug: "grecia", name: "Atena", slug: "atena", region: "Attica", latitude: 37.9838, longitude: 23.7275, population: 3150000, averageSalaryEur: 1700, emigrationDifficulty: "LOW", generalDescription: "Capitală cu economie bazată pe servicii, turism și comerț." },
    { countrySlug: "grecia", name: "Salonic", slug: "salonic", region: "Macedonia Centrală", latitude: 40.6401, longitude: 22.9444, population: 1100000, averageSalaryEur: 1500, emigrationDifficulty: "LOW", generalDescription: "Centru economic important în nordul Greciei." },
    { countrySlug: "grecia", name: "Patras", slug: "patras", region: "Grecia de Vest", latitude: 38.2466, longitude: 21.7346, population: 215000, averageSalaryEur: 1350, emigrationDifficulty: "LOW", generalDescription: "Oraș-port cu servicii și activitate universitară." },

    { countrySlug: "ungaria", name: "Budapesta", slug: "budapesta", region: "Budapesta", latitude: 47.4979, longitude: 19.0402, population: 1750000, averageSalaryEur: 1900, emigrationDifficulty: "LOW", generalDescription: "Capitală regională cu servicii, IT și industrie." },
    { countrySlug: "ungaria", name: "Debrecen", slug: "debrecen", region: "Hajdu-Bihar", latitude: 47.5316, longitude: 21.6273, population: 200000, averageSalaryEur: 1600, emigrationDifficulty: "LOW", generalDescription: "Centru universitar și industrial din estul Ungariei." },
    { countrySlug: "ungaria", name: "Szeged", slug: "szeged", region: "Csongrad-Csanad", latitude: 46.253, longitude: 20.1414, population: 157000, averageSalaryEur: 1500, emigrationDifficulty: "LOW", generalDescription: "Oraș universitar cu servicii și producție locală." },

    { countrySlug: "islanda", name: "Reykjavik", slug: "reykjavik", region: "Capital Region", latitude: 64.1466, longitude: -21.9426, population: 140000, averageSalaryEur: 4600, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală nordică cu servicii și industrie creativă." },
    { countrySlug: "islanda", name: "Kopavogur", slug: "kopavogur", region: "Capital Region", latitude: 64.1123, longitude: -21.912, population: 39000, averageSalaryEur: 4300, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș suburban cu servicii și comerț." },
    { countrySlug: "islanda", name: "Akureyri", slug: "akureyri", region: "Nordurland Eystra", latitude: 65.6835, longitude: -18.1105, population: 20000, averageSalaryEur: 4100, emigrationDifficulty: "MEDIUM", generalDescription: "Centru urban principal în nordul Islandei." },

    { countrySlug: "irlanda", name: "Dublin", slug: "dublin", region: "Leinster", latitude: 53.3498, longitude: -6.2603, population: 592000, averageSalaryEur: 4600, emigrationDifficulty: "MEDIUM", generalDescription: "Hub european pentru tech și servicii financiare." },
    { countrySlug: "irlanda", name: "Cork", slug: "cork", region: "Munster", latitude: 51.8985, longitude: -8.4756, population: 224000, averageSalaryEur: 3800, emigrationDifficulty: "MEDIUM", generalDescription: "Centru industrial și farmaceutic important." },
    { countrySlug: "irlanda", name: "Galway", slug: "galway", region: "Connacht", latitude: 53.2707, longitude: -9.0568, population: 85000, averageSalaryEur: 3400, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș universitar și de servicii în vestul Irlandei." },

    { countrySlug: "kosovo", name: "Pristina", slug: "pristina", region: "Pristina", latitude: 42.6629, longitude: 21.1655, population: 220000, averageSalaryEur: 800, emigrationDifficulty: "LOW", generalDescription: "Capitala administrativă și economică a Kosovo." },
    { countrySlug: "kosovo", name: "Prizren", slug: "prizren", region: "Prizren", latitude: 42.2139, longitude: 20.7397, population: 86000, averageSalaryEur: 700, emigrationDifficulty: "LOW", generalDescription: "Oraș istoric cu servicii și comerț local." },
    { countrySlug: "kosovo", name: "Peja", slug: "peja", region: "Peja", latitude: 42.6591, longitude: 20.2883, population: 48000, averageSalaryEur: 680, emigrationDifficulty: "LOW", generalDescription: "Centru regional pentru turism și servicii." },

    { countrySlug: "letonia", name: "Riga", slug: "riga", region: "Riga", latitude: 56.9496, longitude: 24.1052, population: 605000, averageSalaryEur: 1900, emigrationDifficulty: "LOW", generalDescription: "Capitală baltică importantă pentru servicii și logistică." },
    { countrySlug: "letonia", name: "Daugavpils", slug: "daugavpils", region: "Latgale", latitude: 55.8747, longitude: 26.5362, population: 80000, averageSalaryEur: 1500, emigrationDifficulty: "LOW", generalDescription: "Centru regional cu industrie și servicii." },
    { countrySlug: "letonia", name: "Liepaja", slug: "liepaja", region: "Kurzeme", latitude: 56.5047, longitude: 21.0108, population: 67000, averageSalaryEur: 1500, emigrationDifficulty: "LOW", generalDescription: "Oraș-port și centru economic local." },

    { countrySlug: "liechtenstein", name: "Vaduz", slug: "vaduz", region: "Vaduz", latitude: 47.141, longitude: 9.5209, population: 5800, averageSalaryEur: 5800, emigrationDifficulty: "HIGH", generalDescription: "Capitala administrativă și financiară a Liechtenstein." },
    { countrySlug: "liechtenstein", name: "Schaan", slug: "schaan", region: "Schaan", latitude: 47.1667, longitude: 9.5096, population: 6100, averageSalaryEur: 5600, emigrationDifficulty: "HIGH", generalDescription: "Centru industrial și de servicii." },
    { countrySlug: "liechtenstein", name: "Balzers", slug: "balzers", region: "Balzers", latitude: 47.0667, longitude: 9.5, population: 4600, averageSalaryEur: 5400, emigrationDifficulty: "HIGH", generalDescription: "Localitate sudică cu industrie locală." },

    { countrySlug: "lituania", name: "Vilnius", slug: "vilnius", region: "Vilnius", latitude: 54.6872, longitude: 25.2797, population: 590000, averageSalaryEur: 2100, emigrationDifficulty: "LOW", generalDescription: "Capitală baltică cu ecosistem tech și servicii." },
    { countrySlug: "lituania", name: "Kaunas", slug: "kaunas", region: "Kaunas", latitude: 54.8985, longitude: 23.9036, population: 300000, averageSalaryEur: 1800, emigrationDifficulty: "LOW", generalDescription: "Centru universitar și industrial important." },
    { countrySlug: "lituania", name: "Klaipeda", slug: "klaipeda", region: "Klaipeda", latitude: 55.7033, longitude: 21.1443, population: 150000, averageSalaryEur: 1700, emigrationDifficulty: "LOW", generalDescription: "Oraș-port cu activitate logistică și comercială." },

    { countrySlug: "luxemburg", name: "Luxemburg", slug: "luxemburg-oras", region: "Luxemburg", latitude: 49.6116, longitude: 6.1319, population: 136000, averageSalaryEur: 6200, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală financiară europeană cu salarii ridicate." },
    { countrySlug: "luxemburg", name: "Esch-sur-Alzette", slug: "esch-sur-alzette", region: "Esch-sur-Alzette", latitude: 49.4958, longitude: 5.9806, population: 37000, averageSalaryEur: 5200, emigrationDifficulty: "MEDIUM", generalDescription: "Centru urban în sudul Luxemburgului." },
    { countrySlug: "luxemburg", name: "Differdange", slug: "differdange", region: "Differdange", latitude: 49.5242, longitude: 5.8892, population: 30000, averageSalaryEur: 5000, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș industrial și rezidențial în regiunea sudică." },

    { countrySlug: "malta", name: "Valletta", slug: "valletta", region: "South Eastern", latitude: 35.8989, longitude: 14.5146, population: 6000, averageSalaryEur: 2200, emigrationDifficulty: "LOW", generalDescription: "Capitală administrativă și culturală a Maltei." },
    { countrySlug: "malta", name: "Birkirkara", slug: "birkirkara", region: "Central", latitude: 35.8955, longitude: 14.4665, population: 24000, averageSalaryEur: 2100, emigrationDifficulty: "LOW", generalDescription: "Oraș urban cu servicii și comerț." },
    { countrySlug: "malta", name: "Sliema", slug: "sliema", region: "Central", latitude: 35.9122, longitude: 14.5041, population: 20000, averageSalaryEur: 2300, emigrationDifficulty: "LOW", generalDescription: "Centru rezidențial și turistic modern." },

    { countrySlug: "moldova", name: "Chișinău", slug: "chisinau", region: "Chișinău", latitude: 47.0105, longitude: 28.8638, population: 639000, averageSalaryEur: 750, emigrationDifficulty: "LOW", generalDescription: "Principalul centru administrativ și economic al Moldovei." },
    { countrySlug: "moldova", name: "Bălți", slug: "balti", region: "Bălți", latitude: 47.7539, longitude: 27.9184, population: 97000, averageSalaryEur: 650, emigrationDifficulty: "LOW", generalDescription: "Centru urban important în nordul țării." },
    { countrySlug: "moldova", name: "Cahul", slug: "cahul", region: "Cahul", latitude: 45.9043, longitude: 28.1993, population: 39000, averageSalaryEur: 600, emigrationDifficulty: "LOW", generalDescription: "Oraș regional în sud, cu servicii locale." },

    { countrySlug: "monaco", name: "Monaco", slug: "monaco-oras", region: "Monaco", latitude: 43.7384, longitude: 7.4246, population: 38000, averageSalaryEur: 4700, emigrationDifficulty: "HIGH", generalDescription: "Centru administrativ și financiar al principatului." },
    { countrySlug: "monaco", name: "Monte Carlo", slug: "monte-carlo", region: "Monte Carlo", latitude: 43.7396, longitude: 7.4277, population: 16000, averageSalaryEur: 4800, emigrationDifficulty: "HIGH", generalDescription: "District premium orientat spre servicii și turism." },
    { countrySlug: "monaco", name: "La Condamine", slug: "la-condamine", region: "La Condamine", latitude: 43.7374, longitude: 7.4241, population: 12000, averageSalaryEur: 4500, emigrationDifficulty: "HIGH", generalDescription: "Zonă urbană activă în comerț și servicii." },

    { countrySlug: "muntenegru", name: "Podgorica", slug: "podgorica", region: "Podgorica", latitude: 42.4304, longitude: 19.2594, population: 190000, averageSalaryEur: 1100, emigrationDifficulty: "LOW", generalDescription: "Capitala administrativă și economică a Muntenegrului." },
    { countrySlug: "muntenegru", name: "Niksic", slug: "niksic", region: "Niksic", latitude: 42.7731, longitude: 18.9445, population: 57000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Centru regional industrial și universitar." },
    { countrySlug: "muntenegru", name: "Budva", slug: "budva", region: "Budva", latitude: 42.2864, longitude: 18.84, population: 20000, averageSalaryEur: 950, emigrationDifficulty: "LOW", generalDescription: "Oraș turistic major pe litoralul Adriaticii." },

    { countrySlug: "macedonia-de-nord", name: "Skopje", slug: "skopje", region: "Skopje", latitude: 41.9981, longitude: 21.4254, population: 526000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Capitală și principal centru economic al Macedoniei de Nord." },
    { countrySlug: "macedonia-de-nord", name: "Bitola", slug: "bitola", region: "Pelagonia", latitude: 41.0311, longitude: 21.3347, population: 74000, averageSalaryEur: 800, emigrationDifficulty: "LOW", generalDescription: "Centru regional cu servicii și comerț." },
    { countrySlug: "macedonia-de-nord", name: "Tetovo", slug: "tetovo", region: "Polog", latitude: 42.0097, longitude: 20.9716, population: 86000, averageSalaryEur: 800, emigrationDifficulty: "LOW", generalDescription: "Oraș urban activ în nord-vestul țării." },

    { countrySlug: "norvegia", name: "Oslo", slug: "oslo", region: "Oslo", latitude: 59.9139, longitude: 10.7522, population: 717000, averageSalaryEur: 5600, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală nordică cu salarii ridicate și servicii avansate." },
    { countrySlug: "norvegia", name: "Bergen", slug: "bergen", region: "Vestland", latitude: 60.3913, longitude: 5.3221, population: 289000, averageSalaryEur: 5000, emigrationDifficulty: "MEDIUM", generalDescription: "Centru economic vestic în energie și servicii maritime." },
    { countrySlug: "norvegia", name: "Trondheim", slug: "trondheim", region: "Trondelag", latitude: 63.4305, longitude: 10.3951, population: 212000, averageSalaryEur: 4800, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș universitar și tehnologic important." },

    { countrySlug: "polonia", name: "Varșovia", slug: "varsovia", region: "Mazovia", latitude: 52.2297, longitude: 21.0122, population: 1860000, averageSalaryEur: 2100, emigrationDifficulty: "LOW", generalDescription: "Capitala și cel mai mare hub economic al Poloniei." },
    { countrySlug: "polonia", name: "Cracovia", slug: "cracovia", region: "Polonia Mică", latitude: 50.0647, longitude: 19.945, population: 805000, averageSalaryEur: 1900, emigrationDifficulty: "LOW", generalDescription: "Centru universitar, cultural și IT în sudul Poloniei." },
    { countrySlug: "polonia", name: "Wroclaw", slug: "wroclaw", region: "Silezia Inferioară", latitude: 51.1079, longitude: 17.0385, population: 675000, averageSalaryEur: 1900, emigrationDifficulty: "LOW", generalDescription: "Oraș dinamic cu servicii, tech și industrie." },

    { countrySlug: "romania", name: "București", slug: "bucuresti", region: "București", latitude: 44.4268, longitude: 26.1025, population: 1710000, averageSalaryEur: 1800, emigrationDifficulty: "LOW", generalDescription: "Principalul centru economic, IT și administrativ al României." },
    { countrySlug: "romania", name: "Cluj-Napoca", slug: "cluj-napoca", region: "Cluj", latitude: 46.7712, longitude: 23.6236, population: 287000, averageSalaryEur: 1700, emigrationDifficulty: "LOW", generalDescription: "Centru major de tehnologie și educație." },
    { countrySlug: "romania", name: "Timișoara", slug: "timisoara", region: "Timiș", latitude: 45.7489, longitude: 21.2087, population: 250000, averageSalaryEur: 1600, emigrationDifficulty: "LOW", generalDescription: "Oraș industrial și IT cu legături puternice vest-europene." },

    { countrySlug: "rusia", name: "Moscova", slug: "moscova", region: "Moscova", latitude: 55.7558, longitude: 37.6173, population: 13000000, averageSalaryEur: 1700, emigrationDifficulty: "HIGH", generalDescription: "Capitala și principalul centru financiar al Rusiei." },
    { countrySlug: "rusia", name: "Sankt Petersburg", slug: "sankt-petersburg", region: "Nord-Vest", latitude: 59.9311, longitude: 30.3609, population: 5600000, averageSalaryEur: 1500, emigrationDifficulty: "HIGH", generalDescription: "Centru cultural și economic major în nordul Rusiei." },
    { countrySlug: "rusia", name: "Kazan", slug: "kazan", region: "Tatarstan", latitude: 55.7903, longitude: 49.1347, population: 1310000, averageSalaryEur: 1200, emigrationDifficulty: "HIGH", generalDescription: "Oraș regional important cu industrie și servicii." },

    { countrySlug: "san-marino", name: "San Marino", slug: "san-marino-oras", region: "San Marino", latitude: 43.9424, longitude: 12.4578, population: 4500, averageSalaryEur: 2400, emigrationDifficulty: "MEDIUM", generalDescription: "Capitala istorică a republicii San Marino." },
    { countrySlug: "san-marino", name: "Serravalle", slug: "serravalle", region: "Serravalle", latitude: 43.9688, longitude: 12.4811, population: 11000, averageSalaryEur: 2300, emigrationDifficulty: "MEDIUM", generalDescription: "Cea mai populată zonă urbană din San Marino." },
    { countrySlug: "san-marino", name: "Borgo Maggiore", slug: "borgo-maggiore", region: "Borgo Maggiore", latitude: 43.9419, longitude: 12.4474, population: 6800, averageSalaryEur: 2250, emigrationDifficulty: "MEDIUM", generalDescription: "Centru comercial și administrativ local." },

    { countrySlug: "serbia", name: "Belgrad", slug: "belgrad", region: "Belgrad", latitude: 44.7866, longitude: 20.4489, population: 1400000, averageSalaryEur: 1150, emigrationDifficulty: "LOW", generalDescription: "Capitala și principalul hub economic al Serbiei." },
    { countrySlug: "serbia", name: "Novi Sad", slug: "novi-sad", region: "Vojvodina", latitude: 45.2671, longitude: 19.8335, population: 250000, averageSalaryEur: 1000, emigrationDifficulty: "LOW", generalDescription: "Centru universitar și de servicii în nordul țării." },
    { countrySlug: "serbia", name: "Niš", slug: "nis", region: "Nišava", latitude: 43.3209, longitude: 21.8958, population: 183000, averageSalaryEur: 900, emigrationDifficulty: "LOW", generalDescription: "Oraș regional cu industrie și logistică." },

    { countrySlug: "slovacia", name: "Bratislava", slug: "bratislava", region: "Bratislava", latitude: 48.1486, longitude: 17.1077, population: 475000, averageSalaryEur: 2000, emigrationDifficulty: "LOW", generalDescription: "Capitală central-europeană cu servicii și industrie." },
    { countrySlug: "slovacia", name: "Kosice", slug: "kosice", region: "Kosice", latitude: 48.7164, longitude: 21.2611, population: 230000, averageSalaryEur: 1700, emigrationDifficulty: "LOW", generalDescription: "Centru estic important pentru IT și servicii." },
    { countrySlug: "slovacia", name: "Zilina", slug: "zilina", region: "Zilina", latitude: 49.223, longitude: 18.7394, population: 81000, averageSalaryEur: 1600, emigrationDifficulty: "LOW", generalDescription: "Oraș industrial și logistic în nordul Slovaciei." },

    { countrySlug: "slovenia", name: "Ljubljana", slug: "ljubljana", region: "Ljubljana", latitude: 46.0569, longitude: 14.5058, population: 295000, averageSalaryEur: 2200, emigrationDifficulty: "LOW", generalDescription: "Capitală compactă cu servicii și tehnologie." },
    { countrySlug: "slovenia", name: "Maribor", slug: "maribor", region: "Podravska", latitude: 46.5547, longitude: 15.6459, population: 97000, averageSalaryEur: 1900, emigrationDifficulty: "LOW", generalDescription: "Centru regional în nord-estul Sloveniei." },
    { countrySlug: "slovenia", name: "Celje", slug: "celje", region: "Savinjska", latitude: 46.2397, longitude: 15.2677, population: 38000, averageSalaryEur: 1800, emigrationDifficulty: "LOW", generalDescription: "Oraș cu industrie locală și servicii." },

    { countrySlug: "suedia", name: "Stockholm", slug: "stockholm", region: "Stockholm", latitude: 59.3293, longitude: 18.0686, population: 990000, averageSalaryEur: 4600, emigrationDifficulty: "MEDIUM", generalDescription: "Capitală nordică cu economie bazată pe tech și servicii." },
    { countrySlug: "suedia", name: "Gothenburg", slug: "gothenburg", region: "Vastra Gotaland", latitude: 57.7089, longitude: 11.9746, population: 605000, averageSalaryEur: 4200, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș-port major cu industrie și logistică." },
    { countrySlug: "suedia", name: "Malmö", slug: "malmo", region: "Skane", latitude: 55.605, longitude: 13.0038, population: 360000, averageSalaryEur: 4000, emigrationDifficulty: "MEDIUM", generalDescription: "Centru urban conectat la regiunea Oresund." },

    { countrySlug: "elvetia", name: "Zurich", slug: "zurich", region: "Zurich", latitude: 47.3769, longitude: 8.5417, population: 443000, averageSalaryEur: 7000, emigrationDifficulty: "MEDIUM", generalDescription: "Centru financiar global cu salarii foarte ridicate." },
    { countrySlug: "elvetia", name: "Geneva", slug: "geneva", region: "Geneva", latitude: 46.2044, longitude: 6.1432, population: 203000, averageSalaryEur: 6900, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș internațional cu instituții globale și servicii premium." },
    { countrySlug: "elvetia", name: "Basel", slug: "basel", region: "Basel-Stadt", latitude: 47.5596, longitude: 7.5886, population: 178000, averageSalaryEur: 6500, emigrationDifficulty: "MEDIUM", generalDescription: "Centru pharma și logistic în nord-vestul Elveției." },

    { countrySlug: "turcia", name: "Istanbul", slug: "istanbul", region: "Marmara", latitude: 41.0082, longitude: 28.9784, population: 15600000, averageSalaryEur: 1300, emigrationDifficulty: "MEDIUM", generalDescription: "Cel mai mare hub economic și logistic al Turciei." },
    { countrySlug: "turcia", name: "Ankara", slug: "ankara", region: "Anatolia Centrală", latitude: 39.9334, longitude: 32.8597, population: 5700000, averageSalaryEur: 1200, emigrationDifficulty: "MEDIUM", generalDescription: "Capitala administrativă și centru universitar." },
    { countrySlug: "turcia", name: "Izmir", slug: "izmir", region: "Egeea", latitude: 38.4237, longitude: 27.1428, population: 4400000, averageSalaryEur: 1150, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș-port major cu servicii, industrie și turism." },

    { countrySlug: "ucraina", name: "Kiev", slug: "kiev", region: "Kiev", latitude: 50.4501, longitude: 30.5234, population: 2950000, averageSalaryEur: 950, emigrationDifficulty: "MEDIUM", generalDescription: "Capitala și centrul economic principal al Ucrainei." },
    { countrySlug: "ucraina", name: "Lviv", slug: "lviv", region: "Lviv", latitude: 49.8397, longitude: 24.0297, population: 717000, averageSalaryEur: 850, emigrationDifficulty: "MEDIUM", generalDescription: "Oraș regional cu servicii, IT și cultură." },
    { countrySlug: "ucraina", name: "Odesa", slug: "odesa", region: "Odesa", latitude: 46.4825, longitude: 30.7233, population: 1010000, averageSalaryEur: 850, emigrationDifficulty: "MEDIUM", generalDescription: "Centru portuar strategic la Marea Neagră." },

    { countrySlug: "regatul-unit", name: "Londra", slug: "londra", region: "Anglia", latitude: 51.5072, longitude: -0.1276, population: 9000000, averageSalaryEur: 4500, emigrationDifficulty: "HIGH", generalDescription: "Centru global pentru finanțe, tech și servicii profesionale." },
    { countrySlug: "regatul-unit", name: "Manchester", slug: "manchester", region: "Anglia", latitude: 53.4808, longitude: -2.2426, population: 560000, averageSalaryEur: 3300, emigrationDifficulty: "HIGH", generalDescription: "Hub urban în creștere pentru tech și servicii." },
    { countrySlug: "regatul-unit", name: "Birmingham", slug: "birmingham", region: "Anglia", latitude: 52.4862, longitude: -1.8904, population: 1150000, averageSalaryEur: 3200, emigrationDifficulty: "HIGH", generalDescription: "Centru industrial și logistic major în UK." },

    { countrySlug: "vatican", name: "Vatican", slug: "vatican-city", region: "Vatican", latitude: 41.9029, longitude: 12.4534, population: 800, averageSalaryEur: 2400, emigrationDifficulty: "HIGH", generalDescription: "Nucleul administrativ și religios al Vaticanului." },
    { countrySlug: "vatican", name: "Zona Sf. Petru", slug: "zona-sfantul-petru", region: "Vatican", latitude: 41.9022, longitude: 12.4539, population: 500, averageSalaryEur: 2350, emigrationDifficulty: "HIGH", generalDescription: "Perimetru instituțional și turistic în jurul bazilicii." },
    { countrySlug: "vatican", name: "Grădinile Vaticanului", slug: "gradinile-vaticanului", region: "Vatican", latitude: 41.9012, longitude: 12.4482, population: 300, averageSalaryEur: 2300, emigrationDifficulty: "HIGH", generalDescription: "Zonă internă administrativă și rezidențială restrânsă." },
  ];

  const additionalCountryIds = new Map<string, string>();

  for (const country of additionalEuropeanCountries) {
    const countryRecord = await prisma.country.upsert({
      where: { slug: country.slug },
      update: {
        name: country.name,
        isoCode: country.isoCode,
        continent: "Europa",
        capital: country.capital,
        currency: country.currency,
        officialLanguage: country.officialLanguage,
        predominantReligion: country.predominantReligion,
        latitude: country.latitude,
        longitude: country.longitude,
        romanianCommunityNotes:
          "Comunitățile românești sunt prezente în principalele centre urbane și variază în funcție de regiune.",
        jobMarketNotes:
          "Piața muncii diferă între regiuni; oportunitățile sunt în principal în servicii, industrie și sectorul tehnologic.",
        localLawNotes:
          "Cetățenii UE trebuie să respecte formalitățile administrative locale privind rezidența, fiscalitatea și asigurarea medicală.",
        generalDescription: country.generalDescription,
        citizenshipDifficulty: country.citizenshipDifficulty,
        emigrationDifficulty: country.emigrationDifficulty,
        averageSalaryEur: country.averageSalaryEur,
        taxLevel: country.taxLevel,
        incomeTaxRate: country.incomeTaxRate,
        isFeatured: false,
      },
      create: {
        name: country.name,
        slug: country.slug,
        isoCode: country.isoCode,
        continent: "Europa",
        capital: country.capital,
        currency: country.currency,
        officialLanguage: country.officialLanguage,
        predominantReligion: country.predominantReligion,
        latitude: country.latitude,
        longitude: country.longitude,
        romanianCommunityNotes:
          "Comunitățile românești sunt prezente în principalele centre urbane și variază în funcție de regiune.",
        jobMarketNotes:
          "Piața muncii diferă între regiuni; oportunitățile sunt în principal în servicii, industrie și sectorul tehnologic.",
        localLawNotes:
          "Cetățenii UE trebuie să respecte formalitățile administrative locale privind rezidența, fiscalitatea și asigurarea medicală.",
        generalDescription: country.generalDescription,
        citizenshipDifficulty: country.citizenshipDifficulty,
        emigrationDifficulty: country.emigrationDifficulty,
        averageSalaryEur: country.averageSalaryEur,
        taxLevel: country.taxLevel,
        incomeTaxRate: country.incomeTaxRate,
        isFeatured: false,
      },
    });

    additionalCountryIds.set(country.slug, countryRecord.id);
  }

  for (const city of additionalEuropeanCities) {
    const countryId = additionalCountryIds.get(city.countrySlug);

    if (!countryId) {
      continue;
    }

    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {
        countryId,
        name: city.name,
        region: city.region,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population,
        generalDescription: city.generalDescription,
        romanianCommunityNotes:
          "Există puncte de sprijin comunitar românesc, în special în zonele urbane mari.",
        jobMarketNotes:
          "Oportunitățile depind de industrie și de sezonalitate, cu cerere crescută în servicii și domenii tehnice.",
        localLawNotes:
          "Sunt necesare proceduri administrative locale pentru contracte, taxe și acces la servicii publice.",
        predominantReligion: null,
        emigrationDifficulty: city.emigrationDifficulty,
        averageSalaryEur: city.averageSalaryEur,
        isFeatured: false,
      },
      create: {
        countryId,
        name: city.name,
        slug: city.slug,
        region: city.region,
        latitude: city.latitude,
        longitude: city.longitude,
        population: city.population,
        generalDescription: city.generalDescription,
        romanianCommunityNotes:
          "Există puncte de sprijin comunitar românesc, în special în zonele urbane mari.",
        jobMarketNotes:
          "Oportunitățile depind de industrie și de sezonalitate, cu cerere crescută în servicii și domenii tehnice.",
        localLawNotes:
          "Sunt necesare proceduri administrative locale pentru contracte, taxe și acces la servicii publice.",
        predominantReligion: null,
        emigrationDifficulty: city.emigrationDifficulty,
        averageSalaryEur: city.averageSalaryEur,
        isFeatured: false,
      },
    });
  }

  const europeanCountries = await prisma.country.findMany({
    where: { continent: "Europa" },
    select: {
      id: true,
      name: true,
      slug: true,
      averageSalaryEur: true,
      cities: {
        select: {
          id: true,
          name: true,
          averageSalaryEur: true,
        },
      },
    },
  });

  for (const country of europeanCountries) {
    const countrySalary = country.averageSalaryEur ?? 1800;
    const countryCost = buildCountryCostFromSalary(countrySalary);

    const existingCountryCost = await prisma.costOfLiving.findFirst({
      where: {
        countryId: country.id,
        cityId: null,
      },
      select: { id: true },
    });

    if (!existingCountryCost) {
      await prisma.costOfLiving.create({
        data: {
          countryId: country.id,
          ...countryCost,
          sourceName: "Model estimativ intern (seed complet Europa)",
          sourceUrl: "https://europa.eu/youreurope/",
          collectedAt: new Date("2026-05-28"),
        },
      });
    }

    const existingWorkVisa = await prisma.visaInfo.findFirst({
      where: {
        countryId: country.id,
        category: "WORK",
      },
      select: { id: true },
    });

    const visaPayload = {
      countryId: country.id,
      category: "WORK" as const,
      title: "Drept de ședere și muncă - ghid orientativ",
      summary: `Pentru ${country.name}, pașii de relocare diferă în funcție de statutul legal, dar includ de regulă formalități de rezidență, fiscalitate și acces la asigurare medicală.`,
      legalSteps: [
        "Înregistrarea adresei de domiciliu conform regulilor locale.",
        "Obținerea codului/numărului fiscal local.",
        "Înregistrarea pentru asigurare medicală și/sau socială.",
        "Înregistrarea contractului de muncă sau a activității independente.",
      ],
      requiredDocuments: [
        "Document de identitate valabil",
        "Dovadă adresă locală",
        "Contract de muncă sau dovadă venit",
        "Formulare administrative cerute local",
      ],
      estimatedDuration: "2-8 săptămâni, în funcție de regiune și fluxul administrativ",
      officialUrl: "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
      isActive: true,
    };

    if (existingWorkVisa) {
      await prisma.visaInfo.update({
        where: { id: existingWorkVisa.id },
        data: visaPayload,
      });
    } else {
      await prisma.visaInfo.create({
        data: visaPayload,
      });
    }

    for (const city of country.cities) {
      const citySalary = city.averageSalaryEur ?? countrySalary;
      const cityCost = buildCityCostFromSalary(citySalary);

      const existingCityCost = await prisma.costOfLiving.findFirst({
        where: { cityId: city.id },
        select: { id: true },
      });

      if (!existingCityCost) {
        await prisma.costOfLiving.create({
          data: {
            cityId: city.id,
            ...cityCost,
            sourceName: "Model estimativ intern (seed complet Europa)",
            sourceUrl: "https://europa.eu/youreurope/",
            collectedAt: new Date("2026-05-28"),
          },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
