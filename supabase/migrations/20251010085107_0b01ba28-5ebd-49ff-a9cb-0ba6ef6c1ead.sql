-- Allow everyone to view feedbacks (public access)
DROP POLICY IF EXISTS "Public can view feedbacks" ON public.feedbacks;
DROP POLICY IF EXISTS "Admins can view all feedbacks" ON public.feedbacks;

CREATE POLICY "Everyone can view feedbacks" 
ON public.feedbacks 
FOR SELECT 
USING (true);