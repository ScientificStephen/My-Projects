import { supabase } from "./supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read: boolean
  sender_name: string
  sender_avatar?: string
}

export interface Conversation {
  id: string
  user_id: string
  user_name: string
  last_message: string
  last_message_time: string
  unread_count: number
  user_avatar?: string
}

let messageChannel: RealtimeChannel | null = null

export async function sendMessage(receiverId: string, content: string, senderId: string): Promise<Message | null> {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        read: false,
      })
      .select(
        `
        *,
        sender:profiles!sender_id(name, avatar_url)
      `,
      )
      .single()

    if (error) throw error

    return {
      ...data,
      sender_name: data.sender.name,
      sender_avatar: data.sender.avatar_url,
    }
  } catch (error) {
    console.error("Error sending message:", error)
    return null
  }
}

export async function getMessages(userId: string, otherUserId: string): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        sender:profiles!sender_id(name, avatar_url)
      `,
      )
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .or(`sender_id.eq.${otherUserId},receiver_id.eq.${otherUserId}`)
      .order("created_at", { ascending: true })

    if (error) throw error

    return data.map((msg) => ({
      ...msg,
      sender_name: msg.sender.name,
      sender_avatar: msg.sender.avatar_url,
    }))
  } catch (error) {
    console.error("Error getting messages:", error)
    return []
  }
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase.rpc("get_conversations", {
      user_id_param: userId,
    })

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error getting conversations:", error)
    return []
  }
}

export async function markMessagesAsRead(userId: string, otherUserId: string): Promise<void> {
  try {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("receiver_id", userId)
      .eq("sender_id", otherUserId)
      .eq("read", false)
  } catch (error) {
    console.error("Error marking messages as read:", error)
  }
}

export function subscribeToMessages(userId: string, onMessage: (message: Message) => void): RealtimeChannel | null {
  try {
    messageChannel = supabase
      .channel(`messages:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${userId}`,
        },
        async (payload) => {
          const { data } = await supabase
            .from("profiles")
            .select("name, avatar_url")
            .eq("id", payload.new.sender_id)
            .single()

          onMessage({
            ...payload.new,
            sender_name: data?.name || "Unknown",
            sender_avatar: data?.avatar_url,
          } as Message)
        },
      )
      .subscribe()

    return messageChannel
  } catch (error) {
    console.error("Error subscribing to messages:", error)
    return null
  }
}

export function unsubscribeFromMessages(): void {
  if (messageChannel) {
    supabase.removeChannel(messageChannel)
    messageChannel = null
  }
}
