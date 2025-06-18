import React, { useState, useMemo } from 'react';
import PlayerCard from './PlayerCard';

interface Player {
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
}

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  selectedPlayerId?: string;
  positionFilter?: string;
  tierFilter?: number;
  searchTerm?: string;
}

/**
 * PlayerList component displays a filterable list of players
 * Used in the main draft board and player comparison views
 */
const PlayerList: React.FC<PlayerListProps> = ({
  players,
  onSelectPlayer,
  selectedPlayerId,
  positionFilter,
  tierFilter,
  searchTerm = '',
}) => {
  const [sortField, setSortField] = useState<'name' | 'projectedPoints' | 'valueTier'>('projectedPoints');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filtered and sorted players
  const filteredAndSortedPlayers = useMemo(() => {
    return players
      .filter(player => {
        // Apply position filter
        if (positionFilter && !player.position.includes(positionFilter)) {
          return false;
        }
        
        // Apply tier filter
        if (tierFilter !== undefined && player.valueTier !== tierFilter) {
          return false;
        }
        
        // Apply search term
        if (searchTerm && !player.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortField === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortField === 'projectedPoints') {
          return sortDirection === 'asc'
            ? a.projectedPoints - b.projectedPoints
            : b.projectedPoints - a.projectedPoints;
        } else {
          return sortDirection === 'asc'
            ? a.valueTier - b.valueTier
            : b.valueTier - a.valueTier;
        }
      });
  }, [players, positionFilter, tierFilter, searchTerm, sortField, sortDirection]);

  // Toggle sort field and direction
  const toggleSort = (field: 'name' | 'projectedPoints' | 'valueTier') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="player-list">
      <div className="flex justify-between mb-4 bg-gray-100 p-3 rounded-lg">
        <div className="text-sm text-gray-500">
          {filteredAndSortedPlayers.length} players
        </div>
        <div className="flex space-x-4">
          <button 
            className={`text-sm font-medium ${sortField === 'name' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => toggleSort('name')}
          >
            Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`text-sm font-medium ${sortField === 'projectedPoints' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => toggleSort('projectedPoints')}
          >
            Points {sortField === 'projectedPoints' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`text-sm font-medium ${sortField === 'valueTier' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => toggleSort('valueTier')}
          >
            Tier {sortField === 'valueTier' && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      
      <div className="player-cards space-y-2">
        {filteredAndSortedPlayers.map(player => (
          <PlayerCard
            key={player.id}
            id={player.id}
            name={player.name}
            team={player.team}
            position={player.position}
            projectedPoints={player.projectedPoints}
            valueTier={player.valueTier}
            lastSeasonStats={player.lastSeasonStats}
            isSelected={player.id === selectedPlayerId}
            onSelect={() => onSelectPlayer(player)}
          />
        ))}
        
        {filteredAndSortedPlayers.length === 0 && (
          <div className="text-center p-8 text-gray-500">
            No players match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;