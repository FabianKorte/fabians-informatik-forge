-- Drop existing policies for feedback_reactions
DROP POLICY IF EXISTS "Authenticated users can add reactions" ON public.feedback_reactions;
DROP POLICY IF EXISTS "Everyone can view feedback reactions" ON public.feedback_reactions;
DROP POLICY IF EXISTS "Users can delete their own reactions" ON public.feedback_reactions;

-- Create new policies for Admin only (owner role needs to be added separately)
CREATE POLICY "Only admins can add reactions"
  ON public.feedback_reactions
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can view reactions"
  ON public.feedback_reactions
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete reactions"
  ON public.feedback_reactions
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));