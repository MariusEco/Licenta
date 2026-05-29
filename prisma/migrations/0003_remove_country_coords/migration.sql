-- Drop country latitude and longitude columns
ALTER TABLE public.countries DROP COLUMN IF EXISTS latitude;
ALTER TABLE public.countries DROP COLUMN IF EXISTS longitude;
