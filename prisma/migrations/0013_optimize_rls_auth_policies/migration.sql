-- Migration: 0013_optimize_rls_auth_policies
-- Optimizes database issues flagged by Supabase Performance Advisor.
-- Wrapping auth.uid() and auth.role() in SELECT avoids per-row re-evaluation.

ALTER TABLE IF EXISTS public.users
  RENAME COLUMN "fullName" TO username;

CREATE INDEX IF NOT EXISTS "favorites_countryId_idx" ON public.favorites("countryId");
CREATE INDEX IF NOT EXISTS "favorites_cityId_idx" ON public.favorites("cityId");

DROP INDEX IF EXISTS public."favorites_userId_idx";
DROP INDEX IF EXISTS public."countries_continent_idx";

DROP POLICY IF EXISTS "Favorites owner full access" ON public.favorites;
CREATE POLICY "Favorites owner full access" ON public.favorites
  FOR ALL
  USING ("userId" = (SELECT auth.uid()))
  WITH CHECK ("userId" = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Comparisons owner full access" ON public.comparisons;
CREATE POLICY "Comparisons owner full access" ON public.comparisons
  FOR ALL
  USING ("userId" = (SELECT auth.uid()))
  WITH CHECK ("userId" = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Comparison items owner full access" ON public.comparison_items;
CREATE POLICY "Comparison items owner full access" ON public.comparison_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.comparisons c
      WHERE c.id = comparison_items."comparisonId"
        AND c."userId" = (SELECT auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.comparisons c
      WHERE c.id = comparison_items."comparisonId"
        AND c."userId" = (SELECT auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can select own row" ON public.users;
CREATE POLICY "Users can select own row" ON public.users
  FOR SELECT
  USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own row" ON public.users;
CREATE POLICY "Users can update own row" ON public.users
  FOR UPDATE
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Allow select for authenticated" ON public._prisma_migrations;
CREATE POLICY "Allow select for authenticated" ON public._prisma_migrations
  FOR SELECT
  USING ((SELECT auth.role()) = 'authenticated');
