import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { supabase } from "./supabase"

export async function requestMediaLibraryPermissions(): Promise<boolean> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  return status === "granted"
}

export async function requestCameraPermissions(): Promise<boolean> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  return status === "granted"
}

export async function pickImageFromLibrary(): Promise<string | null> {
  const hasPermission = await requestMediaLibraryPermissions()
  if (!hasPermission) {
    alert("Permission to access media library is required!")
    return null
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  })

  if (!result.canceled && result.assets[0]) {
    return result.assets[0].uri
  }

  return null
}

export async function takePhoto(): Promise<string | null> {
  const hasPermission = await requestCameraPermissions()
  if (!hasPermission) {
    alert("Permission to access camera is required!")
    return null
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  })

  if (!result.canceled && result.assets[0]) {
    return result.assets[0].uri
  }

  return null
}

export async function uploadPhoto(uri: string, userId: string): Promise<string | null> {
  try {
    const fileExt = uri.split(".").pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    // Convert to blob
    const response = await fetch(`data:image/${fileExt};base64,${base64}`)
    const blob = await response.blob()

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("avatars").upload(filePath, blob, {
      contentType: `image/${fileExt}`,
      upsert: true,
    })

    if (error) throw error

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error("Error uploading photo:", error)
    return null
  }
}

export async function updateProfilePhoto(userId: string, photoUrl: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("profiles").update({ avatar_url: photoUrl }).eq("id", userId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error updating profile photo:", error)
    return false
  }
}
