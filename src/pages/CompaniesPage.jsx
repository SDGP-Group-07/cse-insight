import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Search, TrendingUp, TrendingDown, ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompaniesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSector, setSelectedSector] = useState('All');

    // Mock Data for Companies
    const companies = [
        { symbol: 'JKH', name: 'John Keells Holdings', sector: 'Capital Goods', price: 185.50, change: 2.5, changePercent: 1.35 },
        { symbol: 'SAMP', name: 'Sampath Bank', sector: 'Banks', price: 72.10, change: -0.4, changePercent: -0.55 },
        { symbol: 'COMB', name: 'Commercial Bank', sector: 'Banks', price: 98.00, change: 1.2, changePercent: 1.22 },
        { symbol: 'HNB', name: 'Hatton National Bank', sector: 'Banks', price: 165.25, change: 0.0, changePercent: 0.00 },
        { symbol: 'EXPO', name: 'Expolanka Holdings', sector: 'Transportation', price: 145.75, change: -1.5, changePercent: -1.02 },
        { symbol: 'LOLC', name: 'LOLC Holdings', sector: 'Diversified Financials', price: 450.00, change: 5.0, changePercent: 1.11 },
        { symbol: 'SLT', name: 'Sri Lanka Telecom', sector: 'Telecommunication', price: 95.00, change: 0.5, changePercent: 0.53 },
        { symbol: 'DIAL', name: 'Dialog Axiata', sector: 'Telecommunication', price: 10.50, change: -0.1, changePercent: -0.94 },
        { symbol: 'HAYL', name: 'Hayleys PLC', sector: 'Capital Goods', price: 88.00, change: 1.8, changePercent: 2.05 },
        { symbol: 'MELS', name: 'Melstacorp PLC', sector: 'Food & Beverage', price: 65.40, change: -0.2, changePercent: -0.30 },
        { symbol: 'DIST', name: 'Distilleries Company', sector: 'Food & Beverage', price: 22.10, change: 0.1, changePercent: 0.45 },
        { symbol: 'AEL', name: 'Access Engineering', sector: 'Capital Goods', price: 24.50, change: 0.3, changePercent: 1.22 },
    ];

    const sectors = ['All', ...new Set(companies.map(c => c.sector))];

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSector = selectedSector === 'All' || company.sector === selectedSector;
        return matchesSearch && matchesSector;
    });

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Listed Companies</h1>
                    <p className="text-gray-400">Explore and analyze companies listed on the Colombo Stock Exchange.</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
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
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
                        {sectors.map(sector => (
                            <button
                                key={sector}
                                onClick={() => setSelectedSector(sector)}
                                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${selectedSector === sector
                                    ? 'bg-accent-cyan text-primary-dark font-medium'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCompanies.map((company) => (
                        <Card key={company.symbol} className="hover:border-accent-cyan/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-white">{company.symbol}</h3>
                                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{company.sector}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 truncate w-48">{company.name}</p>
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${company.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                    {company.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    {company.changePercent.toFixed(2)}%
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Current Price</p>
                                    <p className="text-2xl font-bold text-white">LKR {company.price.toFixed(2)}</p>
                                </div>
                                <div className={`text-sm ${company.change >= 0 ? 'text-accent-green' : 'text-red-500'}`}>
                                    {company.change > 0 ? '+' : ''}{company.change.toFixed(2)}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Link to={`/company/${company.symbol}`} className="flex-1">
                                    <Button variant="outline" className="w-full justify-center group-hover:bg-accent-cyan group-hover:text-primary-dark group-hover:border-accent-cyan transition-all">
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
                        <h3 className="text-xl font-bold text-white mb-2">No companies found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CompaniesPage;
