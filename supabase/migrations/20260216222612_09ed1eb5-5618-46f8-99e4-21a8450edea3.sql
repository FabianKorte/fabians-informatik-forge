
-- Fix: Use explicit auth check instead of literal "true"

DROP POLICY IF EXISTS "Authenticated users can insert feedbacks" ON public.feedbacks;
CREATE POLICY "Authenticated users can insert feedbacks"
  ON public.feedbacks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can insert metrics" ON public.performance_metrics;
CREATE POLICY "Authenticated users can insert metrics"
  ON public.performance_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
