-- Allow everyone to view all profiles (for displaying user info like on Lernmaterial page)
CREATE POLICY "Everyone can view all profiles"
ON public.profiles
FOR SELECT
USING (true);