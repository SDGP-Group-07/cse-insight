import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../common/Card';

const PriceChart = () => {
    const [timeframe, setTimeframe] = useState('1M');

    // Mock data generator
    const generateData = (count) => {
        const data = [];
        let price = 190;
        for (let i = 0; i < count; i++) {
            price = price + (Math.random() - 0.5) * 5;
            data.push({
                date: `Day ${i + 1}`,
                price: price,
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
                <h3 className="text-lg font-bold text-white">Price Chart</h3>
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
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a2e', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                            itemStyle={{ color: '#00f5d4' }}
                        />
                        <Area type="monotone" dataKey="price" stroke="#00f5d4" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                    </AreaChart>
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
