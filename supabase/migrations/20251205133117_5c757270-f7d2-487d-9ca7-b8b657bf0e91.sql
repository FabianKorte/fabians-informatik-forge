-- Fix: Remove overly permissive INSERT policy on notifications
-- This prevents notification injection attacks where any user could send fake notifications to other users

-- Drop the existing permissive policy
DROP POLICY IF EXISTS "System can insert notifications" ON public.notifications;

-- Create a more restrictive policy: Only admins/owners can insert notifications
-- System notifications should be inserted via Edge Functions using service_role key (which bypasses RLS)
CREATE POLICY "Admins and owners can insert notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role)
);