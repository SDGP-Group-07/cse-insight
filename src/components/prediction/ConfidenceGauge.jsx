import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Card from '../common/Card';

const SemiCircleGauge = ({ value }) => {
  const radius = 70;
  const cx = 100;
  const cy = 90;
  const circumference = Math.PI * radius; 

  const pct = Math.min(100, Math.max(0, value));
  const fillLength = (pct / 100) * circumference;
  const gapLength = circumference - fillLength;

  // Color based on confidence
  const color =
    pct < 45 ? '#ef4444'
    : pct < 65 ? '#f59e0b'
    : '#4ade80';

  return (
    <svg viewBox="0 0 200 100" className="w-full max-w-[220px] mx-auto" style={{ overflow: 'visible' }}>
      {/* Track arc */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* Filled arc using stroke-dasharray */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${fillLength} ${gapLength + 10}`}
        style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.4s ease' }}
      />
    </svg>
  );
};

const ConfidenceGauge = ({ data }) => {
  const { confidence } = data;

  const isLow = confidence < 45;
  const isMed = confidence >= 45 && confidence < 65;

  const labelColor = isLow ? '#ef4444' : isMed ? '#f59e0b' : '#4ade80';
  const labelText = isLow ? 'LOW CONFIDENCE MODEL' : isMed ? 'MODERATE CONFIDENCE' : 'HIGH CONFIDENCE';

  return (
    <Card className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase self-start">Confidence Level</p>

      <div className="relative w-full flex flex-col items-center mt-2">
        <SemiCircleGauge value={confidence} />

        {/* Center value overlay */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center" style={{ bottom: '4px' }}>
          <p className="text-4xl font-bold" style={{ color: labelColor, lineHeight: 1 }}>
            {confidence.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Badge */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mt-1"
        style={{
          background: `${labelColor}22`,
          border: `1px solid ${labelColor}55`,
          color: labelColor,
        }}
      >
        {isLow && <AlertTriangle size={12} />}
        {labelText}
      </div>
    </Card>
  );
};

export default ConfidenceGauge;
