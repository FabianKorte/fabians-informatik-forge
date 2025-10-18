-- Fix function search path for cleanup_old_rate_limits
DROP FUNCTION IF EXISTS public.cleanup_old_rate_limits();

CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.login_rate_limits
  WHERE last_attempt_at < now() - interval '24 hours';
END;
$$;