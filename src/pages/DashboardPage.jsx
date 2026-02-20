import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import MarketOverview from '../components/dashboard/MarketOverview';
import StockTable from '../components/dashboard/StockTable';
import IndexCards from '../components/dashboard/IndexCards';
import NewsWidget from '../components/dashboard/NewsWidget';
import SectorPerformance from '../components/dashboard/SectorPerformance';
import { MarketDataProvider } from '../context/MarketDataContext';
import { useMarketData } from '../context/MarketDataContext';
import Button from '../components/common/Button';

const DashboardHeader = () => {
  const { refreshAll, loading } = useMarketData();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Market Dashboard</h1>
        <p className="text-gray-400">
          Real-time overview of the Colombo Stock Exchange
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => refreshAll()}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        <RefreshCcw size={16} />
        {loading ? 'Refreshing...' : 'Refresh'}
      </Button>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <MarketDataProvider>
      <div className="min-h-screen bg-primary-dark text-white font-sans">
        <main className="container mx-auto px-6 pt-24 pb-20">
          <DashboardHeader />

          <MarketOverview />

          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-xl font-bold">Market Movers</h2>
            <Link
              to="/companies"
              className="text-sm text-accent-cyan hover:underline flex items-center gap-1"
            >
              View All Companies <ArrowRight size={14} />
            </Link>
          </div>
          <StockTable />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4 mt-6">
            <div className="lg:col-span-2">
              <IndexCards />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="flex-shrink-0">
                <NewsWidget />
              </div>
            </div>
          </div>

          <div className="mt-2 mb-12">
            <div className="w-full lg:w-2/3 h-72">
              <SectorPerformance />
            </div>
          </div>
        </main>
      </div>
    </MarketDataProvider>
  );
};

export default DashboardPage;
