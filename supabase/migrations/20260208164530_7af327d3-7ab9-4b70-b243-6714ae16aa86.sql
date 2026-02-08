
-- Drop the overly broad policy that defaults to PUBLIC role
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;

-- Re-create with explicit authenticated role restriction
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);
