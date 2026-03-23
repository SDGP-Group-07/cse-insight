import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import TradingViewWidget from '../components/TechnicalAnalysis/TradingViewWidget';
import CompanySearchDropdown from '../components/TechnicalAnalysis/CompanySearchDropdown';
import { Settings, Maximize2, Minimize2, Share2, Save, Check } from 'lucide-react';

const SELECTED_SYMBOL_KEY = 'technicalAnalysis:selectedSymbol';
const SELECTED_INTERVAL_KEY = 'technicalAnalysis:selectedInterval';

const TIMEFRAME_OPTIONS = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '12M' },
];

const getInitialSymbol = () => {
    if (typeof window === 'undefined') {
        return '';
    }

    const fromQuery = new URLSearchParams(window.location.search).get('symbol');
    if (fromQuery) {
        return fromQuery;
    }

    return localStorage.getItem(SELECTED_SYMBOL_KEY) || '';
};

const getInitialInterval = () => {
    if (typeof window === 'undefined') {
        return '1D';
    }

    const fromQuery = new URLSearchParams(window.location.search).get('interval');
    if (fromQuery) {
        return fromQuery;
    }

    return localStorage.getItem(SELECTED_INTERVAL_KEY) || '1D';
};

const TechnicalAnalysis = () => {
    const chartContainerRef = useRef(null);
    const [selectedCompanySymbol, setSelectedCompanySymbol] = useState(getInitialSymbol);
    const [selectedInterval, setSelectedInterval] = useState(getInitialInterval);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [actionState, setActionState] = useState({ type: '', message: '' });

    useEffect(() => {
        if (!selectedCompanySymbol) {
            return;
        }

        localStorage.setItem(SELECTED_SYMBOL_KEY, selectedCompanySymbol);
    }, [selectedCompanySymbol]);

    useEffect(() => {
        if (!selectedInterval) {
            return;
        }

        localStorage.setItem(SELECTED_INTERVAL_KEY, selectedInterval);
    }, [selectedInterval]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === chartContainerRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (!actionState.message) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setActionState({ type: '', message: '' });
        }, 1800);

        return () => window.clearTimeout(timer);
    }, [actionState]);

    const selectedSymbolLabel = useMemo(() => {
        if (!selectedCompanySymbol) {
            return 'No company selected';
        }

        return selectedCompanySymbol.includes(':')
            ? selectedCompanySymbol.split(':')[1]
            : selectedCompanySymbol;
    }, [selectedCompanySymbol]);

    const handleSave = () => {
        if (!selectedCompanySymbol) {
            setActionState({ type: 'info', message: 'Select a company first' });
            return;
        }

        localStorage.setItem(SELECTED_SYMBOL_KEY, selectedCompanySymbol);
        localStorage.setItem(SELECTED_INTERVAL_KEY, selectedInterval);
        setActionState({ type: 'success', message: 'Chart settings saved' });
    };

    const handleShare = async () => {
        if (!selectedCompanySymbol) {
            setActionState({ type: 'info', message: 'Select a company first' });
            return;
        }

        const shareUrl = new URL(window.location.href);
        shareUrl.searchParams.set('symbol', selectedCompanySymbol);
        shareUrl.searchParams.set('interval', selectedInterval);

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'CSE Insight Technical Analysis',
                    url: shareUrl.toString(),
                });
                setActionState({ type: 'success', message: 'Shared successfully' });
                return;
            }

            await navigator.clipboard.writeText(shareUrl.toString());
            setActionState({ type: 'success', message: 'Share link copied' });
        } catch {
            setActionState({ type: 'error', message: 'Unable to share right now' });
        }
    };

    const handleToggleFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                return;
            }

            if (chartContainerRef.current) {
                await chartContainerRef.current.requestFullscreen();
            }
        } catch {
            setActionState({ type: 'error', message: 'Fullscreen unavailable' });
        }
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Technical Analysis</h1>
                        <p className="text-sm text-gray-400 mt-1">Analyze market momentum with real-time technical signals</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleSave} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" title="Save Chart">
                            <Save size={20} />
                        </button>
                        <button onClick={handleShare} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" title="Share">
                            <Share2 size={20} />
                        </button>
                        <button onClick={handleToggleFullscreen} className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                        </button>
                    </div>
                </div>

                {actionState.message && (
                    <div className={`mb-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                        actionState.type === 'success'
                            ? 'border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan'
                            : actionState.type === 'error'
                                ? 'border-red-400/30 bg-red-400/10 text-red-300'
                                : 'border-white/15 bg-white/5 text-gray-300'
                    }`}>
                        {actionState.type === 'success' && <Check size={14} />}
                        <span>{actionState.message}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Sidebar Controls */}
                    <Card className="lg:col-span-1 h-full overflow-y-auto border border-white/10">
                        <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                            <Settings size={18} /> Chart Settings
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">Pick a company to refresh the technical view.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Company</label>
                                <CompanySearchDropdown
                                    value={selectedCompanySymbol}
                                    onChange={setSelectedCompanySymbol}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Main Chart Area */}
                    <Card className="lg:col-span-3 h-full flex flex-col p-0 overflow-hidden" hover={false}>
                        <div className="border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200">
                                <span className="h-2 w-2 rounded-full bg-accent-cyan" />
                                {selectedSymbolLabel}
                            </div>

                            <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
                                {TIMEFRAME_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setSelectedInterval(option.value)}
                                        className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                            selectedInterval === option.value
                                                ? 'bg-accent-cyan text-primary-dark font-semibold'
                                                : 'text-gray-300 hover:bg-white/10'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div ref={chartContainerRef} className="relative flex-1 w-full min-h-0 p-4">
                            {isChartLoading && selectedCompanySymbol && (
                                <div className="absolute inset-4 z-10 rounded-xl border border-white/10 bg-primary-dark/80 backdrop-blur-sm px-4 py-3">
                                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse mb-4" />
                                    <div className="space-y-3">
                                        <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                                        <div className="h-3 w-5/6 bg-white/10 rounded animate-pulse" />
                                        <div className="h-3 w-2/3 bg-white/10 rounded animate-pulse" />
                                    </div>
                                </div>
                            )}

                            <div className={`h-full transition-opacity duration-300 ${isChartLoading ? 'opacity-60' : 'opacity-100'}`}>
                                <TradingViewWidget
                                    symbol={selectedCompanySymbol}
                                    interval={selectedInterval}
                                    onLoadingChange={setIsChartLoading}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default TechnicalAnalysis;
 