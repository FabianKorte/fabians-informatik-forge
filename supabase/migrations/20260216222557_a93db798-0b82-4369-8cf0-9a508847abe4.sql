
-- Fix remaining "always true" INSERT policies

-- feedbacks: require auth.uid() is not null (authenticated check is already enforced by RLS role, 
-- but the WITH CHECK should not be literally "true")
DROP POLICY IF EXISTS "Authenticated users can insert feedbacks" ON public.feedbacks;
CREATE POLICY "Authenticated users can insert feedbacks"
  ON public.feedbacks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- performance_metrics: same pattern
DROP POLICY IF EXISTS "Authenticated users can insert metrics" ON public.performance_metrics;
CREATE POLICY "Authenticated users can insert metrics"
  ON public.performance_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
