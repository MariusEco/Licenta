ALTER TABLE IF EXISTS "cost_of_living"
  ADD COLUMN IF NOT EXISTS "averageSalaryEur" INTEGER,
  ADD COLUMN IF NOT EXISTS "rentUtilitiesEur" INTEGER,
  ADD COLUMN IF NOT EXISTS "foodEur" INTEGER;

INSERT INTO "cost_of_living" ("countryId", "averageSalaryEur", "createdAt", "updatedAt")
SELECT c."id", c."averageSalaryEur", NOW(), NOW()
FROM "countries" AS c
WHERE c."averageSalaryEur" IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "cost_of_living" AS col
    WHERE col."countryId" = c."id"
      AND col."cityId" IS NULL
  );

INSERT INTO "cost_of_living" ("cityId", "averageSalaryEur", "createdAt", "updatedAt")
SELECT ci."id", ci."averageSalaryEur", NOW(), NOW()
FROM "cities" AS ci
WHERE ci."averageSalaryEur" IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM "cost_of_living" AS col
    WHERE col."cityId" = ci."id"
  );

UPDATE "cost_of_living" AS col
SET "averageSalaryEur" = c."averageSalaryEur"
FROM "countries" AS c
WHERE col."countryId" = c."id"
  AND col."cityId" IS NULL
  AND col."averageSalaryEur" IS NULL;

UPDATE "cost_of_living" AS col
SET "averageSalaryEur" = ci."averageSalaryEur"
FROM "cities" AS ci
WHERE col."cityId" = ci."id"
  AND col."averageSalaryEur" IS NULL;

UPDATE "cost_of_living"
SET
  "rentUtilitiesEur" = CASE
    WHEN "rentOneBedroomEur" IS NULL AND "utilitiesEur" IS NULL THEN NULL
    ELSE COALESCE("rentOneBedroomEur", 0) + COALESCE("utilitiesEur", 0)
  END,
  "foodEur" = "groceriesEur"
WHERE "rentUtilitiesEur" IS NULL
   OR "foodEur" IS NULL;

DROP INDEX IF EXISTS "countries_averageSalaryEur_idx";
DROP INDEX IF EXISTS "cities_averageSalaryEur_idx";

ALTER TABLE IF EXISTS "countries"
  DROP COLUMN IF EXISTS "averageSalaryEur";

ALTER TABLE IF EXISTS "cities"
  DROP COLUMN IF EXISTS "averageSalaryEur";

ALTER TABLE IF EXISTS "cost_of_living"
  DROP COLUMN IF EXISTS "rentOneBedroomEur",
  DROP COLUMN IF EXISTS "utilitiesEur",
  DROP COLUMN IF EXISTS "groceriesEur",
  DROP COLUMN IF EXISTS "healthcareEur",
  DROP COLUMN IF EXISTS "internetEur";

CREATE INDEX IF NOT EXISTS "cost_of_living_averageSalaryEur_idx"
  ON "cost_of_living"("averageSalaryEur");
