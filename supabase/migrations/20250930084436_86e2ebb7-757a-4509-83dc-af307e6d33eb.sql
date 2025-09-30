-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  gradient TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learn_modules table for all learning content
CREATE TABLE IF NOT EXISTS public.learn_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('flashcards', 'quiz', 'code', 'matching', 'dragdrop', 'memory', 'timeline', 'scenario', 'interactive')),
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_learn_modules_category ON public.learn_modules(category_id);
CREATE INDEX idx_learn_modules_type ON public.learn_modules(type);
CREATE INDEX idx_categories_id ON public.categories(id);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learn_modules ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Everyone can view categories"
ON public.categories
FOR SELECT
USING (true);

CREATE POLICY "Everyone can view learn modules"
ON public.learn_modules
FOR SELECT
USING (true);

-- Create trigger for automatic timestamp updates on categories
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for automatic timestamp updates on learn_modules
CREATE TRIGGER update_learn_modules_updated_at
BEFORE UPDATE ON public.learn_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();