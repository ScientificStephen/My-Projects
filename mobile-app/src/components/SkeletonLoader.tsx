"use client"

import { useEffect, useRef } from "react"
import { View, Animated, StyleSheet } from "react-native"

interface SkeletonLoaderProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: any
}

export function SkeletonLoader({ width = "100%", height = 20, borderRadius = 8, style }: SkeletonLoaderProps) {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  )
}

export function PostCardSkeleton() {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <SkeletonLoader width={48} height={48} borderRadius={24} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <SkeletonLoader width="60%" height={16} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="40%" height={12} />
        </View>
      </View>
      <SkeletonLoader width="100%" height={60} style={{ marginVertical: 12 }} />
      <SkeletonLoader width="100%" height={200} borderRadius={12} />
    </View>
  )
}

export function CardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SkeletonLoader width={64} height={64} borderRadius={32} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <SkeletonLoader width="70%" height={18} style={{ marginBottom: 8 }} />
          <SkeletonLoader width="50%" height={14} />
        </View>
      </View>
      <SkeletonLoader width="100%" height={80} style={{ marginTop: 12 }} />
      <View style={styles.tags}>
        <SkeletonLoader width={80} height={28} borderRadius={14} />
        <SkeletonLoader width={100} height={28} borderRadius={14} />
        <SkeletonLoader width={90} height={28} borderRadius={14} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "rgba(148, 163, 184, 0.2)",
  },
  postCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
})
