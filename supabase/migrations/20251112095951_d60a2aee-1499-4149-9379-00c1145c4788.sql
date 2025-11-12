-- Create learning_analytics table for time-series data
CREATE TABLE IF NOT EXISTS public.learning_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  module_type TEXT NOT NULL,
  module_index INTEGER NOT NULL,
  performance_score NUMERIC NOT NULL CHECK (performance_score >= 0 AND performance_score <= 100),
  time_spent INTEGER NOT NULL DEFAULT 0,
  questions_answered INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  session_hour INTEGER NOT NULL CHECK (session_hour >= 0 AND session_hour < 24),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.learning_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own analytics"
  ON public.learning_analytics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics"
  ON public.learning_analytics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all analytics"
  ON public.learning_analytics
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_learning_analytics_user_created 
  ON public.learning_analytics(user_id, created_at DESC);

CREATE INDEX idx_learning_analytics_category 
  ON public.learning_analytics(user_id, category_id);

-- Create AI recommendations table
CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  module_type TEXT NOT NULL,
  module_index INTEGER NOT NULL,
  recommendation_reason TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days')
);

-- Enable RLS
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own recommendations"
  ON public.ai_recommendations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert recommendations"
  ON public.ai_recommendations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own recommendations"
  ON public.ai_recommendations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index
CREATE INDEX idx_ai_recommendations_user_expires 
  ON public.ai_recommendations(user_id, expires_at DESC);