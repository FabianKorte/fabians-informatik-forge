-- Erstelle Mathematik-Kategorie falls noch nicht vorhanden
INSERT INTO public.categories (id, title, description, icon, difficulty, gradient)
VALUES (
  'mathematik-fachbezogen',
  'Fachbezogene Mathematik',
  'Mathematische Grundlagen für IT-Berufe: Zahlensysteme, Logik, Algorithmen',
  'Calculator',
  'Fortgeschritten',
  'from-blue-500 to-purple-500'
)
ON CONFLICT (id) DO NOTHING;