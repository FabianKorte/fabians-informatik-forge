-- Allow everyone to read feedbacks (public feedback display)
CREATE POLICY "Everyone can view feedbacks" 
ON public.feedbacks 
FOR SELECT 
USING (true);

-- Drop the restrictive admin-only view policy
DROP POLICY IF EXISTS "Admins and owners can view feedbacks" ON public.feedbacks;