import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Cpu } from 'lucide-react';

const FeedItem = ({ item }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-b border-white/5 last:border-b-0 pb-4 last:pb-0">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left flex items-start gap-3 group"
      >
        <span className="w-2 h-2 rounded-full bg-accent-cyan shrink-0 mt-2" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white group-hover:text-accent-cyan transition-colors leading-snug">
            {item.observation}
          </p>
        </div>
        <span className="text-gray-500 shrink-0 mt-0.5">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>

      {expanded && (
        <div className="ml-5 mt-2 flex flex-col gap-2">
          <p className="text-xs text-gray-400 leading-relaxed">{item.why_it_matters}</p>
          <div className="flex items-start gap-2 bg-accent-cyan/5 border border-accent-cyan/15 rounded-lg px-3 py-2">
            <Lightbulb size={12} className="text-accent-cyan shrink-0 mt-0.5" />
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
  return (
    <div className="bg-primary-mid border border-white/10 rounded-2xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-cyan/15 flex items-center justify-center">
            <Cpu size={16} className="text-accent-cyan" />
          </div>
          <span className="font-semibold text-white">AI Prediction Logic Feed</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">{items.length} NODES ACTIVE</span>
        </div>
      </div>

      {/* Feed items */}
      <div className="flex flex-col gap-4 p-5 overflow-y-auto">
        {items.map((item, i) => (
          <FeedItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PredictionLogicFeed;
