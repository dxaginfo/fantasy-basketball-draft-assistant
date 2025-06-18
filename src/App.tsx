import React, { useState } from 'react';
import DraftBoard from './components/DraftBoard/DraftBoard';

/**
 * App is the root component of the Fantasy Basketball Draft Assistant
 */
const App: React.FC = () => {
  // Configuration state
  const [isDraftStarted, setIsDraftStarted] = useState(false);
  const [numberOfTeams, setNumberOfTeams] = useState(12);
  const [draftPosition, setDraftPosition] = useState(1);
  const [scoringFormat, setScoringFormat] = useState<'standard' | 'ppr' | 'categories'>('standard');
  
  // Settings form handler
  const handleStartDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDraftStarted(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Fantasy Basketball Draft Assistant</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {!isDraftStarted ? (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Draft Settings</h2>
            
            <form onSubmit={handleStartDraft}>
              <div className="mb-4">
                <label htmlFor="teams" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Teams
                </label>
                <select
                  id="teams"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={numberOfTeams}
                  onChange={(e) => setNumberOfTeams(Number(e.target.value))}
                >
                  {[8, 10, 12, 14, 16].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Draft Position
                </label>
                <select
                  id="position"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={draftPosition}
                  onChange={(e) => setDraftPosition(Number(e.target.value))}
                >
                  {Array.from({ length: numberOfTeams }, (_, i) => i + 1).map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scoring Format
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scoringFormat"
                      value="standard"
                      checked={scoringFormat === 'standard'}
                      onChange={() => setScoringFormat('standard')}
                      className="mr-2"
                    />
                    <span>Standard</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scoringFormat"
                      value="ppr"
                      checked={scoringFormat === 'ppr'}
                      onChange={() => setScoringFormat('ppr')}
                      className="mr-2"
                    />
                    <span>Points</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="scoringFormat"
                      value="categories"
                      checked={scoringFormat === 'categories'}
                      onChange={() => setScoringFormat('categories')}
                      className="mr-2"
                    />
                    <span>Categories</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
              >
                Start Draft
              </button>
            </form>
          </div>
        ) : (
          <DraftBoard
            numberOfTeams={numberOfTeams}
            draftPosition={draftPosition}
            scoringFormat={scoringFormat}
          />
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Fantasy Basketball Draft Assistant &copy; 2025</p>
          <p className="text-sm text-gray-400 mt-2">
            Player data is simulated for demonstration purposes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;