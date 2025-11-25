import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { MarketDataProvider, useMarketData } from '../context/MarketDataContext';
import { Loader } from 'lucide-react';
import Button from '../components/common/Button';

const ComparePageContent = () => {
    const { marketData, loading } = useMarketData();
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-dark flex items-center justify-center">
                <Loader className="w-10 h-10 text-accent-cyan animate-spin" />
            </div>
        );
    }

    const handleAddStock = (stock) => {
        if (selectedStocks.length < 3 && !selectedStocks.find(s => s.symbol === stock.symbol)) {
            setSelectedStocks([...selectedStocks, stock]);
            setSearchTerm('');
        }
    };

    const handleRemoveStock = (symbol) => {
        setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
    };

    const filteredStocks = searchTerm
        ? marketData.stocks.filter(s =>
            s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5)
        : [];

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Compare Stocks</h1>
                    <p className="text-gray-400">Analyze and compare performance of up to 3 companies side-by-side</p>
                </div>

                {/* Search & Add */}
                <div className="mb-8 relative max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search company to add..."
                            className="w-full bg-primary-mid/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent-cyan transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {searchTerm && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-primary-mid border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                            {filteredStocks.length > 0 ? (
                                filteredStocks.map(stock => (
                                    <button
                                        key={stock.symbol}
                                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left"
                                        onClick={() => handleAddStock(stock)}
                                    >
                                        <div>
                                            <span className="font-bold text-white">{stock.symbol}</span>
                                            <span className="text-sm text-gray-400 ml-2">{stock.name}</span>
                                        </div>
                                        <Plus size={16} className="text-accent-cyan" />
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">No companies found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Comparison Grid */}
                {selectedStocks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-white/10 w-1/4">Metric</th>
                                    {selectedStocks.map(stock => (
                                        <th key={stock.symbol} className="p-4 border-b border-white/10 min-w-[200px] relative">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-xl font-bold text-accent-cyan">{stock.symbol}</div>
                                                    <div className="text-xs text-gray-400 truncate max-w-[150px]">{stock.name}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveStock(stock.symbol)}
                                                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                                >
                                                    <X size={16} className="text-gray-500 hover:text-red-400" />
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">Price</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className="p-4 font-bold text-lg">LKR {stock.price}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">Change</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className={`p-4 font-bold ${stock.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                            {stock.change > 0 ? '+' : ''}{stock.change}%
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">Volume</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className="p-4">{stock.volume}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">Market Cap</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className="p-4">LKR 45.2B</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">P/E Ratio</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className="p-4">12.5</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-4 text-gray-400 font-medium">EPS</td>
                                    {selectedStocks.map(stock => (
                                        <td key={stock.symbol} className="p-4">8.40</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus size={32} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Add Companies to Compare</h3>
                        <p className="text-gray-400">Search and select up to 3 companies to view side-by-side comparison</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ComparePage = () => {
    return (
        <MarketDataProvider>
            <ComparePageContent />
        </MarketDataProvider>
    );
};

export default ComparePage;
