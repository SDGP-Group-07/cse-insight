import React from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import Button from '../common/Button';

const CompanyHeader = ({ company }) => {
    const isPositive = company.change >= 0;

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

                <Button variant="outline" className="p-3 rounded-full border-white/20 hover:bg-white/10">
                    <Bell size={20} className="text-accent-cyan" />
                </Button>
            </div>
        </div>
    );
};

export default CompanyHeader;
