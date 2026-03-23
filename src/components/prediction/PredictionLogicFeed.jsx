import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Cpu } from 'lucide-react';

const FeedItem = ({ item }) => {
  const [expanded, setExpanded] = useState(true);
  
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border-b border-white/5 last:border-b-0 pb-4 last:pb-0 rounded-xl transition-all duration-200"
      style={{ background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left flex items-start gap-3 group px-2 pt-2"
      >
        <span
          className="w-2 h-2 rounded-full shrink-0 mt-2 transition-all duration-300"
          style={{
            background: hovered ? '#00f5d4' : 'rgba(0,245,212,0.6)',
            boxShadow: hovered ? '0 0 8px rgba(0,245,212,0.8)' : 'none',
          }}
        />
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold leading-snug transition-colors duration-200"
            style={{ color: hovered ? '#00f5d4' : '#ffffff' }}
          >
            {item.observation}
          </p>
        </div>
        <span
          className="shrink-0 mt-0.5 transition-colors duration-200"
          style={{ color: hovered ? '#00f5d4' : '#6b7280' }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>

      {expanded && (
        <div className="ml-7 mt-2 flex flex-col gap-2 px-2 pb-2">
          <p className="text-xs text-gray-400 leading-relaxed">{item.why_it_matters}</p>
          <div
            className="flex items-start gap-2 rounded-lg px-3 py-2 transition-all duration-300"
            style={{
              background: hovered ? 'rgba(0,245,212,0.08)' : 'rgba(0,245,212,0.04)',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: hovered ? 'rgba(0,245,212,0.3)' : 'rgba(0,245,212,0.12)',
              boxShadow: hovered ? '0 0 10px rgba(0,245,212,0.08)' : 'none',
            }}
          >
            <Lightbulb
              size={12}
              className="shrink-0 mt-0.5 transition-all duration-300"
              style={{
                color: '#00f5d4',
                filter: hovered ? 'drop-shadow(0 0 4px rgba(0,245,212,0.8))' : 'none',
              }}
            />
            <p className="text-xs text-accent-cyan leading-relaxed">
              <span className="font-semibold">Pro-Tip:</span> {item.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const PredictionLogicFeed = ({ items }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/10 rounded-2xl flex flex-col h-[480px] transition-all duration-300"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, rgba(0,245,212,0.05), rgba(36,19,58,0.95))'
          : 'var(--color-primary-mid)',
        boxShadow: hovered ? '0 8px 32px rgba(0,245,212,0.1), 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b transition-colors duration-300"
        style={{ borderColor: hovered ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? 'rgba(0,245,212,0.2)' : 'rgba(0,245,212,0.1)',
              boxShadow: hovered ? '0 0 12px rgba(0,245,212,0.3)' : 'none',
            }}
          >
            <Cpu
              size={16}
              className="text-accent-cyan transition-all duration-300"
              style={{ filter: hovered ? 'drop-shadow(0 0 4px rgba(0,245,212,0.8))' : 'none' }}
            />
          </div>
          <span
            className="font-semibold transition-colors duration-300"
            style={{ color: hovered ? '#00f5d4' : '#ffffff' }}
          >
            AI Prediction Logic Feed
          </span>
        </div>

        <div
          className="flex items-center gap-1.5 border rounded px-2 py-1 transition-all duration-300"
          style={{
            background: hovered ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
            borderColor: hovered ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">{items.length} NODES ACTIVE</span>
        </div>
      </div>

      {/* Feed items */}
      <div className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto min-h-0">
        {items.map((item, i) => (
          <FeedItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PredictionLogicFeed;
