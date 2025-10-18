-- Create login_rate_limits table for server-side rate limiting
CREATE TABLE IF NOT EXISTS public.login_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  attempt_count INTEGER NOT NULL DEFAULT 1,
  first_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_attempt_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_login_rate_limits_email 
  ON public.login_rate_limits(email, last_attempt_at);

CREATE INDEX IF NOT EXISTS idx_login_rate_limits_ip 
  ON public.login_rate_limits(ip_address, last_attempt_at);

-- Enable RLS
ALTER TABLE public.login_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access (used by edge function)
CREATE POLICY "Service role can manage rate limits"
  ON public.login_rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to automatically delete old rate limit records (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.login_rate_limits
  WHERE last_attempt_at < now() - interval '24 hours';
END;
$$;

-- Add storage policies for avatar uploads with file validation
-- Create policy for avatar size and type validation
CREATE POLICY "Avatar uploads must be valid images under 5MB"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND (
      -- Check file extension
      lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
    )
    -- Note: File size check must be done in application code as storage policies 
    -- don't have access to file size during INSERT
  );

-- Update existing avatar policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;

CREATE POLICY "Users can upload their own avatar" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );

CREATE POLICY "Users can update their own avatar" 
  ON storage.objects 
  FOR UPDATE 
  TO authenticated
  USING (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'avatars' 
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );