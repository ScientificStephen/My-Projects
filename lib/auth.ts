"use client"

import { supabase, isSupabaseConfigured } from "./supabase"

function checkSupabaseConfig() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error("Database connection required. Please complete setup in your dashboard.")
  }
}

export async function signUp(email: string, password: string, fullName: string) {
  checkSupabaseConfig()

  const { data, error } = await supabase!.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  checkSupabaseConfig()

  const { data, error } = await supabase!.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  checkSupabaseConfig()

  const { error } = await supabase!.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured() || !supabase) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function resendVerificationEmail() {
  checkSupabaseConfig()

  const {
    data: { user },
  } = await supabase!.auth.getUser()

  if (!user?.email) {
    throw new Error("No user email found")
  }

  const { error } = await supabase!.auth.resend({
    type: "signup",
    email: user.email,
  })

  if (error) throw error
}

export async function getProfile(userId: string) {
  checkSupabaseConfig()

  const { data, error } = await supabase!.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

// Password strength checker
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
