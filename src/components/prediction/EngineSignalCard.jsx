import { Zap } from 'lucide-react';

const getSignalStyle = (signal) => {
  switch (signal?.toUpperCase()) {
    case 'BUY':  return { color: 'text-accent-green', border: 'border-l-accent-green' };
    case 'SELL': return { color: 'text-red-400',      border: 'border-l-red-400' };
    default:     return { color: 'text-yellow-400',   border: 'border-l-yellow-400' };
  }
};

const getVolatility = (probUp, probDown, confidence) => {
  const spread = Math.abs(probUp - probDown);
  if (spread < 2 || confidence < 45) return { label: 'High',   color: 'text-yellow-400' };
  if (spread < 10 || confidence < 65) return { label: 'Medium', color: 'text-orange-400' };
  return { label: 'Low', color: 'text-accent-green' };
};

const getMomentum = (probUp) => {
  if (probUp > 60) return { label: 'Strong Bullish', color: 'text-accent-green' };
  if (probUp > 52) return { label: 'Mild Bullish',   color: 'text-accent-cyan' };
  if (probUp > 48) return { label: 'Neutral',        color: 'text-gray-400' };
  if (probUp > 40) return { label: 'Mild Bearish',   color: 'text-orange-400' };
  return { label: 'Strong Bearish', color: 'text-red-400' };
};

const EngineSignalCard = ({ signal, reason, confidence, probabilityUp, probabilityDown }) => {
  const { color, border } = getSignalStyle(signal);
  const volatility = getVolatility(probabilityUp, probabilityDown, confidence);
  const momentum = getMomentum(probabilityUp);

  return (
    <div className={`bg-primary-mid border border-white/10 rounded-2xl p-5 border-l-4 ${border} flex flex-col gap-4`}>
      {/* Engine signal badge */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/30 rounded px-2 py-0.5">
          <Zap size={11} className="text-yellow-400" />
          <span className="text-yellow-400 text-xs font-bold tracking-wider">ENGINE SIGNAL</span>
        </div>
      </div>

      {/* Signal */}
      <div>
        <p className={`text-5xl font-black tracking-wide ${color}`}>{signal?.toUpperCase()}</p>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">"{reason}"</p>
      </div>

      {/* Key metrics */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Key Metrics Summary</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Volatility Index</span>
            <span className={`text-sm font-semibold ${volatility.color}`}>{volatility.label}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Momentum</span>
            <span className={`text-sm font-semibold ${momentum.color}`}>{momentum.label}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Confidence Score</span>
            <span className={`text-sm font-semibold ${confidence < 45 ? 'text-red-400' : confidence < 70 ? 'text-yellow-400' : 'text-accent-green'}`}>
              {confidence.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Bull/Bear Spread</span>
            <span className="text-sm font-semibold text-gray-300">
              {Math.abs(probabilityUp - probabilityDown).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineSignalCard;
