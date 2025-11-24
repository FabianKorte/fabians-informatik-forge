-- Set fabiankorte as owner
-- First, get the user ID for fabiankorte
DO $$
DECLARE
  fabian_user_id UUID;
BEGIN
  -- Find user with username fabiankorte
  SELECT id INTO fabian_user_id FROM profiles WHERE username = 'fabiankorte';
  
  IF fabian_user_id IS NOT NULL THEN
    -- Remove any existing roles for this user
    DELETE FROM user_roles WHERE user_id = fabian_user_id;
    
    -- Add owner role
    INSERT INTO user_roles (user_id, role)
    VALUES (fabian_user_id, 'owner'::app_role);
    
    RAISE NOTICE 'Successfully set fabiankorte as owner';
  ELSE
    RAISE NOTICE 'User fabiankorte not found';
  END IF;
END $$;

-- Update RLS policies to ensure owner has full permissions
-- First, let's update policies that only check for 'admin' to also include 'owner'

-- Update profiles policy to allow owners to view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins and owners can view all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update admin_notes policies
DROP POLICY IF EXISTS "Admins can view all notes" ON admin_notes;
CREATE POLICY "Admins and owners can view all notes"
ON admin_notes
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can insert notes" ON admin_notes;
CREATE POLICY "Admins and owners can insert notes"
ON admin_notes
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can update notes" ON admin_notes;
CREATE POLICY "Admins and owners can update notes"
ON admin_notes
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can delete notes" ON admin_notes;
CREATE POLICY "Admins and owners can delete notes"
ON admin_notes
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update achievements policies
DROP POLICY IF EXISTS "Admins can manage achievements" ON achievements;
CREATE POLICY "Admins and owners can manage achievements"
ON achievements
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update ai_generated_content policies
DROP POLICY IF EXISTS "Admins can view all AI content" ON ai_generated_content;
CREATE POLICY "Admins and owners can view all AI content"
ON ai_generated_content
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update analytics_events policies
DROP POLICY IF EXISTS "Admins can view all analytics" ON analytics_events;
CREATE POLICY "Admins and owners can view all analytics"
ON analytics_events
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update audit_logs policies
DROP POLICY IF EXISTS "Admins can view all audit logs" ON audit_logs;
CREATE POLICY "Admins and owners can view all audit logs"
ON audit_logs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can insert audit logs" ON audit_logs;
CREATE POLICY "Admins and owners can insert audit logs"
ON audit_logs
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update categories policies
DROP POLICY IF EXISTS "Only admins can insert categories" ON categories;
CREATE POLICY "Admins and owners can insert categories"
ON categories
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Only admins can update categories" ON categories;
CREATE POLICY "Admins and owners can update categories"
ON categories
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Only admins can delete categories" ON categories;
CREATE POLICY "Admins and owners can delete categories"
ON categories
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update exam_sessions policies
DROP POLICY IF EXISTS "Admins can view all exam sessions" ON exam_sessions;
CREATE POLICY "Admins and owners can view all exam sessions"
ON exam_sessions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update feedback_reactions policies
DROP POLICY IF EXISTS "Only admins can insert reactions" ON feedback_reactions;
CREATE POLICY "Admins and owners can insert reactions"
ON feedback_reactions
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Only admins can delete reactions" ON feedback_reactions;
CREATE POLICY "Admins and owners can delete reactions"
ON feedback_reactions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update learn_module_suggestions policies
DROP POLICY IF EXISTS "Admins can view all suggestions" ON learn_module_suggestions;
CREATE POLICY "Admins and owners can view all suggestions"
ON learn_module_suggestions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can update suggestions" ON learn_module_suggestions;
CREATE POLICY "Admins and owners can update suggestions"
ON learn_module_suggestions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can delete suggestions" ON learn_module_suggestions;
CREATE POLICY "Admins and owners can delete suggestions"
ON learn_module_suggestions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update learn_modules policies
DROP POLICY IF EXISTS "Only admins can insert learn modules" ON learn_modules;
CREATE POLICY "Admins and owners can insert learn modules"
ON learn_modules
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Only admins can update learn modules" ON learn_modules;
CREATE POLICY "Admins and owners can update learn modules"
ON learn_modules
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Only admins can delete learn modules" ON learn_modules;
CREATE POLICY "Admins and owners can delete learn modules"
ON learn_modules
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update learn_modules_history policies
DROP POLICY IF EXISTS "Admins can view module history" ON learn_modules_history;
CREATE POLICY "Admins and owners can view module history"
ON learn_modules_history
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can insert module history" ON learn_modules_history;
CREATE POLICY "Admins and owners can insert module history"
ON learn_modules_history
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update learning_analytics policies
DROP POLICY IF EXISTS "Admins can view all analytics" ON learning_analytics;
CREATE POLICY "Admins and owners can view all analytics"
ON learning_analytics
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update module_tags policies
DROP POLICY IF EXISTS "Admins can manage module tags" ON module_tags;
CREATE POLICY "Admins and owners can manage module tags"
ON module_tags
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update performance_metrics policies
DROP POLICY IF EXISTS "Admins can view all metrics" ON performance_metrics;
CREATE POLICY "Admins and owners can view all metrics"
ON performance_metrics
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update roadmap policies
DROP POLICY IF EXISTS "Admins can insert roadmap items" ON roadmap;
CREATE POLICY "Admins and owners can insert roadmap items"
ON roadmap
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can update roadmap items" ON roadmap;
CREATE POLICY "Admins and owners can update roadmap items"
ON roadmap
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

DROP POLICY IF EXISTS "Admins can delete roadmap items" ON roadmap;
CREATE POLICY "Admins and owners can delete roadmap items"
ON roadmap
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update tags policies
DROP POLICY IF EXISTS "Admins can manage tags" ON tags;
CREATE POLICY "Admins and owners can manage tags"
ON tags
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update user_statistics policies
DROP POLICY IF EXISTS "Admins can view all statistics" ON user_statistics;
CREATE POLICY "Admins and owners can view all statistics"
ON user_statistics
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));

-- Update user_roles policies to allow owners to manage all roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
CREATE POLICY "Admins and owners can manage all roles"
ON user_roles
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'owner'::app_role));