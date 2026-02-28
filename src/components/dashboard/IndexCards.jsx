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
    const rowHeight = 64;
    const rowGap = 16;

    const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
    const start = (page - 1) * ITEMS_PER_PAGE;
    const pagedData = data.slice(start, start + ITEMS_PER_PAGE);

    const [isHovered, setIsHovered] = useState(false);

    const formatTradeDate = (timestamp) => {
      if (!timestamp) return '';

      const date = new Date(Number(timestamp));

      return date.toLocaleString('en-LK', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };
    // Auto switch (pause on hover)
    useEffect(() => {
      if (totalPages <= 1 || isHovered) return;

      const interval = setInterval(() => {
        setPage((prev) => (prev >= totalPages ? 1 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }, [totalPages, isHovered]);

    return (
      <Card
        className="flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-2 mb-6">
          <div
            className={`p-2 rounded-lg ${type === 'gainers'
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

        {/* 🔥 Fixed height container (same as NewsWidget) */}
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
              onClick={() =>
                (window.location.href = `/company/${stock.symbol}`)
              }
            >
              <div>
                <p className="font-bold text-white">{stock.symbol}</p>
                <p className="text-xs text-gray-400">
                  LKR {stock.price.toFixed(2)}
                </p>
                <p className="text-[11px] text-gray-500">
                  {formatTradeDate(stock.tradeDate)}
                </p>
              </div>

              <div
                className={`text-sm font-bold ${type === 'gainers'
                  ? 'text-accent-green'
                  : 'text-red-500'
                  }`}
              >
                {type === 'gainers' ? '+' : ''}
                {stock.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}

          {/* placeholders (same logic as NewsWidget) */}
          {Array.from({
            length: Math.max(0, ITEMS_PER_PAGE - pagedData.length),
          }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="opacity-40 rounded-lg bg-white/5"
              style={{ height: `${rowHeight}px` }}
            />
          ))}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${page === index + 1
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
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