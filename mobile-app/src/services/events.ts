import { supabase } from "./supabase"
import dayjs from "dayjs"

export interface FamilyEvent {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  type: "birthday" | "anniversary" | "gathering" | "holiday" | "other"
  created_by: string
  created_by_name: string
  attendees?: string[]
  location?: string
  reminder_enabled: boolean
  created_at: string
}

export async function getEvents(userId: string): Promise<FamilyEvent[]> {
  try {
    const { data, error } = await supabase
      .from("family_events")
      .select(
        `
        *,
        creator:profiles!created_by(name)
      `,
      )
      .or(`created_by.eq.${userId},attendees.cs.{${userId}}`)
      .order("date", { ascending: true })

    if (error) throw error

    return data.map((event) => ({
      ...event,
      created_by_name: event.creator.name,
    }))
  } catch (error) {
    console.error("Error getting events:", error)
    return []
  }
}

export async function createEvent(event: Partial<FamilyEvent>): Promise<FamilyEvent | null> {
  try {
    const { data, error } = await supabase
      .from("family_events")
      .insert({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        type: event.type || "other",
        created_by: event.created_by,
        location: event.location,
        reminder_enabled: event.reminder_enabled || false,
        attendees: event.attendees || [],
      })
      .select(
        `
        *,
        creator:profiles!created_by(name)
      `,
      )
      .single()

    if (error) throw error

    return {
      ...data,
      created_by_name: data.creator.name,
    }
  } catch (error) {
    console.error("Error creating event:", error)
    return null
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("family_events").delete().eq("id", eventId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting event:", error)
    return false
  }
}

export async function getUpcomingEvents(userId: string, days = 30): Promise<FamilyEvent[]> {
  const today = dayjs().format("YYYY-MM-DD")
  const futureDate = dayjs().add(days, "day").format("YYYY-MM-DD")

  try {
    const { data, error } = await supabase
      .from("family_events")
      .select(
        `
        *,
        creator:profiles!created_by(name)
      `,
      )
      .or(`created_by.eq.${userId},attendees.cs.{${userId}}`)
      .gte("date", today)
      .lte("date", futureDate)
      .order("date", { ascending: true })

    if (error) throw error

    return data.map((event) => ({
      ...event,
      created_by_name: event.creator.name,
    }))
  } catch (error) {
    console.error("Error getting upcoming events:", error)
    return []
  }
}

export function formatEventDate(date: string, time?: string): string {
  const eventDate = dayjs(date)
  const now = dayjs()

  if (eventDate.isSame(now, "day")) {
    return time ? `Today at ${time}` : "Today"
  } else if (eventDate.isSame(now.add(1, "day"), "day")) {
    return time ? `Tomorrow at ${time}` : "Tomorrow"
  } else if (eventDate.diff(now, "day") < 7) {
    return time ? `${eventDate.format("dddd")} at ${time}` : eventDate.format("dddd")
  } else {
    return time ? `${eventDate.format("MMM D")} at ${time}` : eventDate.format("MMM D, YYYY")
  }
}
