import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const germany = await prisma.country.upsert({
    where: { slug: "germania" },
    update: {},
    create: {
      name: "Germania",
      slug: "germania",
      isoCode: "DE",
      continent: "Europa",
      capital: "Berlin",
      currency: "EUR",
      officialLanguage: "Germană",
      predominantReligion: "Creștinism",
      romanianCommunityNotes:
        "Comunități românești puternice în Berlin, München, Frankfurt și zona Ruhr.",
      jobMarketNotes:
        "Piață a muncii solidă în inginerie, IT, sănătate, logistică și servicii.",
      localLawNotes:
        "Înregistrarea domiciliului este necesară după mutare, iar asigurarea medicală este obligatorie.",
      generalDescription:
        "Germania este una dintre cele mai căutate destinații europene pentru muncă, studii și stabilire pe termen lung.",
      citizenshipDifficulty: "MEDIUM",
      emigrationDifficulty: "MEDIUM",
      latitude: 51.165691,
      longitude: 10.451526,
      averageSalaryEur: 4100,
      taxLevel: "HIGH",
      incomeTaxRate: 42,
      isFeatured: true,
    },
  });

  await prisma.city.upsert({
    where: { slug: "berlin" },
    update: {},
    create: {
      countryId: germany.id,
      name: "Berlin",
      slug: "berlin",
      region: "Berlin",
      latitude: 52.52,
      longitude: 13.405,
      population: 3677000,
      generalDescription:
        "Berlin este un oraș cosmopolit, cu multe oportunități în tehnologie, servicii și industrii creative.",
      romanianCommunityNotes:
        "Comunitate românească activă, cu grupuri locale și evenimente culturale.",
      jobMarketNotes:
        "Oportunități bune în IT, startup-uri, cercetare, ospitalitate și servicii.",
      localLawNotes:
        "Procesul de Anmeldung este important pentru acces la servicii administrative.",
      predominantReligion: "Creștinism",
      emigrationDifficulty: "MEDIUM",
      averageSalaryEur: 3900,
      isFeatured: true,
      costOfLiving: {
        create: {
          rentOneBedroomEur: 1250,
          utilitiesEur: 280,
          groceriesEur: 360,
          transportEur: 90,
          healthcareEur: 220,
          internetEur: 35,
          totalMonthlyCostEur: 2235,
          sourceName: "Date demonstrative",
          collectedAt: new Date("2026-01-01"),
        },
      },
    },
  });

  await prisma.visaInfo.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      countryId: germany.id,
      category: "WORK",
      title: "Drept de muncă pentru cetățeni UE",
      summary:
        "Cetățenii români pot lucra în Germania fără viză, dar trebuie să respecte pașii administrativi locali.",
      legalSteps: [
        "Găsirea unei locuințe și înregistrarea domiciliului.",
        "Obținerea unui contract de muncă sau înregistrarea ca freelancer.",
        "Activarea unei asigurări medicale.",
      ],
      requiredDocuments: [
        "Carte de identitate sau pașaport",
        "Contract de închiriere",
        "Contract de muncă sau dovadă venit",
      ],
      estimatedDuration: "1-4 săptămâni pentru pașii administrativi de bază",
      officialUrl: "https://www.make-it-in-germany.com/",
    },
  });
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
