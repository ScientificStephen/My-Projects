"use client"

import { useState, useEffect } from "react"
import { View, Image, ActivityIndicator, StyleSheet } from "react-native"
import { cacheImage } from "../services/offline"

interface OptimizedImageProps {
  source: { uri: string } | number
  style?: any
  placeholder?: boolean
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center"
}

export default function OptimizedImage({
  source,
  style,
  placeholder = true,
  resizeMode = "cover",
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cachedUri, setCachedUri] = useState<string | null>(null)

  useEffect(() => {
    if (typeof source === "object" && source.uri) {
      loadImage(source.uri)
    }
  }, [source])

  async function loadImage(uri: string) {
    try {
      const cached = await cacheImage(uri)
      if (cached) {
        setCachedUri(cached)
      }
      setLoading(false)
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  const imageSource = typeof source === "number" ? source : { uri: cachedUri || source.uri }

  return (
    <View style={[styles.container, style]}>
      {loading && placeholder && (
        <View style={styles.placeholder}>
          <ActivityIndicator color="#d4af37" size="small" />
        </View>
      )}
      <Image
        source={imageSource}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true)
          setLoading(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26, 26, 46, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
})
