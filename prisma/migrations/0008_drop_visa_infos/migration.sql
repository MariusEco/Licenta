-- Drop the legacy visa information table.
-- Official migration, residence and citizenship links are now static country metadata.

DROP TABLE IF EXISTS "visa_infos";
DROP TYPE IF EXISTS "VisaCategory";
