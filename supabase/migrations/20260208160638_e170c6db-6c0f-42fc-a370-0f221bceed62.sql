
-- Restrict feedback_reactions SELECT to authenticated users only
DROP POLICY IF EXISTS "Everyone can view feedback reactions" ON public.feedback_reactions;

CREATE POLICY "Authenticated users can view feedback reactions"
ON public.feedback_reactions FOR SELECT
TO authenticated
USING (true);
