import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import { useMarketData } from '../../context/MarketDataContext';

const MarketCapTable = () => {
  const { marketData, status } = useMarketData();
  const { stocks } = marketData;
  const stocksStatus = status.stocks;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const sortedData = useMemo(() => {
    return [...stocks]
      .filter((s) => Number.isFinite(s.marketCap))
      .sort((a, b) => b.marketCap - a.marketCap);
  }, [stocks]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(start, start + pageSize);

  if (stocksStatus.error) {
    return (
      <Card>
        <p className="text-sm text-red-400">Failed to load market cap data.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6">
        Market Capitalization
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-white/10 text-left text-gray-400 text-sm">
              <th className="pb-4 pl-4 font-medium">Company</th>
              <th className="pb-4 font-medium">Symbol</th>
              <th className="pb-4 text-right font-medium">Market Cap</th>
              <th className="pb-4 pr-4 text-right font-medium">Market Cap %</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {paginatedData.map((stock) => (
              <tr
                key={stock.symbol}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 pl-4 text-gray-300 truncate max-w-[200px]">
                  {stock.name}
                </td>

                <td className="py-4 text-accent-cyan font-medium">
                  {stock.symbol}
                </td>

                <td className="py-4 text-right text-white font-semibold">
                  {Number.isFinite(stock.marketCap)
                    ? stock.marketCap.toLocaleString()
                    : '-'}
                </td>

                <td className="py-4 pr-4 text-right text-white">
                  {Number.isFinite(stock.marketCapPercentage)
                    ? stock.marketCapPercentage.toFixed(2) + '%'
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-white/10 rounded"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border border-white/10 rounded"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MarketCapTable;