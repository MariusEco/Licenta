-- Migration: remove_country_fields
-- Drops legacy country-level columns that are now removed from the Prisma schema.

ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "romanianCommunityNotes";
ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "jobMarketNotes";
ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "localLawNotes";
ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "incomeTaxRate";

-- Populate population for countries (sourced from restcountries.com)
UPDATE "countries" SET "population" = 83491249 WHERE "isoCode" = 'DE';
UPDATE "countries" SET "population" = 18100436 WHERE "isoCode" = 'NL';
UPDATE "countries" SET "population" = 49315949 WHERE "isoCode" = 'ES';
UPDATE "countries" SET "population" = 66351959 WHERE "isoCode" = 'FR';
UPDATE "countries" SET "population" = 58927633 WHERE "isoCode" = 'IT';
UPDATE "countries" SET "population" = 10749635 WHERE "isoCode" = 'PT';
UPDATE "countries" SET "population" = 2363314 WHERE "isoCode" = 'AL';
UPDATE "countries" SET "population" = 88406 WHERE "isoCode" = 'AD';
UPDATE "countries" SET "population" = 3076200 WHERE "isoCode" = 'AM';
UPDATE "countries" SET "population" = 9200931 WHERE "isoCode" = 'AT';
UPDATE "countries" SET "population" = 10241722 WHERE "isoCode" = 'AZ';
UPDATE "countries" SET "population" = 9109280 WHERE "isoCode" = 'BY';
UPDATE "countries" SET "population" = 11825551 WHERE "isoCode" = 'BE';
UPDATE "countries" SET "population" = 3422000 WHERE "isoCode" = 'BA';
UPDATE "countries" SET "population" = 6437360 WHERE "isoCode" = 'BG';
UPDATE "countries" SET "population" = 3866233 WHERE "isoCode" = 'HR';
UPDATE "countries" SET "population" = 1442614 WHERE "isoCode" = 'CY';
UPDATE "countries" SET "population" = 10882341 WHERE "isoCode" = 'CZ';
UPDATE "countries" SET "population" = 6011488 WHERE "isoCode" = 'DK';
UPDATE "countries" SET "population" = 1369995 WHERE "isoCode" = 'EE';
UPDATE "countries" SET "population" = 5650325 WHERE "isoCode" = 'FI';
UPDATE "countries" SET "population" = 4000921 WHERE "isoCode" = 'GE';
UPDATE "countries" SET "population" = 10400720 WHERE "isoCode" = 'GR';
UPDATE "countries" SET "population" = 9539502 WHERE "isoCode" = 'HU';
UPDATE "countries" SET "population" = 391810 WHERE "isoCode" = 'IS';
UPDATE "countries" SET "population" = 5458600 WHERE "isoCode" = 'IE';
UPDATE "countries" SET "population" = 1585566 WHERE "isoCode" = 'XK';
UPDATE "countries" SET "population" = 1829000 WHERE "isoCode" = 'LV';
UPDATE "countries" SET "population" = 40900 WHERE "isoCode" = 'LI';
UPDATE "countries" SET "population" = 2894886 WHERE "isoCode" = 'LT';
UPDATE "countries" SET "population" = 681973 WHERE "isoCode" = 'LU';
UPDATE "countries" SET "population" = 574250 WHERE "isoCode" = 'MT';
UPDATE "countries" SET "population" = 2749076 WHERE "isoCode" = 'MD';
UPDATE "countries" SET "population" = 38423 WHERE "isoCode" = 'MC';
UPDATE "countries" SET "population" = 623327 WHERE "isoCode" = 'ME';
UPDATE "countries" SET "population" = 1822612 WHERE "isoCode" = 'MK';
UPDATE "countries" SET "population" = 5606944 WHERE "isoCode" = 'NO';
UPDATE "countries" SET "population" = 37392000 WHERE "isoCode" = 'PL';
UPDATE "countries" SET "population" = 19036031 WHERE "isoCode" = 'RO';
UPDATE "countries" SET "population" = 146028325 WHERE "isoCode" = 'RU';
UPDATE "countries" SET "population" = 34132 WHERE "isoCode" = 'SM';
UPDATE "countries" SET "population" = 6567783 WHERE "isoCode" = 'RS';
UPDATE "countries" SET "population" = 5413813 WHERE "isoCode" = 'SK';
UPDATE "countries" SET "population" = 2130638 WHERE "isoCode" = 'SI';
UPDATE "countries" SET "population" = 10605098 WHERE "isoCode" = 'SE';
UPDATE "countries" SET "population" = 9082848 WHERE "isoCode" = 'CH';
UPDATE "countries" SET "population" = 85664944 WHERE "isoCode" = 'TR';
UPDATE "countries" SET "population" = 32862000 WHERE "isoCode" = 'UA';
UPDATE "countries" SET "population" = 69281437 WHERE "isoCode" = 'GB';
UPDATE "countries" SET "population" = 882 WHERE "isoCode" = 'VA';

-- End population updates
