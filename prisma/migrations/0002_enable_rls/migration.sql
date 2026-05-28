-- Enable row level security on all public tables exposed to Supabase/PostgREST.
-- Prisma uses the service role / direct database connection, so these changes
-- reduce exposure without affecting the app's server-side Prisma queries.

ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "countries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "visa_infos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "cost_of_living" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "favorites" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "comparisons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "comparison_items" ENABLE ROW LEVEL SECURITY;