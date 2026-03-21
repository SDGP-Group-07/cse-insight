import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import TradingViewWidget from '../components/TechnicalAnalysis/TradingViewWidget';
import CompanySearchDropdown from '../components/TechnicalAnalysis/CompanySearchDropdown';
import { Settings, Maximize2, Share2, Save, Info } from 'lucide-react';

const TechnicalAnalysis = () => {
    const [selectedCompanySymbol, setSelectedCompanySymbol] = useState('');

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">Technical Analysis</h1>
                        <a
                            href="/wiki/Technical%20analysis%20gauge"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open technical analysis wiki article"
                            title="Learn technical analysis gauge"
                            className="inline-flex items-center justify-center rounded-full bg-accent-cyan/10 border border-accent-cyan/20 p-1.5 text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                        >
                            <Info size={16} />
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
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
                                <label className="block text-sm text-gray-400 mb-2">Company</label>
                                <CompanySearchDropdown
                                    value={selectedCompanySymbol}
                                    onChange={setSelectedCompanySymbol}
                                />
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
