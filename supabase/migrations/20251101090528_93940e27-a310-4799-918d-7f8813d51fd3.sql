-- Sprint 8: Learning System Features
-- Tables for SRS, Gamification, Learning Streaks, Personal Notes, Study Groups, and Audio

-- 1. Spaced Repetition System (SRS) - Enhanced user_progress with SRS fields
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS srs_interval integer DEFAULT 1;
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS srs_easiness_factor numeric(3,2) DEFAULT 2.5;
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS srs_next_review timestamp with time zone DEFAULT now();
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS srs_repetitions integer DEFAULT 0;

-- 2. Gamification - User XP, Levels, and Achievements
CREATE TABLE IF NOT EXISTS user_gamification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  total_study_time integer NOT NULL DEFAULT 0, -- in minutes
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  xp_reward integer NOT NULL DEFAULT 100,
  category text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- 3. Learning Streaks
CREATE TABLE IF NOT EXISTS user_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_activity_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- 4. Personal Notes for Modules
CREATE TABLE IF NOT EXISTS user_module_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id text NOT NULL,
  module_index integer NOT NULL,
  note_text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, category_id, module_index)
);

-- 5. Study Groups
CREATE TABLE IF NOT EXISTS study_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  creator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public boolean NOT NULL DEFAULT false,
  max_members integer DEFAULT 50,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS study_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member', -- 'admin', 'member'
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- 6. Learning Statistics (aggregated data)
CREATE TABLE IF NOT EXISTS user_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_modules_completed integer NOT NULL DEFAULT 0,
  total_questions_answered integer NOT NULL DEFAULT 0,
  correct_answers integer NOT NULL DEFAULT 0,
  study_sessions integer NOT NULL DEFAULT 0,
  favorite_category text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_gamification
CREATE POLICY "Users can view their own gamification data"
  ON user_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification data"
  ON user_gamification FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data"
  ON user_gamification FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Everyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage achievements"
  ON achievements FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_streaks
CREATE POLICY "Users can view their own streaks"
  ON user_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks"
  ON user_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks"
  ON user_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_module_notes
CREATE POLICY "Users can view their own notes"
  ON user_module_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes"
  ON user_module_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON user_module_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON user_module_notes FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for study_groups
CREATE POLICY "Everyone can view public groups"
  ON study_groups FOR SELECT
  USING (is_public = true OR creator_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM study_group_members WHERE group_id = study_groups.id AND user_id = auth.uid()));

CREATE POLICY "Authenticated users can create groups"
  ON study_groups FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their groups"
  ON study_groups FOR UPDATE
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete their groups"
  ON study_groups FOR DELETE
  USING (auth.uid() = creator_id);

-- RLS Policies for study_group_members
CREATE POLICY "Group members can view member list"
  ON study_group_members FOR SELECT
  USING (EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.group_id = study_group_members.group_id AND sgm.user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM study_groups sg WHERE sg.id = study_group_members.group_id AND sg.is_public = true));

CREATE POLICY "Users can join groups"
  ON study_group_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups"
  ON study_group_members FOR DELETE
  USING (auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM study_groups WHERE id = study_group_members.group_id AND creator_id = auth.uid()));

-- RLS Policies for user_statistics
CREATE POLICY "Users can view their own statistics"
  ON user_statistics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own statistics"
  ON user_statistics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own statistics"
  ON user_statistics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all statistics"
  ON user_statistics FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_user_gamification_updated_at
  BEFORE UPDATE ON user_gamification
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_streaks_updated_at
  BEFORE UPDATE ON user_streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_module_notes_updated_at
  BEFORE UPDATE ON user_module_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_groups_updated_at
  BEFORE UPDATE ON study_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_statistics_updated_at
  BEFORE UPDATE ON user_statistics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_srs_next_review ON user_progress(user_id, srs_next_review);
CREATE INDEX IF NOT EXISTS idx_user_gamification_user_id ON user_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_module_notes_user_id ON user_module_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_group_id ON study_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_user_id ON study_group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_user_statistics_user_id ON user_statistics(user_id);