"use client"

import { useState, useCallback, memo } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { Heart, MessageCircle, Share2, Sparkles } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"
import OptimizedImage from "../components/OptimizedImage"
import AnimatedScreen from "../components/AnimatedScreen"

interface Post {
  id: string
  author: string
  time: string
  content: string
  image?: any
  likes: number
  comments: number
}

const posts: Post[] = [
  {
    id: "1",
    author: "Marcus Johnson",
    time: "2h ago",
    content:
      "Today marks 1 year since David and I became father and son. Not by blood, but by choice. He's taught me as much as I've taught him. This is what real family looks like. 🤝❤️",
    image: require("../assets/father-son.jpg"),
    likes: 2341,
    comments: 456,
  },
  {
    id: "2",
    author: "Aisha Rahman",
    time: "5h ago",
    content:
      "Five years ago, I walked into a support group feeling alone. Today, I have 12 people I call family who weren't in my life before. They chose me, and I chose them. That's real family. 💛",
    likes: 842,
    comments: 126,
  },
  {
    id: "3",
    author: "David Chen",
    time: "8h ago",
    content:
      "My biological father left when I was 3. Marcus showed up when I was 23. He didn't have to choose me, but he did. And I chose him right back.",
    likes: 1567,
    comments: 234,
  },
  {
    id: "4",
    author: "Sofia Martinez",
    time: "1 day ago",
    content: "Building a family tree that reflects the love in our lives, not just bloodlines. 🌳❤️",
    likes: 956,
    comments: 189,
  },
]

// Memoized post card component
const PostCard = memo(({ post }: { post: Post }) => {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{post.author.charAt(0)}</Text>
        </View>
        <View style={styles.postHeaderText}>
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      {post.image && <OptimizedImage source={post.image} style={styles.postImage} />}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart color="#d4af37" size={20} />
          <Text style={styles.actionText}>{post.likes.toLocaleString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle color="#d4af37" size={20} />
          <Text style={styles.actionText}>{post.comments.toLocaleString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 color="#d4af37" size={20} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})

export default function FeedScreen() {
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }, [])

  const renderPost = useCallback(({ item }: { item: Post }) => <PostCard post={item} />, [])

  const keyExtractor = useCallback((item: Post) => item.id, [])

  const ListHeaderComponent = useCallback(
    () => (
      <LinearGradient
        colors={["#d4af37", "#f7e7ce", "#d4af37"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroBanner}
      >
        <Text style={styles.heroTitle}>Build the Family You Love</Text>
        <Text style={styles.heroSubtitle}>— Alexian Scruggs, Founder</Text>
        <TouchableOpacity style={styles.heroButton}>
          <Sparkles color="#0a0a0a" size={20} />
          <Text style={styles.heroButtonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </LinearGradient>
    ),
    [],
  )

  const ListFooterComponent = useCallback(
    () => (loading ? <ActivityIndicator color="#d4af37" size="large" style={{ marginVertical: 20 }} /> : null),
    [loading],
  )

  return (
    <AnimatedScreen>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#d4af37" />}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          initialNumToRender={4}
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
  listContent: {
    paddingBottom: 20,
  },
  heroBanner: {
    padding: 32,
    margin: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a0a0a",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#1a1a2e",
    fontStyle: "italic",
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(10, 10, 10, 0.2)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  heroButtonText: {
    color: "#0a0a0a",
    fontWeight: "bold",
    fontSize: 16,
  },
  postCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#d4af37",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  postHeaderText: {
    flex: 1,
  },
  authorName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },
  postContent: {
    color: "#e2e8f0",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    gap: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 175, 55, 0.1)",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#94a3b8",
    fontSize: 14,
  },
})
