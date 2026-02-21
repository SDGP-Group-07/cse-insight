import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketData } from '../../context/MarketDataContext';

const IndexCards = () => {
  const { marketData, status, refreshSection } = useMarketData();
  const { gainers, losers } = marketData;
  const gainersStatus = status.gainers;
  const losersStatus = status.losers;

  const StockList = ({ title, data, type, page, setPage }) => {
    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pagedData = data.slice(start, start + ITEMS_PER_PAGE);

    // ✅ Auto switch pages every 4 seconds
    useEffect(() => {
      if (totalPages <= 1) return;

      const interval = setInterval(() => {
        setPage((prev) => (prev >= totalPages ? 1 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }, [totalPages]);

    return (
      <Card className="h-full">
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`p-2 rounded-lg ${
              type === 'gainers'
                ? 'bg-accent-green/10'
                : 'bg-red-500/10'
            }`}
          >
            {type === 'gainers' ? (
              <TrendingUp className="w-5 h-5 text-accent-green" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        <div className="space-y-3">
          {pagedData.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() =>
                (window.location.href = `/company/${stock.symbol}`)
              }
            >
              <div>
                <p className="font-bold text-white">{stock.symbol}</p>
                <p className="text-xs text-gray-400">
                  LKR {stock.price.toFixed(2)}
                </p>
              </div>
              <div
                className={`text-sm font-bold ${
                  type === 'gainers'
                    ? 'text-accent-green'
                    : 'text-red-500'
                }`}
              >
                {type === 'gainers' ? '+' : ''}
                {stock.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Dots Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  page === index + 1
                    ? 'bg-white scale-110'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </Card>
    );
  };

  const renderStateCard = (message, actionLabel, action) => (
    <Card className="h-full">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-300">{message}</p>
        {action && (
          <button
            className="border px-3 py-1 rounded self-start text-sm"
            onClick={action}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </Card>
  );

  const [gainersPage, setGainersPage] = useState(1);
  const [losersPage, setLosersPage] = useState(1);

  useEffect(() => {
    const gainersTotal = Math.max(
      1,
      Math.ceil(gainers.length / 5)
    );
    if (gainersPage > gainersTotal)
      setGainersPage(gainersTotal);

    const losersTotal = Math.max(
      1,
      Math.ceil(losers.length / 5)
    );
    if (losersPage > losersTotal)
      setLosersPage(losersTotal);
  }, [gainers, losers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {gainersStatus.error ? (
        renderStateCard(
          'Failed to load top gainers.',
          'Retry',
          () => refreshSection('gainers')
        )
      ) : gainersStatus.loading &&
        gainers.length === 0 ? (
        renderStateCard('Loading top gainers...')
      ) : gainersStatus.empty ? (
        renderStateCard(
          'No gainers data available.',
          'Refresh',
          () => refreshSection('gainers')
        )
      ) : (
        <StockList
          title="Top Gainers"
          data={gainers}
          type="gainers"
          page={gainersPage}
          setPage={setGainersPage}
        />
      )}

      {losersStatus.error ? (
        renderStateCard(
          'Failed to load top losers.',
          'Retry',
          () => refreshSection('losers')
        )
      ) : losersStatus.loading &&
        losers.length === 0 ? (
        renderStateCard('Loading top losers...')
      ) : losersStatus.empty ? (
        renderStateCard(
          'No losers data available.',
          'Refresh',
          () => refreshSection('losers')
        )
      ) : (
        <StockList
          title="Top Losers"
          data={losers}
          type="losers"
          page={losersPage}
          setPage={setLosersPage}
        />
      )}
    </div>
  );
};

export default IndexCards;