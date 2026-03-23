import { useState, useEffect } from 'react';
import { TrendingUp, Clock, ChevronDown, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import PriceTrajectoryCard from './PriceTrajectoryCard';
import MarketSentimentCard from './MarketSentimentCard';
import ConfidenceGauge from './ConfidenceGauge';
import EngineSignalCard from './EngineSignalCard';
import PredictionLogicFeed from './PredictionLogicFeed';
import predictionService from '../../services/predictionService';

const SYMBOL_OPTIONS = [
  'JKH.N0000',
  'CTC.N0000',
  'COMB.N0000',
  'DIAL.N0000',
  'DIST.N0000',
  'LOLC.N0000',
  'MELS.N0000',
  'HNB.N0000',
  'CARG.N0000',
  'SAMP.N0000',
];

const normalizeSymbol = (value) => (value?.includes(':') ? value.split(':')[1] : value);

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
  const defaultSymbol = normalizeSymbol(symbolProp) ?? SYMBOL_OPTIONS[0];
  const [selectedSymbol, setSelectedSymbol] = useState(
    SYMBOL_OPTIONS.includes(defaultSymbol) ? defaultSymbol : SYMBOL_OPTIONS[0]
  );

  const fetchPrediction = async (sym) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictionService.getPrediction(sym);
      if (!result) throw new Error('No data returned from server.');
      setData(result);
    } catch (err) {
      console.error('Prediction fetch error:', err);
      setData(null);
      setError(err?.response?.data?.message ?? err?.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const nextSymbol = normalizeSymbol(symbolProp);
    if (nextSymbol && SYMBOL_OPTIONS.includes(nextSymbol)) {
      setSelectedSymbol(nextSymbol);
    }
  }, [symbolProp]);

  useEffect(() => {
    fetchPrediction(selectedSymbol);
  }, [selectedSymbol]);

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
            <h2 className="text-lg font-bold text-white">Market Intelligence Terminal</h2>
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

        {/* Symbol selector */}
        <div className="relative flex items-center bg-white/5 border border-white/15 rounded-lg hover:bg-white/10 transition-colors">
          <select
            value={selectedSymbol}
            onChange={(event) => setSelectedSymbol(event.target.value)}
            className="appearance-none bg-transparent text-sm font-semibold text-white px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
            aria-label="Select symbol"
          >
            {SYMBOL_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-primary-mid text-white">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="text-gray-400 pointer-events-none absolute right-3" />
        </div>
      </div>

      {/* API error banner */}
      {error && (
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 text-xs font-semibold">API unavailable</p>
            <p className="text-yellow-300/70 text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => fetchPrediction(selectedSymbol)}
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
