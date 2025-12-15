-- Drop and recreate the view with SECURITY INVOKER to bypass RLS
DROP VIEW IF EXISTS public.safe_site_announcements;

-- Create view that only exposes safe columns (no created_by)
CREATE VIEW public.safe_site_announcements 
WITH (security_invoker = false)
AS
SELECT 
    id,
    title,
    message,
    type,
    is_active,
    created_at,
    updated_at
FROM site_announcements
WHERE is_active = true;

-- Grant SELECT access to anon and authenticated roles
GRANT SELECT ON public.safe_site_announcements TO anon;
GRANT SELECT ON public.safe_site_announcements TO authenticated;