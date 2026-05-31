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

type Difficulty = "SCAZUTA" | "MEDIE" | "RIDICATA" | "FOARTE_RIDICATA";

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
  population?: number;
  citizenshipDifficulty: Difficulty;
  emigrationDifficulty: Difficulty;
  generalDescription: string;
  // Legacy/removed fields may still appear in seed data; accept them and ignore later.
  taxLevel?: "LOW" | "MEDIUM" | "HIGH";
  incomeTaxRate?: number;
  romanianCommunityNotes?: string;
  localLawNotes?: string;
  jobMarketNotes?: string;
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
  generalDescription: string;
};

const countryDifficultyAssessments: Record<
  string,
  {
    citizenshipDifficulty: Difficulty;
    emigrationDifficulty: Difficulty;
  }
> = {
  albania: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  andorra: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  armenia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  austria: { citizenshipDifficulty: "RIDICATA", emigrationDifficulty: "MEDIE" },
  azerbaidjan: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  belarus: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  belgia: { citizenshipDifficulty: "RIDICATA", emigrationDifficulty: "MEDIE" },
  "bosnia-si-hertegovina": {
    citizenshipDifficulty: "MEDIE",
    emigrationDifficulty: "MEDIE",
  },
  bulgaria: {
    citizenshipDifficulty: "MEDIE",
    emigrationDifficulty: "SCAZUTA",
  },
  cehia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  cipru: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  croatia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  danemarca: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  estonia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  finlanda: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  franta: { citizenshipDifficulty: "RIDICATA", emigrationDifficulty: "MEDIE" },
  georgia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  germania: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  grecia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  ungaria: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  islanda: { citizenshipDifficulty: "RIDICATA", emigrationDifficulty: "MEDIE" },
  irlanda: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  italia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  kosovo: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  letonia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  liechtenstein: {
    citizenshipDifficulty: "FOARTE_RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  lituania: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  luxemburg: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  malta: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  moldova: {
    citizenshipDifficulty: "SCAZUTA",
    emigrationDifficulty: "SCAZUTA",
  },
  monaco: {
    citizenshipDifficulty: "FOARTE_RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  muntenegru: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  "macedonia-de-nord": {
    citizenshipDifficulty: "MEDIE",
    emigrationDifficulty: "MEDIE",
  },
  "tarile-de-jos": {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  norvegia: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "MEDIE",
  },
  polonia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  portugalia: {
    citizenshipDifficulty: "MEDIE",
    emigrationDifficulty: "SCAZUTA",
  },
  romania: {
    citizenshipDifficulty: "SCAZUTA",
    emigrationDifficulty: "SCAZUTA",
  },
  rusia: {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  "san-marino": {
    citizenshipDifficulty: "FOARTE_RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  serbia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  slovacia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  slovenia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  spania: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "SCAZUTA" },
  suedia: { citizenshipDifficulty: "RIDICATA", emigrationDifficulty: "MEDIE" },
  elvetia: {
    citizenshipDifficulty: "FOARTE_RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  turcia: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "MEDIE" },
  ucraina: { citizenshipDifficulty: "MEDIE", emigrationDifficulty: "RIDICATA" },
  "regatul-unit": {
    citizenshipDifficulty: "RIDICATA",
    emigrationDifficulty: "RIDICATA",
  },
  vatican: {
    citizenshipDifficulty: "FOARTE_RIDICATA",
    emigrationDifficulty: "FOARTE_RIDICATA",
  },
};

const countryNumbeoEstimates: Record<
  string,
  {
    averageSalaryEur: number | null;
    totalMonthlyCostEur: number | null;
  }
> = {
  albania: {
    averageSalaryEur: 634,
    totalMonthlyCostEur: 610,
  },
  andorra: {
    averageSalaryEur: 2587,
    totalMonthlyCostEur: 766,
  },
  armenia: {
    averageSalaryEur: 629,
    totalMonthlyCostEur: 609,
  },
  austria: {
    averageSalaryEur: 2604,
    totalMonthlyCostEur: 1062,
  },
  azerbaidjan: {
    averageSalaryEur: 375,
    totalMonthlyCostEur: 454,
  },
  belarus: {
    averageSalaryEur: 668,
    totalMonthlyCostEur: 492,
  },
  belgia: {
    averageSalaryEur: 2625,
    totalMonthlyCostEur: 960,
  },
  "bosnia-si-hertegovina": {
    averageSalaryEur: 734,
    totalMonthlyCostEur: 588,
  },
  bulgaria: {
    averageSalaryEur: 1002,
    totalMonthlyCostEur: 610,
  },
  cehia: {
    averageSalaryEur: 1564,
    totalMonthlyCostEur: 778,
  },
  cipru: {
    averageSalaryEur: 1623,
    totalMonthlyCostEur: 851,
  },
  croatia: {
    averageSalaryEur: 1370,
    totalMonthlyCostEur: 760,
  },
  danemarca: {
    averageSalaryEur: 3661,
    totalMonthlyCostEur: 1122,
  },
  estonia: {
    averageSalaryEur: 1650,
    totalMonthlyCostEur: 869,
  },
  finlanda: {
    averageSalaryEur: 2635,
    totalMonthlyCostEur: 1006,
  },
  franta: {
    averageSalaryEur: 2455,
    totalMonthlyCostEur: 1003,
  },
  georgia: {
    averageSalaryEur: 482,
    totalMonthlyCostEur: 512,
  },
  germania: {
    averageSalaryEur: 2961,
    totalMonthlyCostEur: 998,
  },
  grecia: {
    averageSalaryEur: 1021,
    totalMonthlyCostEur: 858,
  },
  ungaria: {
    averageSalaryEur: 1213,
    totalMonthlyCostEur: 730,
  },
  islanda: {
    averageSalaryEur: 3953,
    totalMonthlyCostEur: 1230,
  },
  irlanda: {
    averageSalaryEur: 3064,
    totalMonthlyCostEur: 1105,
  },
  italia: {
    averageSalaryEur: 1685,
    totalMonthlyCostEur: 893,
  },
  kosovo: {
    averageSalaryEur: 528,
    totalMonthlyCostEur: 460,
  },
  letonia: {
    averageSalaryEur: 1151,
    totalMonthlyCostEur: 788,
  },
  liechtenstein: {
    averageSalaryEur: 8462,
    totalMonthlyCostEur: 1400,
  },
  lituania: {
    averageSalaryEur: 1385,
    totalMonthlyCostEur: 748,
  },
  luxemburg: {
    averageSalaryEur: 4812,
    totalMonthlyCostEur: 1109,
  },
  malta: {
    averageSalaryEur: 1608,
    totalMonthlyCostEur: 910,
  },
  moldova: {
    averageSalaryEur: 658,
    totalMonthlyCostEur: 490,
  },
  monaco: {
    averageSalaryEur: 8213,
    totalMonthlyCostEur: 1394,
  },
  muntenegru: {
    averageSalaryEur: 906,
    totalMonthlyCostEur: 608,
  },
  "macedonia-de-nord": {
    averageSalaryEur: 669,
    totalMonthlyCostEur: 507,
  },
  "tarile-de-jos": {
    averageSalaryEur: 3395,
    totalMonthlyCostEur: 1063,
  },
  norvegia: {
    averageSalaryEur: 3602,
    totalMonthlyCostEur: 1110,
  },
  polonia: {
    averageSalaryEur: 1492,
    totalMonthlyCostEur: 778,
  },
  portugalia: {
    averageSalaryEur: 1153,
    totalMonthlyCostEur: 748,
  },
  romania: {
    averageSalaryEur: 920,
    totalMonthlyCostEur: 652,
  },
  rusia: {
    averageSalaryEur: 843,
    totalMonthlyCostEur: 628,
  },
  "san-marino": {
    averageSalaryEur: 3452,
    totalMonthlyCostEur: 900,
  },
  serbia: {
    averageSalaryEur: 839,
    totalMonthlyCostEur: 618,
  },
  slovacia: {
    averageSalaryEur: 1161,
    totalMonthlyCostEur: 778,
  },
  slovenia: {
    averageSalaryEur: 1506,
    totalMonthlyCostEur: 831,
  },
  spania: {
    averageSalaryEur: 1762,
    totalMonthlyCostEur: 775,
  },
  suedia: {
    averageSalaryEur: 2838,
    totalMonthlyCostEur: 986,
  },
  elvetia: {
    averageSalaryEur: 6401,
    totalMonthlyCostEur: 1473,
  },
  turcia: {
    averageSalaryEur: 706,
    totalMonthlyCostEur: 568,
  },
  ucraina: {
    averageSalaryEur: 424,
    totalMonthlyCostEur: 414,
  },
  "regatul-unit": {
    averageSalaryEur: 2927,
    totalMonthlyCostEur: 980,
  },
  vatican: {
    averageSalaryEur: null,
    totalMonthlyCostEur: null,
  },
};

const countryDescriptions: Record<string, string> = {
  albania:
    "Albania este situată în sud-estul Europei, în vestul Balcanilor, și are granițe cu Macedonia la est, Grecia la sud și Kosovo și Muntenegru la nord. Are acces la Marea Adriatică și Marea Ionică la vest și sud-vest, fiind la mai puțin de 72 de kilometri distanță de Italia. Oferă costuri de viață mai reduse și oportunități în servicii, turism și construcții.",
  andorra:
    "Andorra este situată în Munții Pirinei, între Franța și Spania. Economia se bazează pe turism, retail și servicii financiare; oferă oportunități în ospitalitate și comerț, iar costurile pot fi ridicate în zonele turistice.",
  armenia:
    "Armenia se află la intersecția dintre Europa și Asia, în regiunea Caucazului de Sud, și are granițe cu Georgia, Azerbaidjan, Turcia și Iran. Dezvoltă un sector IT în creștere și servicii locale; costurile de viață sunt în general reduse.",
  austria:
    "Austria este situată în Europa Centrală, învecinată cu Germania, Cehia, Slovacia, Ungaria, Slovenia, Italia, Elveția și Liechtenstein. Oferă stabilitate economică, infrastructură performantă și oportunități în industrie, sănătate și servicii; costurile sunt moderate spre ridicate.",
  azerbaidjan:
    "Azerbaidjan se întinde în regiunea Caucazului, la Marea Caspică, și are o economie puternic legată de energie; există oportunități în infrastructură, servicii și dezvoltare urbană.",
  bulgaria:
    "Bulgaria este situată în sud-estul Europei, la Marea Neagră, și are granițe cu România, Serbia, Macedonia de Nord, Grecia și Turcia. Oferă costuri reduse și oportunități în IT, outsourcing, agricultură și turism.",
  croatia:
    "Croația se întinde de-a lungul coastei Mării Adriatice în sud-estul Europei, având granițe cu Slovenia, Ungaria, Serbia și Bosnia. Turismul, porturile și serviciile maritime sunt sectoare cheie; costurile variază între litoral și interior.",
  cipru:
    "Cipru este o insulă din estul Mării Mediterane, cu poziție strategică între Europa și Orientul Mijlociu. Economia este axată pe turism, servicii financiare și shipping; costurile pot fi moderate spre ridicate în zonele turistice.",
  cehia:
    "Cehia este situată în Europa Centrală, între Germania, Polonia, Slovacia și Austria. Are o industrie puternică în producție, automotive și IT, cu costuri de viață moderate și un sector de servicii dinamic.",
  danemarca:
    "Danemarca se află în Europa de Nord, compusă din peninsula Jutlanda și multe insule, având graniță terestră cu Germania. Oferă salarii ridicate, servicii publice solide și oportunități în tehnologie și energie verde; costurile sunt ridicate.",
  estonia:
    "Estonia este o țară baltică la Marea Baltică, recunoscută pentru digitalizare și un mediu prietenos pentru startup-uri; oferă oportunități în tehnologie și servicii cu costuri moderate.",
  finlanda:
    "Finlanda este situată în nordul Europei, între Suedia și Rusia, cu ieșire la Marea Baltică. Oferă calitate ridicată a vieții și oportunități în tehnologie, industrie și servicii; costurile sunt ridicate.",
  georgia:
    "Georgia se află în regiunea Caucazului, la Marea Neagră, și are granițe cu Turcia, Armenia, Azerbaidjan și Rusia. Oferă costuri de viață reduse și oportunități în turism, servicii și agricultură.",
  grecia:
    "Grecia este situată în sud-estul Europei, cu numeroase insule în Marea Mediterană, și are granițe cu Albania, Macedonia de Nord, Bulgaria și Turcia. Economia este puternic orientată spre turism și servicii; costurile variază mult între regiuni.",
  ungaria:
    "Ungaria este situată în Europa Centrală, în bazinul Carpatin, având granițe cu Austria, Slovacia, Ucraina, România, Serbia, Croația și Slovenia. Economia este diversificată, cu oportunități în IT, producție și servicii; costurile sunt moderate.",
  islanda:
    "Islanda este o insulă în Nordul Atlanticului, cunoscută pentru resursele de energie geotermală și pescuit. Oferă salarii ridicate și oportunități în energie, pescuit și turism; costurile sunt ridicate.",
  irlanda:
    "Irlanda este o insulă în vestul Europei, la Oceanul Atlantic, și găzduiește centre importante pentru tehnologie, pharma și servicii financiare; costurile în capitală sunt ridicate.",
  kosovo:
    "Kosovo este situat în Peninsula Balcanică și are granițe cu Serbia, Albania, Macedonia de Nord și Muntenegru. Oferă costuri de viață reduse și oportunități în servicii, comerț și sectoare publice.",
  letonia:
    "Letonia este o țară baltică la Marea Baltică, între Estonia și Lituania. Are un sector deschis orientat spre servicii, transport și tehnologie; costurile sunt moderate.",
  liechtenstein:
    "Liechtenstein este un microstat alpin între Elveția și Austria, cu economie axată pe industrie și servicii financiare; oferă costuri și salarii ridicate.",
  lituania:
    "Lituania este situată în regiunea baltică, cu acces la Marea Baltică; are un ecosistem tech în creștere și oportunități în servicii și logistică.",
  luxemburg:
    "Luxemburg este un mic stat în Europa de Vest, între Belgia, Franța și Germania, cunoscut pentru sectorul financiar și salariile ridicate; costurile sunt ridicate.",
  malta:
    "Malta este o insulă din Marea Mediterană, la sud de Sicilia, cu economie axată pe turism, gaming, fintech și servicii; costurile sunt moderate spre ridicate în zonele urbane.",
  moldova:
    "Moldova se află între România și Ucraina în Europa de Est; oferă costuri de viață reduse și oportunități în agricultură, servicii și IT local.",
  monaco:
    "Monaco este un microstat pe Coasta de Azur, orientat spre servicii financiare și turism de lux; costurile sunt foarte ridicate.",
  muntenegru:
    "Muntenegru este situat pe coasta Mării Adriatice în Peninsula Balcanică, oferind oportunități în turism, servicii și imobiliare; costurile sunt moderate.",
  "macedonia-de-nord":
    "Macedonia de Nord este situată în Peninsula Balcanică, având granițe cu Kosovo, Serbia, Bulgaria, Grecia și Albania. Oferă costuri reduse și oportunități în servicii, industrie ușoară și agricultură.",
  norvegia:
    "Norvegia este situată în Peninsula Scandinavă, având granițe cu Suedia, Finlanda și Rusia; este cunoscută pentru resurse energetice, salarii ridicate și costuri de viață ridicate.",
  polonia:
    "Polonia este situată în Europa Centrală și de Est, având granițe cu Germania, Cehia, Slovacia, Ucraina, Belorusia și Lituania; este o economie dinamică în industrie și servicii, cu costuri moderate.",
  romania:
    "România este situată în sud-estul Europei, cuprinzând regiuni istorice precum Transilvania și Muntenia și având granițe cu Bulgaria, Serbia, Ungaria, Ucraina și Moldova. Oferă centre IT puternice și oportunități în servicii, industrie și agricultură; costurile sunt moderate.",
  rusia:
    "Rusia se întinde între Europa și Asia, fiind cel mai mare stat terestru din lume, cu piețe urbane mari în Moscova și Sankt Petersburg; oferă oportunități în energie, industrie și servicii, cu costuri foarte variabile.",
  "san-marino":
    "San Marino este un microstat înconjurat de Italia, cu economie orientată spre servicii și turism; are costuri moderate spre ridicate în zonele turistice.",
  serbia:
    "Serbia este situată în sud-estul Europei, în Peninsula Balcanică, cu granițe la Ungaria, România, Bulgaria, Macedonia de Nord, Kosovo, Bosnia și Croația. Oferă costuri moderate și oportunități în servicii, IT și producție.",
  slovacia:
    "Slovacia este situată în Europa Centrală, între Polonia, Cehia, Austria, Ungaria și Ucraina; are o economie industrială puternică și cerere în automotive și servicii.",
  slovenia:
    "Slovenia se află la interferența Alpilor și Mării Adriatice, între Italia, Austria, Ungaria și Croația; oferă un echilibru bun între costuri, servicii publice și oportunități în industrie și turism.",
  suedia:
    "Suedia este situată în Peninsula Scandinavă, între Norvegia și Finlanda, cu coastă la Marea Baltică; are economie avansată în tehnologie, industrie și servicii publice, dar costurile sunt ridicate.",
  elvetia:
    "Elveția este situată în Europa Centrală, la poalele Alpilor, și are granițe cu Germania, Franța, Italia și Austria. Oferă salarii foarte ridicate și oportunități în finanțe, pharma și tehnologie; costurile sunt foarte ridicate.",
  turcia:
    "Turcia este o țară transcontinentală cu partea europeană în Tracia și o mare parte în Anatolia; are ieșire la Marea Egee, Marea Mediterană și Marea Neagră. Oferă piețe mari, industrie diversificată și oportunități în servicii și comerț.",
  ucraina:
    "Ucraina este situată în Europa de Est, mărginită de Rusia, Belarus, Polonia, Slovacia, Ungaria, România și Moldova; are un potențial agricol și industrial mare, cu oportunități în reconstrucție și servicii.",
  "regatul-unit":
    "Regatul Unit este o insulă în vestul Europei, compus din Anglia, Scoția, Țara Galilor și Irlanda de Nord; are centre globale în finanțe, tehnologie și servicii, în special în Londra.",
  vatican:
    "Vaticanul este un microstat în inima Romei, nucleul administrativ și spiritual al Bisericii Catolice; activitatea economică este foarte restrânsă și axată pe servicii religioase și turism.",
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
      generalDescription:
        "Germania este situată în Europa Centrală, mărginită de Danemarca la nord, Polonia și Cehia la est, Austria și Elveția la sud, și Franța, Luxemburg, Belgia și Țările de Jos la vest. Este o putere industrială și tehnologică cu oportunități în inginerie, IT, producție și servicii; costurile de viață sunt moderate spre ridicate.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 3123,
      population: 83200000,
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
      generalDescription:
        "Germania rămâne una dintre cele mai stabile destinații europene pentru muncă și relocare pe termen lung.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 3123,
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
      generalDescription:
        "Țările de Jos sunt situate în Europa de Vest, pe coasta Mării Nordului, având granițe cu Germania și Belgia. Oferă infrastructură excelentă, porturi și un sector logistic dezvoltat, cu oportunități în tehnologie, logistică și servicii; costurile de viață sunt ridicate în orașele mari.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 4335,
      population: 17950000,
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
      generalDescription:
        "Țările de Jos oferă o piață a muncii competitivă, infrastructură foarte bună și servicii publice eficiente.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 4335,
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
      generalDescription:
        "Spania este situată în sud-vestul Europei, ocupând mare parte din Peninsula Iberică, având graniță cu Portugalia și Franța și ieșire la Marea Mediterană și Oceanul Atlantic. Oferă oportunități în turism, servicii, logistică și agrobusiness; costurile variază mult între regiuni.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1763,
      population: 48680000,
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
      generalDescription:
        "Spania oferă un echilibru bun între costul vieții, climă și integrarea în comunități internaționale.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1763,
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

      generalDescription:
        "Franța se află în Europa de Vest, între Oceanul Atlantic și Marea Mediterană, având granițe cu mai multe state europene. Economia este diversificată, cu oportunități în servicii, industrie, agricultură și tehnologie; costurile depind de regiune.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 2740,
      population: 68400000,
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

      generalDescription:
        "Franța oferă o economie mare și diversificată, cu oportunități solide în marile centre urbane.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      averageSalaryEur: 2740,
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

      generalDescription:
        "Italia este situată în sudul Europei, pe Peninsula Italică, cu numeroase ieșiri la Marea Mediterană și granițe cu Franța, Elveția, Austria și Slovenia. Oferă oportunități în turism, industrie, producție și servicii; costul vieții variază semnificativ nord-sud.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1900,
      population: 58990000,
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
      generalDescription:
        "Italia combină centre economice dezvoltate cu un cost al vieții variabil între nord și sud.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1900,
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
      generalDescription:
        "Portugalia se află în vestul Peninsulei Iberice, la Oceanul Atlantic, având graniță doar cu Spania. Este atractivă pentru climă și turism, cu oportunități în servicii, tehnologie și ospitalitate; costurile sunt în general moderate.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1330,
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
      generalDescription:
        "Portugalia este atractivă pentru climă, siguranță și costuri relativ echilibrate față de alte vest-europene.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      averageSalaryEur: 1330,
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
        "Orasul Berlin este situat in regiunea cu acelasi nume. Pentru Berlin, rolul administrativ asociat regiunii Berlin in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu grupuri profesionale și evenimente culturale.",
      jobMarketNotes: "Cerere puternică în IT, sănătate, logistică și roluri administrative.",
      averageSalaryEur: 3102,
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
        "Orasul Berlin este situat in regiunea cu acelasi nume. Pentru Berlin, rolul administrativ asociat regiunii Berlin in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu grupuri profesionale și evenimente culturale.",
      jobMarketNotes: "Cerere puternică în IT, sănătate, logistică și roluri administrative.",
      averageSalaryEur: 3102,
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
        "Orasul Amsterdam este situat in regiunea Olanda de Nord. Pentru Amsterdam, rolul administrativ asociat regiunii Olanda de Nord in Tarile de Jos concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă în Amsterdam și zona Randstad.",
      jobMarketNotes: "Piață competitivă cu roluri bune în tech, data, logistică și servicii internaționale.",
      averageSalaryEur: 4398,
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
        "Orasul Amsterdam este situat in regiunea Olanda de Nord. Pentru Amsterdam, rolul administrativ asociat regiunii Olanda de Nord in Tarile de Jos concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă în Amsterdam și zona Randstad.",
      jobMarketNotes: "Piață competitivă cu roluri bune în tech, data, logistică și servicii internaționale.",
      averageSalaryEur: 4398,
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
        "Orasul Madrid este situat in regiunea Comunitatea Madrid. Pentru Madrid, rolul administrativ asociat regiunii Comunitatea Madrid in Spania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și bine integrată.",
      jobMarketNotes: "Cerere în servicii, sănătate, logistică și funcții suport în companii mari.",
      averageSalaryEur: 2200,
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
        "Orasul Madrid este situat in regiunea Comunitatea Madrid. Pentru Madrid, rolul administrativ asociat regiunii Comunitatea Madrid in Spania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și bine integrată.",
      jobMarketNotes: "Cerere în servicii, sănătate, logistică și funcții suport în companii mari.",
      averageSalaryEur: 2200,
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
        "Orasul Paris este situat in regiunea Ile-de-France. Pentru Paris, rolul administrativ asociat regiunii Ile-de-France in Franta concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu rețele profesionale și organizații culturale.",
      jobMarketNotes: "Multe roluri în servicii, consulting, retail premium și sănătate.",
      averageSalaryEur: 3211,
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
        "Orasul Paris este situat in regiunea Ile-de-France. Pentru Paris, rolul administrativ asociat regiunii Ile-de-France in Franta concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu rețele profesionale și organizații culturale.",
      jobMarketNotes: "Multe roluri în servicii, consulting, retail premium și sănătate.",
      averageSalaryEur: 3211,
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
        "Orasul Milano este situat in regiunea Lombardia. Pentru Milano, rolul administrativ asociat regiunii Lombardia in Italia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă în Milano și zona metropolitană.",
      jobMarketNotes: "Piață solidă în modă, design, finanțe și servicii corporate.",
      averageSalaryEur: 1944,
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
        "Orasul Milano este situat in regiunea Lombardia. Pentru Milano, rolul administrativ asociat regiunii Lombardia in Italia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă în Milano și zona metropolitană.",
      jobMarketNotes: "Piață solidă în modă, design, finanțe și servicii corporate.",
      averageSalaryEur: 1944,
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
        "Orasul Lisabona este situat in regiunea cu acelasi nume. Pentru Lisabona, rolul administrativ asociat regiunii Lisabona in Portugalia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească în creștere, activă în servicii și domenii tehnice.",
      jobMarketNotes: "Cerere bună în tech, suport clienți, turism și echipe internaționale.",
      averageSalaryEur: 1374,
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
        "Orasul Lisabona este situat in regiunea cu acelasi nume. Pentru Lisabona, rolul administrativ asociat regiunii Lisabona in Portugalia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească în creștere, activă în servicii și domenii tehnice.",
      jobMarketNotes: "Cerere bună în tech, suport clienți, turism și echipe internaționale.",
      averageSalaryEur: 1374,
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
        "Orasul München este situat in regiunea Bavaria. Pentru München, rolul administrativ asociat regiunii Bavaria in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească bine reprezentată în zona metropolitană München.",
      jobMarketNotes: "Se caută mult ingineri, specialiști tech și personal pentru industrie auto.",
      averageSalaryEur: 3845,
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
        "Orasul München este situat in regiunea Bavaria. Pentru München, rolul administrativ asociat regiunii Bavaria in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească bine reprezentată în zona metropolitană München.",
      jobMarketNotes: "Se caută mult ingineri, specialiști tech și personal pentru industrie auto.",
      averageSalaryEur: 3845,
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
        "Orasul Frankfurt este situat in regiunea Hesse. Frankfurt este prezentat in surse publice ca un centru urban relevant in Germania, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Rhein-Main.",
      jobMarketNotes: "Finanțe, logistică și aeroportul generează cerere constantă pentru roluri specializate.",
      averageSalaryEur: 3767,
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
        "Orasul Frankfurt este situat in regiunea Hesse. Frankfurt este prezentat in surse publice ca un centru urban relevant in Germania, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Rhein-Main.",
      jobMarketNotes: "Finanțe, logistică și aeroportul generează cerere constantă pentru roluri specializate.",
      averageSalaryEur: 3767,
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
        "Orasul Rotterdam este situat in regiunea Olanda de Sud. Dimensiunea urbana a orasului Rotterdam aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în Rotterdam și împrejurimi.",
      jobMarketNotes: "Portul susține joburi în transport, logistică, operațiuni și industrie maritimă.",
      averageSalaryEur: 3703,
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
        "Orasul Rotterdam este situat in regiunea Olanda de Sud. Dimensiunea urbana a orasului Rotterdam aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în Rotterdam și împrejurimi.",
      jobMarketNotes: "Portul susține joburi în transport, logistică, operațiuni și industrie maritimă.",
      averageSalaryEur: 3703,
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
        "Orasul Haga este situat in regiunea Olanda de Sud. Pentru Haga, rolul administrativ asociat regiunii Olanda de Sud in Tarile de Jos concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Haga-Rotterdam.",
      jobMarketNotes: "Cerere în drept, diplomație, organizații internaționale și servicii publice.",
      averageSalaryEur: 3900,
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
        "Orasul Haga este situat in regiunea Olanda de Sud. Pentru Haga, rolul administrativ asociat regiunii Olanda de Sud in Tarile de Jos concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească activă în zona Haga-Rotterdam.",
      jobMarketNotes: "Cerere în drept, diplomație, organizații internaționale și servicii publice.",
      averageSalaryEur: 3900,
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
        "Orasul Barcelona este situat in regiunea Catalonia. Barcelona este prezentat in surse publice ca un centru urban relevant in Spania, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și activă în Barcelona.",
      jobMarketNotes: "Roluri numeroase în turism, servicii, creativ și startupuri digitale.",
      averageSalaryEur: 2040,
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
        "Orasul Barcelona este situat in regiunea Catalonia. Barcelona este prezentat in surse publice ca un centru urban relevant in Spania, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească numeroasă și activă în Barcelona.",
      jobMarketNotes: "Roluri numeroase în turism, servicii, creativ și startupuri digitale.",
      averageSalaryEur: 2040,
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
        "Orasul Valencia este situat in regiunea cu acelasi nume. Pentru Valencia, rolul administrativ asociat regiunii Valencia in Spania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească stabilă și activă în regiune.",
      jobMarketNotes: "Turismul, logistica și producția ușoară mențin o piață de muncă variată.",
      averageSalaryEur: 1725,
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
        "Orasul Valencia este situat in regiunea cu acelasi nume. Pentru Valencia, rolul administrativ asociat regiunii Valencia in Spania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească stabilă și activă în regiune.",
      jobMarketNotes: "Turismul, logistica și producția ușoară mențin o piață de muncă variată.",
      averageSalaryEur: 1725,
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
        "Orasul Lyon este situat in regiunea Auvergne-Rhone-Alpes. Lyon este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească activă în Lyon și zonele apropiate.",
      jobMarketNotes: "Industria, cercetarea și sănătatea aduc oportunități stabile și bine plătite.",
      averageSalaryEur: 2802,
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
        "Orasul Lyon este situat in regiunea Auvergne-Rhone-Alpes. Lyon este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească activă în Lyon și zonele apropiate.",
      jobMarketNotes: "Industria, cercetarea și sănătatea aduc oportunități stabile și bine plătite.",
      averageSalaryEur: 2802,
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
        "Orasul Marseille este situat in regiunea Provence-Alpes-Cote d'Azur. Marseille este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în zona metropolitană Marseille.",
      jobMarketNotes: "Portul și turismul deschid roluri în logistică, transport și servicii.",
      averageSalaryEur: 2134,
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
        "Orasul Marseille este situat in regiunea Provence-Alpes-Cote d'Azur. Marseille este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate românească prezentă în zona metropolitană Marseille.",
      jobMarketNotes: "Portul și turismul deschid roluri în logistică, transport și servicii.",
      averageSalaryEur: 2134,
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
        "Orasul Roma este situat in regiunea Lazio. Pentru Roma, rolul administrativ asociat regiunii Lazio in Italia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească foarte numeroasă și bine organizată.",
      jobMarketNotes: "Administrația, turismul și serviciile publice susțin cererea de angajare.",
      averageSalaryEur: 1817,
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
        "Orasul Roma este situat in regiunea Lazio. Pentru Roma, rolul administrativ asociat regiunii Lazio in Italia concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate românească foarte numeroasă și bine organizată.",
      jobMarketNotes: "Administrația, turismul și serviciile publice susțin cererea de angajare.",
      averageSalaryEur: 1817,
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
        "Orasul Torino este situat in regiunea Piemonte. Torino are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească activă în Torino și suburbii.",
      jobMarketNotes: "Industria auto, ingineria și servicii tehnice rămân principalele direcții.",
      averageSalaryEur: 1789,
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
        "Orasul Torino este situat in regiunea Piemonte. Torino are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească activă în Torino și suburbii.",
      jobMarketNotes: "Industria auto, ingineria și servicii tehnice rămân principalele direcții.",
      averageSalaryEur: 1789,
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
        "Orasul Porto este situat in regiunea cu acelasi nume. Porto are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească prezentă și în creștere în zona Porto.",
      jobMarketNotes: "Turismul, serviciile digitale și activitatea portuară țin piața vie.",
      averageSalaryEur: 1407,
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
        "Orasul Porto este situat in regiunea cu acelasi nume. Porto are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească prezentă și în creștere în zona Porto.",
      jobMarketNotes: "Turismul, serviciile digitale și activitatea portuară țin piața vie.",
      averageSalaryEur: 1407,
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
        "Orasul Coimbra este situat in regiunea cu acelasi nume. Coimbra are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească mai mică, dar activă în zona universitară.",
      jobMarketNotes: "Universitatea și serviciile locale creează roluri pentru studenți și profesioniști juniori.",
      averageSalaryEur: 1212,
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
        "Orasul Coimbra este situat in regiunea cu acelasi nume. Coimbra are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
      romanianCommunityNotes:
        "Comunitate românească mai mică, dar activă în zona universitară.",
      jobMarketNotes: "Universitatea și serviciile locale creează roluri pentru studenți și profesioniști juniori.",
      averageSalaryEur: 1212,
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
      },
    ],
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
      population: 2862000,
      taxLevel: "LOW",
      incomeTaxRate: 23,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Albania este situată în sud-estul Europei, în vestul Balcanilor, și are granițe cu Macedonia la est, Grecia la sud și Kosovo și Muntenegru la nord. Are acces la Marea Adriatică și Marea Ionică la vest și sud-vest, fiind la mai puțin de 72 de kilometri de Italia. Oferă costuri de viață mai reduse și oportunități în servicii, turism și construcții.",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Andorra este situată în Munții Pirinei, între Franța și Spania. Economia se bazează pe turism, retail și servicii financiare; oferă oportunități în ospitalitate și comerț, iar costurile pot fi ridicate în zonele turistice.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Armenia se află la intersecția dintre Europa și Asia, în regiunea Caucazului de Sud, având granițe cu Georgia, Azerbaidjan, Turcia și Iran. Dezvoltă un sector IT în creștere și servicii locale, oferind costuri de viață reduse și oportunități pentru antreprenori și specialiști IT.",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Austria este situată în Europa Centrală, învecinată cu Germania, Cehia, Slovacia, Ungaria, Slovenia, Italia, Elveția și Liechtenstein. Oferă stabilitate economică, infrastructură performantă și oportunități în industrie, sănătate și servicii; costurile sunt moderate spre ridicate.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Azerbaidjan se întinde în regiunea Caucazului, cu coastă la Marea Caspică. Economia este puternic legată de sectorul energetic, dar există oportunități în infrastructură, servicii și dezvoltare urbană; costurile sunt în general moderate.",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Belarus este situată în Europa de Est, între Polonia, Lituania, Letonia, Rusia și Ucraina. Economia este concentrată în industrie și servicii publice; costurile de viață sunt relativ scăzute și există cerere în sectoare industriale și logistice.",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Belgia se află în Europa de Vest, între Franța, Germania, Luxemburg și Țările de Jos, cu acces la Marea Nordului. Este un centru pentru instituții europene, logistică și servicii, oferind oportunități în finanțe, funcții internaționale și logistică; costurile sunt ridicate în Bruxelles.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Bosnia și Herțegovina este situată în Peninsula Balcanică, cu granițe la Croația, Serbia și Muntenegru. Oferă costuri reduse și oportunități în servicii, turism local și industrie; piețele regionale sunt în dezvoltare.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Bulgaria este situată în sud-estul Europei, la Marea Neagră, având granițe cu România, Serbia, Macedonia de Nord, Grecia și Turcia. Oferă costuri de viață reduse și oportunități în IT, outsourcing, agricultură și turism.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Croația este situată în sud-estul Europei, pe coasta Mării Adriatice, cu granițe la Slovenia, Ungaria, Serbia și Bosnia și Herțegovina. Turismul, porturile și serviciile maritime oferă oportunități; costurile variază între litoral și interior.",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "SCAZUTA",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
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
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
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
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Vatican este un microstat religios cu economie instituțională foarte restrânsă.",
    },
  ];

  const additionalEuropeanCities: SeedCity[] = [
    {
      countrySlug: "albania",
      name: "Tirana",
      slug: "tirana",
      region: "Tirana",
      latitude: 41.3275,
      longitude: 19.8187,
      population: 557000,
      averageSalaryEur: 747,
      generalDescription:
        "Orasul Tirana este situat in regiunea cu acelasi nume. Pentru Tirana, rolul administrativ asociat regiunii Tirana in Albania concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "albania",
      name: "Durres",
      slug: "durres",
      region: "Durres",
      latitude: 41.3231,
      longitude: 19.4414,
      population: 122000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Durres este situat in regiunea cu acelasi nume. Durres este prezentat in surse publice ca un centru urban relevant in Albania, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "albania",
      name: "Vlore",
      slug: "vlore",
      region: "Vlore",
      latitude: 40.4661,
      longitude: 19.4914,
      population: 84000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Vlore este situat in regiunea cu acelasi nume. Vlore este prezentat in surse publice ca un centru urban relevant in Albania, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "andorra",
      name: "Andorra la Vella",
      slug: "andorra-la-vella",
      region: "Andorra la Vella",
      latitude: 42.5063,
      longitude: 1.5218,
      population: 23000,
      averageSalaryEur: 2400,
      generalDescription:
        "Orasul Andorra la Vella este situat in regiunea cu acelasi nume. Pentru Andorra la Vella, rolul administrativ asociat regiunii Andorra la Vella in Andorra concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "andorra",
      name: "Escaldes-Engordany",
      slug: "escaldes-engordany",
      region: "Escaldes-Engordany",
      latitude: 42.51,
      longitude: 1.54,
      population: 14000,
      averageSalaryEur: 2300,
      generalDescription:
        "Orasul Escaldes-Engordany este situat in regiunea cu acelasi nume. Escaldes-Engordany este prezentat in surse publice ca un centru urban relevant in Andorra, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "andorra",
      name: "Encamp",
      slug: "encamp",
      region: "Encamp",
      latitude: 42.5347,
      longitude: 1.5801,
      population: 12000,
      averageSalaryEur: 2200,
      generalDescription:
        "Orasul Encamp este situat in regiunea cu acelasi nume. Encamp este prezentat in surse publice ca un centru urban relevant in Andorra, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "armenia",
      name: "Yerevan",
      slug: "yerevan",
      region: "Yerevan",
      latitude: 40.1792,
      longitude: 44.4991,
      population: 1080000,
      averageSalaryEur: 584,
      generalDescription:
        "Orasul Yerevan este situat in regiunea cu acelasi nume. Pentru Yerevan, rolul administrativ asociat regiunii Yerevan in Armenia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "armenia",
      name: "Gyumri",
      slug: "gyumri",
      region: "Shirak",
      latitude: 40.7894,
      longitude: 43.8475,
      population: 110000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Gyumri este situat in regiunea Shirak. Dimensiunea urbana a orasului Gyumri aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "armenia",
      name: "Vanadzor",
      slug: "vanadzor",
      region: "Lori",
      latitude: 40.8128,
      longitude: 44.4883,
      population: 76000,
      averageSalaryEur: 800,
      generalDescription:
        "Orasul Vanadzor este situat in regiunea Lori. Pentru Vanadzor, rolul administrativ asociat regiunii Lori in Armenia concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "austria",
      name: "Viena",
      slug: "viena",
      region: "Viena",
      latitude: 48.2082,
      longitude: 16.3738,
      population: 2000000,
      averageSalaryEur: 2872,
      generalDescription:
        "Orasul Viena este situat in regiunea cu acelasi nume. Pentru Viena, rolul administrativ asociat regiunii Viena in Austria concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "austria",
      name: "Graz",
      slug: "graz",
      region: "Stiria",
      latitude: 47.0707,
      longitude: 15.4395,
      population: 300000,
      averageSalaryEur: 2754,
      generalDescription:
        "Orasul Graz este situat in regiunea Stiria. Pentru Graz, rolul administrativ asociat regiunii Stiria in Austria concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "austria",
      name: "Linz",
      slug: "linz",
      region: "Austria Superioară",
      latitude: 48.3069,
      longitude: 14.2858,
      population: 210000,
      averageSalaryEur: 2536,
      generalDescription:
        "Orasul Linz este situat in regiunea Austria Superioară. Pentru Linz, rolul administrativ asociat regiunii Austria Superioară in Austria concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "azerbaidjan",
      name: "Baku",
      slug: "baku",
      region: "Absheron",
      latitude: 40.4093,
      longitude: 49.8671,
      population: 2300000,
      averageSalaryEur: 459,
      generalDescription:
        "Orasul Baku este situat in regiunea Absheron. Pentru Baku, rolul administrativ asociat regiunii Absheron in Azerbaidjan concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "azerbaidjan",
      name: "Ganja",
      slug: "ganja",
      region: "Ganja",
      latitude: 40.6828,
      longitude: 46.3606,
      population: 330000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Ganja este situat in regiunea cu acelasi nume. Ganja este prezentat in surse publice ca un centru urban relevant in Azerbaidjan, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "azerbaidjan",
      name: "Sumqayit",
      slug: "sumqayit",
      region: "Sumqayit",
      latitude: 40.5897,
      longitude: 49.6686,
      population: 345000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Sumqayit este situat in regiunea cu acelasi nume. Pentru Sumqayit, rolul administrativ asociat regiunii Sumqayit in Azerbaidjan concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "belarus",
      name: "Minsk",
      slug: "minsk",
      region: "Minsk",
      latitude: 53.9,
      longitude: 27.5667,
      population: 2000000,
      averageSalaryEur: 833,
      generalDescription:
        "Orasul Minsk este situat in regiunea cu acelasi nume. Pentru Minsk, rolul administrativ asociat regiunii Minsk in Belarus concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "belarus",
      name: "Gomel",
      slug: "gomel",
      region: "Gomel",
      latitude: 52.4345,
      longitude: 30.9754,
      population: 500000,
      averageSalaryEur: 464,
      generalDescription:
        "Orasul Gomel este situat in regiunea cu acelasi nume. Gomel este prezentat in surse publice ca un centru urban relevant in Belarus, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "belarus",
      name: "Brest",
      slug: "brest-belarus",
      region: "Brest",
      latitude: 52.0976,
      longitude: 23.6878,
      population: 340000,
      averageSalaryEur: 2203,
      generalDescription:
        "Orasul Brest este situat in regiunea cu acelasi nume. Brest este prezentat in surse publice ca un centru urban relevant in Belarus, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "belgia",
      name: "Bruxelles",
      slug: "bruxelles",
      region: "Bruxelles-Capitală",
      latitude: 50.8503,
      longitude: 4.3517,
      population: 1220000,
      averageSalaryEur: 2922,
      generalDescription:
        "Orasul Bruxelles este situat in regiunea Bruxelles-Capitală. Pentru Bruxelles, rolul administrativ asociat regiunii Bruxelles-Capitală in Belgia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "belgia",
      name: "Antwerp",
      slug: "antwerp",
      region: "Flandra",
      latitude: 51.2194,
      longitude: 4.4025,
      population: 530000,
      averageSalaryEur: 2556,
      generalDescription:
        "Orasul Antwerp este situat in regiunea Flandra. Antwerp este prezentat in surse publice ca un centru urban relevant in Belgia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "belgia",
      name: "Ghent",
      slug: "ghent",
      region: "Flandra",
      latitude: 51.0543,
      longitude: 3.7174,
      population: 265000,
      averageSalaryEur: 3400,
      generalDescription:
        "Orasul Ghent este situat in regiunea Flandra. Ghent este prezentat in surse publice ca un centru urban relevant in Belgia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "bosnia-si-hertegovina",
      name: "Sarajevo",
      slug: "sarajevo",
      region: "Sarajevo",
      latitude: 43.8563,
      longitude: 18.4131,
      population: 275000,
      averageSalaryEur: 894,
      generalDescription:
        "Orasul Sarajevo este situat in regiunea cu acelasi nume. Pentru Sarajevo, rolul administrativ asociat regiunii Sarajevo in Bosnia și Herțegovina concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "bosnia-si-hertegovina",
      name: "Banja Luka",
      slug: "banja-luka",
      region: "Republika Srpska",
      latitude: 44.7722,
      longitude: 17.191,
      population: 185000,
      averageSalaryEur: 772,
      generalDescription:
        "Orasul Banja Luka este situat in regiunea Republika Srpska. Dimensiunea urbana a orasului Banja Luka aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "bosnia-si-hertegovina",
      name: "Mostar",
      slug: "mostar",
      region: "Herțegovina",
      latitude: 43.3438,
      longitude: 17.8078,
      population: 105000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Mostar este situat in regiunea Herțegovina. Pentru Mostar, rolul administrativ asociat regiunii Herțegovina in Bosnia și Herțegovina concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "bulgaria",
      name: "Sofia",
      slug: "sofia",
      region: "Sofia",
      latitude: 42.6977,
      longitude: 23.3219,
      population: 1280000,
      averageSalaryEur: 1457,
      generalDescription:
        "Orasul Sofia este situat in regiunea cu acelasi nume. Pentru Sofia, rolul administrativ asociat regiunii Sofia in Bulgaria concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "bulgaria",
      name: "Plovdiv",
      slug: "plovdiv",
      region: "Plovdiv",
      latitude: 42.1354,
      longitude: 24.7453,
      population: 345000,
      averageSalaryEur: 972,
      generalDescription:
        "Orasul Plovdiv este situat in regiunea cu acelasi nume. Pentru Plovdiv, rolul administrativ asociat regiunii Plovdiv in Bulgaria concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "bulgaria",
      name: "Varna",
      slug: "varna",
      region: "Varna",
      latitude: 43.2141,
      longitude: 27.9147,
      population: 335000,
      averageSalaryEur: 1038,
      generalDescription:
        "Orasul Varna este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Varna aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "croatia",
      name: "Zagreb",
      slug: "zagreb",
      region: "Zagreb",
      latitude: 45.815,
      longitude: 15.9819,
      population: 769000,
      averageSalaryEur: 1652,
      generalDescription:
        "Orasul Zagreb este situat in regiunea cu acelasi nume. Pentru Zagreb, rolul administrativ asociat regiunii Zagreb in Croația concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "croatia",
      name: "Split",
      slug: "split",
      region: "Dalmația",
      latitude: 43.5081,
      longitude: 16.4402,
      population: 160000,
      averageSalaryEur: 1450,
      generalDescription:
        "Orasul Split este situat in regiunea Dalmația. Dimensiunea urbana a orasului Split aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "croatia",
      name: "Rijeka",
      slug: "rijeka",
      region: "Primorje-Gorski Kotar",
      latitude: 45.3271,
      longitude: 14.4422,
      population: 108000,
      averageSalaryEur: 1337,
      generalDescription:
        "Orasul Rijeka este situat in regiunea Primorje-Gorski Kotar. Rijeka are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
    },

    {
      countrySlug: "cipru",
      name: "Nicosia",
      slug: "nicosia",
      region: "Nicosia",
      latitude: 35.1856,
      longitude: 33.3823,
      population: 330000,
      averageSalaryEur: 1622,
      generalDescription:
        "Orasul Nicosia este situat in regiunea cu acelasi nume. Pentru Nicosia, rolul administrativ asociat regiunii Nicosia in Cipru concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "cipru",
      name: "Limassol",
      slug: "limassol",
      region: "Limassol",
      latitude: 34.7071,
      longitude: 33.0226,
      population: 240000,
      averageSalaryEur: 2374,
      generalDescription:
        "Orasul Limassol este situat in regiunea cu acelasi nume. Limassol este prezentat in surse publice ca un centru urban relevant in Cipru, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "cipru",
      name: "Larnaca",
      slug: "larnaca",
      region: "Larnaca",
      latitude: 34.9003,
      longitude: 33.6232,
      population: 85000,
      averageSalaryEur: 1650,
      generalDescription:
        "Orasul Larnaca este situat in regiunea cu acelasi nume. Pentru Larnaca, rolul administrativ asociat regiunii Larnaca in Cipru concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "cehia",
      name: "Praga",
      slug: "praga",
      region: "Boemia Centrală",
      latitude: 50.0755,
      longitude: 14.4378,
      population: 1380000,
      averageSalaryEur: 2016,
      generalDescription:
        "Orasul Praga este situat in regiunea Boemia Centrală. Pentru Praga, rolul administrativ asociat regiunii Boemia Centrală in Cehia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "cehia",
      name: "Brno",
      slug: "brno",
      region: "Moravia de Sud",
      latitude: 49.1951,
      longitude: 16.6068,
      population: 400000,
      averageSalaryEur: 1682,
      generalDescription:
        "Orasul Brno este situat in regiunea Moravia de Sud. Brno este prezentat in surse publice ca un centru urban relevant in Cehia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "cehia",
      name: "Ostrava",
      slug: "ostrava",
      region: "Moravia-Silezia",
      latitude: 49.8209,
      longitude: 18.2625,
      population: 285000,
      averageSalaryEur: 1505,
      generalDescription:
        "Orasul Ostrava este situat in regiunea Moravia-Silezia. Pentru Ostrava, rolul administrativ asociat regiunii Moravia-Silezia in Cehia concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "danemarca",
      name: "Copenhaga",
      slug: "copenhaga",
      region: "Hovedstaden",
      latitude: 55.6761,
      longitude: 12.5683,
      population: 653000,
      averageSalaryEur: 4152,
      generalDescription:
        "Orasul Copenhaga este situat in regiunea Hovedstaden. Pentru Copenhaga, rolul administrativ asociat regiunii Hovedstaden in Danemarca concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "danemarca",
      name: "Aarhus",
      slug: "aarhus",
      region: "Midtjylland",
      latitude: 56.1629,
      longitude: 10.2039,
      population: 285000,
      averageSalaryEur: 4400,
      generalDescription:
        "Orasul Aarhus este situat in regiunea Midtjylland. Dimensiunea urbana a orasului Aarhus aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "danemarca",
      name: "Odense",
      slug: "odense",
      region: "Syddanmark",
      latitude: 55.4038,
      longitude: 10.4024,
      population: 180000,
      averageSalaryEur: 3643,
      generalDescription:
        "Orasul Odense este situat in regiunea Syddanmark. Dimensiunea urbana a orasului Odense aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "estonia",
      name: "Tallinn",
      slug: "tallinn",
      region: "Harju",
      latitude: 59.437,
      longitude: 24.7536,
      population: 460000,
      averageSalaryEur: 1881,
      generalDescription:
        "Orasul Tallinn este situat in regiunea Harju. Pentru Tallinn, rolul administrativ asociat regiunii Harju in Estonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "estonia",
      name: "Tartu",
      slug: "tartu",
      region: "Tartu",
      latitude: 58.3776,
      longitude: 26.729,
      population: 98000,
      averageSalaryEur: 1702,
      generalDescription:
        "Orasul Tartu este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Tartu aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "estonia",
      name: "Parnu",
      slug: "parnu",
      region: "Parnu",
      latitude: 58.3859,
      longitude: 24.4971,
      population: 40000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Parnu este situat in regiunea cu acelasi nume. Parnu este prezentat in surse publice ca un centru urban relevant in Estonia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "finlanda",
      name: "Helsinki",
      slug: "helsinki",
      region: "Uusimaa",
      latitude: 60.1699,
      longitude: 24.9384,
      population: 672000,
      averageSalaryEur: 2708,
      generalDescription:
        "Orasul Helsinki este situat in regiunea Uusimaa. Pentru Helsinki, rolul administrativ asociat regiunii Uusimaa in Finlanda concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "finlanda",
      name: "Tampere",
      slug: "tampere",
      region: "Pirkanmaa",
      latitude: 61.4978,
      longitude: 23.761,
      population: 255000,
      averageSalaryEur: 3600,
      generalDescription:
        "Orasul Tampere este situat in regiunea Pirkanmaa. Pentru Tampere, rolul administrativ asociat regiunii Pirkanmaa in Finlanda concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "finlanda",
      name: "Turku",
      slug: "turku",
      region: "Finlanda Propriu-zisă",
      latitude: 60.4518,
      longitude: 22.2666,
      population: 195000,
      averageSalaryEur: 3400,
      generalDescription:
        "Orasul Turku este situat in regiunea Finlanda Propriu-zisă. Pentru Turku, rolul administrativ asociat regiunii Finlanda Propriu-zisă in Finlanda concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "georgia",
      name: "Tbilisi",
      slug: "tbilisi",
      region: "Tbilisi",
      latitude: 41.7151,
      longitude: 44.8271,
      population: 1200000,
      averageSalaryEur: 1000,
      generalDescription:
        "Orasul Tbilisi este situat in regiunea cu acelasi nume. Pentru Tbilisi, rolul administrativ asociat regiunii Tbilisi in Georgia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "georgia",
      name: "Batumi",
      slug: "batumi",
      region: "Adjara",
      latitude: 41.6168,
      longitude: 41.6367,
      population: 180000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Batumi este situat in regiunea Adjara. Pentru Batumi, rolul administrativ asociat regiunii Adjara in Georgia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "georgia",
      name: "Kutaisi",
      slug: "kutaisi",
      region: "Imereti",
      latitude: 42.2662,
      longitude: 42.718,
      population: 135000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Kutaisi este situat in regiunea Imereti. Kutaisi este prezentat in surse publice ca un centru urban relevant in Georgia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "grecia",
      name: "Atena",
      slug: "atena",
      region: "Attica",
      latitude: 37.9838,
      longitude: 23.7275,
      population: 3150000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Atena este situat in regiunea Attica. Pentru Atena, statutul de capitala a Greciei concentreaza administratie, educatie, turism cultural si servicii metropolitane.",
    },
    {
      countrySlug: "grecia",
      name: "Salonic",
      slug: "salonic",
      region: "Macedonia Centrală",
      latitude: 40.6401,
      longitude: 22.9444,
      population: 1100000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Salonic este situat in regiunea Macedonia Centrală. Salonic are un profil de oras-port si centru universitar, cu oportunitati in logistica, servicii, comert si educatie.",
    },
    {
      countrySlug: "grecia",
      name: "Patras",
      slug: "patras",
      region: "Grecia de Vest",
      latitude: 38.2466,
      longitude: 21.7346,
      population: 215000,
      averageSalaryEur: 1350,
      generalDescription:
        "Orasul Patras este situat in regiunea Grecia de Vest. Patras este relevant prin portul sau si prin mediul universitar, care sustin transportul, serviciile si activitatile pentru studenti.",
    },

    {
      countrySlug: "ungaria",
      name: "Budapesta",
      slug: "budapesta",
      region: "Budapesta",
      latitude: 47.4979,
      longitude: 19.0402,
      population: 1750000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Budapesta este situat in regiunea cu acelasi nume. Pentru Budapesta, rolul administrativ asociat regiunii Budapesta in Ungaria concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "ungaria",
      name: "Debrecen",
      slug: "debrecen",
      region: "Hajdu-Bihar",
      latitude: 47.5316,
      longitude: 21.6273,
      population: 200000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul Debrecen este situat in regiunea Hajdu-Bihar. Dimensiunea urbana a orasului Debrecen aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "ungaria",
      name: "Szeged",
      slug: "szeged",
      region: "Csongrad-Csanad",
      latitude: 46.253,
      longitude: 20.1414,
      population: 157000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Szeged este situat in regiunea Csongrad-Csanad. Dimensiunea urbana a orasului Szeged aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "islanda",
      name: "Reykjavik",
      slug: "reykjavik",
      region: "Capital Region",
      latitude: 64.1466,
      longitude: -21.9426,
      population: 140000,
      averageSalaryEur: 4600,
      generalDescription:
        "Orasul Reykjavik este situat in regiunea Capital Region. Pentru Reykjavik, rolul administrativ asociat regiunii Capital Region in Islanda concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "islanda",
      name: "Kopavogur",
      slug: "kopavogur",
      region: "Capital Region",
      latitude: 64.1123,
      longitude: -21.912,
      population: 39000,
      averageSalaryEur: 4300,
      generalDescription:
        "Orasul Kopavogur este situat in regiunea Capital Region. Dimensiunea urbana a orasului Kopavogur aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "islanda",
      name: "Akureyri",
      slug: "akureyri",
      region: "Nordurland Eystra",
      latitude: 65.6835,
      longitude: -18.1105,
      population: 20000,
      averageSalaryEur: 4100,
      generalDescription:
        "Orasul Akureyri este situat in regiunea Nordurland Eystra. Pentru Akureyri, rolul administrativ asociat regiunii Nordurland Eystra in Islanda concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "irlanda",
      name: "Dublin",
      slug: "dublin",
      region: "Leinster",
      latitude: 53.3498,
      longitude: -6.2603,
      population: 592000,
      averageSalaryEur: 4600,
      generalDescription:
        "Orasul Dublin este situat in regiunea Leinster. Pentru Dublin, rolul administrativ asociat regiunii Leinster in Irlanda concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "irlanda",
      name: "Cork",
      slug: "cork",
      region: "Munster",
      latitude: 51.8985,
      longitude: -8.4756,
      population: 224000,
      averageSalaryEur: 3069,
      generalDescription:
        "Orasul Cork este situat in regiunea Munster. Cork este prezentat in surse publice ca un centru urban relevant in Irlanda, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "irlanda",
      name: "Galway",
      slug: "galway",
      region: "Connacht",
      latitude: 53.2707,
      longitude: -9.0568,
      population: 85000,
      averageSalaryEur: 2701,
      generalDescription:
        "Orasul Galway este situat in regiunea Connacht. Galway este prezentat in surse publice ca un centru urban relevant in Irlanda, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "kosovo",
      name: "Pristina",
      slug: "pristina",
      region: "Pristina",
      latitude: 42.6629,
      longitude: 21.1655,
      population: 220000,
      averageSalaryEur: 800,
      generalDescription:
        "Orasul Pristina este situat in regiunea cu acelasi nume. Pentru Pristina, rolul administrativ asociat regiunii Pristina in Kosovo concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "kosovo",
      name: "Prizren",
      slug: "prizren",
      region: "Prizren",
      latitude: 42.2139,
      longitude: 20.7397,
      population: 86000,
      averageSalaryEur: 700,
      generalDescription:
        "Orasul Prizren este situat in regiunea cu acelasi nume. Prizren este prezentat in surse publice ca un centru urban relevant in Kosovo, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "kosovo",
      name: "Peja",
      slug: "peja",
      region: "Peja",
      latitude: 42.6591,
      longitude: 20.2883,
      population: 48000,
      averageSalaryEur: 680,
      generalDescription:
        "Orasul Peja este situat in regiunea cu acelasi nume. Peja este prezentat in surse publice ca un centru urban relevant in Kosovo, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "letonia",
      name: "Riga",
      slug: "riga",
      region: "Riga",
      latitude: 56.9496,
      longitude: 24.1052,
      population: 605000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Riga este situat in regiunea cu acelasi nume. Pentru Riga, rolul administrativ asociat regiunii Riga in Letonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "letonia",
      name: "Daugavpils",
      slug: "daugavpils",
      region: "Latgale",
      latitude: 55.8747,
      longitude: 26.5362,
      population: 80000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Daugavpils este situat in regiunea Latgale. Daugavpils este prezentat in surse publice ca un centru urban relevant in Letonia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "letonia",
      name: "Liepaja",
      slug: "liepaja",
      region: "Kurzeme",
      latitude: 56.5047,
      longitude: 21.0108,
      population: 67000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Liepaja este situat in regiunea Kurzeme. Liepaja este prezentat in surse publice ca un centru urban relevant in Letonia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "liechtenstein",
      name: "Vaduz",
      slug: "vaduz",
      region: "Vaduz",
      latitude: 47.141,
      longitude: 9.5209,
      population: 5800,
      averageSalaryEur: 5800,
      generalDescription:
        "Orasul Vaduz este situat in regiunea cu acelasi nume. Pentru Vaduz, rolul administrativ asociat regiunii Vaduz in Liechtenstein concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "liechtenstein",
      name: "Schaan",
      slug: "schaan",
      region: "Schaan",
      latitude: 47.1667,
      longitude: 9.5096,
      population: 6100,
      averageSalaryEur: 5600,
      generalDescription:
        "Orasul Schaan este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Schaan aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "liechtenstein",
      name: "Balzers",
      slug: "balzers",
      region: "Balzers",
      latitude: 47.0667,
      longitude: 9.5,
      population: 4600,
      averageSalaryEur: 5400,
      generalDescription:
        "Orasul Balzers este situat in regiunea cu acelasi nume. Balzers este prezentat in surse publice ca un centru urban relevant in Liechtenstein, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "lituania",
      name: "Vilnius",
      slug: "vilnius",
      region: "Vilnius",
      latitude: 54.6872,
      longitude: 25.2797,
      population: 590000,
      averageSalaryEur: 2100,
      generalDescription:
        "Orasul Vilnius este situat in regiunea cu acelasi nume. Pentru Vilnius, rolul administrativ asociat regiunii Vilnius in Lituania concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "lituania",
      name: "Kaunas",
      slug: "kaunas",
      region: "Kaunas",
      latitude: 54.8985,
      longitude: 23.9036,
      population: 300000,
      averageSalaryEur: 1800,
      generalDescription:
        "Orasul Kaunas este situat in regiunea cu acelasi nume. Kaunas are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
    },
    {
      countrySlug: "lituania",
      name: "Klaipeda",
      slug: "klaipeda",
      region: "Klaipeda",
      latitude: 55.7033,
      longitude: 21.1443,
      population: 150000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Klaipeda este situat in regiunea cu acelasi nume. Klaipeda este prezentat in surse publice ca un centru urban relevant in Lituania, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "luxemburg",
      name: "Luxemburg",
      slug: "luxemburg-oras",
      region: "Luxemburg",
      latitude: 49.6116,
      longitude: 6.1319,
      population: 136000,
      averageSalaryEur: 6200,
      generalDescription:
        "Orasul Luxemburg este situat in regiunea cu acelasi nume. Pentru Luxemburg, rolul administrativ asociat regiunii Luxemburg in Luxemburg concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "luxemburg",
      name: "Esch-sur-Alzette",
      slug: "esch-sur-alzette",
      region: "Esch-sur-Alzette",
      latitude: 49.4958,
      longitude: 5.9806,
      population: 37000,
      averageSalaryEur: 5200,
      generalDescription:
        "Orasul Esch-sur-Alzette este situat in regiunea cu acelasi nume. Esch-sur-Alzette combina mostenirea industriala cu zona universitara Belval, ceea ce sustine servicii, cercetare si locuri de munca tehnice.",
    },
    {
      countrySlug: "luxemburg",
      name: "Differdange",
      slug: "differdange",
      region: "Differdange",
      latitude: 49.5242,
      longitude: 5.8892,
      population: 30000,
      averageSalaryEur: 5000,
      generalDescription:
        "Orasul Differdange este situat in regiunea cu acelasi nume. Differdange este asociat cu industria siderurgica si cu servicii locale, fiind util pentru comparatii intre costuri si oportunitati tehnice.",
    },

    {
      countrySlug: "malta",
      name: "Valletta",
      slug: "valletta",
      region: "South Eastern",
      latitude: 35.8989,
      longitude: 14.5146,
      population: 6000,
      averageSalaryEur: 2200,
      generalDescription:
        "Orasul Valletta este situat in regiunea South Eastern. Pentru Valletta, rolul administrativ asociat regiunii South Eastern in Malta concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "malta",
      name: "Birkirkara",
      slug: "birkirkara",
      region: "Central",
      latitude: 35.8955,
      longitude: 14.4665,
      population: 24000,
      averageSalaryEur: 2100,
      generalDescription:
        "Orasul Birkirkara este situat in regiunea Central. Birkirkara are un rol rezidential si comercial important in Malta, cu acces bun la servicii urbane si locuri de munca din zona centrala.",
    },
    {
      countrySlug: "malta",
      name: "Sliema",
      slug: "sliema",
      region: "Central",
      latitude: 35.9122,
      longitude: 14.5041,
      population: 20000,
      averageSalaryEur: 2300,
      generalDescription:
        "Orasul Sliema este situat in regiunea Central. Sliema este legat de turism, retail si servicii de coasta, ceea ce il face relevant pentru joburi in ospitalitate si comert.",
    },

    {
      countrySlug: "moldova",
      name: "Chișinău",
      slug: "chisinau",
      region: "Chișinău",
      latitude: 47.0105,
      longitude: 28.8638,
      population: 639000,
      averageSalaryEur: 750,
      generalDescription:
        "Orasul Chișinău este situat in regiunea cu acelasi nume. Pentru Chișinău, rolul administrativ asociat regiunii Chișinău in Moldova concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "moldova",
      name: "Bălți",
      slug: "balti",
      region: "Bălți",
      latitude: 47.7539,
      longitude: 27.9184,
      population: 97000,
      averageSalaryEur: 650,
      generalDescription:
        "Orasul Bălți este situat in regiunea cu acelasi nume. Bălți este prezentat in surse publice ca un centru urban relevant in Moldova, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "moldova",
      name: "Cahul",
      slug: "cahul",
      region: "Cahul",
      latitude: 45.9043,
      longitude: 28.1993,
      population: 39000,
      averageSalaryEur: 600,
      generalDescription:
        "Orasul Cahul este situat in regiunea cu acelasi nume. Cahul este prezentat in surse publice ca un centru urban relevant in Moldova, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "monaco",
      name: "Monaco",
      slug: "monaco-oras",
      region: "Monaco",
      latitude: 43.7384,
      longitude: 7.4246,
      population: 38000,
      averageSalaryEur: 4700,
      generalDescription:
        "Orasul Monaco este situat in regiunea cu acelasi nume. Monaco este prezentat in surse publice ca un centru urban relevant in Monaco, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "monaco",
      name: "Monte Carlo",
      slug: "monte-carlo",
      region: "Monte Carlo",
      latitude: 43.7396,
      longitude: 7.4277,
      population: 16000,
      averageSalaryEur: 4800,
      generalDescription:
        "Orasul Monte Carlo este situat in regiunea cu acelasi nume. Monte Carlo este prezentat in surse publice ca un centru urban relevant in Monaco, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "monaco",
      name: "La Condamine",
      slug: "la-condamine",
      region: "La Condamine",
      latitude: 43.7374,
      longitude: 7.4241,
      population: 12000,
      averageSalaryEur: 4500,
      generalDescription:
        "Orasul La Condamine este situat in regiunea cu acelasi nume. La Condamine este prezentat in surse publice ca un centru urban relevant in Monaco, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "muntenegru",
      name: "Podgorica",
      slug: "podgorica",
      region: "Podgorica",
      latitude: 42.4304,
      longitude: 19.2594,
      population: 190000,
      averageSalaryEur: 1100,
      generalDescription:
        "Orasul Podgorica este situat in regiunea cu acelasi nume. Pentru Podgorica, rolul administrativ asociat regiunii Podgorica in Muntenegru concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "muntenegru",
      name: "Niksic",
      slug: "niksic",
      region: "Niksic",
      latitude: 42.7731,
      longitude: 18.9445,
      population: 57000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Niksic este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Niksic aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "muntenegru",
      name: "Budva",
      slug: "budva",
      region: "Budva",
      latitude: 42.2864,
      longitude: 18.84,
      population: 20000,
      averageSalaryEur: 950,
      generalDescription:
        "Orasul Budva este situat in regiunea cu acelasi nume. Budva este prezentat in surse publice ca un centru urban relevant in Muntenegru, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "macedonia-de-nord",
      name: "Skopje",
      slug: "skopje",
      region: "Skopje",
      latitude: 41.9981,
      longitude: 21.4254,
      population: 526000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Skopje este situat in regiunea cu acelasi nume. Pentru Skopje, rolul administrativ asociat regiunii Skopje in Macedonia de Nord concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "macedonia-de-nord",
      name: "Bitola",
      slug: "bitola",
      region: "Pelagonia",
      latitude: 41.0311,
      longitude: 21.3347,
      population: 74000,
      averageSalaryEur: 800,
      generalDescription:
        "Orasul Bitola este situat in regiunea Pelagonia. Bitola este prezentat in surse publice ca un centru urban relevant in Macedonia de Nord, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "macedonia-de-nord",
      name: "Tetovo",
      slug: "tetovo",
      region: "Polog",
      latitude: 42.0097,
      longitude: 20.9716,
      population: 86000,
      averageSalaryEur: 800,
      generalDescription:
        "Orasul Tetovo este situat in regiunea Polog. Tetovo functioneaza ca centru regional si universitar, cu activitati in servicii, educatie si comert local.",
    },

    {
      countrySlug: "norvegia",
      name: "Oslo",
      slug: "oslo",
      region: "Oslo",
      latitude: 59.9139,
      longitude: 10.7522,
      population: 717000,
      averageSalaryEur: 5600,
      generalDescription:
        "Orasul Oslo este situat in regiunea cu acelasi nume. Pentru Oslo, statutul de capitala a Norvegiei concentreaza administratie, servicii profesionale, educatie si oportunitati cu salarii ridicate.",
    },
    {
      countrySlug: "norvegia",
      name: "Bergen",
      slug: "bergen",
      region: "Vestland",
      latitude: 60.3913,
      longitude: 5.3221,
      population: 289000,
      averageSalaryEur: 5000,
      generalDescription:
        "Orasul Bergen este situat in regiunea Vestland. Bergen are un profil maritim si universitar, cu oportunitati in transport, cercetare, turism si servicii regionale.",
    },
    {
      countrySlug: "norvegia",
      name: "Trondheim",
      slug: "trondheim",
      region: "Trondelag",
      latitude: 63.4305,
      longitude: 10.3951,
      population: 212000,
      averageSalaryEur: 4800,
      generalDescription:
        "Orasul Trondheim este situat in regiunea Trondelag. Trondheim este prezentat in surse publice ca un centru urban relevant in Norvegia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "polonia",
      name: "Varșovia",
      slug: "varsovia",
      region: "Mazovia",
      latitude: 52.2297,
      longitude: 21.0122,
      population: 1860000,
      averageSalaryEur: 2100,
      generalDescription:
        "Orasul Varșovia este situat in regiunea Mazovia. Pentru Varșovia, rolul administrativ asociat regiunii Mazovia in Polonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "polonia",
      name: "Cracovia",
      slug: "cracovia",
      region: "Polonia Mică",
      latitude: 50.0647,
      longitude: 19.945,
      population: 805000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Cracovia este situat in regiunea Polonia Mică. Pentru Cracovia, rolul administrativ asociat regiunii Polonia Mică in Polonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "polonia",
      name: "Wroclaw",
      slug: "wroclaw",
      region: "Silezia Inferioară",
      latitude: 51.1079,
      longitude: 17.0385,
      population: 675000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Wroclaw este situat in regiunea Silezia Inferioară. Wroclaw este un centru universitar si de business in vestul Poloniei, cu oportunitati in IT, servicii si industrie.",
    },

    {
      countrySlug: "romania",
      name: "București",
      slug: "bucuresti",
      region: "București",
      latitude: 44.4268,
      longitude: 26.1025,
      population: 1710000,
      averageSalaryEur: 1800,
      generalDescription:
        "Orasul București este situat in regiunea cu acelasi nume. Pentru București, rolul administrativ asociat regiunii București in România concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "romania",
      name: "Cluj-Napoca",
      slug: "cluj-napoca",
      region: "Cluj",
      latitude: 46.7712,
      longitude: 23.6236,
      population: 287000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Cluj-Napoca este situat in regiunea Cluj. Cluj-Napoca este prezentat in surse publice ca un centru urban relevant in România, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "romania",
      name: "Timișoara",
      slug: "timisoara",
      region: "Timiș",
      latitude: 45.7489,
      longitude: 21.2087,
      population: 250000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul Timișoara este situat in regiunea Timiș. Pentru Timișoara, rolul administrativ asociat regiunii Timiș in România concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "rusia",
      name: "Moscova",
      slug: "moscova",
      region: "Moscova",
      latitude: 55.7558,
      longitude: 37.6173,
      population: 13000000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Moscova este situat in regiunea cu acelasi nume. Pentru Moscova, rolul administrativ asociat regiunii Moscova in Rusia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "rusia",
      name: "Sankt Petersburg",
      slug: "sankt-petersburg",
      region: "Nord-Vest",
      latitude: 59.9311,
      longitude: 30.3609,
      population: 5600000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Sankt Petersburg este situat in regiunea Nord-Vest. Pentru Sankt Petersburg, rolul administrativ asociat regiunii Nord-Vest in Rusia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "rusia",
      name: "Kazan",
      slug: "kazan",
      region: "Tatarstan",
      latitude: 55.7903,
      longitude: 49.1347,
      population: 1310000,
      averageSalaryEur: 1200,
      generalDescription:
        "Orasul Kazan este situat in regiunea Tatarstan. Pentru Kazan, rolul administrativ asociat regiunii Tatarstan in Rusia concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "san-marino",
      name: "San Marino",
      slug: "san-marino-oras",
      region: "San Marino",
      latitude: 43.9424,
      longitude: 12.4578,
      population: 4500,
      averageSalaryEur: 2400,
      generalDescription:
        "Orasul San Marino este situat in regiunea cu acelasi nume. Pentru San Marino, rolul administrativ asociat regiunii San Marino in San Marino concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "san-marino",
      name: "Serravalle",
      slug: "serravalle",
      region: "Serravalle",
      latitude: 43.9688,
      longitude: 12.4811,
      population: 11000,
      averageSalaryEur: 2300,
      generalDescription:
        "Orasul Serravalle este situat in regiunea cu acelasi nume. Serravalle este cel mai populat castello din San Marino, cu activitati locale in servicii, retail si mobilitate transfrontaliera.",
    },
    {
      countrySlug: "san-marino",
      name: "Borgo Maggiore",
      slug: "borgo-maggiore",
      region: "Borgo Maggiore",
      latitude: 43.9419,
      longitude: 12.4474,
      population: 6800,
      averageSalaryEur: 2250,
      generalDescription:
        "Orasul Borgo Maggiore este situat in regiunea cu acelasi nume. Borgo Maggiore este prezentat in surse publice ca un centru urban relevant in San Marino, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "serbia",
      name: "Belgrad",
      slug: "belgrad",
      region: "Belgrad",
      latitude: 44.7866,
      longitude: 20.4489,
      population: 1400000,
      averageSalaryEur: 1150,
      generalDescription:
        "Orasul Belgrad este situat in regiunea cu acelasi nume. Pentru Belgrad, rolul administrativ asociat regiunii Belgrad in Serbia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "serbia",
      name: "Novi Sad",
      slug: "novi-sad",
      region: "Vojvodina",
      latitude: 45.2671,
      longitude: 19.8335,
      population: 250000,
      averageSalaryEur: 1000,
      generalDescription:
        "Orasul Novi Sad este situat in regiunea Vojvodina. Dimensiunea urbana a orasului Novi Sad aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "serbia",
      name: "Niš",
      slug: "nis",
      region: "Nišava",
      latitude: 43.3209,
      longitude: 21.8958,
      population: 183000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul Niš este situat in regiunea Nišava. Nis este un centru regional important din sudul Serbiei, cu profil universitar, industrial si logistic.",
    },

    {
      countrySlug: "slovacia",
      name: "Bratislava",
      slug: "bratislava",
      region: "Bratislava",
      latitude: 48.1486,
      longitude: 17.1077,
      population: 475000,
      averageSalaryEur: 2000,
      generalDescription:
        "Orasul Bratislava este situat in regiunea cu acelasi nume. Pentru Bratislava, rolul administrativ asociat regiunii Bratislava in Slovacia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "slovacia",
      name: "Kosice",
      slug: "kosice",
      region: "Kosice",
      latitude: 48.7164,
      longitude: 21.2611,
      population: 230000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul Kosice este situat in regiunea cu acelasi nume. Kosice este un centru important al estului Slovaciei, cu profil industrial, universitar si servicii regionale.",
    },
    {
      countrySlug: "slovacia",
      name: "Zilina",
      slug: "zilina",
      region: "Zilina",
      latitude: 49.223,
      longitude: 18.7394,
      population: 81000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul Zilina este situat in regiunea cu acelasi nume. Zilina este asociat cu transportul si industria auto, ceea ce sustine joburi in productie, logistica si servicii tehnice.",
    },

    {
      countrySlug: "slovenia",
      name: "Ljubljana",
      slug: "ljubljana",
      region: "Ljubljana",
      latitude: 46.0569,
      longitude: 14.5058,
      population: 295000,
      averageSalaryEur: 2200,
      generalDescription:
        "Orasul Ljubljana este situat in regiunea cu acelasi nume. Pentru Ljubljana, rolul administrativ asociat regiunii Ljubljana in Slovenia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "slovenia",
      name: "Maribor",
      slug: "maribor",
      region: "Podravska",
      latitude: 46.5547,
      longitude: 15.6459,
      population: 97000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Maribor este situat in regiunea Podravska. Maribor are rol universitar si regional in nord-estul Sloveniei, cu activitati in servicii, educatie si economie locala.",
    },
    {
      countrySlug: "slovenia",
      name: "Celje",
      slug: "celje",
      region: "Savinjska",
      latitude: 46.2397,
      longitude: 15.2677,
      population: 38000,
      averageSalaryEur: 1800,
      generalDescription:
        "Orasul Celje este situat in regiunea Savinjska. Celje este un centru regional sloven cu servicii locale, industrie usoara si legaturi bune spre alte zone urbane.",
    },

    {
      countrySlug: "suedia",
      name: "Stockholm",
      slug: "stockholm",
      region: "Stockholm",
      latitude: 59.3293,
      longitude: 18.0686,
      population: 990000,
      averageSalaryEur: 4600,
      generalDescription:
        "Orasul Stockholm este situat in regiunea cu acelasi nume. Pentru Stockholm, rolul administrativ asociat regiunii Stockholm in Suedia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "suedia",
      name: "Gothenburg",
      slug: "gothenburg",
      region: "Vastra Gotaland",
      latitude: 57.7089,
      longitude: 11.9746,
      population: 605000,
      averageSalaryEur: 4200,
      generalDescription:
        "Orasul Gothenburg este situat in regiunea Vastra Gotaland. Pentru Gothenburg, rolul administrativ asociat regiunii Vastra Gotaland in Suedia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "suedia",
      name: "Malmö",
      slug: "malmo",
      region: "Skane",
      latitude: 55.605,
      longitude: 13.0038,
      population: 360000,
      averageSalaryEur: 4000,
      generalDescription:
        "Orasul Malmö este situat in regiunea Skane. Dimensiunea urbana a orasului Malmö aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "elvetia",
      name: "Zurich",
      slug: "zurich",
      region: "Zurich",
      latitude: 47.3769,
      longitude: 8.5417,
      population: 443000,
      averageSalaryEur: 7000,
      generalDescription:
        "Orasul Zurich este situat in regiunea cu acelasi nume. Pentru Zurich, rolul administrativ asociat regiunii Zurich in Elveția concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "elvetia",
      name: "Geneva",
      slug: "geneva",
      region: "Geneva",
      latitude: 46.2044,
      longitude: 6.1432,
      population: 203000,
      averageSalaryEur: 6900,
      generalDescription:
        "Orasul Geneva este situat in regiunea cu acelasi nume. Geneva este prezentat in surse publice ca un centru urban relevant in Elveția, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "elvetia",
      name: "Basel",
      slug: "basel",
      region: "Basel-Stadt",
      latitude: 47.5596,
      longitude: 7.5886,
      population: 178000,
      averageSalaryEur: 6500,
      generalDescription:
        "Orasul Basel este situat in regiunea Basel-Stadt. Basel este prezentat in surse publice ca un centru urban relevant in Elveția, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "turcia",
      name: "Istanbul",
      slug: "istanbul",
      region: "Marmara",
      latitude: 41.0082,
      longitude: 28.9784,
      population: 15600000,
      averageSalaryEur: 1300,
      generalDescription:
        "Orasul Istanbul este situat in regiunea Marmara. Dimensiunea urbana a orasului Istanbul aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "turcia",
      name: "Ankara",
      slug: "ankara",
      region: "Anatolia Centrală",
      latitude: 39.9334,
      longitude: 32.8597,
      population: 5700000,
      averageSalaryEur: 1200,
      generalDescription:
        "Orasul Ankara este situat in regiunea Anatolia Centrală. Pentru Ankara, rolul administrativ asociat regiunii Anatolia Centrală in Turcia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "turcia",
      name: "Izmir",
      slug: "izmir",
      region: "Egeea",
      latitude: 38.4237,
      longitude: 27.1428,
      population: 4400000,
      averageSalaryEur: 1150,
      generalDescription:
        "Orasul Izmir este situat in regiunea Egeea. Dimensiunea urbana a orasului Izmir aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "ucraina",
      name: "Kiev",
      slug: "kiev",
      region: "Kiev",
      latitude: 50.4501,
      longitude: 30.5234,
      population: 2950000,
      averageSalaryEur: 950,
      generalDescription:
        "Orasul Kiev este situat in regiunea cu acelasi nume. Pentru Kiev, rolul administrativ asociat regiunii Kiev in Ucraina concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "ucraina",
      name: "Lviv",
      slug: "lviv",
      region: "Lviv",
      latitude: 49.8397,
      longitude: 24.0297,
      population: 717000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Lviv este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Lviv aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "ucraina",
      name: "Odesa",
      slug: "odesa",
      region: "Odesa",
      latitude: 46.4825,
      longitude: 30.7233,
      population: 1010000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Odesa este situat in regiunea cu acelasi nume. Odesa are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.",
    },

    {
      countrySlug: "regatul-unit",
      name: "Londra",
      slug: "londra",
      region: "Anglia",
      latitude: 51.5072,
      longitude: -0.1276,
      population: 9000000,
      averageSalaryEur: 4500,
      generalDescription:
        "Orasul Londra este situat in regiunea Anglia. Pentru Londra, rolul administrativ asociat regiunii Anglia in Regatul Unit concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "regatul-unit",
      name: "Manchester",
      slug: "manchester",
      region: "Anglia",
      latitude: 53.4808,
      longitude: -2.2426,
      population: 560000,
      averageSalaryEur: 3300,
      generalDescription:
        "Orasul Manchester este situat in regiunea Anglia. Manchester este prezentat in surse publice ca un centru urban relevant in Regatul Unit, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "regatul-unit",
      name: "Birmingham",
      slug: "birmingham",
      region: "Anglia",
      latitude: 52.4862,
      longitude: -1.8904,
      population: 1150000,
      averageSalaryEur: 3200,
      generalDescription:
        "Orasul Birmingham este situat in regiunea Anglia. Birmingham este prezentat in surse publice ca un centru urban relevant in Regatul Unit, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "vatican",
      name: "Vatican",
      slug: "vatican-city",
      region: "Vatican",
      latitude: 41.9029,
      longitude: 12.4534,
      population: 800,
      averageSalaryEur: 2400,
      generalDescription:
        "Orasul Vatican este situat in regiunea cu acelasi nume. Vaticanul are un rol administrativ si religios unic, cu activitati concentrate in institutii, cultura si turism.",
    },
    {
      countrySlug: "vatican",
      name: "Zona Sf. Petru",
      slug: "zona-sfantul-petru",
      region: "Vatican",
      latitude: 41.9022,
      longitude: 12.4539,
      population: 500,
      averageSalaryEur: 2350,
      generalDescription:
        "Orasul Zona Sf. Petru este situat in regiunea Vatican. Zona Sfantul Petru este legata de fluxuri turistice si ceremonii religioase majore, cu activitati in servicii, ghidaj si administrare.",
    },
    {
      countrySlug: "vatican",
      name: "Grădinile Vaticanului",
      slug: "gradinile-vaticanului",
      region: "Vatican",
      latitude: 41.9012,
      longitude: 12.4482,
      population: 300,
      averageSalaryEur: 2300,
      generalDescription:
        "Orasul Grădinile Vaticanului este situat in regiunea Vatican. Gradinile Vaticanului au un rol cultural si institutional, fiind relevante pentru turism controlat, patrimoniu si administrarea spatiilor istorice.",
    },
  ];

  const additionalCountryIds = new Map<string, string>();

  for (const country of additionalEuropeanCountries) {
    const countryData = {
      name: country.name,
      slug: country.slug,
      isoCode: country.isoCode,
      capital: country.capital,
      currency: country.currency,
      officialLanguage: country.officialLanguage,
      predominantReligion: country.predominantReligion,
      latitude: country.latitude,
      longitude: country.longitude,
    };

    const countryRecord = await prisma.country.upsert({
      where: { slug: country.slug },
      update: {
        ...countryData,
        continent: "Europa",
        generalDescription:
          countryDescriptions[country.slug] ?? country.generalDescription,
        population: country.population ?? null,
        citizenshipDifficulty: country.citizenshipDifficulty,
        emigrationDifficulty: country.emigrationDifficulty,
        averageSalaryEur: country.averageSalaryEur,
      },
      create: {
        ...countryData,
        continent: "Europa",
        generalDescription:
          countryDescriptions[country.slug] ?? country.generalDescription,
        population: country.population ?? null,
        citizenshipDifficulty: country.citizenshipDifficulty,
        emigrationDifficulty: country.emigrationDifficulty,
        averageSalaryEur: country.averageSalaryEur,
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
        averageSalaryEur: city.averageSalaryEur,
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
        averageSalaryEur: city.averageSalaryEur,
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
        },
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
          },
        });
      }
    }
  }

  for (const [slug, assessment] of Object.entries(
    countryDifficultyAssessments,
  )) {
    await prisma.country.update({
      where: { slug },
      data: assessment,
    });
  }

  for (const [slug, estimate] of Object.entries(countryNumbeoEstimates)) {
    const country = await prisma.country.update({
      where: { slug },
      data: { averageSalaryEur: estimate.averageSalaryEur },
      select: { id: true },
    });

    const existingCountryCost = await prisma.costOfLiving.findFirst({
      where: { countryId: country.id, cityId: null },
      select: { id: true },
    });

    const costData = {
      totalMonthlyCostEur: estimate.totalMonthlyCostEur,
    };

    if (existingCountryCost) {
      await prisma.costOfLiving.update({
        where: { id: existingCountryCost.id },
        data: costData,
      });
    } else {
      await prisma.costOfLiving.create({
        data: {
          countryId: country.id,
          ...costData,
        },
      });
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
