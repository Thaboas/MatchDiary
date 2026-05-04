import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getMatchesByLeague, LEAGUES } from '../../services/football';

const LEAGUE_LIST = [
  { name: 'Premier League', country: 'England', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', id: LEAGUES.PREMIER_LEAGUE },
  { name: 'La Liga', country: 'Spain', emoji: '🇪🇸', id: LEAGUES.LA_LIGA },
  { name: 'Bundesliga', country: 'Germany', emoji: '🇩🇪', id: LEAGUES.BUNDESLIGA },
  { name: 'Serie A', country: 'Italy', emoji: '🇮🇹', id: LEAGUES.SERIE_A },
  { name: 'Ligue 1', country: 'France', emoji: '🇫🇷', id: LEAGUES.LIGUE_1 },
  { name: 'World Cup', country: 'World', emoji: '🌍', id: LEAGUES.WORLD_CUP },
];

export default function DiscoverScreen() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES.PREMIER_LEAGUE);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadMatches();
  }, [selectedLeague]);

  async function loadMatches() {
    setLoading(true);
    const data = await getMatchesByLeague(selectedLeague);
    setMatches(data);
    setLoading(false);
  }

  const filteredMatches = matches.filter(m =>
    m.teams.home.name.toLowerCase().includes(search.toLowerCase()) ||
    m.teams.away.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" color="#888" size={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search teams..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Leagues */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.leaguesRow}>
        {LEAGUE_LIST.map(league => (
          <TouchableOpacity
            key={league.id}
            style={[styles.leagueCard, selectedLeague === league.id && styles.leagueCardSelected]}
            onPress={() => setSelectedLeague(league.id)}>
            <Text style={styles.leagueEmoji}>{league.emoji}</Text>
            <Text style={[styles.leagueName, selectedLeague === league.id && styles.leagueNameSelected]}>
              {league.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Matches */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00b4d8" />
            <Text style={styles.loadingText}>Loading matches...</Text>
          </View>
        ) : filteredMatches.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No matches found</Text>
          </View>
        ) : (
          filteredMatches.map((match, index) => (
            <TouchableOpacity key={index} style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <Text style={styles.matchLeague}>{match.league.name}</Text>
                <Text style={styles.matchDate}>
                  {new Date(match.fixture.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.matchTeams}>
                <Text style={styles.teamName}>{match.teams.home.name}</Text>
                <View style={styles.scoreContainer}>
                  {match.fixture.status.short === 'FT' ? (
                    <Text style={styles.score}>
                      {match.goals.home} - {match.goals.away}
                    </Text>
                  ) : (
                    <Text style={styles.score}>vs</Text>
                  )}
                </View>
                <Text style={[styles.teamName, styles.awayTeam]}>{match.teams.away.name}</Text>
              </View>
              <View style={styles.matchFooter}>
                <Text style={styles.statusText}>{match.fixture.status.long}</Text>
                <View style={styles.logButton}>
                  <Ionicons name="add-circle-outline" color="#00b4d8" size={16} />
                  <Text style={styles.logText}>Log match</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
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
  leaguesRow: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  leagueCard: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  leagueCardSelected: {
    borderColor: '#00b4d8',
    backgroundColor: '#1a3a4a',
  },
  leagueEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  leagueName: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
  },
  leagueNameSelected: {
    color: '#00b4d8',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  matchCard: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchLeague: {
    color: '#00b4d8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchDate: {
    color: '#888',
    fontSize: 12,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  awayTeam: {
    textAlign: 'right',
  },
  scoreContainer: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  score: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: '#888',
    fontSize: 12,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logText: {
    color: '#00b4d8',
    fontSize: 13,
  },
});