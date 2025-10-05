-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Function to get conversations with unread counts
CREATE OR REPLACE FUNCTION get_conversations(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_name TEXT,
  user_avatar TEXT,
  last_message TEXT,
  last_message_time TIMESTAMP WITH TIME ZONE,
  unread_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH conversation_users AS (
    SELECT DISTINCT
      CASE 
        WHEN m.sender_id = user_id_param THEN m.receiver_id
        ELSE m.sender_id
      END as other_user_id
    FROM messages m
    WHERE m.sender_id = user_id_param OR m.receiver_id = user_id_param
  ),
  latest_messages AS (
    SELECT DISTINCT ON (
      CASE 
        WHEN m.sender_id = user_id_param THEN m.receiver_id
        ELSE m.sender_id
      END
    )
      CASE 
        WHEN m.sender_id = user_id_param THEN m.receiver_id
        ELSE m.sender_id
      END as other_user_id,
      m.content as last_message,
      m.created_at as last_message_time
    FROM messages m
    WHERE m.sender_id = user_id_param OR m.receiver_id = user_id_param
    ORDER BY 
      CASE 
        WHEN m.sender_id = user_id_param THEN m.receiver_id
        ELSE m.sender_id
      END,
      m.created_at DESC
  ),
  unread_counts AS (
    SELECT 
      m.sender_id as other_user_id,
      COUNT(*) as unread_count
    FROM messages m
    WHERE m.receiver_id = user_id_param AND m.read = FALSE
    GROUP BY m.sender_id
  )
  SELECT
    gen_random_uuid() as id,
    cu.other_user_id as user_id,
    p.name as user_name,
    p.avatar_url as user_avatar,
    lm.last_message,
    lm.last_message_time,
    COALESCE(uc.unread_count, 0) as unread_count
  FROM conversation_users cu
  JOIN profiles p ON p.id = cu.other_user_id
  LEFT JOIN latest_messages lm ON lm.other_user_id = cu.other_user_id
  LEFT JOIN unread_counts uc ON uc.other_user_id = cu.other_user_id
  ORDER BY lm.last_message_time DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql;

-- Push notification tokens table
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  device_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);
