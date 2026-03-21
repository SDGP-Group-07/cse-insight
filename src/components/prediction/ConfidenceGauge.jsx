import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const getConfidenceLevel = (confidence) => {
  if (confidence < 45) return { label: 'LOW CONFIDENCE MODEL', color: '#ef4444', Icon: AlertTriangle, bg: 'bg-red-500/20 text-red-400' };
  if (confidence < 70) return { label: 'MODERATE CONFIDENCE', color: '#f59e0b', Icon: Info, bg: 'bg-yellow-500/20 text-yellow-400' };
  return { label: 'HIGH CONFIDENCE MODEL', color: '#4ade80', Icon: CheckCircle, bg: 'bg-green-500/20 text-green-400' };
};

const ConfidenceGauge = ({ confidence }) => {
  const { label, color, Icon, bg } = getConfidenceLevel(confidence);

  // SVG semicircle gauge
  // Center: (110, 110), radius: 80, viewBox: 220x140
  const cx = 110;
  const cy = 110;
  const r = 80;
  const strokeWidth = 14;

  // Track arc: full semicircle
  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  // Filled arc length proportional to confidence
  const totalLen = Math.PI * r; // semicircle arc length ≈ 251.3px
  const fillLen = (confidence / 100) * totalLen;
  const gapLen = totalLen - fillLen;

  // Needle angle: 0% = left (180°), 100% = right (0°)
  const angleDeg = 180 - (confidence / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const needleX = cx + (r - strokeWidth / 2) * Math.cos(angleRad);
  const needleY = cy - (r - strokeWidth / 2) * Math.sin(angleRad);

  return (
    <div className="bg-primary-mid border border-white/10 rounded-2xl p-5 flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Confidence Level</p>

      <div className="flex flex-col items-center">
        <svg viewBox="0 0 220 130" className="w-full max-w-[220px]">
          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d={trackPath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${fillLen} ${gapLen + 20}`}
          />
          {/* Needle dot */}
          <circle cx={needleX} cy={needleY} r={6} fill={color} />
          <circle cx={needleX} cy={needleY} r={3} fill="rgba(0,0,0,0.5)" />

          {/* Center text */}
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fill={color}
            fontSize="28"
            fontWeight="bold"
            fontFamily="Google Sans, sans-serif"
          >
            {confidence.toFixed(2)}%
          </text>
        </svg>

        {/* Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${bg} border border-current/20 -mt-2`}>
          <Icon size={12} />
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceGauge;
