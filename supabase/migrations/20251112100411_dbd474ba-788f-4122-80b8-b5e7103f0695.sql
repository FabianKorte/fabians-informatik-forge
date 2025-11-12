-- Insert new analytics-related achievements
INSERT INTO public.achievements (key, title, description, icon, xp_reward, category) VALUES
  ('data_nerd', 'Data Nerd', 'Absolviere 100 Lernsessions', '📊', 500, 'analytics'),
  ('perfect_timing', 'Perfect Timing', 'Finde deine optimale Lernzeit', '⏰', 300, 'analytics'),
  ('ai_student', 'AI Student', 'Folge 10 AI-Empfehlungen', '🤖', 400, 'analytics')
ON CONFLICT (key) DO NOTHING;