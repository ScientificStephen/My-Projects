import { supabase } from "./supabase"

export interface PotentialConnection {
  id: string
  name: string
  bio?: string
  location?: string
  interests?: string[]
  avatar_url?: string
  distance?: number
  mutual_connections?: number
  looking_for?: string[]
}

export interface ConnectionRequest {
  id: string
  from_user_id: string
  from_user_name: string
  from_user_avatar?: string
  to_user_id: string
  to_user_name: string
  to_user_avatar?: string
  status: "pending" | "accepted" | "rejected"
  message?: string
  created_at: string
  updated_at: string
}

export async function discoverPotentialConnections(
  userId: string,
  filters?: {
    location?: string
    interests?: string[]
    lookingFor?: string[]
  },
): Promise<PotentialConnection[]> {
  try {
    let query = supabase.from("profiles").select("*").neq("id", userId).eq("is_public", true).limit(20)

    if (filters?.location) {
      query = query.ilike("location", `%${filters.location}%`)
    }

    const { data, error } = await query

    if (error) throw error

    // Filter by interests if provided
    let filtered = data || []
    if (filters?.interests && filters.interests.length > 0) {
      filtered = filtered.filter((profile) => {
        const profileInterests = profile.interests || []
        return filters.interests!.some((interest) => profileInterests.includes(interest))
      })
    }

    return filtered.map((profile) => ({
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      interests: profile.interests,
      avatar_url: profile.avatar_url,
      distance: Math.floor(Math.random() * 50), // Mock distance
      mutual_connections: Math.floor(Math.random() * 10), // Mock mutual connections
      looking_for: profile.looking_for,
    }))
  } catch (error) {
    console.error("Error discovering connections:", error)
    return []
  }
}

export async function sendConnectionRequest(
  fromUserId: string,
  fromUserName: string,
  toUserId: string,
  toUserName: string,
  message?: string,
): Promise<ConnectionRequest | null> {
  try {
    const { data, error } = await supabase
      .from("connection_requests")
      .insert({
        from_user_id: fromUserId,
        from_user_name: fromUserName,
        to_user_id: toUserId,
        to_user_name: toUserName,
        status: "pending",
        message,
      })
      .select()
      .single()

    if (error) throw error

    // Send notification to the recipient
    await sendConnectionNotification(toUserId, fromUserName)

    return data
  } catch (error) {
    console.error("Error sending connection request:", error)
    return null
  }
}

export async function getConnectionRequests(userId: string): Promise<ConnectionRequest[]> {
  try {
    const { data, error } = await supabase
      .from("connection_requests")
      .select(
        `
        *,
        from_user:profiles!from_user_id(avatar_url),
        to_user:profiles!to_user_id(avatar_url)
      `,
      )
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data.map((req) => ({
      ...req,
      from_user_avatar: req.from_user?.avatar_url,
      to_user_avatar: req.to_user?.avatar_url,
    }))
  } catch (error) {
    console.error("Error getting connection requests:", error)
    return []
  }
}

export async function acceptConnectionRequest(requestId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("connection_requests")
      .update({
        status: "accepted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error accepting connection request:", error)
    return false
  }
}

export async function rejectConnectionRequest(requestId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("connection_requests")
      .update({
        status: "rejected",
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error rejecting connection request:", error)
    return false
  }
}

export async function checkConnectionStatus(userId: string, otherUserId: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("connection_requests")
      .select("status")
      .or(
        `and(from_user_id.eq.${userId},to_user_id.eq.${otherUserId}),and(from_user_id.eq.${otherUserId},to_user_id.eq.${userId})`,
      )
      .single()

    if (error && error.code !== "PGRST116") throw error
    return data?.status || null
  } catch (error) {
    console.error("Error checking connection status:", error)
    return null
  }
}

async function sendConnectionNotification(userId: string, senderName: string): Promise<void> {
  console.log(`Sending connection notification to ${userId} from ${senderName}`)
  // This would integrate with your push notification service
}

export function subscribeToConnectionRequests(userId: string, onRequest: (request: ConnectionRequest) => void) {
  return supabase
    .channel(`connection_requests:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "connection_requests",
        filter: `to_user_id=eq.${userId}`,
      },
      (payload) => {
        onRequest(payload.new as ConnectionRequest)
      },
    )
    .subscribe()
}
