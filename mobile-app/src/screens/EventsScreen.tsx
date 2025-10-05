"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from "react-native"
import { Calendar } from "react-native-calendars"
import {
  Plus,
  MapPin,
  Clock,
  Trash2,
  Users,
  Gift,
  Heart,
  PartyPopper,
  Calendar as CalendarIcon,
} from "lucide-react-native"
import dayjs from "dayjs"
import {
  type FamilyEvent,
  getEvents,
  createEvent,
  deleteEvent,
  formatEventDate,
  getUpcomingEvents,
} from "../services/events"
import { scheduleMessageNotification } from "../services/notifications"

const EVENT_TYPES = [
  { value: "birthday", label: "Birthday", icon: Gift },
  { value: "anniversary", label: "Anniversary", icon: Heart },
  { value: "gathering", label: "Family Gathering", icon: Users },
  { value: "holiday", label: "Holiday", icon: PartyPopper },
  { value: "other", label: "Other", icon: CalendarIcon },
]

export default function EventsScreen() {
  const [events, setEvents] = useState<FamilyEvent[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<FamilyEvent[]>([])
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
    time: "",
    type: "other" as FamilyEvent["type"],
    location: "",
    reminder_enabled: true,
  })

  const userId = "current-user-id" // Get from auth context

  useEffect(() => {
    loadEvents()
    loadUpcomingEvents()
  }, [])

  async function loadEvents() {
    setLoading(true)
    const data = await getEvents(userId)
    setEvents(data)
    setLoading(false)
  }

  async function loadUpcomingEvents() {
    const data = await getUpcomingEvents(userId, 30)
    setUpcomingEvents(data)
  }

  async function handleCreateEvent() {
    if (!newEvent.title.trim()) {
      Alert.alert("Error", "Please enter an event title")
      return
    }

    const created = await createEvent({
      ...newEvent,
      created_by: userId,
    })

    if (created) {
      setEvents([...events, created])
      setShowAddModal(false)
      resetNewEvent()
      Alert.alert("Success", "Event created successfully!")

      // Send notification
      scheduleMessageNotification("New Event", `${newEvent.title} on ${formatEventDate(newEvent.date, newEvent.time)}`)
    }
  }

  async function handleDeleteEvent(eventId: string) {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deleteEvent(eventId)
          if (success) {
            setEvents(events.filter((e) => e.id !== eventId))
            Alert.alert("Success", "Event deleted")
          }
        },
      },
    ])
  }

  function resetNewEvent() {
    setNewEvent({
      title: "",
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      time: "",
      type: "other",
      location: "",
      reminder_enabled: true,
    })
  }

  const markedDates = events.reduce(
    (acc, event) => {
      acc[event.date] = {
        marked: true,
        dotColor: "#d4af37",
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const selectedDateEvents = events.filter((e) => e.date === selectedDate)

  function getEventIcon(type: FamilyEvent["type"]) {
    const eventType = EVENT_TYPES.find((t) => t.value === type)
    return eventType ? eventType.icon : CalendarIcon
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Family Calendar</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus color="#0a0a0a" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.length === 0 ? (
            <View style={styles.emptyCard}>
              <CalendarIcon color="rgba(212, 175, 55, 0.3)" size={48} />
              <Text style={styles.emptyText}>No upcoming events</Text>
            </View>
          ) : (
            upcomingEvents.slice(0, 3).map((event) => {
              const EventIcon = getEventIcon(event.type)
              return (
                <View key={event.id} style={styles.upcomingCard}>
                  <View style={styles.eventIconContainer}>
                    <EventIcon color="#d4af37" size={24} />
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{formatEventDate(event.date, event.time)}</Text>
                    {event.location && (
                      <View style={styles.eventMeta}>
                        <MapPin color="#64748b" size={14} />
                        <Text style={styles.eventMetaText}>{event.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )
            })
          )}
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              ...markedDates,
              [selectedDate]: {
                ...markedDates[selectedDate],
                selected: true,
                selectedColor: "#d4af37",
              },
            }}
            theme={{
              backgroundColor: "#1a1a2e",
              calendarBackground: "#1a1a2e",
              textSectionTitleColor: "#d4af37",
              selectedDayBackgroundColor: "#d4af37",
              selectedDayTextColor: "#0a0a0a",
              todayTextColor: "#d4af37",
              dayTextColor: "#e2e8f0",
              textDisabledColor: "#64748b",
              dotColor: "#d4af37",
              selectedDotColor: "#0a0a0a",
              arrowColor: "#d4af37",
              monthTextColor: "#e2e8f0",
            }}
          />
        </View>

        {/* Events for Selected Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Events on {dayjs(selectedDate).format("MMM D, YYYY")}</Text>
          {selectedDateEvents.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No events on this day</Text>
            </View>
          ) : (
            selectedDateEvents.map((event) => {
              const EventIcon = getEventIcon(event.type)
              return (
                <View key={event.id} style={styles.eventCard}>
                  <View style={styles.eventHeader}>
                    <View style={styles.eventIconContainer}>
                      <EventIcon color="#d4af37" size={20} />
                    </View>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventCreator}>Created by {event.created_by_name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteEvent(event.id)}>
                      <Trash2 color="#ef4444" size={20} />
                    </TouchableOpacity>
                  </View>

                  {event.description && <Text style={styles.eventDescription}>{event.description}</Text>}

                  <View style={styles.eventDetails}>
                    {event.time && (
                      <View style={styles.eventMeta}>
                        <Clock color="#64748b" size={16} />
                        <Text style={styles.eventMetaText}>{event.time}</Text>
                      </View>
                    )}
                    {event.location && (
                      <View style={styles.eventMeta}>
                        <MapPin color="#64748b" size={16} />
                        <Text style={styles.eventMetaText}>{event.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )
            })
          )}
        </View>
      </ScrollView>

      {/* Add Event Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Event</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Title *</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.title}
                  onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                  placeholder="Event title"
                  placeholderTextColor="#64748b"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Type</Text>
                <View style={styles.typeGrid}>
                  {EVENT_TYPES.map((type) => {
                    const Icon = type.icon
                    return (
                      <TouchableOpacity
                        key={type.value}
                        style={[styles.typeButton, newEvent.type === type.value && styles.typeButtonActive]}
                        onPress={() => setNewEvent({ ...newEvent, type: type.value as FamilyEvent["type"] })}
                      >
                        <Icon color={newEvent.type === type.value ? "#0a0a0a" : "#94a3b8"} size={20} />
                        <Text
                          style={[styles.typeButtonText, newEvent.type === type.value && styles.typeButtonTextActive]}
                        >
                          {type.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newEvent.description}
                  onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                  placeholder="Event description"
                  placeholderTextColor="#64748b"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Date *</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.date}
                  onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#64748b"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.time}
                  onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
                  placeholder="HH:MM AM/PM"
                  placeholderTextColor="#64748b"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.location}
                  onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                  placeholder="Event location"
                  placeholderTextColor="#64748b"
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
                <Text style={styles.createButtonText}>Create Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: "#d4af37",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: "#d4af37",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  upcomingCard: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  eventIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  eventDate: {
    color: "#d4af37",
    fontSize: 14,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  eventMetaText: {
    color: "#64748b",
    fontSize: 12,
  },
  calendarContainer: {
    backgroundColor: "#1a1a2e",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  eventCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  eventCreator: {
    color: "#64748b",
    fontSize: 12,
  },
  eventDescription: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  emptyCard: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(212, 175, 55, 0.2)",
  },
  modalTitle: {
    color: "#d4af37",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalClose: {
    color: "#94a3b8",
    fontSize: 28,
  },
  modalBody: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    backgroundColor: "#0a0a0a",
  },
  typeButtonActive: {
    backgroundColor: "#d4af37",
    borderColor: "#d4af37",
  },
  typeButtonText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  typeButtonTextActive: {
    color: "#0a0a0a",
    fontWeight: "bold",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 175, 55, 0.2)",
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#d4af37",
    fontSize: 16,
    fontWeight: "600",
  },
  createButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#d4af37",
    alignItems: "center",
  },
  createButtonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },
})
