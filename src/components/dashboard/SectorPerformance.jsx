import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../common/Card';
import { PieChart } from 'lucide-react';
import { useMarketData } from '../../context/MarketDataContext';

const SectorPerformance = () => {
    const { marketData } = useMarketData();
    const { sectors } = marketData;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-primary-dark border border-white/10 p-3 rounded-lg shadow-xl">
                    <p className="font-bold text-white mb-1">{label}</p>
                    <p className={`text-sm ${payload[0].value >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                        {payload[0].value > 0 ? '+' : ''}{payload[0].value}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="h-full min-h-[300px]">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                    <PieChart className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Sector Performance</h3>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectors} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            width={100}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="change" radius={[0, 4, 4, 0]} barSize={20}>
                            {sectors.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#4ade80' : '#ef4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default SectorPerformance;
