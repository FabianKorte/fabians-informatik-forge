
-- Add admin/owner SELECT policy to view ALL announcements (including inactive)
CREATE POLICY "Admins and owners can view all announcements"
ON public.site_announcements FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));
