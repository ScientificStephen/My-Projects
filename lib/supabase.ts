import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Missing Supabase environment variables!")
  console.error("Please add these to your .env.local file:")
  console.error("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url")
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key")
}

// Create Supabase client (will be null if env vars are missing)
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return supabase !== null
}

// Types for our database
export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  location: string | null
  bio: string | null
  created_at: string
}

export type FamilyMember = {
  id: string
  user_id: string
  name: string
  relation: string
  email: string | null
  message: string | null
  created_at: string
}

export type Post = {
  id: string
  user_id: string
  content: string
  image_url: string | null
  likes: number
  created_at: string
}
