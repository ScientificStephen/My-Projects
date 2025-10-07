"use client"

import { supabase, isSupabaseConfigured } from "./supabase"

function checkSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured. Please add environment variables.")
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
  checkSupabaseConfig()

  const {
    data: { user },
  } = await supabase!.auth.getUser()
  return user
}

export async function getProfile(userId: string) {
  checkSupabaseConfig()

  const { data, error } = await supabase!.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}
