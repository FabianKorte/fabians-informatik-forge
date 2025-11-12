-- Add category column to feedbacks
ALTER TABLE public.feedbacks
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general',
ADD COLUMN IF NOT EXISTS upvotes INTEGER DEFAULT 0;

-- Create feedback_reactions table
CREATE TABLE IF NOT EXISTS public.feedback_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  feedback_id UUID NOT NULL REFERENCES feedbacks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(feedback_id, user_id, emoji)
);

-- Enable RLS on feedback_reactions
ALTER TABLE public.feedback_reactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for feedback_reactions
CREATE POLICY "Everyone can view feedback reactions"
ON public.feedback_reactions
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can add reactions"
ON public.feedback_reactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions"
ON public.feedback_reactions
FOR DELETE
USING (auth.uid() = user_id);

-- Enable realtime for feedback_reactions
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE feedback_reactions;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

ALTER TABLE feedback_reactions REPLICA IDENTITY FULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_reactions_feedback_id ON public.feedback_reactions(feedback_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_category ON public.feedbacks(category);
CREATE INDEX IF NOT EXISTS idx_feedbacks_upvotes ON public.feedbacks(upvotes DESC);

-- Create function to update feedback upvotes
CREATE OR REPLACE FUNCTION update_feedback_upvotes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.emoji = '👍' THEN
    UPDATE feedbacks 
    SET upvotes = upvotes + 1 
    WHERE id = NEW.feedback_id;
  ELSIF TG_OP = 'DELETE' AND OLD.emoji = '👍' THEN
    UPDATE feedbacks 
    SET upvotes = GREATEST(upvotes - 1, 0)
    WHERE id = OLD.feedback_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for upvotes
DROP TRIGGER IF EXISTS trigger_update_feedback_upvotes ON public.feedback_reactions;
CREATE TRIGGER trigger_update_feedback_upvotes
AFTER INSERT OR DELETE ON public.feedback_reactions
FOR EACH ROW
EXECUTE FUNCTION update_feedback_upvotes();