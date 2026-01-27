import React from 'react';
import Card from '../common/Card';
import { Newspaper, Clock, ArrowRight } from 'lucide-react';
import { useMarketData } from '../../context/MarketDataContext';

const NewsWidget = () => {
    const { marketData } = useMarketData();
    const { news } = marketData;

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <Newspaper className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Latest News</h3>
                </div>
                <button className="text-sm text-accent-cyan hover:text-accent-green transition-colors flex items-center gap-1">
                    View All <ArrowRight size={14} />
                </button>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-300 group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan transition-colors">
                                {item.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={12} />
                                {item.time}
                            </div>
                        </div>
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-2">
                            {item.title}
                        </h4>
                        <div className="h-px bg-white/5 mt-4 group-last:hidden"></div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default NewsWidget;
