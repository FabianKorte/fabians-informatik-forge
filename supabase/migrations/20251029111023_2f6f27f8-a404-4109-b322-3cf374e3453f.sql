-- Sprint 5.1: Database Security & Performance Improvements
-- This migration addresses critical security warnings and adds missing indices

-- 1. Add missing indices for performance
CREATE INDEX IF NOT EXISTS idx_learn_modules_category ON public.learn_modules(category_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON public.chat_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id, category_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learn_module_suggestions_user ON public.learn_module_suggestions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_feedbacks_status ON public.feedbacks(status, created_at DESC);

-- 2. Add foreign key constraints with CASCADE for data integrity
ALTER TABLE public.learn_modules
DROP CONSTRAINT IF EXISTS learn_modules_category_id_fkey;

ALTER TABLE public.learn_modules
ADD CONSTRAINT learn_modules_category_id_fkey 
FOREIGN KEY (category_id) 
REFERENCES public.categories(id) 
ON DELETE CASCADE;

-- 3. Add composite unique constraint for user_progress to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_progress_unique 
ON public.user_progress(user_id, category_id, module_type, module_index);

-- 4. Add simple index for login_rate_limits cleanup (without WHERE clause)
CREATE INDEX IF NOT EXISTS idx_login_rate_limits_cleanup 
ON public.login_rate_limits(last_attempt_at);