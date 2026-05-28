-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- Enable UUID generation used by application-owned tables.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LocationKind" AS ENUM ('COUNTRY', 'CITY');

-- CreateEnum
CREATE TYPE "EmigrationDifficulty" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "VisaCategory" AS ENUM ('TOURIST', 'STUDY', 'WORK', 'FAMILY_REUNIFICATION', 'BUSINESS', 'DIGITAL_NOMAD', 'PERMANENT_RESIDENCE', 'OTHER');

-- CreateEnum
CREATE TYPE "TaxLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isoCode" VARCHAR(2) NOT NULL,
    "continent" TEXT NOT NULL,
    "capital" TEXT,
    "currency" TEXT,
    "officialLanguage" TEXT,
    "predominantReligion" TEXT,
    "romanianCommunityNotes" TEXT,
    "jobMarketNotes" TEXT,
    "localLawNotes" TEXT,
    "generalDescription" TEXT NOT NULL,
    "citizenshipDifficulty" "EmigrationDifficulty" NOT NULL,
    "emigrationDifficulty" "EmigrationDifficulty" NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "averageSalaryEur" INTEGER,
    "taxLevel" "TaxLevel",
    "incomeTaxRate" DECIMAL(5,2),
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "countryId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "population" INTEGER,
    "generalDescription" TEXT NOT NULL,
    "romanianCommunityNotes" TEXT,
    "jobMarketNotes" TEXT,
    "localLawNotes" TEXT,
    "predominantReligion" TEXT,
    "emigrationDifficulty" "EmigrationDifficulty",
    "averageSalaryEur" INTEGER,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_infos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "countryId" UUID NOT NULL,
    "category" "VisaCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "legalSteps" TEXT[],
    "requiredDocuments" TEXT[],
    "estimatedDuration" TEXT,
    "officialUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visa_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_of_living" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "countryId" UUID,
    "cityId" UUID,
    "rentOneBedroomEur" INTEGER,
    "utilitiesEur" INTEGER,
    "groceriesEur" INTEGER,
    "transportEur" INTEGER,
    "healthcareEur" INTEGER,
    "internetEur" INTEGER,
    "totalMonthlyCostEur" INTEGER,
    "sourceName" TEXT,
    "sourceUrl" TEXT,
    "collectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_of_living_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "countryId" UUID,
    "cityId" UUID,
    "kind" "LocationKind" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comparisons" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comparisons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comparison_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "comparisonId" UUID NOT NULL,
    "countryId" UUID,
    "cityId" UUID,
    "kind" "LocationKind" NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comparison_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "countries_slug_key" ON "countries"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "countries_isoCode_key" ON "countries"("isoCode");

-- CreateIndex
CREATE INDEX "countries_continent_idx" ON "countries"("continent");

-- CreateIndex
CREATE INDEX "countries_emigrationDifficulty_idx" ON "countries"("emigrationDifficulty");

-- CreateIndex
CREATE INDEX "countries_averageSalaryEur_idx" ON "countries"("averageSalaryEur");

-- CreateIndex
CREATE UNIQUE INDEX "cities_slug_key" ON "cities"("slug");

-- CreateIndex
CREATE INDEX "cities_countryId_idx" ON "cities"("countryId");

-- CreateIndex
CREATE INDEX "cities_averageSalaryEur_idx" ON "cities"("averageSalaryEur");

-- CreateIndex
CREATE INDEX "visa_infos_countryId_idx" ON "visa_infos"("countryId");

-- CreateIndex
CREATE INDEX "visa_infos_category_idx" ON "visa_infos"("category");

-- CreateIndex
CREATE INDEX "cost_of_living_countryId_idx" ON "cost_of_living"("countryId");

-- CreateIndex
CREATE INDEX "cost_of_living_cityId_idx" ON "cost_of_living"("cityId");

-- CreateIndex
CREATE INDEX "cost_of_living_totalMonthlyCostEur_idx" ON "cost_of_living"("totalMonthlyCostEur");

-- CreateIndex
CREATE INDEX "favorites_userId_idx" ON "favorites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_countryId_key" ON "favorites"("userId", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_cityId_key" ON "favorites"("userId", "cityId");

-- CreateIndex
CREATE INDEX "comparisons_userId_idx" ON "comparisons"("userId");

-- CreateIndex
CREATE INDEX "comparison_items_comparisonId_idx" ON "comparison_items"("comparisonId");

-- CreateIndex
CREATE INDEX "comparison_items_countryId_idx" ON "comparison_items"("countryId");

-- CreateIndex
CREATE INDEX "comparison_items_cityId_idx" ON "comparison_items"("cityId");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visa_infos" ADD CONSTRAINT "visa_infos_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_of_living" ADD CONSTRAINT "cost_of_living_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_of_living" ADD CONSTRAINT "cost_of_living_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comparison_items" ADD CONSTRAINT "comparison_items_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "comparisons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comparison_items" ADD CONSTRAINT "comparison_items_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comparison_items" ADD CONSTRAINT "comparison_items_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Data integrity constraints for polymorphic location references.
ALTER TABLE "cost_of_living" ADD CONSTRAINT "cost_of_living_single_location_check"
CHECK (
    ("countryId" IS NOT NULL AND "cityId" IS NULL)
    OR ("countryId" IS NULL AND "cityId" IS NOT NULL)
);

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_location_kind_check"
CHECK (
    ("kind" = 'COUNTRY' AND "countryId" IS NOT NULL AND "cityId" IS NULL)
    OR ("kind" = 'CITY' AND "cityId" IS NOT NULL AND "countryId" IS NULL)
);

ALTER TABLE "comparison_items" ADD CONSTRAINT "comparison_items_location_kind_check"
CHECK (
    ("kind" = 'COUNTRY' AND "countryId" IS NOT NULL AND "cityId" IS NULL)
    OR ("kind" = 'CITY' AND "cityId" IS NOT NULL AND "countryId" IS NULL)
);
