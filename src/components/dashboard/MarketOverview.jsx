import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useMarketData } from '../../context/MarketDataContext';

const MarketOverview = () => {
  const { marketData, status, refreshSection } = useMarketData();
  const { indices } = marketData;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="ASPI"
        value={indices.aspi.value.toFixed(2)}
        change={indices.aspi.change}
        changePercent={indices.aspi.changePercent}
        icon={Activity}
        color="text-accent-cyan"
      />
      <StatCard
        title="S&P SL20"
        value={indices.sp20.value.toFixed(2)}
        change={indices.sp20.change}
        changePercent={indices.sp20.changePercent}
        icon={Activity}
        color="text-accent-purple"
      />
      <StatCard
        title="Market Turnover"
        value={indices.turnover}
        icon={DollarSign}
        color="text-accent-green"
      />
      <StatCard
        title="Total Trades"
        value={indices.trades}
        icon={Activity}
        color="text-orange-500"
      />
    </div>
  );
};

export default MarketOverview;
