import React from 'react';
import Card from '../common/Card';

const MarketSentimentCard = ({ data }) => {
  const { probability_up, probability_down } = data;

  const isEquilibrium = Math.abs(probability_up - probability_down) < 5;

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Market Sentiment Split</p>

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-accent-green">
          BULLISH {probability_up.toFixed(2)}%
        </span>
        <span className="text-sm font-bold text-red-400">
          BEARISH {probability_down.toFixed(2)}%
        </span>
      </div>

      {/* Split bar */}
      <div className="w-full h-3 rounded-full overflow-hidden flex">
        <div
          className="h-full rounded-l-full transition-all duration-700"
          style={{
            width: `${probability_up}%`,
            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
          }}
        />
        <div
          className="h-full rounded-r-full transition-all duration-700"
          style={{
            width: `${probability_down}%`,
            background: 'linear-gradient(90deg, #f87171, #ef4444)',
          }}
        />
      </div>

      {/* Description */}
      <p className="text-xs text-gray-400 italic leading-relaxed">
        {isEquilibrium
          ? 'Market sentiment is currently in a state of high equilibrium. Significant volatility is expected within the next trading session.'
          : probability_up > probability_down
          ? 'Bullish momentum is slightly dominant. Traders are leaning towards upward movement in the near term.'
          : 'Bearish pressure is prevailing. Consider monitoring for potential downside risks.'}
      </p>

      {/* Sentiment meter bar labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-auto">
        <span>Bullish dominance</span>
        <span>Bearish dominance</span>
      </div>
    </Card>
  );
};

export default MarketSentimentCard;
