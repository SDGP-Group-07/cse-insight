import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyHeader from '../components/company/CompanyHeader';
import PriceChart from '../components/company/PriceChart';
import KeyStats from '../components/company/KeyStats';
import CompanyProfile from '../components/company/CompanyProfile';
import companyService from '../services/companyService';
import { Loader, ArrowLeft } from 'lucide-react';

const CompanyPageContent = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('Fetching company data for symbol:', symbol);

  useEffect(() => {
    let isActive = true;

    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await companyService.getCompany(symbol);
        if (isActive) {
          setCompany(response);
        }
      } catch (error) {
        if (isActive) {
          setCompany(null);
        }
        console.error('Failed to load company data', error);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchCompany();

    return () => {
      isActive = false;
    };
  }, [symbol]);

  if (loading || !company) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <Loader className="w-10 h-10 text-accent-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1625] text-white font-sans">
      <main className="max-w-[1184px] mx-auto px-6 pt-28 pb-16">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-sm text-[#9b96b2] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <CompanyHeader company={company} />

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 mb-6">
          <PriceChart symbol={symbol} />
          <KeyStats company={company} />
        </section>

        <CompanyProfile company={company} />
      </main>
    </div>
  );
};

const CompanyPage = () => {
  return <CompanyPageContent />;
};

export default CompanyPage;
