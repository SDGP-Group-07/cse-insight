import React from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    Loader
} from 'lucide-react';
import Card from '../components/common/Card';
import { MarketDataProvider, useMarketData } from '../context/MarketDataContext';

// --- DATA MODEL WRAPPER ---
const aggregatedSectorsMock = [
    {
        success: true,
        data: {
            header: {
                sectorId: "238",
                indexCodeSp: "SPCSEBP",
                sectorName: "Banks",
                indexValue: 1954.36,
                change: -22.03,
                percentage: -1.114658544113257
            },
            valuation: { pe: 5.3, pb: 0.9, dividendYield: 3.4, companiesListed: 17, companiesTraded: 17 },
            insights: {
                totalMarketCap: 1174478749144.75,
                weightedBeta: 1.5004372450458479,
                advancers: 5,
                decliners: 11,
                unchanged: 1,
                topContributor: { symbol: "COMB.N0000", turnover: 535632864 }
            }
        }
    },
    {
        success: true,
        data: {
            header: {
                sectorId: "223",
                indexCodeSp: "SPCSEEIP",
                sectorName: "Energy",
                indexValue: 3257.18,
                change: 10.31,
                percentage: 0.3175
            },
            valuation: { pe: 12.9, pb: 1.2, dividendYield: 2.6, companiesListed: 3, companiesTraded: 3 },
            insights: {
                totalMarketCap: 100418335803.2,
                weightedBeta: 0.0902,
                advancers: 2,
                decliners: 1,
                unchanged: 0,
                topContributor: { symbol: "LGL.N0000", turnover: 9135353 }
            }
        }
    }
];

const SectorInsightCard = ({ sectorResponse }) => {
    const { header, valuation, insights } = sectorResponse.data;

    const formatCurrency = (val) => {
        if (val >= 1e12) return `${(val / 1e12).toFixed(2)}T`;
        if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
        return val.toLocaleString();
    };

    const isNegative = header.change < 0;

    return (
        <Card className="p-6 group hover:bg-white/10 transition-all">

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                        {header.indexCodeSp}
                    </span>

                    <h3 className="text-xl font-black text-white mt-2 group-hover:text-accent-cyan transition-colors">
                        {header.sectorName}
                    </h3>
                </div>

                <div className="text-right">
                    <div className="text-lg font-mono font-bold text-white tracking-tighter">
                        {header.indexValue.toLocaleString()}
                    </div>

                    <div className={`flex items-center justify-end gap-1 text-[11px] font-bold ${isNegative ? 'text-red-500' : 'text-accent-green'}`}>
                        {isNegative ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                        {header.percentage.toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Market Cap</p>
                    <p className="text-sm font-bold text-white">
                        LKR {formatCurrency(insights.totalMarketCap)}
                    </p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Weighted Beta</p>
                    <p className={`text-sm font-bold ${insights.weightedBeta > 1.2 ? 'text-red-500' : 'text-accent-green'}`}>
                        {insights.weightedBeta.toFixed(2)}
                    </p>
                </div>

            </div>

            {/* Valuation */}
            <div className="space-y-3 mb-6">

                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400 font-bold uppercase">P/E Ratio</span>
                    <span className="text-accent-green font-bold font-mono">{valuation.pe}x</span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-400 font-bold uppercase">Dividend Yield</span>
                    <span className="text-accent-cyan font-bold font-mono">{valuation.dividendYield}%</span>
                </div>

                {/* Breadth */}
                <div className="pt-2">
                    <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/10">

                        <div
                            style={{ width: `${(insights.advancers / valuation.companiesListed) * 100}%` }}
                            className="bg-accent-green"
                        />

                        <div
                            style={{ width: `${(insights.unchanged / valuation.companiesListed) * 100}%` }}
                            className="bg-gray-500"
                        />

                        <div
                            style={{ width: `${(insights.decliners / valuation.companiesListed) * 100}%` }}
                            className="bg-red-500"
                        />

                    </div>

                    <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-500 uppercase">
                        <span>{insights.advancers} Up</span>
                        <span>{insights.decliners} Down</span>
                    </div>
                </div>

            </div>

            {/* Top Contributor */}
            <div className="pt-4 border-t border-white/10">
                <p className="text-[9px] text-gray-400 font-bold uppercase mb-2">
                    Top Contributor
                </p>

                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-accent-cyan">
                        {insights.topContributor.symbol}
                    </span>

                    <span className="text-[10px] font-mono text-gray-400">
                        {(insights.topContributor.turnover / 1e6).toFixed(1)}M
                    </span>
                </div>
            </div>

        </Card>
    );
};

const SectorsPageContent = () => {
    const { loading } = useMarketData();

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-dark flex items-center justify-center">
                <Loader className="w-10 h-10 text-accent-cyan animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans pt-24 pb-12">

            <div className="container mx-auto px-6">

                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">
                        Market Sectors
                    </h1>

                    <p className="text-gray-400">
                        Real-time aggregated analytics across CSE industries
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {aggregatedSectorsMock.map((sectorResponse, index) => (
                        <SectorInsightCard
                            key={index}
                            sectorResponse={sectorResponse}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

const SectorsPage = () => {
    return (
        <MarketDataProvider>
            <SectorsPageContent />
        </MarketDataProvider>
    );
};

export default SectorsPage;