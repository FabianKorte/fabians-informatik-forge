-- Drop existing policies for feedback_reactions
DROP POLICY IF EXISTS "Everyone can view feedback reactions" ON feedback_reactions;
DROP POLICY IF EXISTS "Only admins can add reactions" ON feedback_reactions;
DROP POLICY IF EXISTS "Only admins can delete reactions" ON feedback_reactions;

-- Recreate policies with strict admin-only access for INSERT and DELETE
CREATE POLICY "Everyone can view feedback reactions"
ON feedback_reactions
FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert reactions"
ON feedback_reactions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete reactions"
ON feedback_reactions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));