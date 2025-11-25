import React from 'react';
import { TrendingUp, TrendingDown, Bell, Check } from 'lucide-react';
import Button from '../common/Button';
import { useNotification } from '../../context/NotificationContext';

const CompanyHeader = ({ company }) => {
    const isPositive = company.change >= 0;
    const { isSubscribed, subscribe, unsubscribe } = useNotification();
    const subscribed = isSubscribed(company.symbol);

    const handleSubscribe = () => {
        if (subscribed) {
            unsubscribe(company.symbol);
        } else {
            subscribe(company.symbol);
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-white">{company.symbol}</h1>
                    <span className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300">{company.sector}</span>
                </div>
                <h2 className="text-xl text-gray-400 font-medium">{company.name}</h2>
            </div>

            <div className="flex items-center gap-6">
                <div className="text-right">
                    <div className="text-3xl font-bold text-white">LKR {company.price.toFixed(2)}</div>
                    <div className={`flex items-center justify-end gap-1 font-medium ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{isPositive ? '+' : ''}{company.change.toFixed(2)} ({isPositive ? '+' : ''}{company.changePercent.toFixed(2)}%)</span>
                    </div>
                </div>

                <Button
                    variant={subscribed ? "primary" : "outline"}
                    className={`p-3 rounded-full transition-all ${subscribed ? 'bg-accent-cyan text-primary-dark border-accent-cyan' : 'border-white/20 hover:bg-white/10'}`}
                    onClick={handleSubscribe}
                    title={subscribed ? "Unsubscribe" : "Subscribe for alerts"}
                >
                    {subscribed ? <Check size={20} /> : <Bell size={20} className={subscribed ? "text-primary-dark" : "text-accent-cyan"} />}
                </Button>
            </div>
        </div>
    );
};

export default CompanyHeader;
