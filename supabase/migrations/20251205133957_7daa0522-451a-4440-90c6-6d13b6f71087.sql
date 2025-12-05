-- Fix: Restrict feedback INSERT to authenticated users only
-- This prevents spam by requiring login and enables server-side rate limiting

DROP POLICY IF EXISTS "Everyone can insert feedbacks" ON public.feedbacks;

CREATE POLICY "Authenticated users can insert feedbacks"
ON public.feedbacks FOR INSERT
TO authenticated
WITH CHECK (true);

-- Also restrict feedbacks SELECT to admins/owners only (matching UI behavior)
DROP POLICY IF EXISTS "Everyone can view feedbacks" ON public.feedbacks;

CREATE POLICY "Admins and owners can view feedbacks"
ON public.feedbacks FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR has_role(auth.uid(), 'owner'::app_role)
);