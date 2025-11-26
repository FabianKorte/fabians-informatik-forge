-- Create site_announcements table for admin announcements/banners
CREATE TABLE public.site_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_announcements ENABLE ROW LEVEL SECURITY;

-- Everyone can view active announcements
CREATE POLICY "Active announcements are viewable by everyone"
ON public.site_announcements
FOR SELECT
USING (is_active = true);

-- Only admins can insert announcements
CREATE POLICY "Admins can insert announcements"
ON public.site_announcements
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'owner')
);

-- Only admins can update announcements
CREATE POLICY "Admins can update announcements"
ON public.site_announcements
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'owner')
);

-- Only admins can delete announcements
CREATE POLICY "Admins can delete announcements"
ON public.site_announcements
FOR DELETE
USING (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'owner')
);

-- Add trigger for updated_at
CREATE TRIGGER update_site_announcements_updated_at
BEFORE UPDATE ON public.site_announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();