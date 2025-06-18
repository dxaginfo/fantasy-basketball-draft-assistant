import React from 'react';

interface PlayerSearchFiltersProps {
  searchTerm: string;
  positionFilter: string;
  tierFilter: number | undefined;
  onSearchChange: (term: string) => void;
  onPositionFilterChange: (position: string) => void;
  onTierFilterChange: (tier: number | undefined) => void;
}

/**
 * PlayerSearchFilters component provides search and filtering controls
 * for the player list.
 */
const PlayerSearchFilters: React.FC<PlayerSearchFiltersProps> = ({
  searchTerm,
  positionFilter,
  tierFilter,
  onSearchChange,
  onPositionFilterChange,
  onTierFilterChange,
}) => {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  const tiers = [1, 2, 3, 4, 5, 6];
  
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>
      
      {/* Search input */}
      <div className="mb-4">
        <label htmlFor="player-search" className="block text-sm font-medium text-gray-700 mb-1">
          Search Players
        </label>
        <input
          id="player-search"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter player name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Position filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              positionFilter === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => onPositionFilterChange('')}
          >
            All
          </button>
          
          {positions.map(position => (
            <button
              key={position}
              className={`px-3 py-1 text-sm rounded-full ${
                positionFilter === position ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onPositionFilterChange(position)}
            >
              {position}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tier filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Value Tier
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              tierFilter === undefined ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => onTierFilterChange(undefined)}
          >
            All
          </button>
          
          {tiers.map(tier => (
            <button
              key={tier}
              className={`px-3 py-1 text-sm rounded-full ${
                tierFilter === tier ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onTierFilterChange(tier)}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerSearchFilters;