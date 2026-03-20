import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { BarChart2, Clock, ChevronDown } from 'lucide-react';
import PriceTrajectoryCard from './PriceTrajectoryCard';
import MarketSentimentCard from './MarketSentimentCard';
import ConfidenceGauge from './ConfidenceGauge';
import EngineSignalCard from './EngineSignalCard';
import PredictionLogicFeed from './PredictionLogicFeed';
import predictionTheme from './predictionTheme';

const MOCK_DATA = {
  symbol: 'CSELK:CARG.N0000',
  current_date: '2026-03-15',
  predicted_date: '2026-03-16',
  last_close: 700.0,
  predicted_close: 709.94,
  probability_up: 50.11,
  probability_down: 49.89,
  confidence: 39.13,
  ai_recommendation: 'HOLD',
  reason: 'Indecision and volatility suggest maintaining position',
  model_prediction_explanation: [
    {
      observation: 'Recent trading volume is lower than usual',
      why_it_matters:
        'Decreased trading volume can indicate reduced market interest or participation, which may lead to increased volatility',
      tip: 'Monitor for potential breakouts or breakdowns once volume returns to normal levels',
    },
    {
      observation: 'Current volume compared to the 5-day average is lower than usual',
      why_it_matters:
        'A volume drop relative to the recent trend may signal a lack of conviction among traders',
      tip: 'Be cautious about entering positions until volume stabilizes',
    },
    {
      observation: 'Price change over the last 10 days is lower than usual',
      why_it_matters:
        'Diminished price movement suggests consolidation or a lack of momentum in the market',
      tip: 'Look for patterns that may indicate a potential breakout or continuation',
    },
    {
      observation: 'Price compared to the 50-day average is lower than usual',
      why_it_matters:
        'Trading below the 50-day average can indicate a bearish trend or weakening bullish sentiment',
      tip: 'Consider setting alerts for a potential crossover back above the average',
    },
    {
      observation: 'Price compared to the 20-day average is lower than usual',
      why_it_matters:
        'Being below the 20-day average suggests short-term weakness and may lead to further declines',
      tip: 'Watch for signs of support at key levels to gauge potential bounce points',
    },
  ],
};

const PredictionDashboard = ({ data = MOCK_DATA }) => {
  const syncTime = `${data.current_date} 16:45:00 UTC`;

  return (
    <div className="flex flex-col gap-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/15 flex items-center justify-center">
            <BarChart2 size={20} className="text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Stock Market Predictions</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
              <Clock size={11} />
              <span>Last Sync: {syncTime}</span>
            </div>
          </div>
        </div>

        {/* Symbol badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-mid/80 border border-white/10 text-sm font-semibold text-white">
          {data.symbol}
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Top row — 3 MUI cards inside ThemeProvider */}
      <ThemeProvider theme={predictionTheme}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <PriceTrajectoryCard data={data} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <MarketSentimentCard data={data} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ConfidenceGauge data={data} />
          </Grid>
        </Grid>
      </ThemeProvider>

      {/* Bottom row — 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <EngineSignalCard data={data} />
        </div>
        <div className="lg:col-span-3">
          <PredictionLogicFeed data={data} />
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboard;
