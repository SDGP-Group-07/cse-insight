import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BarChart2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import companyService from '../services/companyService';

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState({
    id: 'all',
    name: 'All',
  });
  const [companies, setCompanies] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const [companiesResponse, sectorsResponse] = await Promise.all([
          companyService.getCompanies(),
          companyService.getSectors(),
        ]);

        const companyList = Array.isArray(companiesResponse.data?.data)
          ? companiesResponse.data.data
          : [];
        setCompanies(companyList);

        const sectorList = Array.isArray(sectorsResponse)
          ? sectorsResponse
          : [];
        setSectors(sectorList);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]);
        setSectors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) {
      return false;
    }

    if (selectedSector.id === 'all') {
      return true;
    }

    const sectorName = company.sector?.toLowerCase?.() ?? '';
    const selectedName = selectedSector.name.toLowerCase();
    const sectorId = company.sectorId ?? company.sector_id ?? company.indexId;

    return (
      sectorName === selectedName ||
      String(sectorId) === String(selectedSector.id)
    );
  });

  return (
    <div className="min-h-screen bg-primary-dark text-white font-sans">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Listed Companies</h1>
          <p className="text-gray-400">
            Explore and analyze companies listed on the Colombo Stock Exchange.
          </p>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400">Loading companies...</p>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or symbol..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent-cyan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSector({ id: 'all', name: 'All' })}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                selectedSector.id === 'all'
                  ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan'
                  : 'border-white/10 text-gray-300 hover:border-accent-cyan/50'
              }`}
            >
              All
            </button>
            {sectors.map((sector) => (
              <button
                key={sector.id ?? sector.indexCode ?? sector.name}
                type="button"
                onClick={() =>
                  setSelectedSector({
                    id: sector.id ?? sector.indexCode,
                    name: sector.name,
                  })
                }
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  String(selectedSector.id) ===
                  String(sector.id ?? sector.indexCode)
                    ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan'
                    : 'border-white/10 text-gray-300 hover:border-accent-cyan/50'
                }`}
              >
                {sector.name}
              </button>
            ))}
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompanies.map((company) => (
            <Card
              key={company.symbol}
              className="hover:border-accent-cyan/50 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      {company.symbol}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 truncate w-48">
                    {company.name}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${company.percentageChange >= 0 ? 'text-accent-green' : 'text-red-500'}`}
                >
                  {company.percentageChange >= 0 ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {company.percentageChange.toFixed(2)}%
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Price</p>
                  <p className="text-2xl font-bold text-white">
                    LKR {company.price.toFixed(2)}
                  </p>
                </div>
                <div
                  className={`text-sm ${company.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}
                >
                  {company.change > 0 ? '+' : ''}
                  {company.change}
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/company/${company.symbol}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-center group-hover:bg-accent-cyan group-hover:text-primary-dark group-hover:border-accent-cyan transition-all"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <BarChart2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No companies found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompaniesPage;
