import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import { useMarketData } from '../../context/MarketDataContext';

const MarketOverview = () => {
    const { marketData } = useMarketData();
    const { indices } = marketData;

    const StatCard = ({ title, value, change, changePercent, icon: Icon, color }) => {
        const isPositive = change >= 0;
        return (
            <Card className="relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
                    <Icon size={64} />
                </div>
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-white mb-2">{value.toLocaleString()}</h3>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="font-medium">
                                {isPositive ? '+' : ''}{change} ({isPositive ? '+' : ''}{changePercent}%)
                            </span>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="ASPI"
                value={indices.aspi.value.toFixed(2)}
                change={indices.aspi.change}
                changePercent={indices.aspi.changePercent}
                icon={Activity}
                color="text-accent-cyan"
            />
            <StatCard
                title="S&P SL20"
                value={indices.sp20.value.toFixed(2)}
                change={indices.sp20.change}
                changePercent={indices.sp20.changePercent}
                icon={Activity}
                color="text-accent-purple"
            />
            <StatCard
                title="Market Turnover"
                value={indices.turnover}
                icon={DollarSign}
                color="text-accent-green"
            />
            <StatCard
                title="Total Trades"
                value={indices.trades}
                icon={Activity}
                color="text-orange-500"
            />
        </div>
    );
};

export default MarketOverview;
