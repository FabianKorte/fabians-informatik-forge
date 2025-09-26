-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create roadmap table for future development plans
CREATE TABLE public.roadmap (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in-progress', 'completed', 'on-hold')),
  priority INTEGER NOT NULL DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
  category TEXT,
  estimated_completion DATE,
  completion_date DATE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.roadmap ENABLE ROW LEVEL SECURITY;

-- Create policies for roadmap access (read-only for everyone)
CREATE POLICY "Everyone can view roadmap" 
ON public.roadmap 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_roadmap_updated_at
BEFORE UPDATE ON public.roadmap
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial roadmap items
INSERT INTO public.roadmap (title, description, status, priority, category, order_index) VALUES
('Mobile App Development', 'Entwicklung einer nativen Mobile App für iOS und Android', 'planned', 2, 'Development', 1),
('Advanced Analytics Dashboard', 'Detaillierte Lernanalysen und Fortschritts-Visualisierungen', 'in-progress', 1, 'Features', 2),
('AI-Powered Learning Recommendations', 'KI-basierte personalisierte Lernempfehlungen', 'planned', 1, 'AI/ML', 3),
('Offline Mode', 'Lerninhalte offline verfügbar machen', 'planned', 3, 'Features', 4),
('Video Learning Content', 'Integration von Videolektionen zu allen Themen', 'planned', 2, 'Content', 5),
('Community Features', 'Forum und Diskussionsbereich für Lernende', 'planned', 4, 'Social', 6);