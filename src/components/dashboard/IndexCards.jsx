import React from 'react';
import Card from '../common/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Button from '../common/Button';
import { useMarketData } from '../../context/MarketDataContext';

const IndexCards = () => {
  const { marketData, status, refreshSection } = useMarketData();
  const { gainers, losers } = marketData;
  const gainersStatus = status.gainers;
  const losersStatus = status.losers;

  const StockList = ({ title, data, type }) => (
    <Card className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`p-2 rounded-lg ${type === 'gainers' ? 'bg-accent-green/10' : 'bg-red-500/10'}`}
        >
          {type === 'gainers' ? (
            <TrendingUp
              className={`w-5 h-5 ${type === 'gainers' ? 'text-accent-green' : 'text-red-500'}`}
            />
          ) : (
            <TrendingDown
              className={`w-5 h-5 ${type === 'gainers' ? 'text-accent-green' : 'text-red-500'}`}
            />
          )}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-3">
        {data.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => (window.location.href = `/company/${stock.symbol}`)}
          >
            <div>
              <p className="font-bold text-white">{stock.symbol}</p>
              <p className="text-xs text-gray-400">
                LKR {stock.price.toFixed(2)}
              </p>
            </div>
            <div
              className={`text-sm font-bold ${type === 'gainers' ? 'text-accent-green' : 'text-red-500'}`}
            >
              {type === 'gainers' ? '+' : ''}
              {stock.changePercent.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderStateCard = (message, actionLabel, action) => (
    <Card className="h-full">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-300">{message}</p>
        {action && (
          <Button variant="outline" className="self-start" onClick={action}>
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {gainersStatus.error ? (
        renderStateCard('Failed to load top gainers.', 'Retry', () =>
          refreshSection('gainers'),
        )
      ) : gainersStatus.loading && gainers.length === 0 ? (
        renderStateCard('Loading top gainers...')
      ) : gainersStatus.empty ? (
        renderStateCard('No gainers data available.', 'Refresh', () =>
          refreshSection('gainers'),
        )
      ) : (
        <StockList title="Top Gainers" data={gainers} type="gainers" />
      )}
      {losersStatus.error ? (
        renderStateCard('Failed to load top losers.', 'Retry', () =>
          refreshSection('losers'),
        )
      ) : losersStatus.loading && losers.length === 0 ? (
        renderStateCard('Loading top losers...')
      ) : losersStatus.empty ? (
        renderStateCard('No losers data available.', 'Refresh', () =>
          refreshSection('losers'),
        )
      ) : (
        <StockList title="Top Losers" data={losers} type="losers" />
      )}
    </div>
  );
};

export default IndexCards;
