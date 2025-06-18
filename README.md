# Fantasy Basketball Draft Assistant

An interactive web application that helps fantasy basketball managers make optimal draft decisions with data-driven player rankings, statistical analysis, and value-based drafting recommendations.

## Features

- **Player Rankings**: Customizable player rankings based on different scoring formats (Points, Categories, Roto)
- **Statistical Projections**: Season projections with historical performance data visualization
- **Value-Based Drafting**: Calculates player value above replacement to optimize draft picks
- **Draft Simulation**: Practice drafting against AI opponents with different strategies
- **Team Analysis**: Real-time analysis of your drafted team's strengths and weaknesses
- **Positional Scarcity**: Insights into positional value and scarcity throughout the draft
- **Player Comparison**: Side-by-side comparison of multiple players with radar charts
- **Sleeper Finder**: Algorithm to identify potential breakout candidates and sleepers

## Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts and Chart.js
- **API Integration**: Axios for data fetching
- **Testing**: Jest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dxaginfo/fantasy-basketball-draft-assistant.git

# Navigate to the project directory
cd fantasy-basketball-draft-assistant

# Install dependencies
npm install

# Start the development server
npm start
```

## Project Structure

```
src/
├── components/        # UI components
│   ├── DraftBoard/    # Draft tracking components
│   ├── PlayerList/    # Player listing and filtering
│   ├── TeamAnalysis/  # Team composition analysis
│   └── Charts/        # Data visualization components
├── hooks/             # Custom React hooks
├── services/          # API and data services
├── store/             # Redux state management
├── types/             # TypeScript interfaces
└── utils/             # Helper functions
```

## Usage Examples

### Customizing Rankings

Adjust scoring settings to see how player rankings change based on your league's scoring format.

### Draft Preparation

Use the value-based drafting calculator to prepare a customized cheat sheet for your draft.

### In-Draft Assistant

During your live draft, the app can provide real-time recommendations based on your team composition and remaining players.

## Roadmap

- [ ] Add support for keeper leagues and dynasty formats
- [ ] Implement injury impact analysis
- [ ] Add schedule strength analysis for playoff weeks
- [ ] Integrate with popular fantasy platforms (ESPN, Yahoo) for live draft syncing
- [ ] Add mobile app version with offline capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Player data and statistics sourced from public NBA APIs
- Fantasy basketball community for valuable insights on draft strategies