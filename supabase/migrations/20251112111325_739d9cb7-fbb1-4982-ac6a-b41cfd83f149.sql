-- Add quoted_message_id column to chat_messages table
ALTER TABLE chat_messages
ADD COLUMN IF NOT EXISTS quoted_message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL;