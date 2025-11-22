-- Update RLS policies for feedbacks to also allow owner role
DROP POLICY IF EXISTS "Admins can update feedbacks" ON public.feedbacks;
DROP POLICY IF EXISTS "Admins can delete feedbacks" ON public.feedbacks;

CREATE POLICY "Admins can update feedbacks"
ON public.feedbacks
FOR UPDATE
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'owner'::app_role)
);

CREATE POLICY "Admins can delete feedbacks"
ON public.feedbacks
FOR DELETE
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'owner'::app_role)
);