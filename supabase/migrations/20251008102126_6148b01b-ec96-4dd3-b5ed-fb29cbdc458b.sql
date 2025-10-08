-- Add RLS policies for roadmap (admins can manage)
CREATE POLICY "Admins can insert roadmap items"
ON public.roadmap
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roadmap items"
ON public.roadmap
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roadmap items"
ON public.roadmap
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add status field to feedbacks
ALTER TABLE public.feedbacks
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved'));

-- Create admin notes table
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on admin_notes
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_notes
CREATE POLICY "Admins can view all notes"
ON public.admin_notes
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert notes"
ON public.admin_notes
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notes"
ON public.admin_notes
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete notes"
ON public.admin_notes
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at on admin_notes
CREATE TRIGGER update_admin_notes_updated_at
BEFORE UPDATE ON public.admin_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();