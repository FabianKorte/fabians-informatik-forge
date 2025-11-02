-- Sprint 9: Content Management Tables

-- Tags for learning modules
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#6366f1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Many-to-many relationship between modules and tags
CREATE TABLE IF NOT EXISTS public.module_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.learn_modules(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(module_id, tag_id)
);

-- Content versioning for learn modules
CREATE TABLE IF NOT EXISTS public.learn_modules_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.learn_modules(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  change_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Exam simulation sessions
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  time_limit_minutes INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  score NUMERIC(5,2),
  session_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- AI generated exercises tracking
CREATE TABLE IF NOT EXISTS public.ai_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  module_type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  generated_content JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learn_modules_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tags
CREATE POLICY "Everyone can view tags"
  ON public.tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.tags FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for module_tags
CREATE POLICY "Everyone can view module tags"
  ON public.module_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage module tags"
  ON public.module_tags FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for learn_modules_history
CREATE POLICY "Admins can view module history"
  ON public.learn_modules_history FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert module history"
  ON public.learn_modules_history FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- RLS Policies for exam_sessions
CREATE POLICY "Users can view their own exam sessions"
  ON public.exam_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exam sessions"
  ON public.exam_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exam sessions"
  ON public.exam_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all exam sessions"
  ON public.exam_sessions FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_generated_content
CREATE POLICY "Users can view their own AI content"
  ON public.ai_generated_content FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert AI content requests"
  ON public.ai_generated_content FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all AI content"
  ON public.ai_generated_content FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_module_tags_module_id ON public.module_tags(module_id);
CREATE INDEX idx_module_tags_tag_id ON public.module_tags(tag_id);
CREATE INDEX idx_learn_modules_history_module_id ON public.learn_modules_history(module_id);
CREATE INDEX idx_exam_sessions_user_id ON public.exam_sessions(user_id);
CREATE INDEX idx_ai_generated_content_user_id ON public.ai_generated_content(user_id);

-- Add updated_at triggers
CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON public.tags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add search capabilities to learn_modules (full-text search)
ALTER TABLE public.learn_modules ADD COLUMN IF NOT EXISTS search_vector tsvector;

CREATE INDEX IF NOT EXISTS idx_learn_modules_search ON public.learn_modules USING gin(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION public.update_learn_modules_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('german', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('german', COALESCE(NEW.content::text, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector
CREATE TRIGGER learn_modules_search_vector_update
  BEFORE INSERT OR UPDATE ON public.learn_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_learn_modules_search_vector();

-- Update existing records
UPDATE public.learn_modules 
SET search_vector = 
  setweight(to_tsvector('german', COALESCE(title, '')), 'A') ||
  setweight(to_tsvector('german', COALESCE(content::text, '')), 'B');