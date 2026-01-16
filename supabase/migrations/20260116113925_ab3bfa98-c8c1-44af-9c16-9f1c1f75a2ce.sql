-- Erstelle Java-Kategorie
INSERT INTO public.categories (id, title, description, icon, difficulty, gradient)
VALUES (
  'java',
  'Java Programmierung',
  'Lerne Java von Grund auf: Von Hello World bis zu fortgeschrittenen Konzepten wie OOP, Collections und Streams',
  'Coffee',
  'Anfänger',
  'from-orange-500 to-red-600'
)
ON CONFLICT (id) DO NOTHING;