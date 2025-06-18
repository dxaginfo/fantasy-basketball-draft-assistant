import React, { useState, useEffect } from 'react';
import { Player } from '../../types/player';
import PlayerList from '../PlayerList/PlayerList';
import PlayerSearchFilters from '../PlayerList/PlayerSearchFilters';
import mockDataService from '../../services/mockDataService';

interface DraftBoardProps {
  numberOfTeams?: number;
  draftPosition?: number;
  scoringFormat?: 'standard' | 'ppr' | 'categories';
}

/**
 * DraftBoard is the main component for the fantasy draft interface
 */
const DraftBoard: React.FC<DraftBoardProps> = ({
  numberOfTeams = 12,
  draftPosition = 1,
  scoringFormat = 'standard',
}) => {
  // State for available players
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for draft board
  const [draftedPlayers, setDraftedPlayers] = useState<Player[]>([]);
  const [currentPick, setCurrentPick] = useState(1);
  const [myTeam, setMyTeam] = useState<Player[]>([]);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [tierFilter, setTierFilter] = useState<number | undefined>(undefined);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | undefined>(undefined);
  
  // Load player data
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const data = await mockDataService.getPlayers();
        setPlayers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load player data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPlayers();
  }, []);
  
  // Handle player selection
  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayerId(player.id);
  };
  
  // Handle drafting a player
  const handleDraftPlayer = (player: Player) => {
    // Add to drafted players
    setDraftedPlayers(prev => [...prev, player]);
    
    // Add to my team if it's my pick
    if (currentPick % numberOfTeams === draftPosition || 
        (currentPick % numberOfTeams === 0 && draftPosition === numberOfTeams)) {
      setMyTeam(prev => [...prev, player]);
    }
    
    // Remove from available players
    setPlayers(prev => prev.filter(p => p.id !== player.id));
    
    // Increment pick
    setCurrentPick(prev => prev + 1);
    
    // Clear selection
    setSelectedPlayerId(undefined);
  };
  
  // Calculate current drafter
  const getCurrentDrafter = () => {
    const pickInRound = currentPick % numberOfTeams;
    return pickInRound === 0 ? numberOfTeams : pickInRound;
  };
  
  // Determine if it's the user's turn to draft
  const isMyTurn = getCurrentDrafter() === draftPosition;
  
  // Calculate current round
  const currentRound = Math.ceil(currentPick / numberOfTeams);
  
  // Calculate picks until my next turn
  const calculatePicksUntilMyTurn = () => {
    if (isMyTurn) return 0;
    
    const pickInRound = currentPick % numberOfTeams;
    const currentDrafter = pickInRound === 0 ? numberOfTeams : pickInRound;
    
    // If we're past my position in this round, calculate for next round
    if (currentDrafter > draftPosition) {
      return (numberOfTeams - currentDrafter) + draftPosition;
    }
    
    // If we're before my position in this round
    return draftPosition - currentDrafter;
  };
  
  return (
    <div className="draft-board p-4">
      <div className="bg-blue-700 text-white p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">Fantasy Basketball Draft Assistant</h1>
        <div className="flex justify-between items-center mt-2">
          <div>
            <span className="text-blue-200">Round {currentRound}</span>
            <span className="mx-2 text-blue-200">|</span>
            <span className="text-blue-200">Pick {currentPick}</span>
            <span className="mx-2 text-blue-200">|</span>
            <span className="text-blue-200">
              Drafter {getCurrentDrafter()} {isMyTurn && "(You)"}
            </span>
          </div>
          {!isMyTurn && (
            <div className="text-blue-200">
              {calculatePicksUntilMyTurn()} picks until your turn
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold">Available Players</h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading player data...
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">
                {error}
              </div>
            ) : (
              <div className="p-4">
                <PlayerSearchFilters
                  searchTerm={searchTerm}
                  positionFilter={positionFilter}
                  tierFilter={tierFilter}
                  onSearchChange={setSearchTerm}
                  onPositionFilterChange={setPositionFilter}
                  onTierFilterChange={setTierFilter}
                />
                
                <PlayerList
                  players={players}
                  onSelectPlayer={handleSelectPlayer}
                  selectedPlayerId={selectedPlayerId}
                  positionFilter={positionFilter}
                  tierFilter={tierFilter}
                  searchTerm={searchTerm}
                />
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold">My Team</h2>
            </div>
            
            <div className="p-4">
              {myTeam.length === 0 ? (
                <div className="text-center p-4 text-gray-500">
                  No players drafted yet
                </div>
              ) : (
                <div className="space-y-2">
                  {myTeam.map((player, index) => (
                    <div key={player.id} className="border p-3 rounded">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-gray-600">
                            {player.team} · {player.position}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Round {Math.floor(index / numberOfTeams) + 1}</div>
                          <div className="text-sm text-gray-600">Pick {index + 1}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {selectedPlayerId && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Selected Player</h2>
                <button
                  className={`px-4 py-2 rounded ${
                    isMyTurn ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (isMyTurn && selectedPlayerId) {
                      const player = players.find(p => p.id === selectedPlayerId);
                      if (player) {
                        handleDraftPlayer(player);
                      }
                    }
                  }}
                  disabled={!isMyTurn}
                >
                  {isMyTurn ? 'Draft Player' : 'Not Your Turn'}
                </button>
              </div>
              
              <div className="p-4">
                {selectedPlayerId && (
                  <div>
                    {players.filter(p => p.id === selectedPlayerId).map(player => (
                      <div key={player.id}>
                        <h3 className="text-xl font-bold">{player.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span className="mr-2">{player.team}</span>
                          <span className="px-2 py-1 bg-gray-200 rounded-full">{player.position}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Projected Points</div>
                            <div className="text-xl font-bold">{player.projectedPoints.toFixed(1)}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">ADP</div>
                            <div className="text-xl font-bold">{player.adp}</div>
                          </div>
                        </div>
                        
                        {player.lastSeasonStats && (
                          <div>
                            <h4 className="font-semibold mb-2">Last Season Stats</h4>
                            <div className="grid grid-cols-4 gap-2 text-sm">
                              <div>
                                <div className="font-medium">PPG</div>
                                <div>{player.lastSeasonStats.ppg.toFixed(1)}</div>
                              </div>
                              <div>
                                <div className="font-medium">RPG</div>
                                <div>{player.lastSeasonStats.rpg.toFixed(1)}</div>
                              </div>
                              <div>
                                <div className="font-medium">APG</div>
                                <div>{player.lastSeasonStats.apg.toFixed(1)}</div>
                              </div>
                              <div>
                                <div className="font-medium">SPG</div>
                                <div>{player.lastSeasonStats.spg.toFixed(1)}</div>
                              </div>
                              <div>
                                <div className="font-medium">BPG</div>
                                <div>{player.lastSeasonStats.bpg.toFixed(1)}</div>
                              </div>
                              <div>
                                <div className="font-medium">FG%</div>
                                <div>{(player.lastSeasonStats.fg * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="font-medium">FT%</div>
                                <div>{(player.lastSeasonStats.ft * 100).toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="font-medium">3PM</div>
                                <div>{player.lastSeasonStats.threesPg.toFixed(1)}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftBoard;