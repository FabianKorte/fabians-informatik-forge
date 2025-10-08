-- Remove the insecure INSERT policy that allows anyone to insert categories
DROP POLICY IF EXISTS "Allow inserts for seeding categories" ON public.categories;

-- Create a secure admin-only INSERT policy for categories
CREATE POLICY "Only admins can insert categories"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Also secure the learn_modules table (same issue)
DROP POLICY IF EXISTS "Allow inserts for seeding learn modules" ON public.learn_modules;

CREATE POLICY "Only admins can insert learn modules"
ON public.learn_modules
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE and DELETE policies for categories (admins only)
CREATE POLICY "Only admins can update categories"
ON public.categories
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete categories"
ON public.categories
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE and DELETE policies for learn_modules (admins only)
CREATE POLICY "Only admins can update learn modules"
ON public.learn_modules
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete learn modules"
ON public.learn_modules
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));