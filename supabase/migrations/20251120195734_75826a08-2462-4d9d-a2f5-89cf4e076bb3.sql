-- Erlaube allen Benutzern, Feedback-Reactions zu sehen
DROP POLICY IF EXISTS "Only admins can view reactions" ON public.feedback_reactions;

CREATE POLICY "Everyone can view feedback reactions"
ON public.feedback_reactions
FOR SELECT
USING (true);