import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../supabase';

const TEAMS = [
  // Premier League
  { name: 'Arsenal', league: 'Premier League' },
  { name: 'Chelsea', league: 'Premier League' },
  { name: 'Liverpool', league: 'Premier League' },
  { name: 'Manchester City', league: 'Premier League' },
  { name: 'Manchester United', league: 'Premier League' },
  { name: 'Tottenham', league: 'Premier League' },
  // La Liga
  { name: 'Barcelona', league: 'La Liga' },
  { name: 'Real Madrid', league: 'La Liga' },
  { name: 'Atletico Madrid', league: 'La Liga' },
  { name: 'Sevilla', league: 'La Liga' },
  // Bundesliga
  { name: 'Bayern Munich', league: 'Bundesliga' },
  { name: 'Borussia Dortmund', league: 'Bundesliga' },
  { name: 'RB Leipzig', league: 'Bundesliga' },
  // Serie A
  { name: 'AC Milan', league: 'Serie A' },
  { name: 'Inter Milan', league: 'Serie A' },
  { name: 'Juventus', league: 'Serie A' },
  { name: 'Napoli', league: 'Serie A' },
  // Ligue 1
  { name: 'PSG', league: 'Ligue 1' },
  { name: 'Marseille', league: 'Ligue 1' },
  { name: 'Monaco', league: 'Ligue 1' },
];

export default function OnboardingScreen() {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleFinish() {
    if (!selectedTeam) {
      Alert.alert('Please select your favourite team!');
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        favourite_team: selectedTeam,
      });
    }
    router.replace('/(tabs)');
    setLoading(false);
  }

  const leagues = [...new Set(TEAMS.map(t => t.league))];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome to MatchDiary! ⚽</Text>
      <Text style={styles.subtitle}>Pick your favourite team to get started</Text>

      {leagues.map(league => (
        <View key={league}>
          <Text style={styles.leagueTitle}>{league}</Text>
          <View style={styles.teamsGrid}>
            {TEAMS.filter(t => t.league === league).map(team => (
              <TouchableOpacity
                key={team.name}
                style={[
                  styles.teamButton,
                  selectedTeam === team.name && styles.teamButtonSelected
                ]}
                onPress={() => setSelectedTeam(team.name)}>
                <Text style={[
                  styles.teamText,
                  selectedTeam === team.name && styles.teamTextSelected
                ]}>
                  {team.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleFinish} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : "Let's Go!"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
  },
  leagueTitle: {
    fontSize: 18,
    color: '#00b4d8',
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
  },
  teamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  teamButton: {
    backgroundColor: '#2a2a4a',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  teamButtonSelected: {
    backgroundColor: '#00b4d8',
    borderColor: '#00b4d8',
  },
  teamText: {
    color: '#888',
    fontSize: 14,
  },
  teamTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00b4d8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});