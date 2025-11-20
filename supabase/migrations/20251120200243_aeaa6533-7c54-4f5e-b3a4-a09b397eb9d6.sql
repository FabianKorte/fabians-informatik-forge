-- Füge ein Feld hinzu, um zu tracken, ob ein Feedback wirklich neu/ungesehen ist
ALTER TABLE public.feedbacks 
ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT true;

-- Setze alle bestehenden Feedbacks auf "nicht neu" (bereits gesehen)
UPDATE public.feedbacks 
SET is_new = false 
WHERE is_new IS NULL;

-- Erstelle einen Index für bessere Performance bei Abfragen
CREATE INDEX IF NOT EXISTS idx_feedbacks_is_new ON public.feedbacks(is_new) WHERE is_new = true;