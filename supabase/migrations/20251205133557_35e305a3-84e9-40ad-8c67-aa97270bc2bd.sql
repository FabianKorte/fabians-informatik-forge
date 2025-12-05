-- Fix 1: Remove overly permissive INSERT policy on ai_recommendations
-- Service role (Edge Functions) bypass RLS anyway, so no policy needed for system inserts
DROP POLICY IF EXISTS "System can insert recommendations" ON public.ai_recommendations;

-- Fix 2: Hide admin UUIDs from site_announcements
-- Create a secure view that excludes the created_by field
CREATE OR REPLACE VIEW public.safe_site_announcements AS
SELECT id, title, message, type, is_active, created_at, updated_at
FROM public.site_announcements
WHERE is_active = true;

-- Grant access to the view for anonymous and authenticated users
GRANT SELECT ON public.safe_site_announcements TO anon, authenticated;