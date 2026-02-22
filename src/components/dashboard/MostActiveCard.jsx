import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { Activity } from 'lucide-react';
import { useMarketData } from '../../context/MarketDataContext';

const MostActiveCard = () => {
    const { marketData, status, refreshSection } = useMarketData();
    const { mostActive } = marketData;
    const mostActiveStatus = status.mostActive;

    const ITEMS_PER_PAGE = 5;
    const rowHeight = 64;
    const rowGap = 16;

    const [page, setPage] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const totalPages = Math.max(1, Math.ceil(mostActive.length / ITEMS_PER_PAGE));
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pagedData = mostActive.slice(start, start + ITEMS_PER_PAGE);

    const formatTradeDate = (timestamp) => {
        if (!timestamp) return '';
        return new Date(Number(timestamp)).toLocaleString('en-LK', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        if (totalPages <= 1 || isHovered) return;

        const interval = setInterval(() => {
            setPage(prev => (prev >= totalPages ? 1 : prev + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [totalPages, isHovered]);

    if (mostActiveStatus.error) {
        return (
            <Card>
                <p className="text-sm text-red-400">Failed to load most active.</p>
            </Card>
        );
    }

    return (
        <Card
            className="flex flex-col flex-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Activity className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Most Active</h3>
            </div>

            <div
                className="space-y-4 overflow-hidden"
                style={{
                    height: `${ITEMS_PER_PAGE * rowHeight + (ITEMS_PER_PAGE - 1) * rowGap}px`,
                }}
            >
                {pagedData.map((stock) => (
                    <div
                        key={stock.symbol}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                        style={{ height: `${rowHeight}px` }}
                    >
                        <div>
                            <p className="font-bold text-white">{stock.symbol}</p>

                            <p className="text-xs text-gray-400">
                                Vol: {stock.shareVolume.toLocaleString()}
                            </p>

                            <p className="text-[11px] text-gray-500">
                                {stock.percentageShareVolume.toFixed(2)}% of total
                            </p>
                        </div>

                        <div className="text-sm font-bold text-yellow-400">
                            {stock.shareVolume.toLocaleString()}
                        </div>

                        {/* <div className="text-sm font-bold text-white">
                            {stock.changePercent > 0 ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%
                        </div> */}
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full ${page === index + 1 ? 'bg-white scale-110' : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
};

export default MostActiveCard;