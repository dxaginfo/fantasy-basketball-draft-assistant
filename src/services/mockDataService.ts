import { Player, PlayerStats } from '../types/player';

/**
 * Mock data for player positions
 */
const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
const teams = [
  'ATL', 'BOS', 'BKN', 'CHA', 'CHI', 
  'CLE', 'DAL', 'DEN', 'DET', 'GSW', 
  'HOU', 'IND', 'LAC', 'LAL', 'MEM', 
  'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 
  'OKC', 'ORL', 'PHI', 'PHX', 'POR', 
  'SAC', 'SAS', 'TOR', 'UTA', 'WAS'
];

/**
 * Generate a random player stats object
 */
const generateRandomStats = (isTopTier: boolean): PlayerStats => {
  // Higher stats for top tier players
  const multiplier = isTopTier ? 1.5 : 1;
  
  return {
    ppg: +(Math.random() * 20 * multiplier).toFixed(1),
    rpg: +(Math.random() * 8 * multiplier).toFixed(1),
    apg: +(Math.random() * 6 * multiplier).toFixed(1),
    spg: +(Math.random() * 1.5 * multiplier).toFixed(1),
    bpg: +(Math.random() * 1.2 * multiplier).toFixed(1),
    fg: +(Math.random() * 0.1 + 0.4).toFixed(3),
    ft: +(Math.random() * 0.15 + 0.7).toFixed(3),
    threesPg: +(Math.random() * 2.5 * multiplier).toFixed(1),
    toPg: +(Math.random() * 2.5).toFixed(1),
    gp: Math.floor(Math.random() * 20 + 62),
    mpg: Math.floor(Math.random() * 15 + 20),
  };
};

/**
 * Generate a sample player name
 */
const generatePlayerName = (index: number): string => {
  const firstNames = [
    'James', 'Michael', 'Chris', 'Anthony', 'Kevin', 
    'Luka', 'Nikola', 'Joel', 'Giannis', 'Jayson',
    'LeBron', 'Stephen', 'Damian', 'Devin', 'Trae',
    'Zion', 'Ja', 'Bam', 'Donovan', 'Bradley',
    'Kawhi', 'Paul', 'Jrue', 'Draymond', 'Jaylen',
    'Russell', 'Kyrie', 'Karl', 'Jimmy', 'DeMar'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
    'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
    'Martin', 'Thompson', 'Young', 'Allen', 'Wright',
    'Scott', 'Green', 'Baker', 'Adams', 'Nelson',
    'Hill', 'Mitchell', 'Turner', 'Parker', 'Collins'
  ];
  
  // For top players, use specific names
  if (index < 30) {
    return `${firstNames[index]} ${lastNames[index % lastNames.length]}`;
  }
  
  // For other players, generate random combinations
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

/**
 * Generate a list of mock players for development
 */
export const generateMockPlayers = (count = 100): Player[] => {
  const players: Player[] = [];
  
  for (let i = 0; i < count; i++) {
    // Determine tier based on index
    let valueTier = 6;
    if (i < 5) valueTier = 1;
    else if (i < 15) valueTier = 2;
    else if (i < 30) valueTier = 3;
    else if (i < 50) valueTier = 4;
    else if (i < 75) valueTier = 5;
    
    const isTopTier = valueTier <= 3;
    const lastSeasonStats = generateRandomStats(isTopTier);
    
    // Generate projected points with some variation from last season
    const variation = Math.random() * 20 - 10; // -10 to +10
    const projectedPoints = 
      (lastSeasonStats.ppg + lastSeasonStats.rpg * 1.2 + 
       lastSeasonStats.apg * 1.5 + lastSeasonStats.spg * 2 + 
       lastSeasonStats.bpg * 2 + lastSeasonStats.threesPg * 1) + variation;
    
    players.push({
      id: `player-${i}`,
      name: generatePlayerName(i),
      team: teams[Math.floor(Math.random() * teams.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      age: Math.floor(Math.random() * 15) + 19, // 19-34
      height: `${Math.floor(Math.random() * 12) + 72}"`, // 6'0" to 7'0"
      weight: Math.floor(Math.random() * 80) + 180, // 180-260 lbs
      experience: Math.floor(Math.random() * 12), // 0-12 years
      projectedPoints: +projectedPoints.toFixed(1),
      valueTier,
      adp: i + 1 + Math.floor(Math.random() * 10 - 5), // Slight variation from rank
      lastSeasonStats,
      projectedStats: { 
        ...lastSeasonStats,
        ppg: +(lastSeasonStats.ppg * (1 + (Math.random() * 0.2 - 0.1))).toFixed(1), // -10% to +10%
        rpg: +(lastSeasonStats.rpg * (1 + (Math.random() * 0.2 - 0.1))).toFixed(1),
        apg: +(lastSeasonStats.apg * (1 + (Math.random() * 0.2 - 0.1))).toFixed(1),
      },
      injuryStatus: Math.random() > 0.9 
        ? (Math.random() > 0.5 ? 'Day-to-Day' : 'Out') 
        : 'Healthy',
    });
  }
  
  return players;
};

/**
 * Mock data service for development
 */
const mockDataService = {
  getPlayers: (): Promise<Player[]> => {
    return Promise.resolve(generateMockPlayers());
  },
  
  getPlayerById: (id: string): Promise<Player | undefined> => {
    const players = generateMockPlayers();
    return Promise.resolve(players.find(p => p.id === id));
  },
  
  getTopPlayersAtPosition: (position: string, count = 10): Promise<Player[]> => {
    const players = generateMockPlayers();
    return Promise.resolve(
      players
        .filter(p => p.position === position)
        .sort((a, b) => b.projectedPoints - a.projectedPoints)
        .slice(0, count)
    );
  }
};

export default mockDataService;