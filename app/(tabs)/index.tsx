import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MatchDiary</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" color="#00b4d8" size={24} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" color="#888" size={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search matches, teams, players..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Feed */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Empty state */}
        <View style={styles.emptyState}>
          <Ionicons name="football-outline" color="#2a2a4a" size={80} />
          <Text style={styles.emptyTitle}>Your feed is empty</Text>
          <Text style={styles.emptySubtitle}>
            Follow other fans to see their match logs here
          </Text>
          <TouchableOpacity style={styles.discoverButton}>
            <Text style={styles.discoverButtonText}>Discover Matches</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 24,
    color: '#00b4d8',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a4a',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 12,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  discoverButton: {
    backgroundColor: '#00b4d8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  discoverButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});