-- Fix search_path for update_feedback_upvotes function
CREATE OR REPLACE FUNCTION update_feedback_upvotes()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;