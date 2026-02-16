
-- Fix: Replace overly permissive "always true" policy on login_rate_limits
-- This table is only accessed by edge functions using the service role key,
-- so no regular user should have direct access.

DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.login_rate_limits;

-- Deny all access for regular users (anon/authenticated).
-- Service role bypasses RLS entirely, so edge functions still work.
CREATE POLICY "No direct user access to rate limits"
  ON public.login_rate_limits
  FOR ALL
  USING (false)
  WITH CHECK (false);
