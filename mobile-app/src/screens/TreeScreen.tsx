"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native"
import { UserPlus, Download, Share2, Search, X } from "lucide-react-native"
import LinearGradient from "react-native-linear-gradient"

const familyMembers = [
  { name: "Marcus Johnson", relation: "Chosen Father", generation: "Parents" },
  { name: "Aisha Rahman", relation: "Chosen Sister", generation: "Siblings" },
  { name: "Sofia Martinez", relation: "Chosen Aunt", generation: "Extended" },
  { name: "David Chen", relation: "Chosen Brother", generation: "Siblings" },
  { name: "Emma Williams", relation: "Chosen Cousin", generation: "Extended" },
  { name: "James Brown", relation: "Chosen Uncle", generation: "Extended" },
  { name: "Lisa Anderson", relation: "Chosen Sister", generation: "Siblings" },
  { name: "Michael Davis", relation: "Chosen Grandfather", generation: "Grandparents" },
]

export default function TreeScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const filteredMembers = familyMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.relation.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const generations = ["Grandparents", "Parents", "Siblings", "Extended"]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Actions */}
        <View style={styles.headerActions}>
          {showSearch ? (
            <View style={styles.searchContainer}>
              <Search color="#d4af37" size={20} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search family members..."
                placeholderTextColor="#64748b"
                autoFocus
              />
              <TouchableOpacity
                onPress={() => {
                  setShowSearch(false)
                  setSearchQuery("")
                }}
              >
                <X color="#94a3b8" size={20} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowSearch(true)}>
                <Search color="#d4af37" size={20} />
                <Text style={styles.actionText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Download color="#d4af37" size={20} />
                <Text style={styles.actionText}>Export</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 color="#d4af37" size={20} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <UserPlus color="#0a0a0a" size={20} />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Search Results Count */}
        {searchQuery && (
          <View style={styles.searchResults}>
            <Text style={styles.searchResultsText}>
              Found {filteredMembers.length} {filteredMembers.length === 1 ? "member" : "members"}
            </Text>
          </View>
        )}

        {/* Quote Card */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>"A family tree that grows with love, not just blood"</Text>
          <Text style={styles.quoteAuthor}>— New Family Tree</Text>
        </View>

        {/* Family Members by Generation */}
        <View style={styles.generationsContainer}>
          {generations.map((generation) => {
            const membersInGeneration = filteredMembers.filter((member) => member.generation === generation)
            if (membersInGeneration.length === 0 && searchQuery) return null

            return (
              <View key={generation} style={styles.generationSection}>
                <Text style={styles.generationTitle}>
                  {generation} {searchQuery && `(${membersInGeneration.length})`}
                </Text>
                <View style={styles.membersGrid}>
                  {membersInGeneration.map((member, idx) => (
                    <TouchableOpacity key={idx} style={styles.memberCard}>
                      <LinearGradient colors={["#d4af37", "#f7e7ce"]} style={styles.memberAvatar}>
                        <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
                      </LinearGradient>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberRelation}>{member.relation}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )
          })}
        </View>

        {filteredMembers.length === 0 && searchQuery && (
          <View style={styles.noResults}>
            <Search color="rgba(212, 175, 55, 0.3)" size={64} />
            <Text style={styles.noResultsText}>No members found</Text>
            <Text style={styles.noResultsSubtext}>Try searching with a different name or relationship</Text>
          </View>
        )}

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{familyMembers.length}</Text>
              <Text style={styles.statLabel}>Chosen Family</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Memories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,243</Text>
              <Text style={styles.statLabel}>Hearts</Text>
            </View>
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
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    padding: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  searchResults: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchResultsText: {
    color: "#d4af37",
    fontSize: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.3)",
  },
  actionText: {
    color: "#d4af37",
    fontSize: 14,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#d4af37",
  },
  addButtonText: {
    color: "#0a0a0a",
    fontSize: 14,
    fontWeight: "bold",
  },
  quoteCard: {
    margin: 16,
    padding: 24,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    alignItems: "center",
  },
  quoteText: {
    color: "#e2e8f0",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 8,
  },
  quoteAuthor: {
    color: "#d4af37",
    fontSize: 14,
  },
  generationsContainer: {
    padding: 16,
    gap: 24,
  },
  generationSection: {
    gap: 12,
  },
  generationTitle: {
    color: "#d4af37",
    fontSize: 20,
    fontWeight: "bold",
  },
  membersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  memberCard: {
    width: "47%",
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
    alignItems: "center",
  },
  memberAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  memberInitial: {
    color: "#0a0a0a",
    fontSize: 28,
    fontWeight: "bold",
  },
  memberName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  memberRelation: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
  noResults: {
    alignItems: "center",
    padding: 48,
  },
  noResultsText: {
    color: "#e2e8f0",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  noResultsSubtext: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    padding: 24,
    backgroundColor: "#f7e7ce",
    borderRadius: 16,
  },
  statsTitle: {
    color: "#0a0a0a",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#0a0a0a",
    fontSize: 32,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#4a4a4a",
    fontSize: 12,
    marginTop: 4,
  },
})
