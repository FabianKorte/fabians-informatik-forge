-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Anonym',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read feedbacks (public viewing)
CREATE POLICY "Everyone can view feedbacks" ON feedbacks
  FOR SELECT USING (true);

-- Allow everyone to insert feedbacks (submit new feedback)  
CREATE POLICY "Everyone can insert feedbacks" ON feedbacks
  FOR INSERT WITH CHECK (true);

-- Create index for better performance on created_at column
CREATE INDEX IF NOT EXISTS idx_feedbacks_created_at ON feedbacks(created_at DESC);