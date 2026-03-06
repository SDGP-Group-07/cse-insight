import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Loader } from "lucide-react";
import Card from "../components/common/Card";
import { MarketDataProvider } from "../context/MarketDataContext";
import sectorService from "../services/sectorService";

/* =============Sector Card Component=============== */

const SectorInsightCard = ({ sectorResponse }) => {
  const { header, valuation, insights } = sectorResponse.data;

  const formatCurrency = (val) => {
    if (!val) return "-";
    if (val >= 1e12) return `${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
    return val.toLocaleString();
  };

  const isNegative = header?.change < 0;

  const advancersWidth =
    (insights?.advancers / valuation?.companiesListed) * 100 || 0;
  const unchangedWidth =
    (insights?.unchanged / valuation?.companiesListed) * 100 || 0;
  const declinersWidth =
    (insights?.decliners / valuation?.companiesListed) * 100 || 0;

  return (
    <Card className="p-6 group hover:bg-white/10 transition-all">
      {/* Header */}


      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">
            Market Cap
          </p>
          <p className="text-sm font-bold text-white">
            LKR {formatCurrency(insights?.totalMarketCap)}
          </p>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">
            Weighted Beta
          </p>
          <p
            className={`text-sm font-bold ${
              insights?.weightedBeta > 1.2
                ? "text-red-500"
                : "text-accent-green"
            }`}
          >
            {insights?.weightedBeta?.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Valuation */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-gray-400 font-bold uppercase">P/E Ratio</span>
          <span className="text-accent-green font-bold font-mono">
            {valuation?.pe}x
          </span>
        </div>

        <div className="flex justify-between items-center text-[11px]">
          <span className="text-gray-400 font-bold uppercase">
            Dividend Yield
          </span>
          <span className="text-accent-cyan font-bold font-mono">
            {valuation?.dividendYield}%
          </span>
        </div>

        {/* Market Breadth */}
        <div className="pt-2">
          <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/10">
            <div
              style={{ width: `${advancersWidth}%` }}
              className="bg-accent-green"
            />

            <div
              style={{ width: `${unchangedWidth}%` }}
              className="bg-gray-500"
            />

            <div
              style={{ width: `${declinersWidth}%` }}
              className="bg-red-500"
            />
          </div>

          <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-500 uppercase">
            <span>{insights?.advancers} Up</span>
            <span>{insights?.decliners} Down</span>
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
            {insights?.topContributor?.symbol}
          </span>

          <span className="text-[10px] font-mono text-gray-400">
            {(insights?.topContributor?.turnover / 1e6).toFixed(1)}M
          </span>
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
          <h1 className="text-4xl font-bold mb-2">Market Sectors</h1>

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
