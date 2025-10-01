-- Add INSERT policies for categories and learn_modules for seeding
CREATE POLICY "Allow inserts for seeding categories"
ON public.categories
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow inserts for seeding learn modules"
ON public.learn_modules
FOR INSERT
WITH CHECK (true);