import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useMarketData } from '../../context/MarketDataContext';

const MarketOverview = () => {
  const { marketData, status, refreshSection } = useMarketData();
  const { indices, marketStatus } = marketData;
  const indicesStatus = status.indices;

  if (indicesStatus.error) {
    return (
      <Card className="mb-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-red-400">
            Failed to load market overview.
          </p>
          <Button
            variant="outline"
            className="self-start"
            onClick={() => refreshSection('indices')}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (indicesStatus.loading && (!indices?.aspi || !indices?.sp20)) {
    return (
      <Card className="mb-8">
        <p className="text-sm text-gray-300">Loading market overview...</p>
      </Card>
    );
  }

  if (indicesStatus.empty) {
    return (
      <Card className="mb-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-300">
            No market overview data available.
          </p>
          <Button
            variant="outline"
            className="self-start"
            onClick={() => refreshSection('indices')}
          >
            Refresh
          </Button>
        </div>
      </Card>
    );
  }

  const StatCard = ({
    title,
    value,
    change,
    changePercent,
    icon: Icon,
    color,
  }) => {
    const isPositive = change >= 0;
    return (
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
          <Icon size={64} />
        </div>
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-white mb-2">
            {value.toLocaleString()}
          </h3>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent-green' : 'text-red-500'}`}
            >
              {isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}
                {change} ({isPositive ? '+' : ''}
                {changePercent}%)
              </span>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const CombinedStatCard = ({ indices }) => {
    const renderItem = (item, Icon, color) => {
      const isPositive = item.change >= 0;
      const formattedValue = Number(item.value).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return (
        <div className="flex-1 px-4 py-3">
          <p className="text-gray-400 text-sm font-medium mb-1">{item.title}</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">{formattedValue}</h3>
            <div className={`opacity-10 ${color}`}>
              <Icon size={36} />
            </div>
          </div>
          {item.change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-accent-green' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="font-medium">
                {isPositive ? '+' : ''}
                {item.change} ({isPositive ? '+' : ''}{item.changePercent}%)
              </span>
            </div>
          )}
        </div>
      );
    };

    return (
      <Card className="relative overflow-hidden">
        <div className="relative z-10 flex divide-x divide-gray-700">
          {renderItem({ title: 'ASPI', ...indices.aspi }, Activity, 'text-accent-cyan')}
          {renderItem({ title: 'S&P SL20', ...indices.sp20 }, Activity, 'text-accent-purple')}
        </div>
      </Card>
    );
  };

  const SecondCard = ({ indices, marketStatus }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
      const t = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(t);
    }, []);

    const isMarketOpen = marketStatus && marketStatus.toLowerCase().includes('open');
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const fmt = (v, opts = {}) => {
      if (v === undefined || v === null) return 'N/A';
      if (typeof v === 'number') return v.toLocaleString(undefined, opts);
      return v;
    };

    const shareVolume = indices?.shareVolume ?? null;
    const trades = indices?.trades ?? null;
    const turnover = indices?.turnover ?? null;

    return (
      <Card className="flex flex-col justify-between p-2">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            {isMarketOpen ? <TrendingUp className="text-accent-green" size={16} /> : <TrendingDown className="text-red-500" size={16} />}
            <div>
              <p className="text-sm text-gray-400">Market Status</p>
              <p className={`font-medium text-sm ${isMarketOpen ? 'text-accent-green' : 'text-red-500'}`}>{marketStatus || 'Loading...'}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">{dateStr}</p>
            <p className="text-sm font-medium text-white">{timeStr}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 px-3 py-2 border-t border-gray-800">
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-400">Share Volume</p>
            <p className="font-bold text-white">{fmt(shareVolume)}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-400">Number of Trades</p>
            <p className="font-bold text-white">{fmt(trades)}</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-400">Turnover</p>
            <p className="font-bold text-white">{fmt(turnover)}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <CombinedStatCard indices={indices} />
      <SecondCard indices={indices} marketStatus={marketStatus} />
    </div>
  );
};

export default MarketOverview;
