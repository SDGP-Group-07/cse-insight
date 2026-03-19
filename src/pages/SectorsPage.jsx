import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Loader, Info } from "lucide-react";
import Card from "../components/common/Card";
import { MarketDataProvider } from "../context/MarketDataContext";
import sectorService from "../services/sectorService";

/* =============Sector Card Component=============== */

const SectorInsightCard = ({ sectorResponse }) => {
  const { header, valuation, insights } = sectorResponse.data;

  const isNegative = header?.change < 0;

  const formatCap = (val) => {
    if (!val) return "-";
    if (val >= 1e12) return (val / 1e12).toFixed(2) + "T";
    if (val >= 1e9) return (val / 1e9).toFixed(2) + "B";
    return val.toLocaleString();
  };

  const advWidth =
    (insights.advancers / valuation.companiesListed) * 100 || 0;
  const uncWidth =
    (insights.unchanged / valuation.companiesListed) * 100 || 0;
  const decWidth =
    (insights.decliners / valuation.companiesListed) * 100 || 0;

  return (
    <Card className="overflow-hidden p-0 hover:border-accent-cyan/40 transition-all">

      {/* HEADER */}
      <div className="p-5 border-b border-white/10">
        <div className="flex justify-between items-start">

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                {header.sectorName}
                <span className="text-gray-400 ml-1 text-sm">
                  #{header.sectorId}
                </span>
              </h2>
            </div>

            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
              Index: {header.indexCodeSp}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-white leading-none">
              {header.indexValue.toLocaleString()}
            </p>

            <p
              className={`text-sm font-medium flex items-center justify-end gap-1 mt-1 ${
                isNegative ? "text-red-500" : "text-accent-green"
              }`}
            >
              {isNegative ? (
                <ArrowDownRight size={14} />
              ) : (
                <ArrowUpRight size={14} />
              )}
              {header.change} ({header.percentage.toFixed(2)}%)
            </p>
          </div>

        </div>
      </div>

      {/* MARKET BREADTH */}
      <div className="px-5 py-4 bg-white/5">

        <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-2 text-gray-400">
          <span>Market Breadth</span>

          <div className="flex gap-3">
            <span className="text-accent-green">{insights.advancers} Adv</span>
            <span className="text-gray-400">{insights.unchanged} Unc</span>
            <span className="text-red-500">{insights.decliners} Dec</span>
          </div>
        </div>

        <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/10">
          <div style={{ width: `${advWidth}%` }} className="bg-accent-green" />
          <div style={{ width: `${uncWidth}%` }} className="bg-gray-500" />
          <div style={{ width: `${decWidth}%` }} className="bg-red-500" />
        </div>

      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">

        {/* VALUATION */}
        <div className="p-4 space-y-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            Valuation
          </p>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">P/E Ratio</span>
            <span className="font-semibold text-white">
              {valuation.pe}x
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">P/B Ratio</span>
            <span className="font-semibold text-white">
              {valuation.pb}x
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Div. Yield</span>
            <span className="font-semibold text-accent-green">
              {valuation.dividendYield}%
            </span>
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="p-4 space-y-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
            Insights
          </p>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Market Cap</span>
            <span className="font-semibold text-white">
              {formatCap(insights.totalMarketCap)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Wtd. Beta</span>
            <span className="font-semibold text-white">
              {insights.weightedBeta.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Companies</span>
            <span className="font-semibold text-white">
              {valuation.companiesTraded} / {valuation.companiesListed}
            </span>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="px-5 py-3 flex items-center justify-between bg-primary-dark/40 border-t border-white/10">

        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
          Top Contributor
        </div>

        <div className="flex gap-4 items-center">
          <span className="text-xs font-bold font-mono text-white">
            {insights.topContributor.symbol}
          </span>

          <div className="h-3 w-px bg-white/20" />

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-400 uppercase">Vol</span>
            <span className="text-xs font-bold text-accent-cyan">
              {(insights.topContributor.turnover / 1e6).toFixed(1)}M
            </span>
          </div>
        </div>

      </div>

    </Card>
  );
};

/* ============Page Content================*/

const SectorsPageContent = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        const data = await sectorService.getSectors();
        setSectors(data);
      } catch (error) {
        console.error("Failed to load sector insights", error);
      } finally {
        setLoading(false);
      }
    };

    loadSectors();
  }, []);

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
          <div className="flex items-center justify-between gap-4 mb-2">
            <h1 className="text-4xl font-bold">Market Sectors</h1>
            <a
              href="/wiki/Sector%20dashboard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open sector dashboard wiki article"
              title="Learn how to read sector cards"
              className="inline-flex items-center gap-2 rounded-full bg-[#2a233d]/90 border border-[#3e3753] px-3 py-2 text-[#9b96b2] hover:text-white hover:border-accent-cyan transition-colors"
            >
              <Info size={16} />
              <span className="text-xs font-medium uppercase tracking-wide">What is this?</span>
            </a>
          </div>

          <p className="text-gray-400">
            Real-time aggregated analytics across CSE industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <SectorInsightCard
              key={sector.header?.sectorId || index}
              sectorResponse={{ data: sector }}
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
