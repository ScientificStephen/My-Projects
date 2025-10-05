"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { Sparkles, Mail, Lock, User } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log("Auth submit:", { name, email, password, isSignUp })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <LinearGradient
          colors={["#d4af37", "#f7e7ce", "#d4af37"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Sparkles color="#0a0a0a" size={32} />
          <Text style={styles.headerTitle}>Build Your Chosen Family</Text>
          <Text style={styles.headerSubtitle}>Join thousands creating families filled with love, not just blood.</Text>
        </LinearGradient>

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, isSignUp && styles.toggleButtonActive]}
            onPress={() => setIsSignUp(true)}
          >
            <Text style={[styles.toggleText, isSignUp && styles.toggleTextActive]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isSignUp && styles.toggleButtonActive]}
            onPress={() => setIsSignUp(false)}
          >
            <Text style={[styles.toggleText, !isSignUp && styles.toggleTextActive]}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {isSignUp && (
            <View style={styles.inputContainer}>
              <User color="#d4af37" size={20} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor="#64748b"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Mail color="#d4af37" size={20} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock color="#d4af37" size={20} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#64748b"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{isSignUp ? "Start Building" : "Return to Your Family"}</Text>
          </TouchableOpacity>

          {isSignUp && <Text style={styles.termsText}>By signing up, you agree to create a family built on love</Text>}
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Facebook</Text>
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
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a0a0a",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#1a1a2e",
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: "#d4af37",
  },
  toggleText: {
    color: "#94a3b8",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#0a0a0a",
  },
  form: {
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: "#d4af37",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
  },
  socialContainer: {
    padding: 16,
    gap: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(212, 175, 55, 0.2)",
  },
  dividerText: {
    color: "#64748b",
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    backgroundColor: "#1a1a2e",
    alignItems: "center",
  },
  socialButtonText: {
    color: "#e2e8f0",
    fontWeight: "600",
  },
})
