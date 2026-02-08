
-- Fix #1: Switch safe_site_announcements view to SECURITY INVOKER
DROP VIEW IF EXISTS public.safe_site_announcements;
CREATE VIEW public.safe_site_announcements 
WITH (security_invoker = true)
AS
SELECT id, title, message, type, is_active, created_at, updated_at
FROM site_announcements
WHERE is_active = true;

-- Grant access to both roles so the view works for all users
GRANT SELECT ON public.safe_site_announcements TO anon;
GRANT SELECT ON public.safe_site_announcements TO authenticated;

-- Fix #3: Restrict profiles to authenticated users only
DROP POLICY IF EXISTS "Everyone can view all profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);
