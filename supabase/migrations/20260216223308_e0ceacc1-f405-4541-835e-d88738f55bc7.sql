
-- Fix: site_announcements - restrict public SELECT to authenticated users to hide admin IDs
DROP POLICY IF EXISTS "Active announcements are viewable by everyone" ON public.site_announcements;
CREATE POLICY "Active announcements viewable by authenticated users"
  ON public.site_announcements
  FOR SELECT
  USING ((is_active = true) AND (auth.uid() IS NOT NULL));
