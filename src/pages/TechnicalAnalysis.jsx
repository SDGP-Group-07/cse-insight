import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Line } from 'recharts';
import { Settings, Maximize2, Share2, Save, Layers } from 'lucide-react';

const TechnicalAnalysis = () => {
    const [chartType, setChartType] = useState('area');
    const [indicators, setIndicators] = useState({ sma: false, ema: false, vol: true });

    // Mock Data Generation
    const generateData = () => {
        const data = [];
        let price = 100;
        for (let i = 0; i < 50; i++) {
            price = price + (Math.random() - 0.5) * 5;
            data.push({
                date: i,
                price: price,
                sma: price + (Math.random() - 0.5) * 2,
                ema: price + (Math.random() - 0.5) * 3,
                volume: Math.floor(Math.random() * 5000) + 1000
            });
        }
        return data;
    };

    const data = generateData();

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Technical Analysis</h1>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Save Chart">
                            <Save size={20} />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Share">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Fullscreen">
                            <Maximize2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Sidebar Controls */}
                    <Card className="lg:col-span-1 h-full overflow-y-auto">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Settings size={18} /> Chart Settings
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Chart Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setChartType('area')}
                                        className={`px-3 py-2 rounded text-sm ${chartType === 'area' ? 'bg-accent-cyan text-primary-dark font-bold' : 'bg-white/5 text-gray-300'}`}
                                    >
                                        Area
                                    </button>
                                    <button
                                        onClick={() => setChartType('line')}
                                        className={`px-3 py-2 rounded text-sm ${chartType === 'line' ? 'bg-accent-cyan text-primary-dark font-bold' : 'bg-white/5 text-gray-300'}`}
                                    >
                                        Line
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Indicators</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.sma}
                                            onChange={() => setIndicators({ ...indicators, sma: !indicators.sma })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">SMA (20)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.ema}
                                            onChange={() => setIndicators({ ...indicators, ema: !indicators.ema })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">EMA (50)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.vol}
                                            onChange={() => setIndicators({ ...indicators, vol: !indicators.vol })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">Volume</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Drawing Tools</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Trend Line</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Fibonacci</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Rectangle</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Text</button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Main Chart Area */}
                    <Card className="lg:col-span-3 h-full flex flex-col">
                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

                                    {chartType === 'area' && (
                                        <Area type="monotone" dataKey="price" stroke="#00f5d4" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                                    )}
                                    {chartType === 'line' && (
                                        <Line type="monotone" dataKey="price" stroke="#00f5d4" strokeWidth={2} dot={false} />
                                    )}

                                    {indicators.sma && <Line type="monotone" dataKey="sma" stroke="#f59e0b" strokeWidth={1} dot={false} />}
                                    {indicators.ema && <Line type="monotone" dataKey="ema" stroke="#ec4899" strokeWidth={1} dot={false} />}

                                    {indicators.vol && (
                                        <Bar dataKey="volume" fill="rgba(255,255,255,0.1)" yAxisId={0} barSize={20} />
                                    )}
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default TechnicalAnalysis;
