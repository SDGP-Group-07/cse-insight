import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Card from '../common/Card';

const Sparkline = ({ isUp }) => {
  // Generate a smooth SVG path that trends upward (or downward)
  const points = isUp
    ? [[0, 60], [30, 58], [60, 52], [90, 48], [120, 44], [150, 38], [180, 32], [210, 26], [240, 20]]
    : [[0, 20], [30, 26], [60, 32], [90, 38], [120, 44], [150, 50], [180, 54], [210, 58], [240, 62]];

  const toPath = (pts) => {
    const d = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ');
    return d;
  };

  const linePath = toPath(points);

  const fillPath =
    `${linePath} L ${points[points.length - 1][0]} 80 L 0 80 Z`;

  const color = isUp ? '#4ade80' : '#ef4444';
  const fillColor = isUp ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)';

  return (
    <svg viewBox="0 0 240 80" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sparkGrad-${isUp ? 'up' : 'down'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#sparkGrad-${isUp ? 'up' : 'down'})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const PriceTrajectoryCard = ({ data }) => {
  const { last_close, predicted_close, predicted_date } = data;
  const isUp = predicted_close >= last_close;
  const change = predicted_close - last_close;
  const changePct = ((change / last_close) * 100).toFixed(2);

  return (
    <Card className="flex flex-col gap-4">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Price Trajectory</p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-400 mb-1">Current Close</p>
          <p className="text-3xl font-bold text-white">{last_close.toFixed(2)}</p>
        </div>

        <div className="flex items-center gap-1 mb-1">
          {isUp ? (
            <ArrowUp size={18} className="text-accent-green" />
          ) : (
            <ArrowDown size={18} className="text-red-400" />
          )}
        </div>

        <div className="text-right">
          <p className="text-xs mb-1" style={{ color: isUp ? '#4ade80' : '#ef4444' }}>
            Predicted ({predicted_date})
          </p>
          <p className="text-3xl font-bold" style={{ color: isUp ? '#4ade80' : '#ef4444' }}>
            {predicted_close.toFixed(2)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: isUp ? '#4ade80' : '#ef4444' }}>
            {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{changePct}%)
          </p>
        </div>
      </div>

      <div className="mt-1">
        <Sparkline isUp={isUp} />
      </div>
    </Card>
  );
};

export default PriceTrajectoryCard;
