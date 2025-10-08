-- Remove the insecure public SELECT policy for feedbacks
DROP POLICY IF EXISTS "Public can view feedbacks" ON public.feedbacks;

-- Create secure SELECT policy: Only admins can view all feedbacks
CREATE POLICY "Admins can view all feedbacks"
ON public.feedbacks
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Optional: Allow authenticated users to view feedbacks (more permissive)
-- Uncomment if you want logged-in users to see feedbacks
-- CREATE POLICY "Authenticated users can view feedbacks"
-- ON public.feedbacks
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- Keep the public INSERT policy (with the 24h rate limit handled by localStorage)
-- This is already in place: "Public can insert feedbacks"