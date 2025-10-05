"use client"

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from "react-native"
import { Camera, Edit, Mail, Phone, MapPin, Briefcase, Crown, Settings } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"
import { pickImageFromLibrary, takePhoto, uploadPhoto, updateProfilePhoto } from "../services/photoUpload"
import { useState } from "react"

export default function ProfileScreen({ navigation }: any) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const userId = "current-user-id"

  async function handleChangePhoto() {
    Alert.alert("Change Photo", "Choose an option", [
      {
        text: "Take Photo",
        onPress: async () => {
          const uri = await takePhoto()
          if (uri) {
            const url = await uploadPhoto(uri, userId)
            if (url) {
              await updateProfilePhoto(userId, url)
              setProfileImage(url)
              Alert.alert("Success", "Profile photo updated!")
            }
          }
        },
      },
      {
        text: "Choose from Library",
        onPress: async () => {
          const uri = await pickImageFromLibrary()
          if (uri) {
            const url = await uploadPhoto(uri, userId)
            if (url) {
              await updateProfilePhoto(userId, url)
              setProfileImage(url)
              Alert.alert("Success", "Profile photo updated!")
            }
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <LinearGradient colors={["#d4af37", "#f7e7ce"]} style={styles.avatar}>
                <Text style={styles.avatarText}>Y</Text>
              </LinearGradient>
            )}
            <TouchableOpacity style={styles.cameraButton} onPress={handleChangePhoto}>
              <Camera color="#0a0a0a" size={16} />
            </TouchableOpacity>
            <View style={styles.crownBadge}>
              <Crown color="#d4af37" size={20} />
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
              <Settings color="#d4af37" size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Your Name</Text>
          <Text style={styles.profileJob}>Creative Director</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit color="#0a0a0a" size={16} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Your Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Chosen Family</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Memories</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,243</Text>
              <Text style={styles.statLabel}>Hearts</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <View style={styles.infoItem}>
            <Mail color="#d4af37" size={20} />
            <Text style={styles.infoText}>your.email@example.com</Text>
          </View>
          <View style={styles.infoItem}>
            <Phone color="#d4af37" size={20} />
            <Text style={styles.infoText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin color="#d4af37" size={20} />
            <Text style={styles.infoText}>San Francisco, CA</Text>
          </View>
          <View style={styles.infoItem}>
            <Briefcase color="#d4af37" size={20} />
            <Text style={styles.infoText}>Creative Director</Text>
          </View>
        </View>

        <View style={styles.galleryCard}>
          <Text style={styles.sectionTitle}>Memory Gallery</Text>
          <View style={styles.emptyGallery}>
            <Camera color="rgba(212, 175, 55, 0.3)" size={48} />
            <Text style={styles.emptyText}>Your Story Awaits</Text>
            <Text style={styles.emptySubtext}>Share the moments that define your chosen family</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Share Your First Memory</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 24,
    position: "relative",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  avatarText: {
    color: "#0a0a0a",
    fontSize: 48,
    fontWeight: "bold",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#d4af37",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0a0a0a",
  },
  crownBadge: {
    position: "absolute",
    top: -8,
    right: -8,
  },
  settingsButton: {
    position: "absolute",
    top: -60,
    right: 16,
    padding: 12,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  profileName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileJob: {
    color: "#d4af37",
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#d4af37",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  editButtonText: {
    color: "#0a0a0a",
    fontWeight: "bold",
    fontSize: 14,
  },
  statsCard: {
    margin: 16,
    padding: 24,
    backgroundColor: "#f7e7ce",
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#0a0a0a",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(10, 10, 10, 0.2)",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0a0a0a",
  },
  statLabel: {
    fontSize: 12,
    color: "#4a4a4a",
    marginTop: 4,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    color: "#e2e8f0",
    fontSize: 14,
  },
  galleryCard: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  emptyGallery: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    color: "#e2e8f0",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: "#d4af37",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  uploadButtonText: {
    color: "#0a0a0a",
    fontWeight: "bold",
    fontSize: 14,
  },
})
