-- Family Events Table
CREATE TABLE IF NOT EXISTS family_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  type TEXT CHECK (type IN ('birthday', 'anniversary', 'gathering', 'holiday', 'other')) DEFAULT 'other',
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  location TEXT,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  attendees UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_family_events_date ON family_events(date);
CREATE INDEX IF NOT EXISTS idx_family_events_created_by ON family_events(created_by);
CREATE INDEX IF NOT EXISTS idx_family_events_attendees ON family_events USING GIN(attendees);

-- Video Calls Table
CREATE TABLE IF NOT EXISTS video_calls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT NOT NULL UNIQUE,
  caller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  caller_name TEXT NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('ringing', 'ongoing', 'ended', 'missed')) DEFAULT 'ringing',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_video_calls_caller ON video_calls(caller_id);
CREATE INDEX IF NOT EXISTS idx_video_calls_receiver ON video_calls(receiver_id);
CREATE INDEX IF NOT EXISTS idx_video_calls_status ON video_calls(status);
CREATE INDEX IF NOT EXISTS idx_video_calls_room ON video_calls(room_id);

-- Update profiles table to include avatar_url if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create storage bucket for avatars (run this in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- Create storage policy for avatars
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own avatar" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
