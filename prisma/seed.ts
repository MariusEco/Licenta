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
    "Albania este situatÄƒ Ã®n sud-estul Europei, Ã®n vestul Balcanilor, È™i are graniÈ›e cu Macedonia la est, Grecia la sud È™i Kosovo È™i Muntenegru la nord. Are acces la Marea AdriaticÄƒ È™i Marea IonicÄƒ la vest È™i sud-vest, fiind la mai puÈ›in de 72 de kilometri distanÈ›Äƒ de Italia. OferÄƒ costuri de viaÈ›Äƒ mai reduse È™i oportunitÄƒÈ›i Ã®n servicii, turism È™i construcÈ›ii.",
  andorra:
    "Andorra este situatÄƒ Ã®n MunÈ›ii Pirinei, Ã®ntre FranÈ›a È™i Spania. Economia se bazeazÄƒ pe turism, retail È™i servicii financiare; oferÄƒ oportunitÄƒÈ›i Ã®n ospitalitate È™i comerÈ›, iar costurile pot fi ridicate Ã®n zonele turistice.",
  armenia:
    "Armenia se aflÄƒ la intersecÈ›ia dintre Europa È™i Asia, Ã®n regiunea Caucazului de Sud, È™i are graniÈ›e cu Georgia, Azerbaidjan, Turcia È™i Iran. DezvoltÄƒ un sector IT Ã®n creÈ™tere È™i servicii locale; costurile de viaÈ›Äƒ sunt Ã®n general reduse.",
  austria:
    "Austria este situatÄƒ Ã®n Europa CentralÄƒ, Ã®nvecinatÄƒ cu Germania, Cehia, Slovacia, Ungaria, Slovenia, Italia, ElveÈ›ia È™i Liechtenstein. OferÄƒ stabilitate economicÄƒ, infrastructurÄƒ performantÄƒ È™i oportunitÄƒÈ›i Ã®n industrie, sÄƒnÄƒtate È™i servicii; costurile sunt moderate spre ridicate.",
  azerbaidjan:
    "Azerbaidjan se Ã®ntinde Ã®n regiunea Caucazului, la Marea CaspicÄƒ, È™i are o economie puternic legatÄƒ de energie; existÄƒ oportunitÄƒÈ›i Ã®n infrastructurÄƒ, servicii È™i dezvoltare urbanÄƒ.",
  bulgaria:
    "Bulgaria este situatÄƒ Ã®n sud-estul Europei, la Marea NeagrÄƒ, È™i are graniÈ›e cu RomÃ¢nia, Serbia, Macedonia de Nord, Grecia È™i Turcia. OferÄƒ costuri reduse È™i oportunitÄƒÈ›i Ã®n IT, outsourcing, agriculturÄƒ È™i turism.",
  croatia:
    "CroaÈ›ia se Ã®ntinde de-a lungul coastei MÄƒrii Adriatice Ã®n sud-estul Europei, avÃ¢nd graniÈ›e cu Slovenia, Ungaria, Serbia È™i Bosnia. Turismul, porturile È™i serviciile maritime sunt sectoare cheie; costurile variazÄƒ Ã®ntre litoral È™i interior.",
  cipru:
    "Cipru este o insulÄƒ din estul MÄƒrii Mediterane, cu poziÈ›ie strategicÄƒ Ã®ntre Europa È™i Orientul Mijlociu. Economia este axatÄƒ pe turism, servicii financiare È™i shipping; costurile pot fi moderate spre ridicate Ã®n zonele turistice.",
  cehia:
    "Cehia este situatÄƒ Ã®n Europa CentralÄƒ, Ã®ntre Germania, Polonia, Slovacia È™i Austria. Are o industrie puternicÄƒ Ã®n producÈ›ie, automotive È™i IT, cu costuri de viaÈ›Äƒ moderate È™i un sector de servicii dinamic.",
  danemarca:
    "Danemarca se aflÄƒ Ã®n Europa de Nord, compusÄƒ din peninsula Jutlanda È™i multe insule, avÃ¢nd graniÈ›Äƒ terestrÄƒ cu Germania. OferÄƒ salarii ridicate, servicii publice solide È™i oportunitÄƒÈ›i Ã®n tehnologie È™i energie verde; costurile sunt ridicate.",
  estonia:
    "Estonia este o È›arÄƒ balticÄƒ la Marea BalticÄƒ, recunoscutÄƒ pentru digitalizare È™i un mediu prietenos pentru startup-uri; oferÄƒ oportunitÄƒÈ›i Ã®n tehnologie È™i servicii cu costuri moderate.",
  finlanda:
    "Finlanda este situatÄƒ Ã®n nordul Europei, Ã®ntre Suedia È™i Rusia, cu ieÈ™ire la Marea BalticÄƒ. OferÄƒ calitate ridicatÄƒ a vieÈ›ii È™i oportunitÄƒÈ›i Ã®n tehnologie, industrie È™i servicii; costurile sunt ridicate.",
  georgia:
    "Georgia se aflÄƒ Ã®n regiunea Caucazului, la Marea NeagrÄƒ, È™i are graniÈ›e cu Turcia, Armenia, Azerbaidjan È™i Rusia. OferÄƒ costuri de viaÈ›Äƒ reduse È™i oportunitÄƒÈ›i Ã®n turism, servicii È™i agriculturÄƒ.",
  grecia:
    "Grecia este situatÄƒ Ã®n sud-estul Europei, cu numeroase insule Ã®n Marea MediteranÄƒ, È™i are graniÈ›e cu Albania, Macedonia de Nord, Bulgaria È™i Turcia. Economia este puternic orientatÄƒ spre turism È™i servicii; costurile variazÄƒ mult Ã®ntre regiuni.",
  ungaria:
    "Ungaria este situatÄƒ Ã®n Europa CentralÄƒ, Ã®n bazinul Carpatin, avÃ¢nd graniÈ›e cu Austria, Slovacia, Ucraina, RomÃ¢nia, Serbia, CroaÈ›ia È™i Slovenia. Economia este diversificatÄƒ, cu oportunitÄƒÈ›i Ã®n IT, producÈ›ie È™i servicii; costurile sunt moderate.",
  islanda:
    "Islanda este o insulÄƒ Ã®n Nordul Atlanticului, cunoscutÄƒ pentru resursele de energie geotermalÄƒ È™i pescuit. OferÄƒ salarii ridicate È™i oportunitÄƒÈ›i Ã®n energie, pescuit È™i turism; costurile sunt ridicate.",
  irlanda:
    "Irlanda este o insulÄƒ Ã®n vestul Europei, la Oceanul Atlantic, È™i gÄƒzduieÈ™te centre importante pentru tehnologie, pharma È™i servicii financiare; costurile Ã®n capitalÄƒ sunt ridicate.",
  kosovo:
    "Kosovo este situat Ã®n Peninsula BalcanicÄƒ È™i are graniÈ›e cu Serbia, Albania, Macedonia de Nord È™i Muntenegru. OferÄƒ costuri de viaÈ›Äƒ reduse È™i oportunitÄƒÈ›i Ã®n servicii, comerÈ› È™i sectoare publice.",
  letonia:
    "Letonia este o È›arÄƒ balticÄƒ la Marea BalticÄƒ, Ã®ntre Estonia È™i Lituania. Are un sector deschis orientat spre servicii, transport È™i tehnologie; costurile sunt moderate.",
  liechtenstein:
    "Liechtenstein este un microstat alpin Ã®ntre ElveÈ›ia È™i Austria, cu economie axatÄƒ pe industrie È™i servicii financiare; oferÄƒ costuri È™i salarii ridicate.",
  lituania:
    "Lituania este situatÄƒ Ã®n regiunea balticÄƒ, cu acces la Marea BalticÄƒ; are un ecosistem tech Ã®n creÈ™tere È™i oportunitÄƒÈ›i Ã®n servicii È™i logisticÄƒ.",
  luxemburg:
    "Luxemburg este un mic stat Ã®n Europa de Vest, Ã®ntre Belgia, FranÈ›a È™i Germania, cunoscut pentru sectorul financiar È™i salariile ridicate; costurile sunt ridicate.",
  malta:
    "Malta este o insulÄƒ din Marea MediteranÄƒ, la sud de Sicilia, cu economie axatÄƒ pe turism, gaming, fintech È™i servicii; costurile sunt moderate spre ridicate Ã®n zonele urbane.",
  moldova:
    "Moldova se aflÄƒ Ã®ntre RomÃ¢nia È™i Ucraina Ã®n Europa de Est; oferÄƒ costuri de viaÈ›Äƒ reduse È™i oportunitÄƒÈ›i Ã®n agriculturÄƒ, servicii È™i IT local.",
  monaco:
    "Monaco este un microstat pe Coasta de Azur, orientat spre servicii financiare È™i turism de lux; costurile sunt foarte ridicate.",
  muntenegru:
    "Muntenegru este situat pe coasta MÄƒrii Adriatice Ã®n Peninsula BalcanicÄƒ, oferind oportunitÄƒÈ›i Ã®n turism, servicii È™i imobiliare; costurile sunt moderate.",
  "macedonia-de-nord":
    "Macedonia de Nord este situatÄƒ Ã®n Peninsula BalcanicÄƒ, avÃ¢nd graniÈ›e cu Kosovo, Serbia, Bulgaria, Grecia È™i Albania. OferÄƒ costuri reduse È™i oportunitÄƒÈ›i Ã®n servicii, industrie uÈ™oarÄƒ È™i agriculturÄƒ.",
  norvegia:
    "Norvegia este situatÄƒ Ã®n Peninsula ScandinavÄƒ, avÃ¢nd graniÈ›e cu Suedia, Finlanda È™i Rusia; este cunoscutÄƒ pentru resurse energetice, salarii ridicate È™i costuri de viaÈ›Äƒ ridicate.",
  polonia:
    "Polonia este situatÄƒ Ã®n Europa CentralÄƒ È™i de Est, avÃ¢nd graniÈ›e cu Germania, Cehia, Slovacia, Ucraina, Belorusia È™i Lituania; este o economie dinamicÄƒ Ã®n industrie È™i servicii, cu costuri moderate.",
  romania:
    "RomÃ¢nia este situatÄƒ Ã®n sud-estul Europei, cuprinzÃ¢nd regiuni istorice precum Transilvania È™i Muntenia È™i avÃ¢nd graniÈ›e cu Bulgaria, Serbia, Ungaria, Ucraina È™i Moldova. OferÄƒ centre IT puternice È™i oportunitÄƒÈ›i Ã®n servicii, industrie È™i agriculturÄƒ; costurile sunt moderate.",
  rusia:
    "Rusia se Ã®ntinde Ã®ntre Europa È™i Asia, fiind cel mai mare stat terestru din lume, cu pieÈ›e urbane mari Ã®n Moscova È™i Sankt Petersburg; oferÄƒ oportunitÄƒÈ›i Ã®n energie, industrie È™i servicii, cu costuri foarte variabile.",
  "san-marino":
    "San Marino este un microstat Ã®nconjurat de Italia, cu economie orientatÄƒ spre servicii È™i turism; are costuri moderate spre ridicate Ã®n zonele turistice.",
  serbia:
    "Serbia este situatÄƒ Ã®n sud-estul Europei, Ã®n Peninsula BalcanicÄƒ, cu graniÈ›e la Ungaria, RomÃ¢nia, Bulgaria, Macedonia de Nord, Kosovo, Bosnia È™i CroaÈ›ia. OferÄƒ costuri moderate È™i oportunitÄƒÈ›i Ã®n servicii, IT È™i producÈ›ie.",
  slovacia:
    "Slovacia este situatÄƒ Ã®n Europa CentralÄƒ, Ã®ntre Polonia, Cehia, Austria, Ungaria È™i Ucraina; are o economie industrialÄƒ puternicÄƒ È™i cerere Ã®n automotive È™i servicii.",
  slovenia:
    "Slovenia se aflÄƒ la interferenÈ›a Alpilor È™i MÄƒrii Adriatice, Ã®ntre Italia, Austria, Ungaria È™i CroaÈ›ia; oferÄƒ un echilibru bun Ã®ntre costuri, servicii publice È™i oportunitÄƒÈ›i Ã®n industrie È™i turism.",
  suedia:
    "Suedia este situatÄƒ Ã®n Peninsula ScandinavÄƒ, Ã®ntre Norvegia È™i Finlanda, cu coastÄƒ la Marea BalticÄƒ; are economie avansatÄƒ Ã®n tehnologie, industrie È™i servicii publice, dar costurile sunt ridicate.",
  elvetia:
    "ElveÈ›ia este situatÄƒ Ã®n Europa CentralÄƒ, la poalele Alpilor, È™i are graniÈ›e cu Germania, FranÈ›a, Italia È™i Austria. OferÄƒ salarii foarte ridicate È™i oportunitÄƒÈ›i Ã®n finanÈ›e, pharma È™i tehnologie; costurile sunt foarte ridicate.",
  turcia:
    "Turcia este o È›arÄƒ transcontinentalÄƒ cu partea europeanÄƒ Ã®n Tracia È™i o mare parte Ã®n Anatolia; are ieÈ™ire la Marea Egee, Marea MediteranÄƒ È™i Marea NeagrÄƒ. OferÄƒ pieÈ›e mari, industrie diversificatÄƒ È™i oportunitÄƒÈ›i Ã®n servicii È™i comerÈ›.",
  ucraina:
    "Ucraina este situatÄƒ Ã®n Europa de Est, mÄƒrginitÄƒ de Rusia, Belarus, Polonia, Slovacia, Ungaria, RomÃ¢nia È™i Moldova; are un potenÈ›ial agricol È™i industrial mare, cu oportunitÄƒÈ›i Ã®n reconstrucÈ›ie È™i servicii.",
  "regatul-unit":
    "Regatul Unit este o insulÄƒ Ã®n vestul Europei, compus din Anglia, ScoÈ›ia, Èšara Galilor È™i Irlanda de Nord; are centre globale Ã®n finanÈ›e, tehnologie È™i servicii, Ã®n special Ã®n Londra.",
  vatican:
    "Vaticanul este un microstat Ã®n inima Romei, nucleul administrativ È™i spiritual al Bisericii Catolice; activitatea economicÄƒ este foarte restrÃ¢nsÄƒ È™i axatÄƒ pe servicii religioase È™i turism.",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function buildCountryCostFromSalary(salaryEur: number) {
  const salary = Math.max(salaryEur, 900);
  const rentOneBedroomEur = Math.round(clamp(salary * 0.4, 450, 2600));
  const utilitiesEur = Math.round(clamp(salary * 0.08, 90, 360));
  const foodEur = Math.round(clamp(salary * 0.11, 180, 520));
  const transportEur = Math.round(clamp(salary * 0.03, 25, 130));
  const rentUtilitiesEur = rentOneBedroomEur + utilitiesEur;
  const totalMonthlyCostEur =
    rentUtilitiesEur + foodEur + transportEur;

  return {
    averageSalaryEur: salaryEur,
    rentUtilitiesEur,
    foodEur,
    transportEur,
    totalMonthlyCostEur,
  };
}

function buildCityCostFromSalary(salaryEur: number) {
  const salary = Math.max(salaryEur, 850);
  const rentOneBedroomEur = Math.round(clamp(salary * 0.45, 420, 2900));
  const utilitiesEur = Math.round(clamp(salary * 0.08, 85, 380));
  const foodEur = Math.round(clamp(salary * 0.12, 170, 600));
  const transportEur = Math.round(clamp(salary * 0.03, 20, 140));
  const rentUtilitiesEur = rentOneBedroomEur + utilitiesEur;
  const totalMonthlyCostEur =
    rentUtilitiesEur + foodEur + transportEur;

  return {
    averageSalaryEur: salaryEur,
    rentUtilitiesEur,
    foodEur,
    transportEur,
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
      officialLanguage: "GermanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 51.165691,
      longitude: 10.451526,
      generalDescription:
        "Germania este situatÄƒ Ã®n Europa CentralÄƒ, mÄƒrginitÄƒ de Danemarca la nord, Polonia È™i Cehia la est, Austria È™i ElveÈ›ia la sud, È™i FranÈ›a, Luxemburg, Belgia È™i ÈšÄƒrile de Jos la vest. Este o putere industrialÄƒ È™i tehnologicÄƒ cu oportunitÄƒÈ›i Ã®n inginerie, IT, producÈ›ie È™i servicii; costurile de viaÈ›Äƒ sunt moderate spre ridicate.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      population: 83200000,
    },
    create: {
      name: "Germania",
      slug: "germania",
      isoCode: "DE",
      continent: "Europa",
      capital: "Berlin",
      currency: "EUR",
      officialLanguage: "GermanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 51.165691,
      longitude: 10.451526,
      generalDescription:
        "Germania rÄƒmÃ¢ne una dintre cele mai stabile destinaÈ›ii europene pentru muncÄƒ È™i relocare pe termen lung.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
    },
  });

  const netherlands = await prisma.country.upsert({
    where: { slug: "tarile-de-jos" },
    update: {
      name: "ÈšÄƒrile de Jos",
      isoCode: "NL",
      continent: "Europa",
      capital: "Amsterdam",
      currency: "EUR",
      officialLanguage: "NeerlandezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 52.132633,
      longitude: 5.291266,
      generalDescription:
        "ÈšÄƒrile de Jos sunt situate Ã®n Europa de Vest, pe coasta MÄƒrii Nordului, avÃ¢nd graniÈ›e cu Germania È™i Belgia. OferÄƒ infrastructurÄƒ excelentÄƒ, porturi È™i un sector logistic dezvoltat, cu oportunitÄƒÈ›i Ã®n tehnologie, logisticÄƒ È™i servicii; costurile de viaÈ›Äƒ sunt ridicate Ã®n oraÈ™ele mari.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      population: 17950000,
    },
    create: {
      name: "ÈšÄƒrile de Jos",
      slug: "tarile-de-jos",
      isoCode: "NL",
      continent: "Europa",
      capital: "Amsterdam",
      currency: "EUR",
      officialLanguage: "NeerlandezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 52.132633,
      longitude: 5.291266,
      generalDescription:
        "ÈšÄƒrile de Jos oferÄƒ o piaÈ›Äƒ a muncii competitivÄƒ, infrastructurÄƒ foarte bunÄƒ È™i servicii publice eficiente.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      officialLanguage: "SpaniolÄƒ",
      predominantReligion: "Catolicism",
      latitude: 40.463667,
      longitude: -3.74922,
      generalDescription:
        "Spania este situatÄƒ Ã®n sud-vestul Europei, ocupÃ¢nd mare parte din Peninsula IbericÄƒ, avÃ¢nd graniÈ›Äƒ cu Portugalia È™i FranÈ›a È™i ieÈ™ire la Marea MediteranÄƒ È™i Oceanul Atlantic. OferÄƒ oportunitÄƒÈ›i Ã®n turism, servicii, logisticÄƒ È™i agrobusiness; costurile variazÄƒ mult Ã®ntre regiuni.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      population: 48680000,
    },
    create: {
      name: "Spania",
      slug: "spania",
      isoCode: "ES",
      continent: "Europa",
      capital: "Madrid",
      currency: "EUR",
      officialLanguage: "SpaniolÄƒ",
      predominantReligion: "Catolicism",
      latitude: 40.463667,
      longitude: -3.74922,
      generalDescription:
        "Spania oferÄƒ un echilibru bun Ã®ntre costul vieÈ›ii, climÄƒ È™i integrarea Ã®n comunitÄƒÈ›i internaÈ›ionale.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
    },
  });

  const france = await prisma.country.upsert({
    where: { slug: "franta" },
    update: {
      name: "FranÈ›a",
      isoCode: "FR",
      continent: "Europa",
      capital: "Paris",
      currency: "EUR",
      officialLanguage: "FrancezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 48.8566,
      longitude: 2.3522,

      generalDescription:
        "FranÈ›a se aflÄƒ Ã®n Europa de Vest, Ã®ntre Oceanul Atlantic È™i Marea MediteranÄƒ, avÃ¢nd graniÈ›e cu mai multe state europene. Economia este diversificatÄƒ, cu oportunitÄƒÈ›i Ã®n servicii, industrie, agriculturÄƒ È™i tehnologie; costurile depind de regiune.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      population: 68400000,
    },
    create: {
      name: "FranÈ›a",
      slug: "franta",
      isoCode: "FR",
      continent: "Europa",
      capital: "Paris",
      currency: "EUR",
      officialLanguage: "FrancezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 48.8566,
      longitude: 2.3522,

      generalDescription:
        "FranÈ›a oferÄƒ o economie mare È™i diversificatÄƒ, cu oportunitÄƒÈ›i solide Ã®n marile centre urbane.",
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
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
      officialLanguage: "ItalianÄƒ",
      predominantReligion: "Catolicism",
      latitude: 41.9028,
      longitude: 12.4964,

      generalDescription:
        "Italia este situatÄƒ Ã®n sudul Europei, pe Peninsula ItalicÄƒ, cu numeroase ieÈ™iri la Marea MediteranÄƒ È™i graniÈ›e cu FranÈ›a, ElveÈ›ia, Austria È™i Slovenia. OferÄƒ oportunitÄƒÈ›i Ã®n turism, industrie, producÈ›ie È™i servicii; costul vieÈ›ii variazÄƒ semnificativ nord-sud.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      population: 58990000,
    },
    create: {
      name: "Italia",
      slug: "italia",
      isoCode: "IT",
      continent: "Europa",
      capital: "Roma",
      currency: "EUR",
      officialLanguage: "ItalianÄƒ",
      predominantReligion: "Catolicism",
      latitude: 41.9028,
      longitude: 12.4964,
      generalDescription:
        "Italia combinÄƒ centre economice dezvoltate cu un cost al vieÈ›ii variabil Ã®ntre nord È™i sud.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
      officialLanguage: "PortughezÄƒ",
      predominantReligion: "Catolicism",
      latitude: 38.7223,
      longitude: -9.1393,
      generalDescription:
        "Portugalia se aflÄƒ Ã®n vestul Peninsulei Iberice, la Oceanul Atlantic, avÃ¢nd graniÈ›Äƒ doar cu Spania. Este atractivÄƒ pentru climÄƒ È™i turism, cu oportunitÄƒÈ›i Ã®n servicii, tehnologie È™i ospitalitate; costurile sunt Ã®n general moderate.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
    },
    create: {
      name: "Portugalia",
      slug: "portugalia",
      isoCode: "PT",
      continent: "Europa",
      capital: "Lisabona",
      currency: "EUR",
      officialLanguage: "PortughezÄƒ",
      predominantReligion: "Catolicism",
      latitude: 38.7223,
      longitude: -9.1393,
      generalDescription:
        "Portugalia este atractivÄƒ pentru climÄƒ, siguranÈ›Äƒ È™i costuri relativ echilibrate faÈ›Äƒ de alte vest-europene.",
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
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
        rentUtilitiesEur: 1620,
        foodEur: 360,
        transportEur: 63,
        totalMonthlyCostEur: 2307,
      },
      {
        countryId: netherlands.id,
        rentUtilitiesEur: 2486,
        foodEur: 420,
        transportEur: 100,
        totalMonthlyCostEur: 3263,
      },
      {
        countryId: spain.id,
        rentUtilitiesEur: 1040,
        foodEur: 250,
        transportEur: 30,
        totalMonthlyCostEur: 1469,
      },
      {
        countryId: france.id,
        rentUtilitiesEur: 1390,
        foodEur: 320,
        transportEur: 85,
        totalMonthlyCostEur: 1987,
      },
      {
        countryId: italy.id,
        rentUtilitiesEur: 1240,
        foodEur: 280,
        transportEur: 39,
        totalMonthlyCostEur: 1728,
      },
      {
        countryId: portugal.id,
        rentUtilitiesEur: 1400,
        foodEur: 250,
        transportEur: 40,
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
        "Comunitate romÃ¢neascÄƒ activÄƒ, cu grupuri profesionale È™i evenimente culturale.",
      jobMarketNotes: "Cerere puternicÄƒ Ã®n IT, sÄƒnÄƒtate, logisticÄƒ È™i roluri administrative.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ, cu grupuri profesionale È™i evenimente culturale.",
      jobMarketNotes: "Cerere puternicÄƒ Ã®n IT, sÄƒnÄƒtate, logisticÄƒ È™i roluri administrative.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Amsterdam È™i zona Randstad.",
      jobMarketNotes: "PiaÈ›Äƒ competitivÄƒ cu roluri bune Ã®n tech, data, logisticÄƒ È™i servicii internaÈ›ionale.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Amsterdam È™i zona Randstad.",
      jobMarketNotes: "PiaÈ›Äƒ competitivÄƒ cu roluri bune Ã®n tech, data, logisticÄƒ È™i servicii internaÈ›ionale.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ È™i bine integratÄƒ.",
      jobMarketNotes: "Cerere Ã®n servicii, sÄƒnÄƒtate, logisticÄƒ È™i funcÈ›ii suport Ã®n companii mari.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ È™i bine integratÄƒ.",
      jobMarketNotes: "Cerere Ã®n servicii, sÄƒnÄƒtate, logisticÄƒ È™i funcÈ›ii suport Ã®n companii mari.",
    },
  });

  const paris = await prisma.city.upsert({
    where: { slug: "paris" },
    update: {
      countryId: france.id,
      name: "Paris",
      region: "ÃŽle-de-France",
      latitude: 48.8566,
      longitude: 2.3522,
      population: 2161000,
      generalDescription:
        "Orasul Paris este situat in regiunea ÃŽle-de-France. Pentru Paris, rolul administrativ asociat regiunii Ile-de-France in Franta concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ activÄƒ, cu reÈ›ele profesionale È™i organizaÈ›ii culturale.",
      jobMarketNotes: "Multe roluri Ã®n servicii, consulting, retail premium È™i sÄƒnÄƒtate.",
    },
    create: {
      countryId: france.id,
      name: "Paris",
      slug: "paris",
      region: "ÃŽle-de-France",
      latitude: 48.8566,
      longitude: 2.3522,
      population: 2161000,
      generalDescription:
        "Orasul Paris este situat in regiunea ÃŽle-de-France. Pentru Paris, rolul administrativ asociat regiunii Ile-de-France in Franta concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ activÄƒ, cu reÈ›ele profesionale È™i organizaÈ›ii culturale.",
      jobMarketNotes: "Multe roluri Ã®n servicii, consulting, retail premium È™i sÄƒnÄƒtate.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ Ã®n Milano È™i zona metropolitanÄƒ.",
      jobMarketNotes: "PiaÈ›Äƒ solidÄƒ Ã®n modÄƒ, design, finanÈ›e È™i servicii corporate.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ Ã®n Milano È™i zona metropolitanÄƒ.",
      jobMarketNotes: "PiaÈ›Äƒ solidÄƒ Ã®n modÄƒ, design, finanÈ›e È™i servicii corporate.",
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
        "Comunitate romÃ¢neascÄƒ Ã®n creÈ™tere, activÄƒ Ã®n servicii È™i domenii tehnice.",
      jobMarketNotes: "Cerere bunÄƒ Ã®n tech, suport clienÈ›i, turism È™i echipe internaÈ›ionale.",
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
        "Comunitate romÃ¢neascÄƒ Ã®n creÈ™tere, activÄƒ Ã®n servicii È™i domenii tehnice.",
      jobMarketNotes: "Cerere bunÄƒ Ã®n tech, suport clienÈ›i, turism È™i echipe internaÈ›ionale.",
    },
  });

  const munich = await prisma.city.upsert({
    where: { slug: "munchen" },
    update: {
      countryId: germany.id,
      name: "MÃ¼nchen",
      region: "Bavaria",
      latitude: 48.1351,
      longitude: 11.582,
      population: 1512000,
      generalDescription:
        "Orasul MÃ¼nchen este situat in regiunea Bavaria. Pentru MÃ¼nchen, rolul administrativ asociat regiunii Bavaria in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ bine reprezentatÄƒ Ã®n zona metropolitanÄƒ MÃ¼nchen.",
      jobMarketNotes: "Se cautÄƒ mult ingineri, specialiÈ™ti tech È™i personal pentru industrie auto.",
    },
    create: {
      countryId: germany.id,
      name: "MÃ¼nchen",
      slug: "munchen",
      region: "Bavaria",
      latitude: 48.1351,
      longitude: 11.582,
      population: 1512000,
      generalDescription:
        "Orasul MÃ¼nchen este situat in regiunea Bavaria. Pentru MÃ¼nchen, rolul administrativ asociat regiunii Bavaria in Germania concentreaza servicii publice, educatie si locuri de munca.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ bine reprezentatÄƒ Ã®n zona metropolitanÄƒ MÃ¼nchen.",
      jobMarketNotes: "Se cautÄƒ mult ingineri, specialiÈ™ti tech È™i personal pentru industrie auto.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n zona Rhein-Main.",
      jobMarketNotes: "FinanÈ›e, logisticÄƒ È™i aeroportul genereazÄƒ cerere constantÄƒ pentru roluri specializate.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n zona Rhein-Main.",
      jobMarketNotes: "FinanÈ›e, logisticÄƒ È™i aeroportul genereazÄƒ cerere constantÄƒ pentru roluri specializate.",
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
        "Comunitate romÃ¢neascÄƒ prezentÄƒ Ã®n Rotterdam È™i Ã®mprejurimi.",
      jobMarketNotes: "Portul susÈ›ine joburi Ã®n transport, logisticÄƒ, operaÈ›iuni È™i industrie maritimÄƒ.",
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
        "Comunitate romÃ¢neascÄƒ prezentÄƒ Ã®n Rotterdam È™i Ã®mprejurimi.",
      jobMarketNotes: "Portul susÈ›ine joburi Ã®n transport, logisticÄƒ, operaÈ›iuni È™i industrie maritimÄƒ.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n zona Haga-Rotterdam.",
      jobMarketNotes: "Cerere Ã®n drept, diplomaÈ›ie, organizaÈ›ii internaÈ›ionale È™i servicii publice.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n zona Haga-Rotterdam.",
      jobMarketNotes: "Cerere Ã®n drept, diplomaÈ›ie, organizaÈ›ii internaÈ›ionale È™i servicii publice.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ È™i activÄƒ Ã®n Barcelona.",
      jobMarketNotes: "Roluri numeroase Ã®n turism, servicii, creativ È™i startupuri digitale.",
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
        "Comunitate romÃ¢neascÄƒ numeroasÄƒ È™i activÄƒ Ã®n Barcelona.",
      jobMarketNotes: "Roluri numeroase Ã®n turism, servicii, creativ È™i startupuri digitale.",
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
        "Comunitate romÃ¢neascÄƒ stabilÄƒ È™i activÄƒ Ã®n regiune.",
      jobMarketNotes: "Turismul, logistica È™i producÈ›ia uÈ™oarÄƒ menÈ›in o piaÈ›Äƒ de muncÄƒ variatÄƒ.",
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
        "Comunitate romÃ¢neascÄƒ stabilÄƒ È™i activÄƒ Ã®n regiune.",
      jobMarketNotes: "Turismul, logistica È™i producÈ›ia uÈ™oarÄƒ menÈ›in o piaÈ›Äƒ de muncÄƒ variatÄƒ.",
    },
  });

  const lyon = await prisma.city.upsert({
    where: { slug: "lyon" },
    update: {
      countryId: france.id,
      name: "Lyon",
      region: "Auvergne-RhÃ´ne-Alpes",
      latitude: 45.764,
      longitude: 4.8357,
      population: 522000,
      generalDescription:
        "Orasul Lyon este situat in regiunea Auvergne-RhÃ´ne-Alpes. Lyon este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Lyon È™i zonele apropiate.",
      jobMarketNotes: "Industria, cercetarea È™i sÄƒnÄƒtatea aduc oportunitÄƒÈ›i stabile È™i bine plÄƒtite.",
    },
    create: {
      countryId: france.id,
      name: "Lyon",
      slug: "lyon",
      region: "Auvergne-RhÃ´ne-Alpes",
      latitude: 45.764,
      longitude: 4.8357,
      population: 522000,
      generalDescription:
        "Orasul Lyon este situat in regiunea Auvergne-RhÃ´ne-Alpes. Lyon este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Lyon È™i zonele apropiate.",
      jobMarketNotes: "Industria, cercetarea È™i sÄƒnÄƒtatea aduc oportunitÄƒÈ›i stabile È™i bine plÄƒtite.",
    },
  });

  const marseille = await prisma.city.upsert({
    where: { slug: "marseille" },
    update: {
      countryId: france.id,
      name: "Marseille",
      region: "Provence-Alpes-CÃ´te d'Azur",
      latitude: 43.2965,
      longitude: 5.3698,
      population: 877000,
      generalDescription:
        "Orasul Marseille este situat in regiunea Provence-Alpes-CÃ´te d'Azur. Marseille este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ prezentÄƒ Ã®n zona metropolitanÄƒ Marseille.",
      jobMarketNotes: "Portul È™i turismul deschid roluri Ã®n logisticÄƒ, transport È™i servicii.",
    },
    create: {
      countryId: france.id,
      name: "Marseille",
      slug: "marseille",
      region: "Provence-Alpes-CÃ´te d'Azur",
      latitude: 43.2965,
      longitude: 5.3698,
      population: 877000,
      generalDescription:
        "Orasul Marseille este situat in regiunea Provence-Alpes-CÃ´te d'Azur. Marseille este prezentat in surse publice ca un centru urban relevant in Franta, cu rol local distinct in administratie, servicii sau economie regionala.",
      romanianCommunityNotes:
        "Comunitate romÃ¢neascÄƒ prezentÄƒ Ã®n zona metropolitanÄƒ Marseille.",
      jobMarketNotes: "Portul È™i turismul deschid roluri Ã®n logisticÄƒ, transport È™i servicii.",
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
        "Comunitate romÃ¢neascÄƒ foarte numeroasÄƒ È™i bine organizatÄƒ.",
      jobMarketNotes: "AdministraÈ›ia, turismul È™i serviciile publice susÈ›in cererea de angajare.",
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
        "Comunitate romÃ¢neascÄƒ foarte numeroasÄƒ È™i bine organizatÄƒ.",
      jobMarketNotes: "AdministraÈ›ia, turismul È™i serviciile publice susÈ›in cererea de angajare.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Torino È™i suburbii.",
      jobMarketNotes: "Industria auto, ingineria È™i servicii tehnice rÄƒmÃ¢n principalele direcÈ›ii.",
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
        "Comunitate romÃ¢neascÄƒ activÄƒ Ã®n Torino È™i suburbii.",
      jobMarketNotes: "Industria auto, ingineria È™i servicii tehnice rÄƒmÃ¢n principalele direcÈ›ii.",
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
        "Comunitate romÃ¢neascÄƒ prezentÄƒ È™i Ã®n creÈ™tere Ã®n zona Porto.",
      jobMarketNotes: "Turismul, serviciile digitale È™i activitatea portuarÄƒ È›in piaÈ›a vie.",
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
        "Comunitate romÃ¢neascÄƒ prezentÄƒ È™i Ã®n creÈ™tere Ã®n zona Porto.",
      jobMarketNotes: "Turismul, serviciile digitale È™i activitatea portuarÄƒ È›in piaÈ›a vie.",
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
        "Comunitate romÃ¢neascÄƒ mai micÄƒ, dar activÄƒ Ã®n zona universitarÄƒ.",
      jobMarketNotes: "Universitatea È™i serviciile locale creeazÄƒ roluri pentru studenÈ›i È™i profesioniÈ™ti juniori.",
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
        "Comunitate romÃ¢neascÄƒ mai micÄƒ, dar activÄƒ Ã®n zona universitarÄƒ.",
      jobMarketNotes: "Universitatea È™i serviciile locale creeazÄƒ roluri pentru studenÈ›i È™i profesioniÈ™ti juniori.",
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
        rentUtilitiesEur: 1620,
        foodEur: 360,
        transportEur: 63,
        totalMonthlyCostEur: 2307,
      },
      {
        cityId: amsterdam.id,
        rentUtilitiesEur: 2486,
        foodEur: 420,
        transportEur: 100,
        totalMonthlyCostEur: 3263,
      },
      {
        cityId: madrid.id,
        rentUtilitiesEur: 1466,
        foodEur: 300,
        transportEur: 35,
        totalMonthlyCostEur: 1952,
      },
      {
        cityId: paris.id,
        rentUtilitiesEur: 1659,
        foodEur: 350,
        transportEur: 86,
        totalMonthlyCostEur: 2288,
      },
      {
        cityId: milan.id,
        rentUtilitiesEur: 1513,
        foodEur: 300,
        transportEur: 39,
        totalMonthlyCostEur: 2021,
      },
      {
        cityId: lisbon.id,
        rentUtilitiesEur: 1529,
        foodEur: 270,
        transportEur: 40,
        totalMonthlyCostEur: 1996,
      },
      {
        cityId: munich.id,
        rentUtilitiesEur: 1870,
        foodEur: 380,
        transportEur: 65,
        totalMonthlyCostEur: 2580,
      },
      {
        cityId: frankfurt.id,
        rentUtilitiesEur: 1600,
        foodEur: 350,
        transportEur: 60,
        totalMonthlyCostEur: 2272,
      },
      {
        cityId: rotterdam.id,
        rentUtilitiesEur: 1820,
        foodEur: 360,
        transportEur: 95,
        totalMonthlyCostEur: 2530,
      },
      {
        cityId: haga.id,
        rentUtilitiesEur: 1710,
        foodEur: 340,
        transportEur: 85,
        totalMonthlyCostEur: 2389,
      },
      {
        cityId: barcelona.id,
        rentUtilitiesEur: 1515,
        foodEur: 320,
        transportEur: 45,
        totalMonthlyCostEur: 2033,
      },
      {
        cityId: valencia.id,
        rentUtilitiesEur: 1030,
        foodEur: 250,
        transportEur: 35,
        totalMonthlyCostEur: 1465,
      },
      {
        cityId: lyon.id,
        rentUtilitiesEur: 1170,
        foodEur: 300,
        transportEur: 70,
        totalMonthlyCostEur: 1732,
      },
      {
        cityId: marseille.id,
        rentUtilitiesEur: 1070,
        foodEur: 290,
        transportEur: 55,
        totalMonthlyCostEur: 1596,
      },
      {
        cityId: rome.id,
        rentUtilitiesEur: 1340,
        foodEur: 290,
        transportEur: 40,
        totalMonthlyCostEur: 1840,
      },
      {
        cityId: turin.id,
        rentUtilitiesEur: 1030,
        foodEur: 260,
        transportEur: 38,
        totalMonthlyCostEur: 1496,
      },
      {
        cityId: porto.id,
        rentUtilitiesEur: 1210,
        foodEur: 240,
        transportEur: 40,
        totalMonthlyCostEur: 1645,
      },
      {
        cityId: coimbra.id,
        rentUtilitiesEur: 795,
        foodEur: 220,
        transportEur: 30,
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
      officialLanguage: "AlbanezÄƒ",
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
        "Albania este situatÄƒ Ã®n sud-estul Europei, Ã®n vestul Balcanilor, È™i are graniÈ›e cu Macedonia la est, Grecia la sud È™i Kosovo È™i Muntenegru la nord. Are acces la Marea AdriaticÄƒ È™i Marea IonicÄƒ la vest È™i sud-vest, fiind la mai puÈ›in de 72 de kilometri de Italia. OferÄƒ costuri de viaÈ›Äƒ mai reduse È™i oportunitÄƒÈ›i Ã®n servicii, turism È™i construcÈ›ii.",
    },
    {
      name: "Andorra",
      slug: "andorra",
      isoCode: "AD",
      capital: "Andorra la Vella",
      currency: "EUR",
      officialLanguage: "CatalanÄƒ",
      predominantReligion: "Catolicism",
      latitude: 42.5063,
      longitude: 1.5218,
      averageSalaryEur: 2200,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Andorra este situatÄƒ Ã®n MunÈ›ii Pirinei, Ã®ntre FranÈ›a È™i Spania. Economia se bazeazÄƒ pe turism, retail È™i servicii financiare; oferÄƒ oportunitÄƒÈ›i Ã®n ospitalitate È™i comerÈ›, iar costurile pot fi ridicate Ã®n zonele turistice.",
    },
    {
      name: "Armenia",
      slug: "armenia",
      isoCode: "AM",
      capital: "Yerevan",
      currency: "AMD",
      officialLanguage: "ArmeanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 40.0691,
      longitude: 45.0382,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Armenia se aflÄƒ la intersecÈ›ia dintre Europa È™i Asia, Ã®n regiunea Caucazului de Sud, avÃ¢nd graniÈ›e cu Georgia, Azerbaidjan, Turcia È™i Iran. DezvoltÄƒ un sector IT Ã®n creÈ™tere È™i servicii locale, oferind costuri de viaÈ›Äƒ reduse È™i oportunitÄƒÈ›i pentru antreprenori È™i specialiÈ™ti IT.",
    },
    {
      name: "Austria",
      slug: "austria",
      isoCode: "AT",
      capital: "Viena",
      currency: "EUR",
      officialLanguage: "GermanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 47.5162,
      longitude: 14.5501,
      averageSalaryEur: 3400,
      taxLevel: "HIGH",
      incomeTaxRate: 55,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Austria este situatÄƒ Ã®n Europa CentralÄƒ, Ã®nvecinatÄƒ cu Germania, Cehia, Slovacia, Ungaria, Slovenia, Italia, ElveÈ›ia È™i Liechtenstein. OferÄƒ stabilitate economicÄƒ, infrastructurÄƒ performantÄƒ È™i oportunitÄƒÈ›i Ã®n industrie, sÄƒnÄƒtate È™i servicii; costurile sunt moderate spre ridicate.",
    },
    {
      name: "Azerbaidjan",
      slug: "azerbaidjan",
      isoCode: "AZ",
      capital: "Baku",
      currency: "AZN",
      officialLanguage: "AzerÄƒ",
      predominantReligion: "Islam",
      latitude: 40.1431,
      longitude: 47.5769,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 25,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Azerbaidjan se Ã®ntinde Ã®n regiunea Caucazului, cu coastÄƒ la Marea CaspicÄƒ. Economia este puternic legatÄƒ de sectorul energetic, dar existÄƒ oportunitÄƒÈ›i Ã®n infrastructurÄƒ, servicii È™i dezvoltare urbanÄƒ; costurile sunt Ã®n general moderate.",
    },
    {
      name: "Belarus",
      slug: "belarus",
      isoCode: "BY",
      capital: "Minsk",
      currency: "BYN",
      officialLanguage: "BelarusÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 53.7098,
      longitude: 27.9534,
      averageSalaryEur: 800,
      taxLevel: "LOW",
      incomeTaxRate: 13,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Belarus este situatÄƒ Ã®n Europa de Est, Ã®ntre Polonia, Lituania, Letonia, Rusia È™i Ucraina. Economia este concentratÄƒ Ã®n industrie È™i servicii publice; costurile de viaÈ›Äƒ sunt relativ scÄƒzute È™i existÄƒ cerere Ã®n sectoare industriale È™i logistice.",
    },
    {
      name: "Belgia",
      slug: "belgia",
      isoCode: "BE",
      capital: "Bruxelles",
      currency: "EUR",
      officialLanguage: "NeerlandezÄƒ/FrancezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 50.5039,
      longitude: 4.4699,
      averageSalaryEur: 3600,
      taxLevel: "HIGH",
      incomeTaxRate: 50,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Belgia se aflÄƒ Ã®n Europa de Vest, Ã®ntre FranÈ›a, Germania, Luxemburg È™i ÈšÄƒrile de Jos, cu acces la Marea Nordului. Este un centru pentru instituÈ›ii europene, logisticÄƒ È™i servicii, oferind oportunitÄƒÈ›i Ã®n finanÈ›e, funcÈ›ii internaÈ›ionale È™i logisticÄƒ; costurile sunt ridicate Ã®n Bruxelles.",
    },
    {
      name: "Bosnia È™i HerÈ›egovina",
      slug: "bosnia-si-hertegovina",
      isoCode: "BA",
      capital: "Sarajevo",
      currency: "BAM",
      officialLanguage: "BosniacÄƒ",
      predominantReligion: "Islam",
      latitude: 43.9159,
      longitude: 17.6791,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Bosnia È™i HerÈ›egovina este situatÄƒ Ã®n Peninsula BalcanicÄƒ, cu graniÈ›e la CroaÈ›ia, Serbia È™i Muntenegru. OferÄƒ costuri reduse È™i oportunitÄƒÈ›i Ã®n servicii, turism local È™i industrie; pieÈ›ele regionale sunt Ã®n dezvoltare.",
    },
    {
      name: "Bulgaria",
      slug: "bulgaria",
      isoCode: "BG",
      capital: "Sofia",
      currency: "BGN",
      officialLanguage: "BulgarÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 42.7339,
      longitude: 25.4858,
      averageSalaryEur: 1200,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Bulgaria este situatÄƒ Ã®n sud-estul Europei, la Marea NeagrÄƒ, avÃ¢nd graniÈ›e cu RomÃ¢nia, Serbia, Macedonia de Nord, Grecia È™i Turcia. OferÄƒ costuri de viaÈ›Äƒ reduse È™i oportunitÄƒÈ›i Ã®n IT, outsourcing, agriculturÄƒ È™i turism.",
    },
    {
      name: "CroaÈ›ia",
      slug: "croatia",
      isoCode: "HR",
      capital: "Zagreb",
      currency: "EUR",
      officialLanguage: "CroatÄƒ",
      predominantReligion: "Catolicism",
      latitude: 45.1,
      longitude: 15.2,
      averageSalaryEur: 1500,
      taxLevel: "MEDIUM",
      incomeTaxRate: 30,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "CroaÈ›ia este situatÄƒ Ã®n sud-estul Europei, pe coasta MÄƒrii Adriatice, cu graniÈ›e la Slovenia, Ungaria, Serbia È™i Bosnia È™i HerÈ›egovina. Turismul, porturile È™i serviciile maritime oferÄƒ oportunitÄƒÈ›i; costurile variazÄƒ Ã®ntre litoral È™i interior.",
    },
    {
      name: "Cipru",
      slug: "cipru",
      isoCode: "CY",
      capital: "Nicosia",
      currency: "EUR",
      officialLanguage: "GreacÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 35.1264,
      longitude: 33.4299,
      averageSalaryEur: 2200,
      taxLevel: "MEDIUM",
      incomeTaxRate: 35,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Cipru are economie orientatÄƒ spre servicii, turism, finanÈ›e È™i shipping.",
    },
    {
      name: "Cehia",
      slug: "cehia",
      isoCode: "CZ",
      capital: "Praga",
      currency: "CZK",
      officialLanguage: "CehÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 49.8175,
      longitude: 15.473,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 23,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Cehia are piaÈ›Äƒ solidÄƒ Ã®n producÈ›ie, IT, automotive È™i servicii.",
    },
    {
      name: "Danemarca",
      slug: "danemarca",
      isoCode: "DK",
      capital: "Copenhaga",
      currency: "DKK",
      officialLanguage: "DanezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 56.2639,
      longitude: 9.5018,
      averageSalaryEur: 4700,
      taxLevel: "HIGH",
      incomeTaxRate: 55,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Danemarca oferÄƒ salarii mari, servicii publice puternice È™i piaÈ›Äƒ competitivÄƒ.",
    },
    {
      name: "Estonia",
      slug: "estonia",
      isoCode: "EE",
      capital: "Tallinn",
      currency: "EUR",
      officialLanguage: "EstonÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 58.5953,
      longitude: 25.0136,
      averageSalaryEur: 2200,
      taxLevel: "MEDIUM",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Estonia este recunoscutÄƒ pentru digitalizare, tehnologie È™i administraÈ›ie eficientÄƒ.",
    },
    {
      name: "Finlanda",
      slug: "finlanda",
      isoCode: "FI",
      capital: "Helsinki",
      currency: "EUR",
      officialLanguage: "FinlandezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 61.9241,
      longitude: 25.7482,
      averageSalaryEur: 3900,
      taxLevel: "HIGH",
      incomeTaxRate: 51,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Finlanda oferÄƒ calitate ridicatÄƒ a vieÈ›ii È™i oportunitÄƒÈ›i Ã®n tech, industrie È™i servicii.",
    },
    {
      name: "Georgia",
      slug: "georgia",
      isoCode: "GE",
      capital: "Tbilisi",
      currency: "GEL",
      officialLanguage: "GeorgianÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 42.3154,
      longitude: 43.3569,
      averageSalaryEur: 900,
      taxLevel: "LOW",
      incomeTaxRate: 20,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Georgia are costuri accesibile È™i un sector de servicii Ã®n creÈ™tere.",
    },
    {
      name: "Grecia",
      slug: "grecia",
      isoCode: "GR",
      capital: "Atena",
      currency: "EUR",
      officialLanguage: "GreacÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 39.0742,
      longitude: 21.8243,
      averageSalaryEur: 1500,
      taxLevel: "HIGH",
      incomeTaxRate: 44,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Grecia oferÄƒ oportunitÄƒÈ›i Ã®n turism, servicii, shipping È™i comerÈ›.",
    },
    {
      name: "Ungaria",
      slug: "ungaria",
      isoCode: "HU",
      capital: "Budapesta",
      currency: "HUF",
      officialLanguage: "MaghiarÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 47.1625,
      longitude: 19.5033,
      averageSalaryEur: 1700,
      taxLevel: "MEDIUM",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Ungaria are o piaÈ›Äƒ industrialÄƒ È™i de servicii stabilÄƒ, concentratÄƒ urban.",
    },
    {
      name: "Islanda",
      slug: "islanda",
      isoCode: "IS",
      capital: "Reykjavik",
      currency: "ISK",
      officialLanguage: "IslandezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 64.9631,
      longitude: -19.0208,
      averageSalaryEur: 4300,
      taxLevel: "HIGH",
      incomeTaxRate: 46,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Islanda oferÄƒ salarii ridicate È™i piaÈ›Äƒ localÄƒ orientatÄƒ spre servicii È™i energie.",
    },
    {
      name: "Irlanda",
      slug: "irlanda",
      isoCode: "IE",
      capital: "Dublin",
      currency: "EUR",
      officialLanguage: "EnglezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 53.1424,
      longitude: -7.6921,
      averageSalaryEur: 4200,
      taxLevel: "HIGH",
      incomeTaxRate: 40,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Irlanda este un hub european pentru tech, pharma È™i servicii financiare.",
    },
    {
      name: "Kosovo",
      slug: "kosovo",
      isoCode: "XK",
      capital: "Pristina",
      currency: "EUR",
      officialLanguage: "AlbanezÄƒ",
      predominantReligion: "Islam",
      latitude: 42.6026,
      longitude: 20.903,
      averageSalaryEur: 700,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Kosovo are costuri reduse È™i oportunitÄƒÈ›i Ã®n servicii, comerÈ› È™i sector public.",
    },
    {
      name: "Letonia",
      slug: "letonia",
      isoCode: "LV",
      capital: "Riga",
      currency: "EUR",
      officialLanguage: "LetonÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 56.8796,
      longitude: 24.6032,
      averageSalaryEur: 1700,
      taxLevel: "MEDIUM",
      incomeTaxRate: 31,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Letonia are o economie deschisÄƒ, cu accent pe servicii, transport È™i tehnologie.",
    },
    {
      name: "Liechtenstein",
      slug: "liechtenstein",
      isoCode: "LI",
      capital: "Vaduz",
      currency: "CHF",
      officialLanguage: "GermanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 47.166,
      longitude: 9.5554,
      averageSalaryEur: 5600,
      taxLevel: "LOW",
      incomeTaxRate: 22,
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Liechtenstein este o economie micÄƒ È™i foarte competitivÄƒ, axatÄƒ pe industrie È™i finanÈ›e.",
    },
    {
      name: "Lituania",
      slug: "lituania",
      isoCode: "LT",
      capital: "Vilnius",
      currency: "EUR",
      officialLanguage: "LituanianÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 55.1694,
      longitude: 23.8813,
      averageSalaryEur: 1900,
      taxLevel: "MEDIUM",
      incomeTaxRate: 32,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Lituania are piaÈ›Äƒ de muncÄƒ Ã®n creÈ™tere Ã®n servicii, fintech È™i logisticÄƒ.",
    },
    {
      name: "Luxemburg",
      slug: "luxemburg",
      isoCode: "LU",
      capital: "Luxemburg",
      currency: "EUR",
      officialLanguage: "FrancezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 49.8153,
      longitude: 6.1296,
      averageSalaryEur: 5900,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Luxemburg oferÄƒ salarii foarte ridicate È™i oportunitÄƒÈ›i Ã®n finanÈ›e È™i servicii premium.",
    },
    {
      name: "Malta",
      slug: "malta",
      isoCode: "MT",
      capital: "Valletta",
      currency: "EUR",
      officialLanguage: "EnglezÄƒ",
      predominantReligion: "Catolicism",
      latitude: 35.9375,
      longitude: 14.3754,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 35,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Malta este atractivÄƒ pentru servicii, gaming, fintech È™i turism.",
    },
    {
      name: "Moldova",
      slug: "moldova",
      isoCode: "MD",
      capital: "ChiÈ™inÄƒu",
      currency: "MDL",
      officialLanguage: "RomÃ¢nÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 47.4116,
      longitude: 28.3699,
      averageSalaryEur: 700,
      taxLevel: "LOW",
      incomeTaxRate: 12,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Moldova oferÄƒ costuri reduse È™i oportunitÄƒÈ›i Ã®n servicii, agriculturÄƒ È™i IT local.",
    },
    {
      name: "Monaco",
      slug: "monaco",
      isoCode: "MC",
      capital: "Monaco",
      currency: "EUR",
      officialLanguage: "FrancezÄƒ",
      predominantReligion: "Catolicism",
      latitude: 43.7384,
      longitude: 7.4246,
      averageSalaryEur: 4500,
      taxLevel: "LOW",
      incomeTaxRate: 0,
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Monaco este un microstat premium orientat spre servicii financiare È™i ospitalitate.",
    },
    {
      name: "Muntenegru",
      slug: "muntenegru",
      isoCode: "ME",
      capital: "Podgorica",
      currency: "EUR",
      officialLanguage: "MuntenegreanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 42.7087,
      longitude: 19.3744,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Muntenegru are economie bazatÄƒ pe turism, servicii È™i investiÈ›ii imobiliare.",
    },
    {
      name: "Macedonia de Nord",
      slug: "macedonia-de-nord",
      isoCode: "MK",
      capital: "Skopje",
      currency: "MKD",
      officialLanguage: "MacedoneanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 41.6086,
      longitude: 21.7453,
      averageSalaryEur: 850,
      taxLevel: "LOW",
      incomeTaxRate: 10,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Macedonia de Nord oferÄƒ costuri moderate È™i oportunitÄƒÈ›i Ã®n servicii È™i industrie uÈ™oarÄƒ.",
    },
    {
      name: "Norvegia",
      slug: "norvegia",
      isoCode: "NO",
      capital: "Oslo",
      currency: "NOK",
      officialLanguage: "NorvegianÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 60.472,
      longitude: 8.4689,
      averageSalaryEur: 5200,
      taxLevel: "HIGH",
      incomeTaxRate: 47,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Norvegia are salarii ridicate È™i oportunitÄƒÈ›i Ã®n energie, tehnologie È™i servicii.",
    },
    {
      name: "Polonia",
      slug: "polonia",
      isoCode: "PL",
      capital: "VarÈ™ovia",
      currency: "PLN",
      officialLanguage: "PolonezÄƒ",
      predominantReligion: "Catolicism",
      latitude: 51.9194,
      longitude: 19.1451,
      averageSalaryEur: 1800,
      taxLevel: "MEDIUM",
      incomeTaxRate: 32,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Polonia este una dintre cele mai dinamice economii europene Ã®n industrie È™i servicii.",
    },
    {
      name: "RomÃ¢nia",
      slug: "romania",
      isoCode: "RO",
      capital: "BucureÈ™ti",
      currency: "RON",
      officialLanguage: "RomÃ¢nÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 45.9432,
      longitude: 24.9668,
      averageSalaryEur: 1500,
      taxLevel: "MEDIUM",
      incomeTaxRate: 10,
      citizenshipDifficulty: "SCAZUTA",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "RomÃ¢nia are centre urbane puternice Ã®n IT, servicii, industrie È™i logisticÄƒ.",
    },
    {
      name: "Rusia",
      slug: "rusia",
      isoCode: "RU",
      capital: "Moscova",
      currency: "RUB",
      officialLanguage: "RusÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 61.524,
      longitude: 105.3188,
      averageSalaryEur: 1300,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Rusia are pieÈ›e urbane mari, cu oportunitÄƒÈ›i Ã®n industrie, energie È™i servicii.",
    },
    {
      name: "San Marino",
      slug: "san-marino",
      isoCode: "SM",
      capital: "San Marino",
      currency: "EUR",
      officialLanguage: "ItalianÄƒ",
      predominantReligion: "Catolicism",
      latitude: 43.9424,
      longitude: 12.4578,
      averageSalaryEur: 2300,
      taxLevel: "LOW",
      incomeTaxRate: 35,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "San Marino este microstat european cu economie de servicii È™i turism.",
    },
    {
      name: "Serbia",
      slug: "serbia",
      isoCode: "RS",
      capital: "Belgrad",
      currency: "RSD",
      officialLanguage: "SÃ¢rbÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 44.0165,
      longitude: 21.0059,
      averageSalaryEur: 1000,
      taxLevel: "LOW",
      incomeTaxRate: 15,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Serbia are costuri moderate È™i oportunitÄƒÈ›i Ã®n servicii, IT È™i producÈ›ie.",
    },
    {
      name: "Slovacia",
      slug: "slovacia",
      isoCode: "SK",
      capital: "Bratislava",
      currency: "EUR",
      officialLanguage: "SlovacÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 48.669,
      longitude: 19.699,
      averageSalaryEur: 1800,
      taxLevel: "MEDIUM",
      incomeTaxRate: 25,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Slovacia are economie industrialÄƒ puternicÄƒ È™i cerere bunÄƒ Ã®n servicii.",
    },
    {
      name: "Slovenia",
      slug: "slovenia",
      isoCode: "SI",
      capital: "Ljubljana",
      currency: "EUR",
      officialLanguage: "SlovenÄƒ",
      predominantReligion: "Catolicism",
      latitude: 46.1512,
      longitude: 14.9955,
      averageSalaryEur: 2100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 50,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "SCAZUTA",
      generalDescription:
        "Slovenia oferÄƒ echilibru Ã®ntre costuri, servicii publice È™i piaÈ›Äƒ de muncÄƒ stabilÄƒ.",
    },
    {
      name: "Suedia",
      slug: "suedia",
      isoCode: "SE",
      capital: "Stockholm",
      currency: "SEK",
      officialLanguage: "SuedezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 60.1282,
      longitude: 18.6435,
      averageSalaryEur: 4200,
      taxLevel: "HIGH",
      incomeTaxRate: 52,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Suedia are economie avansatÄƒ Ã®n tehnologie, industrie È™i servicii publice.",
    },
    {
      name: "ElveÈ›ia",
      slug: "elvetia",
      isoCode: "CH",
      capital: "Berna",
      currency: "CHF",
      officialLanguage: "GermanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 46.8182,
      longitude: 8.2275,
      averageSalaryEur: 6400,
      taxLevel: "MEDIUM",
      incomeTaxRate: 40,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "ElveÈ›ia oferÄƒ salarii foarte ridicate È™i o piaÈ›Äƒ premium Ã®n finanÈ›e, pharma È™i tehnologie.",
    },
    {
      name: "Turcia",
      slug: "turcia",
      isoCode: "TR",
      capital: "Ankara",
      currency: "TRY",
      officialLanguage: "TurcÄƒ",
      predominantReligion: "Islam",
      latitude: 38.9637,
      longitude: 35.2433,
      averageSalaryEur: 1100,
      taxLevel: "MEDIUM",
      incomeTaxRate: 40,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Turcia are centre urbane mari È™i economie diversificatÄƒ Ã®n industrie È™i servicii.",
    },
    {
      name: "Ucraina",
      slug: "ucraina",
      isoCode: "UA",
      capital: "Kiev",
      currency: "UAH",
      officialLanguage: "UcraineanÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 48.3794,
      longitude: 31.1656,
      averageSalaryEur: 800,
      taxLevel: "LOW",
      incomeTaxRate: 18,
      citizenshipDifficulty: "MEDIE",
      emigrationDifficulty: "MEDIE",
      generalDescription:
        "Ucraina are potenÈ›ial ridicat Ã®n servicii, tehnologie È™i reconstrucÈ›ie economicÄƒ.",
    },
    {
      name: "Regatul Unit",
      slug: "regatul-unit",
      isoCode: "GB",
      capital: "Londra",
      currency: "GBP",
      officialLanguage: "EnglezÄƒ",
      predominantReligion: "CreÈ™tinism",
      latitude: 55.3781,
      longitude: -3.436,
      averageSalaryEur: 3900,
      taxLevel: "HIGH",
      incomeTaxRate: 45,
      citizenshipDifficulty: "RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Regatul Unit oferÄƒ oportunitÄƒÈ›i extinse Ã®n finanÈ›e, tehnologie, sÄƒnÄƒtate È™i servicii.",
    },
    {
      name: "Vatican",
      slug: "vatican",
      isoCode: "VA",
      capital: "Vatican",
      currency: "EUR",
      officialLanguage: "ItalianÄƒ",
      predominantReligion: "Catolicism",
      latitude: 41.9029,
      longitude: 12.4534,
      averageSalaryEur: 2400,
      taxLevel: "LOW",
      incomeTaxRate: 0,
      citizenshipDifficulty: "FOARTE_RIDICATA",
      emigrationDifficulty: "RIDICATA",
      generalDescription:
        "Vatican este un microstat religios cu economie instituÈ›ionalÄƒ foarte restrÃ¢nsÄƒ.",
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
      region: "Austria SuperioarÄƒ",
      latitude: 48.3069,
      longitude: 14.2858,
      population: 210000,
      averageSalaryEur: 2536,
      generalDescription:
        "Orasul Linz este situat in regiunea Austria SuperioarÄƒ. Pentru Linz, rolul administrativ asociat regiunii Austria SuperioarÄƒ in Austria concentreaza servicii publice, educatie si locuri de munca.",
    },

    {
      countrySlug: "azerbaidjan",
      name: "Baku",
      slug: "baku",
      region: "Baku",
      latitude: 40.4093,
      longitude: 49.8671,
      population: 2300000,
      averageSalaryEur: 459,
      generalDescription:
        "Orasul Baku este situat in regiunea cu acelasi nume. Pentru Baku, rolul administrativ asociat regiunii Baku in Azerbaidjan concentreaza servicii publice, educatie si locuri de munca.",
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
      region: "Bruxelles-CapitalÄƒ",
      latitude: 50.8503,
      longitude: 4.3517,
      population: 1220000,
      averageSalaryEur: 2922,
      generalDescription:
        "Orasul Bruxelles este situat in regiunea Bruxelles-CapitalÄƒ. Pentru Bruxelles, rolul administrativ asociat regiunii Bruxelles-CapitalÄƒ in Belgia concentreaza servicii publice, educatie si locuri de munca.",
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
        "Orasul Sarajevo este situat in regiunea cu acelasi nume. Pentru Sarajevo, rolul administrativ asociat regiunii Sarajevo in Bosnia È™i HerÈ›egovina concentreaza servicii publice, educatie si locuri de munca.",
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
      region: "Cantonul HerÈ›egovina-Neretva",
      latitude: 43.3438,
      longitude: 17.8078,
      population: 105000,
      averageSalaryEur: 850,
      generalDescription:
        "Orasul Mostar este situat in regiunea Cantonul HerÈ›egovina-Neretva. Pentru Mostar, rolul administrativ asociat regiunii Cantonul HerÈ›egovina-Neretva in Bosnia È™i HerÈ›egovina concentreaza servicii publice, educatie si locuri de munca.",
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
      region: "OraÈ™ul Zagreb",
      latitude: 45.815,
      longitude: 15.9819,
      population: 769000,
      averageSalaryEur: 1652,
      generalDescription:
        "Orasul Zagreb este situat in regiunea OraÈ™ul Zagreb. Pentru Zagreb, rolul administrativ asociat regiunii Zagreb in CroaÈ›ia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "croatia",
      name: "Split",
      slug: "split",
      region: "Split-DalmaÈ›ia",
      latitude: 43.5081,
      longitude: 16.4402,
      population: 160000,
      averageSalaryEur: 1450,
      generalDescription:
        "Orasul Split este situat in regiunea Split-DalmaÈ›ia. Dimensiunea urbana a orasului Split aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
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
      region: "Praga",
      latitude: 50.0755,
      longitude: 14.4378,
      population: 1380000,
      averageSalaryEur: 2016,
      generalDescription:
        "Orasul Praga este situat in regiunea cu acelasi nume. Pentru Praga, rolul administrativ asociat regiunii Praga in Cehia concentreaza servicii publice, educatie si locuri de munca.",
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
      name: "PÃ¤rnu",
      slug: "parnu",
      region: "PÃ¤rnu",
      latitude: 58.3859,
      longitude: 24.4971,
      population: 40000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul PÃ¤rnu este situat in regiunea cu acelasi nume. PÃ¤rnu este prezentat in surse publice ca un centru urban relevant in Estonia, cu rol local distinct in administratie, servicii sau economie regionala.",
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
      region: "Finlanda Propriu-zisÄƒ",
      latitude: 60.4518,
      longitude: 22.2666,
      population: 195000,
      averageSalaryEur: 3400,
      generalDescription:
        "Orasul Turku este situat in regiunea Finlanda Propriu-zisÄƒ. Pentru Turku, rolul administrativ asociat regiunii Finlanda Propriu-zisÄƒ in Finlanda concentreaza servicii publice, educatie si locuri de munca.",
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
      region: "Macedonia CentralÄƒ",
      latitude: 40.6401,
      longitude: 22.9444,
      population: 1100000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Salonic este situat in regiunea Macedonia CentralÄƒ. Salonic are un profil de oras-port si centru universitar, cu oportunitati in logistica, servicii, comert si educatie.",
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
      region: "HajdÃº-Bihar",
      latitude: 47.5316,
      longitude: 21.6273,
      population: 200000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul Debrecen este situat in regiunea HajdÃº-Bihar. Dimensiunea urbana a orasului Debrecen aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "ungaria",
      name: "Szeged",
      slug: "szeged",
      region: "CsongrÃ¡d-CsanÃ¡d",
      latitude: 46.253,
      longitude: 20.1414,
      population: 157000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Szeged este situat in regiunea CsongrÃ¡d-CsanÃ¡d. Dimensiunea urbana a orasului Szeged aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
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
      region: "Cantonul Luxemburg",
      latitude: 49.6116,
      longitude: 6.1319,
      population: 136000,
      averageSalaryEur: 6200,
      generalDescription:
        "Orasul Luxemburg este situat in regiunea Cantonul Luxemburg. Pentru Luxemburg, rolul administrativ asociat regiunii Luxemburg in Luxemburg concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "luxemburg",
      name: "Esch-sur-Alzette",
      slug: "esch-sur-alzette",
      region: "Cantonul Esch-sur-Alzette",
      latitude: 49.4958,
      longitude: 5.9806,
      population: 37000,
      averageSalaryEur: 5200,
      generalDescription:
        "Orasul Esch-sur-Alzette este situat in regiunea Cantonul Esch-sur-Alzette. Esch-sur-Alzette combina mostenirea industriala cu zona universitara Belval, ceea ce sustine servicii, cercetare si locuri de munca tehnice.",
    },
    {
      countrySlug: "luxemburg",
      name: "Differdange",
      slug: "differdange",
      region: "Cantonul Esch-sur-Alzette",
      latitude: 49.5242,
      longitude: 5.8892,
      population: 30000,
      averageSalaryEur: 5000,
      generalDescription:
        "Orasul Differdange este situat in regiunea Cantonul Esch-sur-Alzette. Differdange este asociat cu industria siderurgica si cu servicii locale, fiind util pentru comparatii intre costuri si oportunitati tehnice.",
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
      name: "ChiÈ™inÄƒu",
      slug: "chisinau",
      region: "ChiÈ™inÄƒu",
      latitude: 47.0105,
      longitude: 28.8638,
      population: 639000,
      averageSalaryEur: 750,
      generalDescription:
        "Orasul ChiÈ™inÄƒu este situat in regiunea cu acelasi nume. Pentru ChiÈ™inÄƒu, rolul administrativ asociat regiunii ChiÈ™inÄƒu in Moldova concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "moldova",
      name: "BÄƒlÈ›i",
      slug: "balti",
      region: "BÄƒlÈ›i",
      latitude: 47.7539,
      longitude: 27.9184,
      population: 97000,
      averageSalaryEur: 650,
      generalDescription:
        "Orasul BÄƒlÈ›i este situat in regiunea cu acelasi nume. BÄƒlÈ›i este prezentat in surse publice ca un centru urban relevant in Moldova, cu rol local distinct in administratie, servicii sau economie regionala.",
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
      name: "NikÅ¡iÄ‡",
      slug: "niksic",
      region: "NikÅ¡iÄ‡",
      latitude: 42.7731,
      longitude: 18.9445,
      population: 57000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul NikÅ¡iÄ‡ este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului NikÅ¡iÄ‡ aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
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
      region: "TrÃ¸ndelag",
      latitude: 63.4305,
      longitude: 10.3951,
      population: 212000,
      averageSalaryEur: 4800,
      generalDescription:
        "Orasul Trondheim este situat in regiunea TrÃ¸ndelag. Trondheim este prezentat in surse publice ca un centru urban relevant in Norvegia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "polonia",
      name: "VarÈ™ovia",
      slug: "varsovia",
      region: "Mazovia",
      latitude: 52.2297,
      longitude: 21.0122,
      population: 1860000,
      averageSalaryEur: 2100,
      generalDescription:
        "Orasul VarÈ™ovia este situat in regiunea Mazovia. Pentru VarÈ™ovia, rolul administrativ asociat regiunii Mazovia in Polonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "polonia",
      name: "Cracovia",
      slug: "cracovia",
      region: "Polonia MicÄƒ",
      latitude: 50.0647,
      longitude: 19.945,
      population: 805000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Cracovia este situat in regiunea Polonia MicÄƒ. Pentru Cracovia, rolul administrativ asociat regiunii Polonia MicÄƒ in Polonia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "polonia",
      name: "Wroclaw",
      slug: "wroclaw",
      region: "Silezia InferioarÄƒ",
      latitude: 51.1079,
      longitude: 17.0385,
      population: 675000,
      averageSalaryEur: 1900,
      generalDescription:
        "Orasul Wroclaw este situat in regiunea Silezia InferioarÄƒ. Wroclaw este un centru universitar si de business in vestul Poloniei, cu oportunitati in IT, servicii si industrie.",
    },

    {
      countrySlug: "romania",
      name: "BucureÈ™ti",
      slug: "bucuresti",
      region: "BucureÈ™ti",
      latitude: 44.4268,
      longitude: 26.1025,
      population: 1710000,
      averageSalaryEur: 1800,
      generalDescription:
        "Orasul BucureÈ™ti este situat in regiunea cu acelasi nume. Pentru BucureÈ™ti, rolul administrativ asociat regiunii BucureÈ™ti in RomÃ¢nia concentreaza servicii publice, educatie si locuri de munca.",
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
        "Orasul Cluj-Napoca este situat in regiunea Cluj. Cluj-Napoca este prezentat in surse publice ca un centru urban relevant in RomÃ¢nia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "romania",
      name: "TimiÈ™oara",
      slug: "timisoara",
      region: "TimiÈ™",
      latitude: 45.7489,
      longitude: 21.2087,
      population: 250000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul TimiÈ™oara este situat in regiunea TimiÈ™. Pentru TimiÈ™oara, rolul administrativ asociat regiunii TimiÈ™ in RomÃ¢nia concentreaza servicii publice, educatie si locuri de munca.",
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
      region: "Sankt Petersburg",
      latitude: 59.9311,
      longitude: 30.3609,
      population: 5600000,
      averageSalaryEur: 1500,
      generalDescription:
        "Orasul Sankt Petersburg este situat in regiunea cu acelasi nume. Pentru Sankt Petersburg, rolul administrativ asociat regiunii Sankt Petersburg in Rusia concentreaza servicii publice, educatie si locuri de munca.",
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
      name: "NiÅ¡",
      slug: "nis",
      region: "NiÅ¡ava",
      latitude: 43.3209,
      longitude: 21.8958,
      population: 183000,
      averageSalaryEur: 900,
      generalDescription:
        "Orasul NiÅ¡ este situat in regiunea NiÅ¡ava. Nis este un centru regional important din sudul Serbiei, cu profil universitar, industrial si logistic.",
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
      name: "KoÅ¡ice",
      slug: "kosice",
      region: "KoÅ¡ice",
      latitude: 48.7164,
      longitude: 21.2611,
      population: 230000,
      averageSalaryEur: 1700,
      generalDescription:
        "Orasul KoÅ¡ice este situat in regiunea cu acelasi nume. KoÅ¡ice este un centru important al estului Slovaciei, cu profil industrial, universitar si servicii regionale.",
    },
    {
      countrySlug: "slovacia",
      name: "Å½ilina",
      slug: "zilina",
      region: "Å½ilina",
      latitude: 49.223,
      longitude: 18.7394,
      population: 81000,
      averageSalaryEur: 1600,
      generalDescription:
        "Orasul Å½ilina este situat in regiunea cu acelasi nume. Å½ilina este asociat cu transportul si industria auto, ceea ce sustine joburi in productie, logistica si servicii tehnice.",
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
      region: "VÃ¤stra GÃ¶taland",
      latitude: 57.7089,
      longitude: 11.9746,
      population: 605000,
      averageSalaryEur: 4200,
      generalDescription:
        "Orasul Gothenburg este situat in regiunea VÃ¤stra GÃ¶taland. Pentru Gothenburg, rolul administrativ asociat regiunii VÃ¤stra GÃ¶taland in Suedia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "suedia",
      name: "MalmÃ¶",
      slug: "malmo",
      region: "SkÃ¥ne",
      latitude: 55.605,
      longitude: 13.0038,
      population: 360000,
      averageSalaryEur: 4000,
      generalDescription:
        "Orasul MalmÃ¶ este situat in regiunea SkÃ¥ne. Dimensiunea urbana a orasului MalmÃ¶ aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },

    {
      countrySlug: "elvetia",
      name: "Zurich",
      slug: "zurich",
      region: "ZÃ¼rich",
      latitude: 47.3769,
      longitude: 8.5417,
      population: 443000,
      averageSalaryEur: 7000,
      generalDescription:
        "Orasul Zurich este situat in regiunea cu acelasi nume. Pentru Zurich, rolul administrativ asociat regiunii Zurich in ElveÈ›ia concentreaza servicii publice, educatie si locuri de munca.",
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
        "Orasul Geneva este situat in regiunea cu acelasi nume. Geneva este prezentat in surse publice ca un centru urban relevant in ElveÈ›ia, cu rol local distinct in administratie, servicii sau economie regionala.",
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
        "Orasul Basel este situat in regiunea Basel-Stadt. Basel este prezentat in surse publice ca un centru urban relevant in ElveÈ›ia, cu rol local distinct in administratie, servicii sau economie regionala.",
    },

    {
      countrySlug: "turcia",
      name: "Istanbul",
      slug: "istanbul",
      region: "Istanbul",
      latitude: 41.0082,
      longitude: 28.9784,
      population: 15600000,
      averageSalaryEur: 1300,
      generalDescription:
        "Orasul Istanbul este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Istanbul aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
    },
    {
      countrySlug: "turcia",
      name: "Ankara",
      slug: "ankara",
      region: "Ankara",
      latitude: 39.9334,
      longitude: 32.8597,
      population: 5700000,
      averageSalaryEur: 1200,
      generalDescription:
        "Orasul Ankara este situat in regiunea cu acelasi nume. Pentru Ankara, rolul administrativ asociat regiunii Ankara in Turcia concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "turcia",
      name: "Izmir",
      slug: "izmir",
      region: "Izmir",
      latitude: 38.4237,
      longitude: 27.1428,
      population: 4400000,
      averageSalaryEur: 1150,
      generalDescription:
        "Orasul Izmir este situat in regiunea cu acelasi nume. Dimensiunea urbana a orasului Izmir aduce o piata a muncii mai variata, infrastructura mai buna si acces la servicii diverse.",
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
      region: "Greater London",
      latitude: 51.5072,
      longitude: -0.1276,
      population: 9000000,
      averageSalaryEur: 4500,
      generalDescription:
        "Orasul Londra este situat in regiunea Greater London. Pentru Londra, rolul administrativ asociat regiunii Greater London in Regatul Unit concentreaza servicii publice, educatie si locuri de munca.",
    },
    {
      countrySlug: "regatul-unit",
      name: "Manchester",
      slug: "manchester",
      region: "Greater Manchester",
      latitude: 53.4808,
      longitude: -2.2426,
      population: 560000,
      averageSalaryEur: 3300,
      generalDescription:
        "Orasul Manchester este situat in regiunea Greater Manchester. Manchester este prezentat in surse publice ca un centru urban relevant in Regatul Unit, cu rol local distinct in administratie, servicii sau economie regionala.",
    },
    {
      countrySlug: "regatul-unit",
      name: "Birmingham",
      slug: "birmingham",
      region: "West Midlands",
      latitude: 52.4862,
      longitude: -1.8904,
      population: 1150000,
      averageSalaryEur: 3200,
      generalDescription:
        "Orasul Birmingham este situat in regiunea West Midlands. Birmingham este prezentat in surse publice ca un centru urban relevant in Regatul Unit, cu rol local distinct in administratie, servicii sau economie regionala.",
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
      name: "GrÄƒdinile Vaticanului",
      slug: "gradinile-vaticanului",
      region: "Vatican",
      latitude: 41.9012,
      longitude: 12.4482,
      population: 300,
      averageSalaryEur: 2300,
      generalDescription:
        "Orasul GrÄƒdinile Vaticanului este situat in regiunea Vatican. Gradinile Vaticanului au un rol cultural si institutional, fiind relevante pentru turism controlat, patrimoniu si administrarea spatiilor istorice.",
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
        emigrationDifficulty: country.emigrationDifficulty,      },
      create: {
        ...countryData,
        continent: "Europa",
        generalDescription:
          countryDescriptions[country.slug] ?? country.generalDescription,
        population: country.population ?? null,
        citizenshipDifficulty: country.citizenshipDifficulty,
        emigrationDifficulty: country.emigrationDifficulty,      },
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
          "ExistÄƒ puncte de sprijin comunitar romÃ¢nesc, Ã®n special Ã®n zonele urbane mari.",
        jobMarketNotes:
          "OportunitÄƒÈ›ile depind de industrie È™i de sezonalitate, cu cerere crescutÄƒ Ã®n servicii È™i domenii tehnice.",
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
          "ExistÄƒ puncte de sprijin comunitar romÃ¢nesc, Ã®n special Ã®n zonele urbane mari.",
        jobMarketNotes:
          "OportunitÄƒÈ›ile depind de industrie È™i de sezonalitate, cu cerere crescutÄƒ Ã®n servicii È™i domenii tehnice.",
      },
    });
  }

  const europeanCountries = await prisma.country.findMany({
    where: { continent: "Europa" },
    select: {
      id: true,
      name: true,
      slug: true,
      cities: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  for (const country of europeanCountries) {
    const countrySalary =
      countryNumbeoEstimates[country.slug]?.averageSalaryEur ??
      additionalEuropeanCountries.find((item) => item.slug === country.slug)
        ?.averageSalaryEur ??
      1800;
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
      const citySalary =
        additionalEuropeanCities.find((item) => item.slug === city.slug)
          ?.averageSalaryEur ?? countrySalary;
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
    const country = await prisma.country.findUniqueOrThrow({
      where: { slug },
      select: { id: true },
    });

    const existingCountryCost = await prisma.costOfLiving.findFirst({
      where: { countryId: country.id, cityId: null },
      select: { id: true },
    });

    const costData = {
      averageSalaryEur: estimate.averageSalaryEur,
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
