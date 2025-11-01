-- Insert initial achievements
INSERT INTO achievements (key, title, description, icon, xp_reward, category) VALUES
  ('first_module', 'Erster Schritt', 'Schließe dein erstes Modul ab', '🎯', 50, 'learning'),
  ('streak_3', '3-Tage-Serie', 'Lerne 3 Tage hintereinander', '🔥', 100, 'streaks'),
  ('streak_7', '7-Tage-Serie', 'Lerne 7 Tage hintereinander', '🔥🔥', 200, 'streaks'),
  ('streak_30', '30-Tage-Serie', 'Lerne 30 Tage hintereinander', '🔥🔥🔥', 500, 'streaks'),
  ('100_questions', 'Quiz-Meister', 'Beantworte 100 Fragen', '📝', 150, 'learning'),
  ('500_questions', 'Quiz-Experte', 'Beantworte 500 Fragen', '📚', 300, 'learning'),
  ('perfect_quiz', 'Perfekt!', 'Beende ein Quiz mit 100% Richtigkeit', '💯', 100, 'learning'),
  ('10_modules', 'Fleißiger Lerner', 'Schließe 10 Module ab', '📖', 200, 'learning'),
  ('50_modules', 'Wissensdurstig', 'Schließe 50 Module ab', '🎓', 400, 'learning'),
  ('level_5', 'Level 5 Erreicht', 'Erreiche Level 5', '⭐', 250, 'progression'),
  ('level_10', 'Level 10 Erreicht', 'Erreiche Level 10', '⭐⭐', 500, 'progression'),
  ('join_group', 'Teamplayer', 'Trete einer Lerngruppe bei', '👥', 75, 'social'),
  ('create_group', 'Gruppenleiter', 'Erstelle eine Lerngruppe', '👑', 100, 'social'),
  ('first_note', 'Notiz-Nehmer', 'Erstelle deine erste persönliche Notiz', '📝', 50, 'learning')
ON CONFLICT (key) DO NOTHING;