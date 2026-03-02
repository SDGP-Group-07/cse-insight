import React, { useEffect, useMemo, useState } from 'react';
import Card from '../common/Card';
import { Settings, Maximize2, Share2, Save } from 'lucide-react';
import TradingViewWidget from './TradingViewWidget';
import companyService from '../../services/companyService';

const getSymbolFromCompany = (company) => {
    if (!company) {
        return null;
    }

    return (
        company.symbol ||
        company.ticker ||
        company.code ||
        company.instrument ||
        null
    );
};

const toTradingViewSymbol = (rawSymbol) => {
    if (!rawSymbol) {
        return 'CSELK:JKH.N0000';
    }

    if (rawSymbol.includes(':')) {
        return rawSymbol;
    }

    return `CSELK:${rawSymbol}`;
};

const TechnicalAnalysis = () => {
    const [chartType, setChartType] = useState('area');
    const [indicators, setIndicators] = useState({ sma: false, ema: false, vol: true });
    const [selectedSymbol, setSelectedSymbol] = useState('CSELK:JKH.N0000');

    useEffect(() => {
        let isMounted = true;

        const loadCompanies = async () => {
            try {
                const response = await companyService.getCompanies();
                const companies = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response?.data?.data)
                        ? response.data.data
                        : [];

                if (!companies.length || !isMounted) {
                    return;
                }

                const firstSymbol = getSymbolFromCompany(companies[0]);
                if (firstSymbol) {
                    setSelectedSymbol(toTradingViewSymbol(firstSymbol));
                }
            } catch (error) {
                console.error('Failed to load companies for technical analysis:', error);
            }
        };

        loadCompanies();

        return () => {
            isMounted = false;
        };
    }, []);

    const tradingViewSymbol = useMemo(() => toTradingViewSymbol(selectedSymbol), [selectedSymbol]);

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Technical Analysis</h1>
                    <div className="flex gap-2">
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

                    <Card className="lg:col-span-3 h-full flex flex-col">
                        <div className="flex-1 w-full min-h-0 flex items-center justify-center">
                            <TradingViewWidget symbol={tradingViewSymbol} />
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default TechnicalAnalysis;