"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, SafeAreaView, Alert } from "react-native"
import { Wifi, WifiOff, Trash2, Download, Fingerprint, LogOut } from "lucide-react-native"
import { clearCache, getCacheSize, formatCacheSize } from "../services/offline"
import {
  saveBiometricPreference,
  getBiometricPreference,
  isBiometricSupported,
  isBiometricEnrolled,
  authenticateWithBiometrics,
} from "../services/biometrics"

export default function SettingsScreen() {
  const [offlineMode, setOfflineMode] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [cacheSize, setCacheSize] = useState("0 KB")

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    const biometric = await getBiometricPreference()
    setBiometricEnabled(biometric)

    const size = await getCacheSize()
    setCacheSize(formatCacheSize(size))
  }

  async function handleClearCache() {
    Alert.alert("Clear Cache", "Are you sure you want to clear all offline data?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearCache()
          setCacheSize("0 KB")
          Alert.alert("Success", "Cache cleared successfully")
        },
      },
    ])
  }

  async function handleBiometricToggle(value: boolean) {
    if (value) {
      const supported = await isBiometricSupported()
      const enrolled = await isBiometricEnrolled()

      if (!supported || !enrolled) {
        Alert.alert(
          "Biometric Not Available",
          "Please enable biometric authentication in your device settings first.",
          [{ text: "OK" }],
        )
        return
      }

      const authenticated = await authenticateWithBiometrics()
      if (!authenticated) {
        Alert.alert("Authentication Failed", "Please try again or use password authentication.", [{ text: "OK" }])
        return
      }
    }

    setBiometricEnabled(value)
    await saveBiometricPreference(value)

    Alert.alert(
      value ? "Biometric Enabled" : "Biometric Disabled",
      value ? "You can now use biometric authentication to unlock the app" : "Password authentication will be required",
      [{ text: "OK" }],
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Offline Mode Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Offline Mode</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                {offlineMode ? <WifiOff color="#d4af37" size={24} /> : <Wifi color="#d4af37" size={24} />}
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Offline Access</Text>
                  <Text style={styles.settingDescription}>Save data for offline viewing</Text>
                </View>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: "#1a1a2e", true: "#d4af37" }}
                thumbColor={offlineMode ? "#f7e7ce" : "#94a3b8"}
              />
            </View>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Download color="#d4af37" size={24} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Cache Size</Text>
                  <Text style={styles.settingDescription}>{cacheSize} stored locally</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
                <Trash2 color="#ef4444" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Fingerprint color="#d4af37" size={24} />
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>Biometric Authentication</Text>
                  <Text style={styles.settingDescription}>Use Face ID or fingerprint</Text>
                </View>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: "#1a1a2e", true: "#d4af37" }}
                thumbColor={biometricEnabled ? "#f7e7ce" : "#94a3b8"}
              />
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dangerButton}>
            <LogOut color="#ef4444" size={20} />
            <Text style={styles.dangerButtonText}>Log Out</Text>
          </TouchableOpacity>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: "#d4af37",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    color: "#94a3b8",
    fontSize: 14,
  },
  actionButton: {
    padding: 8,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  dangerButtonText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "bold",
  },
})
