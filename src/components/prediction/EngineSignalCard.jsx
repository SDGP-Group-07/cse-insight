import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Zap } from 'lucide-react';
import Card from '../common/Card';

const signalConfig = {
  BUY: {
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.1)',
    border: 'rgba(74,222,128,0.4)',
    icon: TrendingUp,
  },
  SELL: {
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.4)',
    icon: TrendingDown,
  },
  HOLD: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.4)',
    icon: Minus,
  },
};

const EngineSignalCard = ({ data }) => {
  const { ai_recommendation, reason, confidence, probability_up, probability_down } = data;

  const signal = ai_recommendation?.toUpperCase() || 'HOLD';
  const cfg = signalConfig[signal] || signalConfig.HOLD;

  const metrics = [
    { label: 'Volatility Index', value: confidence < 45 ? 'High' : confidence < 65 ? 'Moderate' : 'Low', color: confidence < 45 ? '#ef4444' : confidence < 65 ? '#f59e0b' : '#4ade80' },
    { label: 'Bullish Probability', value: `${probability_up.toFixed(2)}%`, color: '#4ade80' },
    { label: 'Bearish Probability', value: `${probability_down.toFixed(2)}%`, color: '#ef4444' },
    { label: 'Confidence Score', value: `${confidence.toFixed(2)}%`, color: cfg.color },
  ];

  return (
    <Card
      className="flex flex-col gap-5 h-full"
      style={{ borderLeft: `3px solid ${cfg.color}` }}
    >
      {/* Badge */}
      <div
        className="self-start px-3 py-1 rounded text-xs font-bold tracking-widest uppercase"
        style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
      >
        Engine Signal
      </div>

      {/* Signal */}
      <div>
        <h2
          className="text-6xl font-black tracking-tight leading-none"
          style={{ color: cfg.color }}
        >
          {signal}
        </h2>
        <p className="text-sm text-gray-400 mt-2 italic">"{reason}"</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Metrics */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <Activity size={12} />
          Key Metrics Summary
        </p>
        {metrics.map((m) => (
          <div key={m.label} className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{m.label}</span>
            <span className="font-semibold" style={{ color: m.color }}>{m.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EngineSignalCard;
