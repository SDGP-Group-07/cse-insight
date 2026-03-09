import React, { useEffect, useMemo, useState } from 'react';
import { Search, ArrowUpDown, Eye } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useMarketData } from '../../context/MarketDataContext';

const StockTable = () => {
  const { marketData, status, refreshSection } = useMarketData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const stocksStatus = status.stocks;

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

  const filteredData = sortedData.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(Math.max(1, prev), totalPages));
  }, [totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, filteredData, pageSize]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortWithReset = (key) => {
    handleSort(key);
    setCurrentPage(1);
  };

  if (stocksStatus.error) {
    return (
      <Card>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-400">Failed to load market summary.</p>
          <Button
            variant="outline"
            className="self-start"
            onClick={() => refreshSection('stocks')}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (stocksStatus.loading && marketData.stocks.length === 0) {
    return (
      <Card>
        <p className="text-sm text-gray-300">Loading market summary...</p>
      </Card>
    );
  }

  if (stocksStatus.empty) {
    return (
      <Card>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-300">
            No market summary data available.
          </p>
          <Button
            variant="outline"
            className="self-start"
            onClick={() => refreshSection('stocks')}
          >
            Refresh
          </Button>
        </div>
      </Card>
    );
  }

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
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-white/10 text-left text-gray-400 text-sm">
              <th
                className="pb-4 pl-4 font-medium cursor-pointer hover:text-white"
                onClick={() => handleSortWithReset('symbol')}
              >
                Symbol <ArrowUpDown className="inline w-3 h-3 ml-1" />
              </th>
              <th
                className="pb-4 font-medium cursor-pointer hover:text-white w-24"
                onClick={() => handleSortWithReset('name')}
              >
                Company
              </th>
              <th
                className="pb-4 font-medium cursor-pointer hover:text-white w-24"
                onClick={() => handleSortWithReset('sharevolume')}
              >
                Share Volume
              </th>

              <th className="pb-4 text-right font-medium">
                Trade Volume
              </th>
              <th className="pb-4 text-right font-medium">
                Turnover
              </th>
              <th
                className="pb-4 text-right font-medium cursor-pointer hover:text-white"
                onClick={() => handleSortWithReset('previousClose')}
              >
                Previous Close
              </th>
              <th className="pb-4 text-right font-medium">
                Open
              </th>
              <th className="pb-4 text-right font-medium">
                High
              </th>
              <th className="pb-4 text-right font-medium">
                Low
              </th>
              <th
                className="pb-4 text-right font-medium cursor-pointer hover:text-white"
                onClick={() => handleSortWithReset('price')}
              >
                Price (LKR)
              </th>
              <th
                className="pb-4 text-right font-medium cursor-pointer hover:text-white"
                onClick={() => handleSortWithReset('change')}
              >
                Change(RS)
              </th>
              <th
                className="pb-4 text-right font-medium cursor-pointer hover:text-white"
                onClick={() => handleSortWithReset('changePercent')}
              >
                Change (%)
              </th>
              <th className="pb-4 pr-4 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paginatedData.map((stock) => (
              <tr
                key={stock.symbol}
                className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() =>
                  (window.location.href = `/company/${stock.symbol}`)
                }
              >
                <td className="py-4 pl-4 font-medium text-accent-cyan">
                  {stock.symbol}
                </td>
                <td className="py-4 text-gray-300 w-24 truncate">{stock.name}</td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.sharevolume)
                    ? stock.sharevolume.toLocaleString()
                    : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.tradevolume)
                    ? stock.tradevolume.toLocaleString()
                    : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.turnover)
                    ? stock.turnover.toLocaleString()
                    : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.previousClose)
                    ? stock.previousClose.toFixed(2)
                    : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.open) ? stock.open.toFixed(2) : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.high) ? stock.high.toFixed(2) : '-'}
                </td>
                <td className="py-4 text-right text-white">
                  {Number.isFinite(stock.low) ? stock.low.toFixed(2) : '-'}
                </td>
                <td className="py-4 text-right text-white font-medium">
                  {Number.isFinite(stock.price) ? stock.price.toFixed(2) : '-'}
                </td>
                <td
                  className={`py-4 text-right font-medium ${Number.isFinite(stock.change) && stock.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}
                >
                  {Number.isFinite(stock.change) ? (stock.change > 0 ? '+' : '') + stock.change.toFixed(2) : '-'}
                </td>
                <td
                  className={`py-4 text-right font-medium ${Number.isFinite(stock.changePercent) && stock.changePercent >= 0 ? 'text-accent-green' : 'text-red-500'}`}
                >
                  {Number.isFinite(stock.changePercent) ? (stock.changePercent > 0 ? '+' : '') + stock.changePercent.toFixed(2) + '%' : '-'}
                </td>
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 px-4 pb-4 text-sm text-gray-400">
        <span>
          Showing{' '}
          {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, filteredData.length)} of{' '}
          {filteredData.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="px-3 py-1 text-xs"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className="px-3 py-1 text-xs"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StockTable;
