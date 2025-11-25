import React from 'react';
import Card from '../common/Card';

const KeyStats = ({ company }) => {
    const stats = [
        { label: 'Market Cap', value: company.marketCap },
        { label: 'P/E Ratio', value: company.peRatio },
        { label: 'EPS', value: `LKR ${company.eps}` },
        { label: 'Dividend Yield', value: `${company.dividendYield}%` },
        { label: 'Beta', value: company.beta },
        { label: 'Shares Outstanding', value: company.sharesOutstanding },
        { label: '52 Week High', value: `LKR ${company.high52.toFixed(2)}` },
        { label: '52 Week Low', value: `LKR ${company.low52.toFixed(2)}` },
    ];

    return (
        <Card className="h-full">
            <h3 className="text-lg font-bold text-white mb-4">Key Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-3 rounded-lg bg-white/5">
                        <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                        <p className="text-sm font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default KeyStats;
