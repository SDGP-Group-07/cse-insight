import React from 'react';
import { TrendingUp, TrendingDown, Bell, Check } from 'lucide-react';
import Button from '../common/Button';
import { useNotification } from '../../context/NotificationContext';

const CompanyHeader = ({ company }) => {
  const isPositive = company.change >= 0;
  const { isSubscribed, subscribe, unsubscribe } = useNotification();
  const subscribed = isSubscribed(company.symbol);

  const handleSubscribe = async () => {
    if (subscribed) {
      await unsubscribe(company.symbol);
    } else {
      await subscribe(company.symbol);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            {company.symbol}
          </h1>
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-xs text-purple-300">
            {company.sector}
          </span>
        </div>
        <h2 className="text-base text-[#9b96b2] font-medium">{company.name}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-3xl font-semibold text-white">
            LKR {company.price.toFixed(2)}
          </div>
          <div
            className={`flex items-center justify-end gap-1 text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>
              {isPositive ? '+' : ''}
              {company.change.toFixed(2)} ({isPositive ? '+' : ''}
              {company.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          className={`h-10 w-10 rounded-full p-0 border ${subscribed ? 'bg-purple-500/30 border-purple-400 text-purple-100' : 'bg-purple-500/20 border-purple-500/30 text-purple-300 hover:text-purple-200'}`}
          onClick={handleSubscribe}
          title={subscribed ? 'Unsubscribe' : 'Subscribe for alerts'}
        >
          {subscribed ? <Check size={18} /> : <Bell size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default CompanyHeader;
