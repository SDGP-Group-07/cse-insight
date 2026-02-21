import React, { useState } from 'react';
import Card from '../common/Card';
import { Newspaper, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useMarketData } from '../../context/MarketDataContext';

const NewsWidget = () => {
    const { marketData } = useMarketData();
    const { announcements } = marketData;
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 5;
    // per-row fixed height in pixels
    const rowHeight = 64;
    // vertical gap used by Tailwind `space-y-4` is 16px
    const rowGap = 16;
    const totalPages = Math.ceil(announcements.length / itemsPerPage);
    
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const displayedItems = announcements.slice(startIdx, endIdx);

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return '';
        try {
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now - date;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            if (diffHours < 1) return 'Just now';
            if (diffHours < 24) return `${diffHours}h ago`;
            if (diffDays < 7) return `${diffDays}d ago`;
            
            return date.toLocaleDateString();
        } catch {
            return dateStr;
        }
    };

    return (
        <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <Newspaper className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Latest Announcements</h3>
                </div>
            </div>

            <div
                className="space-y-4 mb-6 overflow-hidden"
                style={{ height: `${itemsPerPage * rowHeight + (itemsPerPage - 1) * rowGap}px` }}
            >
                {displayedItems.map((item) => (
                    <div
                        key={item.id}
                        className="group cursor-pointer flex flex-col justify-between"
                        style={{ height: `${rowHeight}px` }}
                    >
                        <div className="flex items-start justify-between gap-4 mb-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-300 group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan transition-colors truncate max-w-[60%] line-clamp-1">
                                {item.symbol} - {item.name}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                                <Clock size={12} />
                                {formatTime(item.uploadedDate)}
                            </div>
                        </div>
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-2 overflow-hidden">
                            {item.title}
                        </h4>
                        <div className="h-px bg-white/5 mt-4 group-last:hidden"></div>
                    </div>
                ))}

                {/* placeholders to ensure exactly itemsPerPage rows per page */}
                {Array.from({ length: Math.max(0, itemsPerPage - displayedItems.length) }).map((_, idx) => (
                    <div
                        key={`empty-${idx}`}
                        className="group cursor-default flex flex-col justify-between opacity-40"
                        style={{ height: `${rowHeight}px` }}
                    >
                        <div className="flex items-start justify-between gap-4 mb-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/5 text-gray-600 truncate max-w-[60%]">&nbsp;</span>
                            <div className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">&nbsp;</div>
                        </div>
                        <h4 className="text-sm font-medium text-gray-500 overflow-hidden">&nbsp;</h4>
                        <div className="h-px bg-white/5 mt-4 group-last:hidden"></div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
                    <button 
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="text-gray-400 hover:text-accent-cyan disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <span className="text-sm text-gray-400">
                        {currentPage + 1} / {totalPages}
                    </span>
                    <button 
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        className="text-gray-400 hover:text-accent-cyan disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </Card>
    );
};

export default NewsWidget;
