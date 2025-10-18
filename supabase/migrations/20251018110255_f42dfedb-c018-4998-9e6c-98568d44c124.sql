-- Create table for 2FA backup codes
CREATE TABLE IF NOT EXISTS public.user_2fa_backup_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code_hash TEXT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, code_hash)
);

-- Enable RLS
ALTER TABLE public.user_2fa_backup_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own backup codes
CREATE POLICY "Users can view their own backup codes"
ON public.user_2fa_backup_codes
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can update their own backup codes (mark as used)
CREATE POLICY "Users can update their own backup codes"
ON public.user_2fa_backup_codes
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: System can insert backup codes
CREATE POLICY "Users can insert their own backup codes"
ON public.user_2fa_backup_codes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own backup codes
CREATE POLICY "Users can delete their own backup codes"
ON public.user_2fa_backup_codes
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_backup_codes_user_id ON public.user_2fa_backup_codes(user_id);
CREATE INDEX idx_backup_codes_used ON public.user_2fa_backup_codes(user_id, used_at) WHERE used_at IS NULL;