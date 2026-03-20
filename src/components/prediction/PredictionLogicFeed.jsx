import React, { useState } from 'react';
import { Brain, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const FeedItem = ({ item, index }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex gap-3 py-4 border-b border-white/5 last:border-0">
      <div className="mt-1.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="flex items-start justify-between gap-2 cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          <p className="text-sm font-semibold text-white leading-snug">{item.observation}</p>
          <button className="text-gray-500 shrink-0 mt-0.5 hover:text-gray-300 transition-colors">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {expanded && (
          <div className="mt-2 space-y-2">
            <p className="text-xs text-gray-400 leading-relaxed">{item.why_it_matters}</p>

            <div className="flex items-start gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Lightbulb size={12} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-300">
                <span className="font-semibold">Pro-Tip:</span> {item.tip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PredictionLogicFeed = ({ data }) => {
  const { model_prediction_explanation } = data;
  const nodeCount = model_prediction_explanation?.length || 0;

  return (
    <Card className="flex flex-col gap-0 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Brain size={16} className="text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-white">AI Prediction Logic Feed</h3>
        </div>

        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          {nodeCount} Nodes Active
        </span>
      </div>

      {/* Feed items */}
      <div className="flex-1 overflow-y-auto max-h-[400px] pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {model_prediction_explanation?.map((item, i) => (
          <FeedItem key={i} item={item} index={i} />
        ))}
      </div>
    </Card>
  );
};

export default PredictionLogicFeed;
