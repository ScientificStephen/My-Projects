-- Connection Requests Table
CREATE TABLE IF NOT EXISTS connection_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  from_user_name TEXT NOT NULL,
  to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_connection_requests_from ON connection_requests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_connection_requests_to ON connection_requests(to_user_id);
CREATE INDEX IF NOT EXISTS idx_connection_requests_status ON connection_requests(status);

-- Update profiles table to add discovery fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS interests TEXT[];
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS looking_for TEXT[];

-- Create index on interests for faster searching
CREATE INDEX IF NOT EXISTS idx_profiles_interests ON profiles USING GIN(interests);

-- Function to check if users are connected
CREATE OR REPLACE FUNCTION are_users_connected(user1_id UUID, user2_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM connection_requests
    WHERE status = 'accepted'
    AND (
      (from_user_id = user1_id AND to_user_id = user2_id)
      OR
      (from_user_id = user2_id AND to_user_id = user1_id)
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Add some sample looking_for options
-- Users can select: Parent, Sibling, Child, Grandparent, Aunt/Uncle, Cousin, Mentor, Friend
