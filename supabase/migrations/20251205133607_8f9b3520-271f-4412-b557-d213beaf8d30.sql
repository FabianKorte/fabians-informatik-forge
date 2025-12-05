-- Fix the SECURITY DEFINER view issue by recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.safe_site_announcements;

CREATE VIEW public.safe_site_announcements 
WITH (security_invoker = true) AS
SELECT id, title, message, type, is_active, created_at, updated_at
FROM public.site_announcements
WHERE is_active = true;

-- Grant access to the view
GRANT SELECT ON public.safe_site_announcements TO anon, authenticated;