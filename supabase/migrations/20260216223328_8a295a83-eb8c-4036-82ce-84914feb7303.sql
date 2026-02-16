
-- Revert: Allow unauthenticated users to see active announcements
-- but only via the safe_site_announcements view (which hides created_by)
DROP POLICY IF EXISTS "Active announcements viewable by authenticated users" ON public.site_announcements;
CREATE POLICY "Active announcements are viewable by everyone"
  ON public.site_announcements
  FOR SELECT
  USING (is_active = true);
