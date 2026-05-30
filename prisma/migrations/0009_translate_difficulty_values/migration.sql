-- Translate migration/citizenship difficulty enum labels to Romanian and
-- apply the reviewed country-level difficulty assessment.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'LOW'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'Scăzută'
  ) THEN
    ALTER TYPE "EmigrationDifficulty" RENAME VALUE 'LOW' TO 'Scăzută';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'MEDIUM'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'Medie'
  ) THEN
    ALTER TYPE "EmigrationDifficulty" RENAME VALUE 'MEDIUM' TO 'Medie';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'HIGH'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'Ridicată'
  ) THEN
    ALTER TYPE "EmigrationDifficulty" RENAME VALUE 'HIGH' TO 'Ridicată';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'VERY_HIGH'
  ) AND NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumtypid = '"EmigrationDifficulty"'::regtype
      AND enumlabel = 'Foarte ridicată'
  ) THEN
    ALTER TYPE "EmigrationDifficulty" RENAME VALUE 'VERY_HIGH' TO 'Foarte ridicată';
  END IF;
END $$;

UPDATE "countries" AS country
SET
  "citizenshipDifficulty" = assessment.citizenship::"EmigrationDifficulty",
  "emigrationDifficulty" = assessment.emigration::"EmigrationDifficulty"
FROM (
  VALUES
    ('albania', 'Medie', 'Medie'),
    ('andorra', 'Ridicată', 'Ridicată'),
    ('armenia', 'Medie', 'Medie'),
    ('austria', 'Ridicată', 'Medie'),
    ('azerbaidjan', 'Ridicată', 'Ridicată'),
    ('belarus', 'Ridicată', 'Ridicată'),
    ('belgia', 'Ridicată', 'Medie'),
    ('bosnia-si-hertegovina', 'Medie', 'Medie'),
    ('bulgaria', 'Medie', 'Scăzută'),
    ('cehia', 'Medie', 'Scăzută'),
    ('cipru', 'Medie', 'Scăzută'),
    ('croatia', 'Medie', 'Scăzută'),
    ('danemarca', 'Ridicată', 'Medie'),
    ('estonia', 'Medie', 'Scăzută'),
    ('finlanda', 'Ridicată', 'Medie'),
    ('franta', 'Ridicată', 'Medie'),
    ('georgia', 'Medie', 'Medie'),
    ('germania', 'Ridicată', 'Medie'),
    ('grecia', 'Medie', 'Scăzută'),
    ('ungaria', 'Medie', 'Scăzută'),
    ('islanda', 'Ridicată', 'Medie'),
    ('irlanda', 'Medie', 'Scăzută'),
    ('italia', 'Medie', 'Scăzută'),
    ('kosovo', 'Medie', 'Medie'),
    ('letonia', 'Medie', 'Scăzută'),
    ('liechtenstein', 'Foarte ridicată', 'Ridicată'),
    ('lituania', 'Medie', 'Scăzută'),
    ('luxemburg', 'Ridicată', 'Medie'),
    ('malta', 'Medie', 'Scăzută'),
    ('moldova', 'Scăzută', 'Scăzută'),
    ('monaco', 'Foarte ridicată', 'Ridicată'),
    ('muntenegru', 'Medie', 'Medie'),
    ('macedonia-de-nord', 'Medie', 'Medie'),
    ('tarile-de-jos', 'Ridicată', 'Medie'),
    ('norvegia', 'Ridicată', 'Medie'),
    ('polonia', 'Medie', 'Scăzută'),
    ('portugalia', 'Medie', 'Scăzută'),
    ('romania', 'Scăzută', 'Scăzută'),
    ('rusia', 'Ridicată', 'Ridicată'),
    ('san-marino', 'Foarte ridicată', 'Ridicată'),
    ('serbia', 'Medie', 'Medie'),
    ('slovacia', 'Medie', 'Scăzută'),
    ('slovenia', 'Medie', 'Scăzută'),
    ('spania', 'Medie', 'Scăzută'),
    ('suedia', 'Ridicată', 'Medie'),
    ('elvetia', 'Foarte ridicată', 'Ridicată'),
    ('turcia', 'Medie', 'Medie'),
    ('ucraina', 'Medie', 'Ridicată'),
    ('regatul-unit', 'Ridicată', 'Ridicată'),
    ('vatican', 'Foarte ridicată', 'Foarte ridicată')
) AS assessment(slug, citizenship, emigration)
WHERE country.slug = assessment.slug;
