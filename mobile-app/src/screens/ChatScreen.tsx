"use client"

import { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, View, Text } from "react-native"
import { GiftedChat, type IMessage } from "react-native-gifted-chat"
import { Clock } from "lucide-react-native"
import { getMessages, sendMessage, markMessagesAsRead, subscribeToMessages, type Message } from "../services/messaging"

export default function ChatScreen({ route }: any) {
  const { userId, userName, isPending } = route.params
  const [messages, setMessages] = useState<IMessage[]>([])
  const currentUserId = "current-user-id" // Get from auth context

  useEffect(() => {
    loadMessages()
    markMessagesAsRead(currentUserId, userId)

    // Subscribe to real-time messages
    const channel = subscribeToMessages(currentUserId, (message) => {
      if (message.sender_id === userId) {
        addMessage(message)
        markMessagesAsRead(currentUserId, userId)
      }
    })

    return () => {
      // Cleanup
    }
  }, [])

  async function loadMessages() {
    const data = await getMessages(currentUserId, userId)
    setMessages(
      data.map((msg) => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender_id,
          name: msg.sender_name,
          avatar: msg.sender_avatar,
        },
      })),
    )
  }

  function addMessage(message: Message) {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: message.id,
          text: message.content,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id,
            name: message.sender_name,
            avatar: message.sender_avatar,
          },
        },
      ]),
    )
  }

  async function onSend(newMessages: IMessage[] = []) {
    const message = newMessages[0]
    const sent = await sendMessage(userId, message.text, currentUserId)

    if (sent) {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {isPending && (
        <View style={styles.pendingBanner}>
          <Clock color="#d4af37" size={18} />
          <Text style={styles.pendingText}>Connection pending. You can chat while they consider your request!</Text>
        </View>
      )}
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentUserId,
          }}
          renderUsernameOnMessage
          messagesContainerStyle={styles.messagesContainer}
          textInputStyle={styles.textInput}
          placeholder="Type a message..."
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  pendingBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(212, 175, 55, 0.15)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.3)",
  },
  pendingText: {
    flex: 1,
    color: "#d4af37",
    fontSize: 13,
    fontWeight: "600",
  },
  messagesContainer: {
    backgroundColor: "#0a0a0a",
  },
  textInput: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
  },
})
