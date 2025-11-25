import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import CompanyHeader from '../components/company/CompanyHeader';
import PriceChart from '../components/company/PriceChart';
import KeyStats from '../components/company/KeyStats';
import CompanyProfile from '../components/company/CompanyProfile';
import { useMarketData } from '../context/MarketDataContext';
import { Loader, ArrowLeft } from 'lucide-react';

const CompanyPage = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();
    const { marketData, loading } = useMarketData();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        if (marketData.stocks.length > 0) {
            const foundCompany = marketData.stocks.find(s => s.symbol === symbol);
            if (foundCompany) {
                setCompany(foundCompany);
            } else {
                // Handle not found
                console.log('Company not found');
            }
        }
    }, [symbol, marketData]);

    if (loading || !company) {
        return (
            <div className="min-h-screen bg-primary-dark flex items-center justify-center">
                <Loader className="w-10 h-10 text-accent-cyan animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

                <CompanyHeader company={company} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2">
                        <PriceChart />
                    </div>
                    <div>
                        <KeyStats company={company} />
                    </div>
                </div>

                <CompanyProfile company={company} />
            </main>
        </div>
    );
};

export default CompanyPage;
