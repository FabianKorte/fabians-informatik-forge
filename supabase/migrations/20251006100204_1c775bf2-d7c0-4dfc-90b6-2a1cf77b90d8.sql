-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Users can view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Only admins can manage roles
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Update feedbacks table RLS policies
-- Drop existing policies
DROP POLICY IF EXISTS "Everyone can view feedbacks" ON public.feedbacks;
DROP POLICY IF EXISTS "Everyone can insert feedbacks" ON public.feedbacks;

-- New policies for feedbacks
-- Everyone can view feedback (public)
CREATE POLICY "Public can view feedbacks" ON public.feedbacks
  FOR SELECT
  USING (true);

-- Everyone can insert feedback (anonymous submissions allowed)
CREATE POLICY "Public can insert feedbacks" ON public.feedbacks
  FOR INSERT
  WITH CHECK (true);

-- Only admins can update feedback
CREATE POLICY "Admins can update feedbacks" ON public.feedbacks
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete feedback
CREATE POLICY "Admins can delete feedbacks" ON public.feedbacks
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));