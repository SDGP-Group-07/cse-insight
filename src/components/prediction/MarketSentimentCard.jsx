
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
  const description = getSentimentDescription(probabilityUp, probabilityDown);

  return (
    <div className="bg-primary-mid border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Market Sentiment Split</p>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-accent-cyan">
          BULLISH {probabilityUp.toFixed(2)}%
        </span>
        <span className="text-sm font-bold text-red-400">
          BEARISH {probabilityDown.toFixed(2)}%
        </span>
      </div>

      {/* Split progress bar */}
      <div className="h-3 rounded-full overflow-hidden flex">
        <div
          className="h-full rounded-l-full transition-all duration-700"
          style={{ width: `${probabilityUp}%`, background: 'linear-gradient(90deg, #00f5d4, #4ade80)' }}
        />
        <div
          className="h-full rounded-r-full transition-all duration-700"
          style={{ width: `${probabilityDown}%`, background: 'linear-gradient(90deg, #f87171, #ef4444)' }}
        />
      </div>

      {/* Tick marks */}
      <div className="flex justify-between text-xs text-gray-500 -mt-2">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>

      <p className="text-xs text-gray-400 italic leading-relaxed">{description}</p>
    </div>
  );
};

export default MarketSentimentCard;
