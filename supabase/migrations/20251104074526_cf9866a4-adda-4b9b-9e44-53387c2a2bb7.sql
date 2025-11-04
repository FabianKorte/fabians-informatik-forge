-- Sprint 11: Spaced Repetition System (SRS) & Lernpfade

-- SRS Card Review Data
CREATE TABLE IF NOT EXISTS public.card_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  card_index INTEGER NOT NULL,
  quality INTEGER NOT NULL CHECK (quality >= 0 AND quality <= 5),
  interval INTEGER NOT NULL DEFAULT 1,
  easiness_factor DECIMAL(3,2) NOT NULL DEFAULT 2.5 CHECK (easiness_factor >= 1.3 AND easiness_factor <= 2.5),
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id, card_index)
);

-- Enable RLS
ALTER TABLE public.card_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own card reviews"
ON public.card_reviews FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own card reviews"
ON public.card_reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own card reviews"
ON public.card_reviews FOR UPDATE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_card_reviews_user_id ON public.card_reviews(user_id);
CREATE INDEX idx_card_reviews_next_review ON public.card_reviews(next_review);
CREATE INDEX idx_card_reviews_user_module ON public.card_reviews(user_id, module_id);

-- Learning Paths
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  modules JSONB NOT NULL DEFAULT '[]',
  current_position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own learning paths"
ON public.learning_paths FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own learning paths"
ON public.learning_paths FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning paths"
ON public.learning_paths FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own learning paths"
ON public.learning_paths FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_learning_paths_user_id ON public.learning_paths(user_id);
CREATE INDEX idx_learning_paths_active ON public.learning_paths(user_id, is_active);

-- Trigger for updated_at
CREATE TRIGGER update_card_reviews_updated_at
BEFORE UPDATE ON public.card_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
BEFORE UPDATE ON public.learning_paths
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();