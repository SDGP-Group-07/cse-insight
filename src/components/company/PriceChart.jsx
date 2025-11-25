import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Card from '../common/Card';
import { Activity, BarChart2 } from 'lucide-react';

const CandleStick = (props) => {
    const { x, y, width, height, payload } = props;
    const { open, close, high, low } = payload;
    const isGrowing = close > open;
    const color = isGrowing ? '#10b981' : '#ef4444';
    const ratio = Math.abs(height / (high - low));

    // Calculate Y positions
    // y is the top position (High)
    // height is the total height (High - Low)
    const openY = y + (high - open) * ratio;
    const closeY = y + (high - close) * ratio;
    const highY = y;
    const lowY = y + height;

    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(Math.abs(openY - closeY), 2); // Min height 2px for visibility

    return (
        <g stroke={color} fill={color} strokeWidth="2">
            {/* Wick */}
            <path d={`M ${x + width / 2},${highY} L ${x + width / 2},${lowY}`} />
            {/* Body */}
            <rect
                x={x}
                y={bodyTop}
                width={width}
                height={bodyHeight}
                fill={color}
                stroke="none"
                rx={1}
            />
        </g>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-primary-mid border border-white/10 p-3 rounded-lg shadow-xl">
                <p className="text-gray-400 text-xs mb-2">{data.date}</p>
                {data.open !== undefined ? (
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between gap-4"><span className="text-gray-400">Open:</span> <span className="text-white font-mono">{data.open.toFixed(2)}</span></div>
                        <div className="flex justify-between gap-4"><span className="text-gray-400">High:</span> <span className="text-white font-mono">{data.high.toFixed(2)}</span></div>
                        <div className="flex justify-between gap-4"><span className="text-gray-400">Low:</span> <span className="text-white font-mono">{data.low.toFixed(2)}</span></div>
                        <div className="flex justify-between gap-4"><span className="text-gray-400">Close:</span> <span className={`font-mono ${data.close >= data.open ? 'text-accent-green' : 'text-red-500'}`}>{data.close.toFixed(2)}</span></div>
                    </div>
                ) : (
                    <div className="flex justify-between gap-4 text-sm"><span className="text-gray-400">Price:</span> <span className="text-white font-mono">{data.price.toFixed(2)}</span></div>
                )}
            </div>
        );
    }
    return null;
};

const PriceChart = () => {
    const [timeframe, setTimeframe] = useState('1M');
    const [chartType, setChartType] = useState('candle'); // 'candle' or 'line'

    // Mock data generator
    const generateData = (count) => {
        const data = [];
        let price = 190;
        for (let i = 0; i < count; i++) {
            const volatility = 5;
            const change = (Math.random() - 0.5) * volatility;
            const open = price;
            const close = price + change;
            const high = Math.max(open, close) + Math.random() * 2;
            const low = Math.min(open, close) - Math.random() * 2;

            price = close;

            data.push({
                date: `Day ${i + 1}`,
                price: close, // For line chart
                open,
                high,
                low,
                close,
                range: [low, high], // For positioning the candle
                volume: Math.floor(Math.random() * 1000000)
            });
        }
        return data;
    };

    const data = generateData(30);
    const timeframes = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'MAX'];

    return (
        <Card className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-white">Price Chart</h3>
                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setChartType('candle')}
                            className={`p-1.5 rounded transition-colors ${chartType === 'candle' ? 'bg-accent-cyan text-primary-dark' : 'text-gray-400 hover:text-white'}`}
                            title="Candle Chart"
                        >
                            <BarChart2 size={18} />
                        </button>
                        <button
                            onClick={() => setChartType('line')}
                            className={`p-1.5 rounded transition-colors ${chartType === 'line' ? 'bg-accent-cyan text-primary-dark' : 'text-gray-400 hover:text-white'}`}
                            title="Line Chart"
                        >
                            <Activity size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex bg-white/5 rounded-lg p-1">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${timeframe === tf
                                ? 'bg-accent-cyan text-primary-dark font-medium'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'candle' ? (
                        <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="date" hide />
                            <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            <Bar dataKey="range" shape={<CandleStick />} />
                        </BarChart>
                    ) : (
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00f5d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="date" hide />
                            <YAxis domain={['auto', 'auto']} orientation="right" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="price" stroke="#00f5d4" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div className="h-[60px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Bar dataKey="volume" fill="rgba(255,255,255,0.1)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default PriceChart;
