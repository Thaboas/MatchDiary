const API_KEY = process.env.EXPO_PUBLIC_FOOTBALL_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

const headers = {
  'x-apisports-key': API_KEY!,
};

export const LEAGUES = {
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  BUNDESLIGA: 78,
  SERIE_A: 135,
  LIGUE_1: 61,
  WORLD_CUP: 1,
};

const SEASON = 2024;

export async function getRecentMatches() {
  try {
    const response = await fetch(
      `${BASE_URL}/fixtures?league=${LEAGUES.PREMIER_LEAGUE}&season=${SEASON}&status=FT`,
      { headers }
    );
    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export async function getMatchesByLeague(leagueId: number) {
  try {
    const season = leagueId === LEAGUES.WORLD_CUP ? 2022 : SEASON;
    const response = await fetch(
      `${BASE_URL}/fixtures?league=${leagueId}&season=${season}&status=FT`,
      { headers }
    );
    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export async function searchTeams(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/teams?search=${query}`,
      { headers }
    );
    const data = await response.json();
    return data.response || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}