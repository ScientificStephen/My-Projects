"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { MessageCircle, Send } from "lucide-react-native"
import {
  type Conversation,
  getConversations,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../services/messaging"
import { scheduleMessageNotification } from "../services/notifications"

export default function MessagesScreen({ navigation }: any) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const userId = "current-user-id" // Get from auth context

  useEffect(() => {
    loadConversations()

    // Subscribe to real-time messages
    const channel = subscribeToMessages(userId, (message) => {
      scheduleMessageNotification(message.sender_name, message.content)
      loadConversations() // Refresh conversations
    })

    return () => {
      unsubscribeFromMessages()
    }
  }, [])

  async function loadConversations() {
    setLoading(true)
    const data = await getConversations(userId)
    setConversations(data)
    setLoading(false)
  }

  function renderConversation({ item }: { item: Conversation }) {
    return (
      <TouchableOpacity
        style={styles.conversationCard}
        onPress={() => navigation.navigate("Chat", { userId: item.user_id, userName: item.user_name })}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.user_name.charAt(0)}</Text>
        </View>
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Text style={styles.userName}>{item.user_name}</Text>
            <Text style={styles.time}>{formatTime(item.last_message_time)}</Text>
          </View>
          <View style={styles.conversationFooter}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {item.last_message}
            </Text>
            {item.unread_count > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread_count}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  function formatTime(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Send color="#d4af37" size={24} />
        </TouchableOpacity>
      </View>

      {conversations.length === 0 ? (
        <View style={styles.emptyState}>
          <MessageCircle color="rgba(212, 175, 55, 0.3)" size={64} />
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>Start a conversation with your family members</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={loadConversations}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  headerTitle: {
    color: "#d4af37",
    fontSize: 24,
    fontWeight: "bold",
  },
  newMessageButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  conversationCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#d4af37",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#0a0a0a",
    fontSize: 24,
    fontWeight: "bold",
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    color: "#64748b",
    fontSize: 12,
  },
  conversationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    color: "#94a3b8",
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: "#d4af37",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  unreadText: {
    color: "#0a0a0a",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
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
    textAlign: "center",
    marginTop: 8,
  },
})
