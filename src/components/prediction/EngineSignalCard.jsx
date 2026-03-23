import { useState } from 'react';
import { Zap, TrendingUp, TrendingDown, Minus, Activity, BarChart2 } from 'lucide-react';

const getSignalStyle = (signal) => {
  switch (signal?.toUpperCase()) {
    case 'BUY':  return { color: 'text-accent-green', border: 'border-l-accent-green', glow: 'rgba(74,222,128,0.18)',  bg: 'rgba(74,222,128,0.06)'  };
    case 'SELL': return { color: 'text-red-400',      border: 'border-l-red-400',       glow: 'rgba(248,113,113,0.18)', bg: 'rgba(248,113,113,0.06)' };
    default:     return { color: 'text-yellow-400',   border: 'border-l-yellow-400',    glow: 'rgba(250,204,21,0.18)', bg: 'rgba(250,204,21,0.06)'  };
  }
};

const getVolatility = (probUp, probDown, confidence) => {
  const spread = Math.abs(probUp - probDown);
  if (spread < 2 || confidence < 45) return { label: 'High',   color: 'text-yellow-400', dot: 'bg-yellow-400' };
  if (spread < 10 || confidence < 65) return { label: 'Medium', color: 'text-orange-400', dot: 'bg-orange-400' };
  return { label: 'Low', color: 'text-accent-green', dot: 'bg-accent-green' };
};

const getMomentum = (probUp) => {
  if (probUp > 60) return { label: 'Strong Bullish', color: 'text-accent-green', Icon: TrendingUp };
  if (probUp > 52) return { label: 'Mild Bullish',   color: 'text-accent-cyan',  Icon: TrendingUp };
  if (probUp > 48) return { label: 'Neutral',        color: 'text-gray-400',     Icon: Minus };
  if (probUp > 40) return { label: 'Mild Bearish',   color: 'text-orange-400',   Icon: TrendingDown };
  return             { label: 'Strong Bearish', color: 'text-red-400',      Icon: TrendingDown };
};


const MetricRow = ({ label, value, valueClass, icon: Icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex justify-between items-center px-3 py-2 rounded-xl transition-all duration-200 cursor-default"
      style={{ background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent' }}
    >
      <span className="text-sm text-gray-400 flex items-center gap-2">
        {Icon && <Icon size={13} className={`transition-opacity duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`} />}
        {label}
      </span>
      <span className={`text-sm font-semibold ${valueClass} transition-all duration-200 ${hovered ? 'scale-105' : 'scale-100'} inline-block`}>
        {value}
      </span>
    </div>
  );
};


const EngineSignalCard = ({ signal, reason, confidence, probabilityUp, probabilityDown }) => {
  const [hovered, setHovered] = useState(false);
  const { color, border, glow, bg } = getSignalStyle(signal);
  const volatility = getVolatility(probabilityUp, probabilityDown, confidence);
  const momentum = getMomentum(probabilityUp);
  const confidenceColor = confidence < 45 ? 'text-red-400' : confidence < 70 ? 'text-yellow-400' : 'text-accent-green';
  const spread = Math.abs(probabilityUp - probabilityDown).toFixed(2);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border border-white/10 rounded-2xl p-5 border-l-4 ${border} flex flex-col gap-5 min-h-[480px] transition-all duration-300 cursor-default`}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${bg}, rgba(36,19,58,0.95))`
          : 'var(--color-primary-mid)',
        boxShadow: hovered ? `0 8px 32px ${glow}, 0 0 0 1px rgba(255,255,255,0.05)` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Badge */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 border rounded px-2 py-0.5 transition-all duration-300"
          style={{
            background: hovered ? 'rgba(234,179,8,0.25)' : 'rgba(234,179,8,0.15)',
            borderColor: hovered ? 'rgba(234,179,8,0.5)' : 'rgba(234,179,8,0.3)',
          }}
        >
          <Zap
            size={11}
            className="text-yellow-400 transition-all duration-300"
            style={{ filter: hovered ? 'drop-shadow(0 0 4px rgba(234,179,8,0.8))' : 'none' }}
          />
          <span className="text-yellow-400 text-xs font-bold tracking-wider">ENGINE SIGNAL</span>
        </div>
      </div>

      {/* Signal text */}
      <div>
        <p
          className={`text-6xl font-black tracking-wide ${color} transition-all duration-300`}
          style={{ textShadow: hovered ? `0 0 30px currentColor` : 'none' }}
        >
          {signal?.toUpperCase()}
        </p>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed italic">"{reason}"</p>
      </div>

      {/* Divider */}
      <div
        className="h-px transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(90deg, transparent, ${glow.replace('0.18', '0.5')}, transparent)` : 'rgba(255,255,255,0.06)' }}
      />

      {/* Key metrics */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-2 px-3">
          <BarChart2 size={12} className="text-gray-500" />
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Key Metrics Summary</p>
        </div>

        <MetricRow
          label="Volatility Index"
          value={volatility.label}
          valueClass={volatility.color}
          icon={Activity}
        />
        <MetricRow
          label="Momentum"
          value={momentum.label}
          valueClass={momentum.color}
          icon={momentum.Icon}
        />
        <MetricRow
          label="Confidence Score"
          value={`${confidence.toFixed(2)}%`}
          valueClass={confidenceColor}
          icon={BarChart2}
        />
        <MetricRow
          label="Bull/Bear Spread"
          value={`${spread}%`}
          valueClass="text-gray-300"
          icon={Minus}
        />
      </div>
    </div>
  );
};

export default EngineSignalCard;
