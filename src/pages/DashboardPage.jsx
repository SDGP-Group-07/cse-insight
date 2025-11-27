import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MarketOverview from '../components/dashboard/MarketOverview';
import StockTable from '../components/dashboard/StockTable';
import IndexCards from '../components/dashboard/IndexCards';
import NewsWidget from '../components/dashboard/NewsWidget';
import SectorPerformance from '../components/dashboard/SectorPerformance';
import { MarketDataProvider } from '../context/MarketDataContext';

const DashboardPage = () => {
    return (
        <MarketDataProvider>
            <div className="min-h-screen bg-primary-dark text-white font-sans">
                <main className="container mx-auto px-6 pt-24 pb-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Market Dashboard</h1>
                        <p className="text-gray-400">Real-time overview of the Colombo Stock Exchange</p>
                    </div>

                    <MarketOverview />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <IndexCards />
                            <div className="flex justify-between items-center mb-4 mt-8">
                                <h2 className="text-xl font-bold">Market Movers</h2>
                                <Link to="/companies" className="text-sm text-accent-cyan hover:underline flex items-center gap-1">
                                    View All Companies <ArrowRight size={14} />
                                </Link>
                            </div>
                            <StockTable />
                        </div>
                        <div className="space-y-6">
                            <NewsWidget />
                            <SectorPerformance />
                        </div>
                    </div>
                </main>
            </div>
        </MarketDataProvider>
    );
};

export default DashboardPage;
