export type OfficialMigrationResource = {
  title: string;
  description: string;
  url: string;
};

const euOrEeaCountrySlugs = new Set([
  "austria",
  "belgia",
  "bulgaria",
  "cehia",
  "cipru",
  "croatia",
  "danemarca",
  "estonia",
  "finlanda",
  "franta",
  "germania",
  "grecia",
  "irlanda",
  "islanda",
  "italia",
  "letonia",
  "liechtenstein",
  "lituania",
  "luxemburg",
  "malta",
  "norvegia",
  "polonia",
  "portugalia",
  "romania",
  "slovacia",
  "slovenia",
  "spania",
  "suedia",
  "tarile-de-jos",
  "ungaria",
]);

const europeanUnionImmigrationResource: OfficialMigrationResource = {
  title: "Uniunea Europeană - imigrare și mobilitate",
  description:
    "Pagină oficială UE cu orientare generală despre mutare, muncă și drepturi în statele membre.",
  url: "https://european-union.europa.eu/live-work-study/immigration-eu_en",
};

const romanianForeignMinistryResource: OfficialMigrationResource = {
  title: "MAE România - condiții de călătorie",
  description:
    "Punct oficial românesc pentru verificarea condițiilor de intrare, siguranță și recomandări consulare.",
  url: "https://www.mae.ro/travel-conditions",
};

const yourEuropeResidenceResource: OfficialMigrationResource = {
  title: "Your Europe - drepturi de ședere pentru cetățeni UE",
  description:
    "Portal oficial al Uniunii Europene pentru dreptul de ședere, înregistrare și ședere permanentă în statele UE/SEE.",
  url: "https://europa.eu/youreurope/citizens/residence/residence-rights/index_en.htm",
};

const visaDescription =
  "Sursă oficială pentru verificarea condițiilor de intrare, a vizelor și a serviciilor consulare.";
const migrationDescription =
  "Autoritate oficială pentru ședere, migrație, permise, documente și proceduri pentru străini.";
const citizenshipDescription =
  "Sursă oficială pentru naturalizare, cetățenie și proceduri administrative conexe.";
const governmentDescription =
  "Portal guvernamental oficial pentru servicii publice, documente și informații administrative.";

function resource(
  title: string,
  url: string,
  description: string,
): OfficialMigrationResource {
  return { title, description, url };
}

const countryOfficialResources: Record<string, OfficialMigrationResource[]> = {
  albania: [
    resource("Albania e-Visa", "https://e-visa.al/", visaDescription),
    resource(
      "Ministerul de Interne Albania",
      "https://mb.gov.al/",
      migrationDescription,
    ),
  ],
  andorra: [
    resource(
      "Immigration Andorra",
      "https://www.immigracio.ad/",
      migrationDescription,
    ),
    resource(
      "Guvernul Andorrei",
      "https://www.govern.ad/",
      governmentDescription,
    ),
  ],
  armenia: [
    resource("Armenia e-Visa", "https://evisa.mfa.am/", visaDescription),
    resource(
      "Migration and Citizenship Service Armenia",
      "https://migration.am/",
      migrationDescription,
    ),
  ],
  austria: [
    resource(
      "Migration.gv.at",
      "https://www.migration.gv.at/en/",
      migrationDescription,
    ),
    resource(
      "Oesterreich.gv.at - cetățenie",
      "https://www.oesterreich.gv.at/en/themen/menschen_aus_anderen_staaten/staatsbuergerschaft.html",
      citizenshipDescription,
    ),
  ],
  azerbaidjan: [
    resource(
      "Azerbaijan ASAN Visa",
      "https://evisa.gov.az/en/",
      visaDescription,
    ),
    resource(
      "State Migration Service Azerbaijan",
      "https://migration.gov.az/en",
      migrationDescription,
    ),
  ],
  belarus: [
    resource(
      "Ministerul Afacerilor Externe Belarus - vize",
      "https://mfa.gov.by/en/visa/",
      visaDescription,
    ),
    resource(
      "Ministry of Internal Affairs Belarus",
      "https://mvd.gov.by/en",
      migrationDescription,
    ),
  ],
  belgia: [
    resource(
      "Immigration Office Belgium",
      "https://dofi.ibz.be/en",
      migrationDescription,
    ),
    resource(
      "Justice Belgium - nationalitate",
      "https://justice.belgium.be/en/themes_and_files/persons_and_families/nationality",
      citizenshipDescription,
    ),
  ],
  "bosnia-si-hertegovina": [
    resource(
      "Ministry of Foreign Affairs Bosnia and Herzegovina",
      "https://www.mvp.gov.ba/konzularne_informacije/vize/Default.aspx",
      visaDescription,
    ),
    resource(
      "Service for Foreigners Affairs",
      "https://sps.gov.ba/",
      migrationDescription,
    ),
  ],
  bulgaria: [
    resource(
      "Migration Directorate Bulgaria",
      "https://mvr.bg/migration",
      migrationDescription,
    ),
    resource(
      "Ministry of Justice Bulgaria",
      "https://justice.government.bg/",
      citizenshipDescription,
    ),
  ],
  cehia: [
    resource(
      "Foreigners Reservation System Czechia",
      "https://frs.gov.cz/en",
      migrationDescription,
    ),
    resource(
      "Ministry of the Interior Czech Republic",
      "https://www.mvcr.cz/mvcren/",
      citizenshipDescription,
    ),
  ],
  cipru: [
    resource(
      "Civil Registry and Migration Department Cyprus",
      "https://www.migration.gov.cy/",
      migrationDescription,
    ),
    resource("Gov.cy", "https://www.gov.cy/", governmentDescription),
  ],
  croatia: [
    resource(
      "Ministry of the Interior Croatia",
      "https://mup.gov.hr/",
      migrationDescription,
    ),
    resource("Gov.hr", "https://gov.hr/en", governmentDescription),
  ],
  danemarca: [
    resource(
      "New to Denmark",
      "https://www.nyidanmark.dk/en-GB",
      migrationDescription,
    ),
    resource(
      "Life in Denmark",
      "https://lifeindenmark.borger.dk/",
      governmentDescription,
    ),
  ],
  estonia: [
    resource(
      "Police and Border Guard Board Estonia",
      "https://www.politsei.ee/en",
      migrationDescription,
    ),
    resource("Eesti.ee", "https://www.eesti.ee/en", governmentDescription),
  ],
  finlanda: [
    resource(
      "Finnish Immigration Service",
      "https://migri.fi/en/home",
      migrationDescription,
    ),
    resource(
      "InfoFinland",
      "https://www.infofinland.fi/en",
      governmentDescription,
    ),
  ],
  franta: [
    resource(
      "Service-Public.fr - străini",
      "https://www.service-public.fr/particuliers/vosdroits/N19804",
      migrationDescription,
    ),
    resource(
      "Service-Public.fr - cetățenie franceză",
      "https://www.service-public.fr/particuliers/vosdroits/N111",
      citizenshipDescription,
    ),
  ],
  georgia: [
    resource("GeoConsul", "https://www.geoconsul.gov.ge/", visaDescription),
    resource(
      "State Commission on Migration Issues Georgia",
      "https://migration.commission.ge/",
      migrationDescription,
    ),
  ],
  germania: [
    resource(
      "BAMF - migrație și ședere",
      "https://www.bamf.de/EN/Themen/MigrationAufenthalt/migrationaufenthalt-node.html",
      migrationDescription,
    ),
    resource(
      "Make it in Germany",
      "https://www.make-it-in-germany.com/en/",
      governmentDescription,
    ),
  ],
  grecia: [
    resource(
      "Ministry of Migration and Asylum Greece",
      "https://migration.gov.gr/en/",
      migrationDescription,
    ),
    resource("Gov.gr", "https://www.gov.gr/en", governmentDescription),
  ],
  ungaria: [
    resource(
      "National Directorate-General for Aliens Policing",
      "https://oif.gov.hu/",
      migrationDescription,
    ),
    resource(
      "Consular Services Hungary",
      "https://konzinfo.mfa.gov.hu/en",
      visaDescription,
    ),
  ],
  islanda: [
    resource(
      "Island.is - imigrare în Islanda",
      "https://island.is/en/immigrate-to-iceland",
      migrationDescription,
    ),
    resource(
      "Island.is - cetățenie",
      "https://island.is/en/citizenship",
      citizenshipDescription,
    ),
  ],
  irlanda: [
    resource(
      "Irish Immigration Service",
      "https://www.irishimmigration.ie/",
      migrationDescription,
    ),
    resource(
      "Citizens Information Ireland",
      "https://www.citizensinformation.ie/en/",
      governmentDescription,
    ),
  ],
  italia: [
    resource(
      "Visa for Italy",
      "https://vistoperitalia.esteri.it/home/en",
      visaDescription,
    ),
    resource(
      "Portale Integrazione Migranti",
      "https://www.integrazionemigranti.gov.it/",
      migrationDescription,
    ),
  ],
  kosovo: [
    resource(
      "Ministry of Foreign Affairs Kosovo",
      "https://mfa-ks.net/en/",
      visaDescription,
    ),
    resource(
      "Government of Kosovo",
      "https://www.rks-gov.net/EN/",
      governmentDescription,
    ),
  ],
  letonia: [
    resource(
      "Office of Citizenship and Migration Affairs Latvia",
      "https://www.pmlp.gov.lv/en",
      migrationDescription,
    ),
    resource("Latvija.lv", "https://latvija.gov.lv/", governmentDescription),
  ],
  liechtenstein: [
    resource(
      "Liechtenstein National Administration",
      "https://www.llv.li/",
      governmentDescription,
    ),
    resource(
      "Government of Liechtenstein",
      "https://www.regierung.li/",
      governmentDescription,
    ),
  ],
  lituania: [
    resource(
      "Migration Department Lithuania",
      "https://www.migracija.lt/",
      migrationDescription,
    ),
    resource(
      "I Choose Lithuania",
      "https://www.renkuosilietuva.lt/en/",
      governmentDescription,
    ),
  ],
  luxemburg: [
    resource(
      "Guichet.lu - imigrare",
      "https://guichet.public.lu/en/citoyens/immigration.html",
      migrationDescription,
    ),
    resource(
      "Guichet.lu - naționalitate",
      "https://guichet.public.lu/en/citoyens/citoyennete/nationalite-luxembourgeoise.html",
      citizenshipDescription,
    ),
  ],
  malta: [
    resource(
      "Identita Malta",
      "https://identita.gov.mt/",
      migrationDescription,
    ),
    resource(
      "Residency Malta Agency",
      "https://residencymalta.gov.mt/",
      migrationDescription,
    ),
  ],
  moldova: [
    resource(
      "Biroul Migrație și Azil Moldova",
      "https://bma.gov.md/",
      migrationDescription,
    ),
    resource(
      "Agenția Servicii Publice Moldova",
      "https://www.asp.gov.md/",
      governmentDescription,
    ),
  ],
  monaco: [
    resource(
      "Monaco Service Public - nationalitate și rezidență",
      "https://service-public-particuliers.gouv.mc/Nationality-and-residency",
      citizenshipDescription,
    ),
    resource(
      "Government of Monaco",
      "https://www.gouv.mc/",
      governmentDescription,
    ),
  ],
  muntenegru: [
    resource(
      "Government of Montenegro - Ministry of Interior",
      "https://www.gov.me/en/mup",
      migrationDescription,
    ),
    resource(
      "Government of Montenegro",
      "https://www.gov.me/en",
      governmentDescription,
    ),
  ],
  "macedonia-de-nord": [
    resource(
      "Ministry of Foreign Affairs North Macedonia - vize",
      "https://mfa.gov.mk/en/page/31/visa-information",
      visaDescription,
    ),
    resource(
      "Ministry of Interior North Macedonia",
      "https://mvr.gov.mk/default",
      migrationDescription,
    ),
  ],
  norvegia: [
    resource(
      "Norwegian Directorate of Immigration",
      "https://www.udi.no/en/",
      migrationDescription,
    ),
    resource(
      "Skatteetaten - mutare în Norvegia",
      "https://www.skatteetaten.no/en/person/national-registry/moving/",
      governmentDescription,
    ),
  ],
  polonia: [
    resource(
      "Office for Foreigners Poland",
      "https://www.gov.pl/web/udsc-en",
      migrationDescription,
    ),
    resource("Gov.pl", "https://www.gov.pl/web/gov", governmentDescription),
  ],
  portugalia: [
    resource("AIMA Portugal", "https://aima.gov.pt/", migrationDescription),
    resource(
      "ePortugal - migranți",
      "https://eportugal.gov.pt/en/migrantes-viver-e-trabalhar-em-portugal",
      governmentDescription,
    ),
  ],
  romania: [
    resource(
      "Inspectoratul General pentru Imigrări",
      "https://igi.mai.gov.ro/",
      migrationDescription,
    ),
    resource(
      "Autoritatea Națională pentru Cetățenie",
      "https://cetatenie.just.ro/",
      citizenshipDescription,
    ),
  ],
  rusia: [
    resource(
      "Ministry of Foreign Affairs Russia - vize",
      "https://mid.ru/en/foreign_policy/visa/",
      visaDescription,
    ),
    resource(
      "Ministry of Internal Affairs Russia",
      "https://en.mvd.ru/",
      migrationDescription,
    ),
  ],
  "san-marino": [
    resource(
      "Segreteria Esteri San Marino",
      "https://www.esteri.sm/",
      visaDescription,
    ),
    resource(
      "San Marino Government",
      "https://www.gov.sm/",
      governmentDescription,
    ),
  ],
  serbia: [
    resource(
      "Ministry of Foreign Affairs Serbia - vize",
      "https://www.mfa.gov.rs/en/citizens/travel-serbia/visa-requirements",
      visaDescription,
    ),
    resource(
      "eUprava Serbia",
      "https://euprava.gov.rs/",
      governmentDescription,
    ),
  ],
  slovacia: [
    resource(
      "Ministry of Interior Slovakia - străini",
      "https://www.minv.sk/?residence-of-an-foreigner",
      migrationDescription,
    ),
    resource(
      "Slovensko.sk",
      "https://www.slovensko.sk/en/",
      governmentDescription,
    ),
  ],
  slovenia: [
    resource(
      "InfoTujci Slovenia",
      "https://infotujci.si/en/",
      migrationDescription,
    ),
    resource(
      "Gov.si - cetățenie",
      "https://www.gov.si/en/topics/citizenship/",
      citizenshipDescription,
    ),
  ],
  spania: [
    resource(
      "Administracion.gob.es - mutare în Spania",
      "https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia.html",
      migrationDescription,
    ),
    resource(
      "Ministerio de Justicia - naționalitate",
      "https://www.mjusticia.gob.es/en/ciudadania/nacionalidad",
      citizenshipDescription,
    ),
  ],
  suedia: [
    resource(
      "Swedish Migration Agency",
      "https://www.migrationsverket.se/English.html",
      migrationDescription,
    ),
    resource(
      "Sweden.se - mutare în Suedia",
      "https://sweden.se/work-business/moving-to-sweden",
      governmentDescription,
    ),
  ],
  elvetia: [
    resource(
      "State Secretariat for Migration Switzerland",
      "https://www.sem.admin.ch/sem/en/home.html",
      migrationDescription,
    ),
    resource(
      "Ch.ch - străini în Elveția",
      "https://www.ch.ch/en/foreign-nationals-in-switzerland/",
      governmentDescription,
    ),
  ],
  "tarile-de-jos": [
    resource(
      "IND Netherlands - cetățeni UE/SEE",
      "https://ind.nl/en/eu-eea-or-swiss-citizens",
      migrationDescription,
    ),
    resource(
      "Government.nl - cetățenie olandeză",
      "https://www.government.nl/topics/dutch-citizenship",
      citizenshipDescription,
    ),
  ],
  turcia: [
    resource(
      "e-Residence Turkey",
      "https://e-ikamet.goc.gov.tr/",
      migrationDescription,
    ),
    resource(
      "Directorate General of Migration Management Turkey",
      "https://en.goc.gov.tr/",
      migrationDescription,
    ),
  ],
  ucraina: [
    resource(
      "State Migration Service Ukraine",
      "https://dmsu.gov.ua/en-home.html",
      migrationDescription,
    ),
    resource(
      "Ministry of Foreign Affairs Ukraine",
      "https://mfa.gov.ua/en",
      visaDescription,
    ),
  ],
  "regatul-unit": [
    resource(
      "Gov.uk - vize și imigrare",
      "https://www.gov.uk/browse/visas-immigration",
      migrationDescription,
    ),
    resource(
      "Gov.uk - cetățenie britanică",
      "https://www.gov.uk/british-citizenship",
      citizenshipDescription,
    ),
  ],
  vatican: [
    resource(
      "Vatican City State",
      "https://www.vaticanstate.va/",
      governmentDescription,
    ),
    resource(
      "Holy See Press Office",
      "https://press.vatican.va/",
      governmentDescription,
    ),
  ],
};

export function getOfficialMigrationResources(slug: string) {
  const resources = [
    ...(countryOfficialResources[slug] ?? []),
    ...(euOrEeaCountrySlugs.has(slug)
      ? [europeanUnionImmigrationResource]
      : []),
    romanianForeignMinistryResource,
    ...(euOrEeaCountrySlugs.has(slug) ? [yourEuropeResidenceResource] : []),
  ];

  const resourcesBySite = new Map<string, OfficialMigrationResource>();

  for (const resource of resources) {
    const url = new URL(resource.url);
    const siteKey = url.hostname.replace(/^www\./, "").toLowerCase();

    if (!resourcesBySite.has(siteKey)) {
      resourcesBySite.set(siteKey, resource);
    }
  }

  return Array.from(resourcesBySite.values());
}
