import { useState, useEffect } from 'react';
import { TrendingUp, Clock, ChevronDown, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import PriceTrajectoryCard from './PriceTrajectoryCard';
import MarketSentimentCard from './MarketSentimentCard';
import ConfidenceGauge from './ConfidenceGauge';
import EngineSignalCard from './EngineSignalCard';
import PredictionLogicFeed from './PredictionLogicFeed';
import predictionService from '../../services/predictionService';


const MOCK_DATA = {
  symbol: 'CSELK:CARG.N0000',
  current_date: '2026-03-15',
  predicted_date: '2026-03-16',
  last_close: 700.00,
  predicted_close: 709.94,
  probability_up: 50.11,
  probability_down: 49.89,
  confidence: 39.13,
  ai_recommendation: 'HOLD',
  reason: 'Indecision and volatility suggest maintaining position',
  model_prediction_explanation: [
    {
      observation: 'Recent trading volume is lower than usual',
      why_it_matters: 'Decreased trading volume can indicate reduced market interest or participation, which may lead to increased volatility',
      tip: 'Monitor for potential breakouts or breakdowns once volume returns to normal levels',
    },
    {
      observation: 'Current volume compared to the 5-day average is lower than usual',
      why_it_matters: 'A volume drop relative to the recent trend may signal a lack of conviction among traders',
      tip: 'Be cautious about entering positions until volume stabilizes',
    },
    {
      observation: 'Price change over the last 10 days is lower than usual',
      why_it_matters: 'Diminished price movement suggests consolidation or a lack of momentum in the market',
      tip: 'Look for patterns that may indicate a potential breakout or continuation',
    },
    {
      observation: 'Price compared to the 50-day average is lower than usual',
      why_it_matters: 'Trading below the 50-day average can indicate a bearish trend or weakening bullish sentiment',
      tip: 'Consider setting alerts for a potential crossover back above the average',
    },
    {
      observation: 'Price compared to the 20-day average is lower than usual',
      why_it_matters: 'Being below the 20-day average suggests short-term weakness and may lead to further declines',
      tip: 'Watch for signs of support at key levels to gauge potential bounce points',
    },
  ],
};

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-16 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Skeleton className="h-52" />
      <Skeleton className="h-52" />
      <Skeleton className="h-52" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
  </div>
);
const PredictionDashboard = ({ symbol: symbolProp }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const symbol = symbolProp ?? MOCK_DATA.symbol;

  const fetchPrediction = async (sym) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictionService.getPrediction(sym);
      if (!result) throw new Error('No data returned from server.');
      setData(result);
    } catch (err) {
      console.error('Prediction fetch error:', err);
      // Fall back to mock data so the UI is never empty
      setData(MOCK_DATA);
      setError(err?.response?.data?.message ?? err?.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction(symbol);
  }, [symbol]);

  const lastSync = data
    ? `${data.current_date} ${new Date().toISOString().slice(11, 19)} UTC`
    : '—';

  return (
    <div className="flex flex-col gap-6">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-primary-mid border border-white/10 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/15 flex items-center justify-center">
            <TrendingUp size={20} className="text-accent-cyan" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Market Predictions</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              {loading
                ? <Loader2 size={11} className="text-gray-500 animate-spin" />
                : <Clock size={11} className="text-gray-500" />
              }
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Last Sync: {lastSync}
              </span>
            </div>
          </div>
        </div>

        {/* Symbol selector — wire to your stock search/dropdown */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/15 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors">
          <span className="text-sm font-semibold text-white">{data?.symbol ?? symbol}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {/* API error banner (shows alongside fallback data) */}
      {error && data && (
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 text-xs font-semibold">API unavailable — showing sample data</p>
            <p className="text-yellow-300/70 text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => fetchPrediction(symbol)}
            className="ml-auto shrink-0 flex items-center gap-1 text-xs text-yellow-400 hover:text-yellow-300"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Full loading state (first load, no data yet) */}
      {loading && !data && <LoadingSkeleton />}

      {/* Content */}
      {data && (
        <>
          {/* Top row: 3 metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <PriceTrajectoryCard
              currentClose={data.last_close}
              predictedClose={data.predicted_close}
              predictedDate={data.predicted_date}
            />
            <MarketSentimentCard
              probabilityUp={data.probability_up}
              probabilityDown={data.probability_down}
            />
            <ConfidenceGauge confidence={data.confidence} />
          </div>

          {/* Bottom row: signal + logic feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <EngineSignalCard
              signal={data.ai_recommendation}
              reason={data.reason}
              confidence={data.confidence}
              probabilityUp={data.probability_up}
              probabilityDown={data.probability_down}
            />
            <PredictionLogicFeed items={data.model_prediction_explanation} />
          </div>
        </>
      )}

      {/* No-data, no-error, no-loading edge case */}
      {!loading && !data && !error && (
        <div className="text-center py-20 text-gray-500 text-sm">
          No prediction data available for this symbol.
        </div>
      )}
    </div>
  );
};

export default PredictionDashboard;
