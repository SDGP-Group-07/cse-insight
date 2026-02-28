import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import TradingViewWidget from '../components/TechnicalAnalysis/TradingViewWidget';
import companyService from '../services/companyService';
import { Settings, Maximize2, Share2, Save } from 'lucide-react';

const normalizeCompanySymbol = (symbol) => {
    if (!symbol) {
        return null;
    }

    if (symbol.includes(':')) {
        return symbol;
    }

    return `CSELK:${symbol}`;
};

const getRawCompanySymbol = (symbol) => {
    if (!symbol) {
        return null;
    }

    return symbol.includes(':') ? symbol.split(':')[1] : symbol;
};

const extractCompanies = (response) => {
    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }

    const payload = response?.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.companies)) return payload.companies;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.items)) return payload.items;

    return [];
};

const getCompanySymbol = (company) => {
    return (
        company?.symbol ||
        company?.ticker ||
        company?.code ||
        company?.instrument ||
        company?.symbolCode ||
        company?.securityCode ||
        company?.stockCode ||
        null
    );
};

const getCompanyName = (company) => {
    return (
        company?.name ||
        company?.companyName ||
        company?.displayName ||
        company?.securityName ||
        company?.stockName ||
        null
    );
};

const TechnicalAnalysis = () => {
    const [chartType, setChartType] = useState('area');
    const [indicators, setIndicators] = useState({ sma: false, ema: false, vol: true });
    const [companies, setCompanies] = useState([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
    const [companiesError, setCompaniesError] = useState('');
    const [selectedCompanySymbol, setSelectedCompanySymbol] = useState('CSELK:JKH.N0000');

    useEffect(() => {
        let isMounted = true;

        const loadCompanies = async () => {
            try {
                const response = await companyService.getCompanies();
                const companyList = extractCompanies(response);

                if (!isMounted) {
                    return;
                }

                setCompanies(companyList);
                if (companyList.length === 0) {
                    setCompaniesError('No companies returned from /api/cse/companies');
                } else {
                    setCompaniesError('');
                }

                if (companyList.length > 0) {
                    const firstSymbol = getCompanySymbol(companyList[0]);

                    const normalizedSymbol = normalizeCompanySymbol(firstSymbol);
                    if (normalizedSymbol) {
                        setSelectedCompanySymbol(normalizedSymbol);
                    }
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
                if (isMounted) {
                    setCompanies([]);
                    const serverMessage = error?.response?.data?.message || error?.message || 'Failed to load companies';
                    setCompaniesError(serverMessage);
                }
            } finally {
                if (isMounted) {
                    setIsLoadingCompanies(false);
                }
            }
        };

        loadCompanies();

        return () => {
            isMounted = false;
        };
    }, []);

    const companyOptions = useMemo(() => {
        return companies
            .map((company) => {
                const rawSymbol = getCompanySymbol(company);
                const normalizedSymbol = normalizeCompanySymbol(rawSymbol);
                const displaySymbol = getRawCompanySymbol(rawSymbol);

                if (!normalizedSymbol || !displaySymbol) {
                    return null;
                }

                const displayName = getCompanyName(company) || rawSymbol;

                return {
                    value: normalizedSymbol,
                    label: `${displaySymbol} - ${displayName}`,
                };
            })
            .filter(Boolean);
    }, [companies]);

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Technical Analysis</h1>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedCompanySymbol}
                            onChange={(event) => setSelectedCompanySymbol(event.target.value)}
                            className="max-w-[320px] bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                        >
                            {isLoadingCompanies && <option value={selectedCompanySymbol}>Loading companies...</option>}
                            {!isLoadingCompanies && companyOptions.length === 0 && (
                                <option value={selectedCompanySymbol}>No companies found</option>
                            )}
                            {!isLoadingCompanies && companyOptions.map((company) => (
                                <option key={company.value} value={company.value}>
                                    {company.label}
                                </option>
                            ))}
                        </select>
                        {!isLoadingCompanies && companiesError && (
                            <span className="text-xs text-red-400 max-w-[280px] truncate" title={companiesError}>
                                {companiesError}
                            </span>
                        )}
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Save Chart">
                            <Save size={20} />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Share">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="Fullscreen">
                            <Maximize2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Sidebar Controls */}
                    <Card className="lg:col-span-1 h-full overflow-y-auto">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Settings size={18} /> Chart Settings
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Chart Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setChartType('area')}
                                        className={`px-3 py-2 rounded text-sm ${chartType === 'area' ? 'bg-accent-cyan text-primary-dark font-bold' : 'bg-white/5 text-gray-300'}`}
                                    >
                                        Area
                                    </button>
                                    <button
                                        onClick={() => setChartType('line')}
                                        className={`px-3 py-2 rounded text-sm ${chartType === 'line' ? 'bg-accent-cyan text-primary-dark font-bold' : 'bg-white/5 text-gray-300'}`}
                                    >
                                        Line
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Indicators</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.sma}
                                            onChange={() => setIndicators({ ...indicators, sma: !indicators.sma })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">SMA (20)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.ema}
                                            onChange={() => setIndicators({ ...indicators, ema: !indicators.ema })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">EMA (50)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={indicators.vol}
                                            onChange={() => setIndicators({ ...indicators, vol: !indicators.vol })}
                                            className="rounded border-gray-600 bg-white/5 text-accent-cyan focus:ring-accent-cyan"
                                        />
                                        <span className="text-sm text-gray-300">Volume</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Drawing Tools</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Trend Line</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Fibonacci</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Rectangle</button>
                                    <button className="px-3 py-2 bg-white/5 rounded text-sm text-gray-300 hover:bg-white/10 text-left">Text</button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Main Chart Area */}
                    <Card className="lg:col-span-3 h-full flex flex-col">
                        <div className="flex-1 w-full min-h-0">
                            <TradingViewWidget symbol={selectedCompanySymbol} />
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default TechnicalAnalysis;
