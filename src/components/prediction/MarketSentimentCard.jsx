import { useState } from 'react';

const getSentimentDescription = (probUp, probDown) => {
  const spread = Math.abs(probUp - probDown);
  
  if (spread < 2) {
    return 'Market sentiment is currently in a state of high equilibrium. Significant volatility is expected within the next trading session.';
  } else if (spread < 10) {
    return 'Market sentiment shows a slight lean. Monitor key support and resistance levels closely before entering positions.';
  } else if (probUp > probDown) {
    return 'Bullish sentiment is dominant. Momentum may continue if volume confirms the move.';
  } else {
    return 'Bearish sentiment is dominant. Watch for reversal signals before considering long positions.';
  }
};

const MarketSentimentCard = ({ probabilityUp, probabilityDown }) => {
  const [hovered, setHovered] = useState(false);
  const description = getSentimentDescription(probabilityUp, probabilityDown);
  const isBullish = probabilityUp >= probabilityDown;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/10 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 cursor-default"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(0,245,212,0.06), rgba(36,19,58,0.95), rgba(239,68,68,0.06))'
          : 'var(--color-primary-mid)',
        boxShadow: hovered
          ? isBullish
            ? '0 8px 32px rgba(0,245,212,0.12), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 8px 32px rgba(239,68,68,0.12), 0 0 0 1px rgba(255,255,255,0.05)'
          : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Market Sentiment Split</p>

      <div className="flex justify-between items-center">
        <span
          className="text-sm font-bold text-accent-cyan transition-all duration-300"
          style={{ textShadow: hovered ? '0 0 12px rgba(0,245,212,0.7)' : 'none' }}
        >
          BULLISH {probabilityUp.toFixed(2)}%
        </span>
        <span
          className="text-sm font-bold text-red-400 transition-all duration-300"
          style={{ textShadow: hovered ? '0 0 12px rgba(239,68,68,0.7)' : 'none' }}
        >
          BEARISH {probabilityDown.toFixed(2)}%
        </span>
      </div>

      {/* Split progress bar */}
      <div
        className="h-3 rounded-full overflow-hidden flex transition-all duration-300"
        style={{ boxShadow: hovered ? '0 0 10px rgba(0,245,212,0.2)' : 'none' }}
      >
        <div
          className="h-full rounded-l-full transition-all duration-700"
          style={{
            width: `${probabilityUp}%`,
            background: 'linear-gradient(90deg, #00f5d4, #4ade80)',
            filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
          }}
        />
        <div
          className="h-full rounded-r-full transition-all duration-700"
          style={{
            width: `${probabilityDown}%`,
            background: 'linear-gradient(90deg, #f87171, #ef4444)',
            filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
          }}
        />
      </div>

      {/* Tick marks */}
      <div className="flex justify-between text-xs text-gray-500 -mt-2">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      <p
        className="text-xs italic leading-relaxed transition-colors duration-300"
        style={{ color: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(156,163,175,1)' }}
      >
        {description}
      </p>
    </div>
  );
};

export default MarketSentimentCard;
