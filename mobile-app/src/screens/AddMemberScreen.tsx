"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import { UserPlus } from "lucide-react-native"

const relations = [
  "Parent",
  "Child",
  "Sibling",
  "Grandparent",
  "Grandchild",
  "Aunt",
  "Uncle",
  "Cousin",
  "Family Friend",
]

export default function AddMemberScreen() {
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [job, setJob] = useState("")
  const [interests, setInterests] = useState("")

  const handleSubmit = () => {
    console.log("Adding member:", { name, relation, birthdate, job, interests })
    // Handle form submission
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Relationship *</Text>
            <View style={styles.relationGrid}>
              {relations.map((rel) => (
                <TouchableOpacity
                  key={rel}
                  style={[styles.relationButton, relation === rel && styles.relationButtonActive]}
                  onPress={() => setRelation(rel)}
                >
                  <Text style={[styles.relationButtonText, relation === rel && styles.relationButtonTextActive]}>
                    {rel}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              value={birthdate}
              onChangeText={setBirthdate}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Job/Occupation</Text>
            <TextInput
              style={styles.input}
              value={job}
              onChangeText={setJob}
              placeholder="e.g., Teacher, Engineer"
              placeholderTextColor="#64748b"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Interests & Hobbies</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={interests}
              onChangeText={setInterests}
              placeholder="e.g., Reading, Cooking, Sports"
              placeholderTextColor="#64748b"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <UserPlus color="#0a0a0a" size={20} />
            <Text style={styles.submitButtonText}>Add Family Member</Text>
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
  form: {
    padding: 16,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1a1a2e",
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
  relationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  relationButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    backgroundColor: "#1a1a2e",
  },
  relationButtonActive: {
    backgroundColor: "#d4af37",
    borderColor: "#d4af37",
  },
  relationButtonText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  relationButtonTextActive: {
    color: "#0a0a0a",
    fontWeight: "bold",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#d4af37",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  submitButtonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },
})
