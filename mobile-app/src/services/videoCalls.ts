import { supabase } from "./supabase"

export interface CallParticipant {
  id: string
  name: string
  avatar_url?: string
}

export interface VideoCall {
  id: string
  room_id: string
  caller_id: string
  caller_name: string
  receiver_id: string
  receiver_name: string
  status: "ringing" | "ongoing" | "ended" | "missed"
  started_at?: string
  ended_at?: string
}

export async function initiateCall(
  callerId: string,
  callerName: string,
  receiverId: string,
  receiverName: string,
): Promise<VideoCall | null> {
  try {
    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { data, error } = await supabase
      .from("video_calls")
      .insert({
        room_id: roomId,
        caller_id: callerId,
        caller_name: callerName,
        receiver_id: receiverId,
        receiver_name: receiverName,
        status: "ringing",
      })
      .select()
      .single()

    if (error) throw error

    // Send push notification to receiver
    await sendCallNotification(receiverId, callerName, roomId)

    return data
  } catch (error) {
    console.error("Error initiating call:", error)
    return null
  }
}

export async function answerCall(callId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("video_calls")
      .update({
        status: "ongoing",
        started_at: new Date().toISOString(),
      })
      .eq("id", callId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error answering call:", error)
    return false
  }
}

export async function endCall(callId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("video_calls")
      .update({
        status: "ended",
        ended_at: new Date().toISOString(),
      })
      .eq("id", callId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error ending call:", error)
    return false
  }
}

export async function missCall(callId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("video_calls")
      .update({
        status: "missed",
      })
      .eq("id", callId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error marking call as missed:", error)
    return false
  }
}

async function sendCallNotification(userId: string, callerName: string, roomId: string): Promise<void> {
  // This would integrate with your push notification service
  console.log(`Sending call notification to ${userId} from ${callerName}`)
}

export function subscribeToIncomingCalls(userId: string, onCall: (call: VideoCall) => void) {
  return supabase
    .channel(`calls:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "video_calls",
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        onCall(payload.new as VideoCall)
      },
    )
    .subscribe()
}
