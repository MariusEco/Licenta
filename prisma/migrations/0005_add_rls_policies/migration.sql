-- Migration: 0005_add_rls_policies
-- Adds Row Level Security (RLS) policies for application tables flagged by the Supabase linter.
-- These policies are idempotent (DROP POLICY IF EXISTS) so they can be applied safely.

-- Notes:
-- - This schema uses quoted camelCase columns such as "userId" and "comparisonId".
-- - Review policies for your exact business rules before applying to production.

-- Countries: public read
DROP POLICY IF EXISTS "Allow select for everyone" ON public.countries;
CREATE POLICY "Allow select for everyone" ON public.countries
  FOR SELECT
  USING (true);

-- Cities: public read
DROP POLICY IF EXISTS "Allow select for everyone" ON public.cities;
CREATE POLICY "Allow select for everyone" ON public.cities
  FOR SELECT
  USING (true);

-- Cost of living: public read
DROP POLICY IF EXISTS "Allow select for everyone" ON public.cost_of_living;
CREATE POLICY "Allow select for everyone" ON public.cost_of_living
  FOR SELECT
  USING (true);

-- Visa infos: public read
DROP POLICY IF EXISTS "Allow select for everyone" ON public.visa_infos;
CREATE POLICY "Allow select for everyone" ON public.visa_infos
  FOR SELECT
  USING (true);

-- Favorites: only owner may operate
DROP POLICY IF EXISTS "Favorites owner full access" ON public.favorites;
CREATE POLICY "Favorites owner full access" ON public.favorites
  FOR ALL
  USING ("userId" = auth.uid())
  WITH CHECK ("userId" = auth.uid());

-- Comparisons: only owner may operate
DROP POLICY IF EXISTS "Comparisons owner full access" ON public.comparisons;
CREATE POLICY "Comparisons owner full access" ON public.comparisons
  FOR ALL
  USING ("userId" = auth.uid())
  WITH CHECK ("userId" = auth.uid());

-- Comparison items: allow access only if the parent comparison belongs to the current user
DROP POLICY IF EXISTS "Comparison items owner full access" ON public.comparison_items;
CREATE POLICY "Comparison items owner full access" ON public.comparison_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.comparisons c
      WHERE c.id = comparison_items."comparisonId" AND c."userId" = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.comparisons c
      WHERE c.id = comparison_items."comparisonId" AND c."userId" = auth.uid()
    )
  );

-- Users: allow users to select/update their own row
DROP POLICY IF EXISTS "Users can select own row" ON public.users;
CREATE POLICY "Users can select own row" ON public.users
  FOR SELECT
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own row" ON public.users;
CREATE POLICY "Users can update own row" ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Prisma migrations table: allow authenticated role to read migrations if necessary.
-- This table is generally only used by server-side tooling; review before enabling.
DROP POLICY IF EXISTS "Allow select for authenticated" ON public._prisma_migrations;
CREATE POLICY "Allow select for authenticated" ON public._prisma_migrations
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- If you want authenticated-only SELECT for public read tables, replace USING (true) above with:
--   USING (auth.role() = 'authenticated')
