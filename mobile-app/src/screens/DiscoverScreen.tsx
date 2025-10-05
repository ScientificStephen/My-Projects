"use client"

import { useState, useEffect, useCallback, memo } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native"
import { Search, MapPin, MessageCircle, UserPlus, X, Users } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"
import OptimizedImage from "../components/OptimizedImage"
import { CardSkeleton } from "../components/SkeletonLoader"
import AnimatedScreen from "../components/AnimatedScreen"

interface PotentialConnection {
  id: string
  name: string
  bio?: string
  location?: string
  distance?: number
  mutual_connections?: number
  avatar_url?: string
  looking_for?: string[]
  interests?: string[]
}

// Memoized connection card
const ConnectionCard = memo(
  ({ person, onChat, onConnect }: { person: PotentialConnection; onChat: () => void; onConnect: () => void }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {person.avatar_url ? (
            <OptimizedImage source={{ uri: person.avatar_url }} style={styles.avatar} />
          ) : (
            <LinearGradient colors={["#d4af37", "#f7e7ce"]} style={styles.avatar}>
              <Text style={styles.avatarText}>{person.name.charAt(0)}</Text>
            </LinearGradient>
          )}
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{person.name}</Text>
            {person.location && (
              <View style={styles.cardMeta}>
                <MapPin color="#94a3b8" size={14} />
                <Text style={styles.cardMetaText}>
                  {person.location} • {person.distance}mi away
                </Text>
              </View>
            )}
            {person.mutual_connections && person.mutual_connections > 0 && (
              <View style={styles.cardMeta}>
                <Users color="#d4af37" size={14} />
                <Text style={styles.cardMetaText}>{person.mutual_connections} mutual connections</Text>
              </View>
            )}
          </View>
        </View>

        {person.bio && <Text style={styles.cardBio}>{person.bio}</Text>}

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <MessageCircle color="#d4af37" size={20} />
            <Text style={styles.chatButtonText}>Chat First</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
            <UserPlus color="#0a0a0a" size={20} />
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  },
)

export default function DiscoverScreen({ navigation }: any) {
  const [connections, setConnections] = useState<PotentialConnection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadConnections()
  }, [])

  async function loadConnections() {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockData: PotentialConnection[] = Array.from({ length: 10 }, (_, i) => ({
        id: `user-${i}`,
        name: `Person ${i + 1}`,
        bio: "Looking to build meaningful family connections...",
        location: "San Francisco, CA",
        distance: Math.floor(Math.random() * 50),
        mutual_connections: Math.floor(Math.random() * 10),
        looking_for: ["Parent", "Sibling"],
        interests: ["Reading", "Hiking", "Cooking"],
      }))
      setConnections(mockData)
      setLoading(false)
    }, 800)
  }

  async function loadMore() {
    if (loadingMore) return
    setLoadingMore(true)
    // Simulate pagination
    setTimeout(() => {
      const newData: PotentialConnection[] = Array.from({ length: 10 }, (_, i) => ({
        id: `user-${page * 10 + i}`,
        name: `Person ${page * 10 + i + 1}`,
        bio: "Looking to build meaningful family connections...",
        location: "San Francisco, CA",
        distance: Math.floor(Math.random() * 50),
        mutual_connections: Math.floor(Math.random() * 10),
        looking_for: ["Parent", "Sibling"],
        interests: ["Reading", "Hiking", "Cooking"],
      }))
      setConnections([...connections, ...newData])
      setPage(page + 1)
      setLoadingMore(false)
    }, 1000)
  }

  const filteredConnections = connections.filter(
    (conn) =>
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.bio?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderConnection = useCallback(
    ({ item }: { item: PotentialConnection }) => (
      <ConnectionCard
        person={item}
        onChat={() => navigation.navigate("Chat", { userId: item.id, userName: item.name, isPending: true })}
        onConnect={() => console.log("Connect with", item.name)}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: PotentialConnection) => item.id, [])

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <Search color="#d4af37" size={20} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, location, or interests..."
          placeholderTextColor="#64748b"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <X color="#94a3b8" size={20} />
          </TouchableOpacity>
        )}
      </View>
    ),
    [searchQuery],
  )

  const ListFooterComponent = useCallback(
    () => (loadingMore ? <ActivityIndicator color="#d4af37" size="large" style={{ marginVertical: 20 }} /> : null),
    [loadingMore],
  )

  const ListEmptyComponent = useCallback(
    () =>
      loading ? (
        <View style={{ padding: 16 }}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Users color="rgba(212, 175, 55, 0.3)" size={64} />
          <Text style={styles.emptyTitle}>No connections found</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your search</Text>
        </View>
      ),
    [loading],
  )

  return (
    <AnimatedScreen>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Connect</Text>
          <Text style={styles.headerSubtitle}>Find your chosen family</Text>
        </View>

        <FlatList
          data={filteredConnections}
          renderItem={renderConnection}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          initialNumToRender={5}
          windowSize={10}
        />
      </SafeAreaView>
    </AnimatedScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  headerTitle: {
    color: "#d4af37",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1a1a2e",
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#0a0a0a",
    fontSize: 28,
    fontWeight: "bold",
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  cardName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  cardMetaText: {
    color: "#94a3b8",
    fontSize: 13,
  },
  cardBio: {
    color: "#e2e8f0",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  chatButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    backgroundColor: "rgba(212, 175, 55, 0.1)",
  },
  chatButtonText: {
    color: "#d4af37",
    fontSize: 15,
    fontWeight: "bold",
  },
  connectButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#d4af37",
  },
  connectButtonText: {
    color: "#0a0a0a",
    fontSize: 15,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    color: "#e2e8f0",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  emptySubtitle: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 8,
  },
})
