import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase';

export default function ProfileScreen() {
  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/auth/login' as any);
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" color="#888" size={24} />
          </TouchableOpacity>
        </View>

        {/* Avatar & Name */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" color="#00b4d8" size={40} />
          </View>
          <Text style={styles.username}>@username</Text>
          <Text style={styles.fullName}>Your Name</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Logged</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* Favourite Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Team</Text>
          <View style={styles.teamCard}>
            <Ionicons name="football" color="#00b4d8" size={24} />
            <Text style={styles.teamName}>Not set</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" color="#888" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="notifications-outline" color="#888" size={20} />
            <Text style={styles.settingsText}>Notifications</Text>
            <Ionicons name="chevron-forward" color="#888" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="lock-closed-outline" color="#888" size={20} />
            <Text style={styles.settingsText}>Privacy</Text>
            <Ionicons name="chevron-forward" color="#888" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="help-circle-outline" color="#888" size={20} />
            <Text style={styles.settingsText}>Help & Support</Text>
            <Ionicons name="chevron-forward" color="#888" size={20} />
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
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2a2a4a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  username: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  fullName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#00b4d8',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#00b4d8',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: '#00b4d8',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  teamCard: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 15,
    flex: 1,
  },
  settingsItem: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  settingsText: {
    color: '#ffffff',
    fontSize: 15,
    flex: 1,
  },
});