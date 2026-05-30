-- Drop legacy country-level taxonomy and highlighting fields.
-- City.isFeatured remains in use and is intentionally not touched here.

ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "taxLevel";
ALTER TABLE IF EXISTS "countries" DROP COLUMN IF EXISTS "isFeatured";
DROP TYPE IF EXISTS "TaxLevel";
