import React from 'react';
import { PieChart, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketDataProvider, useMarketData } from '../context/MarketDataContext';
import { Loader } from 'lucide-react';

const SectorsPageContent = () => {
    const { marketData, loading } = useMarketData();

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-dark flex items-center justify-center">
                <Loader className="w-10 h-10 text-accent-cyan animate-spin" />
            </div>
        );
    }

    // Mock sector data if not available in marketData
    const sectors = [
        { name: 'Banking Finance & Insurance', change: 2.5, volume: '12.5M', marketCap: '450B', companies: 42 },
        { name: 'Beverage Food & Tobacco', change: -0.8, volume: '5.2M', marketCap: '320B', companies: 28 },
        { name: 'Diversified Holdings', change: 1.2, volume: '8.9M', marketCap: '580B', companies: 15 },
        { name: 'Manufacturing', change: 0.5, volume: '3.1M', marketCap: '150B', companies: 35 },
        { name: 'Telecommunications', change: -1.5, volume: '2.8M', marketCap: '210B', companies: 4 },
        { name: 'Hotels and Travels', change: 3.2, volume: '4.5M', marketCap: '95B', companies: 30 },
    ];

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Market Sectors</h1>
                    <p className="text-gray-400">Performance overview by industry sector</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectors.map((sector, index) => (
                        <div key={index} className="bg-primary-mid/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-accent-cyan/10 transition-colors">
                                    <PieChart className="text-accent-cyan" size={24} />
                                </div>
                                <span className={`flex items-center gap-1 text-sm font-bold ${sector.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                    {sector.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    {sector.change > 0 ? '+' : ''}{sector.change}%
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">{sector.name}</h3>

                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Market Cap</span>
                                    <span className="font-medium">LKR {sector.marketCap}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Volume</span>
                                    <span className="font-medium">{sector.volume}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Companies</span>
                                    <span className="font-medium">{sector.companies}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SectorsPage = () => {
    return (
        <MarketDataProvider>
            <SectorsPageContent />
        </MarketDataProvider>
    );
};

export default SectorsPage;
