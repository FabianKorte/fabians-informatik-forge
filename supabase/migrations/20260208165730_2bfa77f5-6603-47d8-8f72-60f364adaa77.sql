
-- 1. Fix mutable search_path on functions
CREATE OR REPLACE FUNCTION public.update_learn_modules_search_vector()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('german', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('german', COALESCE(NEW.content::text, '')), 'B');
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_feedback_upvotes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.emoji = '👍' THEN
    UPDATE feedbacks 
    SET upvotes = upvotes + 1 
    WHERE id = NEW.feedback_id;
  ELSIF TG_OP = 'DELETE' AND OLD.emoji = '👍' THEN
    UPDATE feedbacks 
    SET upvotes = GREATEST(upvotes - 1, 0)
    WHERE id = OLD.feedback_id;
  END IF;
  RETURN NEW;
END;
$function$;

-- 2. Restrict feedbacks INSERT to authenticated users only (remove duplicate public policy)
DROP POLICY IF EXISTS "Public can insert feedbacks" ON public.feedbacks;

-- 3. Restrict performance_metrics INSERT to authenticated only
DROP POLICY IF EXISTS "System can insert metrics" ON public.performance_metrics;
CREATE POLICY "Authenticated users can insert metrics"
ON public.performance_metrics FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. Restrict error_reports: anonymous users should not see other anonymous reports
DROP POLICY IF EXISTS "Users can view their own error reports" ON public.error_reports;
CREATE POLICY "Users can view their own error reports"
ON public.error_reports FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 5. Restrict error_reports INSERT to authenticated users only
DROP POLICY IF EXISTS "Users can insert their own error reports" ON public.error_reports;
CREATE POLICY "Authenticated users can insert error reports"
ON public.error_reports FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
