import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
