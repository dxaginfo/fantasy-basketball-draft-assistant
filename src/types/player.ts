/**
 * PlayerStats interface represents the statistical categories for a player
 */
export interface PlayerStats {
  ppg: number;      // Points per game
  rpg: number;      // Rebounds per game
  apg: number;      // Assists per game
  spg: number;      // Steals per game
  bpg: number;      // Blocks per game
  fg: number;       // Field goal percentage
  ft: number;       // Free throw percentage
  threesPg: number; // Three-pointers made per game
  toPg: number;     // Turnovers per game
  gp: number;       // Games played
  mpg: number;      // Minutes per game
}

/**
 * Player interface represents a basketball player with fantasy-relevant information
 */
export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  age: number;
  height: string;      // Format: "6'3"" 
  weight: number;      // In pounds
  experience: number;  // Years in league, 0 for rookie
  projectedPoints: number;
  valueTier: number;   // 1-6 value tier ranking
  adp: number;         // Average draft position
  lastSeasonStats?: PlayerStats;
  projectedStats?: PlayerStats;
  injuryStatus?: 'Healthy' | 'Day-to-Day' | 'Out' | 'IR';
  notes?: string;
}

/**
 * DraftPlayer extends Player with draft-specific information
 */
export interface DraftPlayer extends Player {
  isDrafted: boolean;
  draftPosition?: number;
  draftRound?: number;
  draftTeam?: string;
}

/**
 * PlayerComparisonItem interface for comparing multiple players
 */
export interface PlayerComparisonItem {
  player: Player;
  comparisonStats: {
    [key: string]: {
      value: number;
      percentile: number;
    };
  };
}

/**
 * ValueAboveReplacement represents a player's value compared to 
 * a replacement-level player at their position
 */
export interface ValueAboveReplacement {
  player: Player;
  var: number;          // Overall value above replacement
  categoryValues: {     // Value above replacement by category
    [key: string]: number;
  };
}

/**
 * PlayerTrend tracks changes in player projections over time
 */
export interface PlayerTrend {
  playerId: string;
  date: string;
  projectedPoints: number;
  notes?: string;
}

/**
 * SleeperCandidate represents a player identified as a potential sleeper pick
 */
export interface SleeperCandidate {
  player: Player;
  upside: number;        // Upside potential (percentage above projection)
  confidence: number;    // Confidence in sleeper status (1-100)
  reasoning: string[];   // Reasons why player is a sleeper
}