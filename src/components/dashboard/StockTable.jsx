import React, { useState } from 'react';
import { Search, ArrowUpDown, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useMarketData } from '../../context/MarketDataContext';

const StockTable = () => {
    const { marketData } = useMarketData();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...marketData.stocks].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredData = sortedData.filter(stock =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-xl font-bold text-white">Market Summary</h3>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search stocks..."
                        className="w-full bg-primary-dark/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent-cyan"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10 text-left text-gray-400 text-sm">
                            <th className="pb-4 pl-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('symbol')}>
                                Symbol <ArrowUpDown className="inline w-3 h-3 ml-1" />
                            </th>
                            <th className="pb-4 font-medium cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                                Company
                            </th>
                            <th className="pb-4 text-right font-medium cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                                Price (LKR)
                            </th>
                            <th className="pb-4 text-right font-medium cursor-pointer hover:text-white" onClick={() => handleSort('change')}>
                                Change
                            </th>
                            <th className="pb-4 text-right font-medium cursor-pointer hover:text-white" onClick={() => handleSort('changePercent')}>
                                % Change
                            </th>
                            <th className="pb-4 text-right font-medium hidden md:table-cell">Volume</th>
                            <th className="pb-4 text-right font-medium hidden md:table-cell">Turnover</th>
                            <th className="pb-4 pr-4 text-center font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredData.map((stock) => (
                            <tr
                                key={stock.symbol}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                onClick={() => window.location.href = `/company/${stock.symbol}`}
                            >
                                <td className="py-4 pl-4 font-medium text-accent-cyan">{stock.symbol}</td>
                                <td className="py-4 text-gray-300">{stock.name}</td>
                                <td className="py-4 text-right text-white font-medium">{stock.price.toFixed(2)}</td>
                                <td className={`py-4 text-right font-medium ${stock.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                    {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                                </td>
                                <td className={`py-4 text-right font-medium ${stock.changePercent >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                </td>
                                <td className="py-4 text-right text-gray-400 hidden md:table-cell">{stock.volume}</td>
                                <td className="py-4 text-right text-gray-400 hidden md:table-cell">{stock.turnover}</td>
                                <td className="py-4 pr-4 text-center">
                                    <Button variant="ghost" className="p-2 h-auto">
                                        <Eye className="w-4 h-4 text-accent-cyan" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default StockTable;
