import AsyncStorage from "@react-native-async-storage/async-storage"
import * as FileSystem from "expo-file-system"

const CACHE_PREFIX = "@new_family_tree:"
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export interface CacheItem<T> {
  data: T
  timestamp: number
}

export async function cacheData<T>(key: string, data: T): Promise<void> {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  }
  await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem))
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const cached = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`)
    if (!cached) return null

    const cacheItem: CacheItem<T> = JSON.parse(cached)

    // Check if cache is expired
    if (Date.now() - cacheItem.timestamp > CACHE_EXPIRY) {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }

    return cacheItem.data
  } catch (error) {
    console.error("Error getting cached data:", error)
    return null
  }
}

export async function clearCache(): Promise<void> {
  const keys = await AsyncStorage.getAllKeys()
  const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX))
  await AsyncStorage.multiRemove(cacheKeys)
}

export async function cacheImage(url: string): Promise<string | null> {
  try {
    const filename = url.split("/").pop() || `image_${Date.now()}.jpg`
    const fileUri = `${FileSystem.cacheDirectory}${filename}`

    const info = await FileSystem.getInfoAsync(fileUri)
    if (info.exists) {
      return fileUri
    }

    const downloaded = await FileSystem.downloadAsync(url, fileUri)
    return downloaded.uri
  } catch (error) {
    console.error("Error caching image:", error)
    return null
  }
}

export async function getCacheSize(): Promise<number> {
  const keys = await AsyncStorage.getAllKeys()
  const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX))

  let totalSize = 0
  for (const key of cacheKeys) {
    const value = await AsyncStorage.getItem(key)
    if (value) {
      totalSize += new Blob([value]).size
    }
  }

  return totalSize
}

export function formatCacheSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
}
