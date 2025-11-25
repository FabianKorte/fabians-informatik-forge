-- Drop the old check constraint if it exists
ALTER TABLE public.feedbacks DROP CONSTRAINT IF EXISTS feedbacks_status_check;

-- Add new check constraint with all status values
ALTER TABLE public.feedbacks
ADD CONSTRAINT feedbacks_status_check 
CHECK (status IN ('new', 'pending_review', 'in_progress', 'on_hold', 'planned', 'resolved', 'duplicate', 'rejected', 'thanks'));