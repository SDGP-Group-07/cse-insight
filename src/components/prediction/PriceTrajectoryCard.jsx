import { AreaChart, Area, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';


const generateChartData = (currentClose, predictedClose) => {

  const points = [];
  const base = currentClose * 0.975;
  for (let i = 0; i < 10; i++) {
    const t = i / 9;
    points.push({
      day: `D-${9 - i}`,
      price: parseFloat((base + (currentClose - base) * t).toFixed(2)),
    });
  }
  points.push({ day: 'Pred', price: predictedClose });
  return points;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-mid border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="text-gray-400">{label}</p>
        <p className="text-accent-cyan font-bold">{payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const PriceTrajectoryCard = ({ currentClose, predictedClose, predictedDate }) => {
  const isUp = predictedClose >= currentClose;
  const change = predictedClose - currentClose;
  const changePct = ((change / currentClose) * 100).toFixed(2);
  const data = generateChartData(currentClose, predictedClose);

  return (
    <div className="bg-primary-mid hover:bg-primary-light border border-white/10 hover:border-white/20 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 cursor-default">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Price Trajectory</p>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400 mb-1">Current Close</p>
          <p className="text-3xl font-bold text-white">{currentClose.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-accent-cyan mb-1">Predicted ({predictedDate})</p>
          <div className="flex items-center justify-end gap-1">
            {isUp
              ? <TrendingUp size={18} className="text-accent-cyan" />
              : <TrendingDown size={18} className="text-red-400" />
            }
            <p className={`text-3xl font-bold ${isUp ? 'text-accent-cyan' : 'text-red-400'}`}>
              {predictedClose.toFixed(2)}
            </p>
          </div>
          <p className={`text-xs mt-0.5 ${isUp ? 'text-accent-green' : 'text-red-400'}`}>
            {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{changePct}%)
          </p>
        </div>
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isUp ? '#00f5d4' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isUp ? '#00f5d4' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x="Pred" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isUp ? '#00f5d4' : '#ef4444'}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 4, fill: isUp ? '#00f5d4' : '#ef4444' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceTrajectoryCard;
