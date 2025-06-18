import React from 'react';

interface PlayerCardProps {
  id: string;
  name: string;
  team: string;
  position: string;
  projectedPoints: number;
  valueTier: number;
  lastSeasonStats?: {
    ppg: number;
    rpg: number;
    apg: number;
    spg: number;
    bpg: number;
    fg: number;
    ft: number;
    threesPg: number;
    toPg: number;
  };
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

/**
 * PlayerCard component displays a player's information in a card format.
 * Used in player lists, search results, and comparison views.
 */
const PlayerCard: React.FC<PlayerCardProps> = ({
  id,
  name,
  team,
  position,
  projectedPoints,
  valueTier,
  lastSeasonStats,
  isSelected = false,
  onSelect,
}) => {
  // Get tier color based on value tier
  const getTierColor = (tier: number): string => {
    switch (tier) {
      case 1: return 'bg-red-500';    // Elite
      case 2: return 'bg-orange-500'; // Star
      case 3: return 'bg-yellow-500'; // Quality
      case 4: return 'bg-green-500';  // Starter
      case 5: return 'bg-blue-500';   // Rotation
      case 6: return 'bg-gray-500';   // Bench
      default: return 'bg-gray-300';
    }
  };
  
  // Get tier label
  const getTierLabel = (tier: number): string => {
    switch (tier) {
      case 1: return 'Elite';
      case 2: return 'Star';
      case 3: return 'Quality';
      case 4: return 'Starter';
      case 5: return 'Rotation';
      case 6: return 'Bench';
      default: return 'Unranked';
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 mb-2 shadow transition-all 
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
      onClick={() => onSelect && onSelect(id)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">{team}</span>
            <span className="px-2 py-1 bg-gray-200 rounded-full">{position}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold">{projectedPoints.toFixed(1)}</div>
          <div className={`rounded-full text-white text-xs px-2 py-1 inline-block ${getTierColor(valueTier)}`}>
            {getTierLabel(valueTier)}
          </div>
        </div>
      </div>
      
      {lastSeasonStats && (
        <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-4 gap-2 text-xs">
          <div>
            <div className="font-semibold">PPG</div>
            <div>{lastSeasonStats.ppg.toFixed(1)}</div>
          </div>
          <div>
            <div className="font-semibold">RPG</div>
            <div>{lastSeasonStats.rpg.toFixed(1)}</div>
          </div>
          <div>
            <div className="font-semibold">APG</div>
            <div>{lastSeasonStats.apg.toFixed(1)}</div>
          </div>
          <div>
            <div className="font-semibold">3PM</div>
            <div>{lastSeasonStats.threesPg.toFixed(1)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;