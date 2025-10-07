import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if environment variables are set
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// Create Supabase client only if configured
export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper to check if Supabase is configured
export function isSupabaseConfigured() {
  return isConfigured
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
