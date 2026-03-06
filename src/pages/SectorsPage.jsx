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
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
            {header?.indexCodeSp}
          </span>

          <h3 className="text-xl font-black text-white mt-2 group-hover:text-accent-cyan transition-colors">
            {header?.sectorName}
          </h3>
        </div>

        <div className="text-right">
          <div className="text-lg font-mono font-bold text-white tracking-tighter">
            {header?.indexValue?.toLocaleString()}
          </div>

          <div
            className={`flex items-center justify-end gap-1 text-[11px] font-bold ${
              isNegative ? "text-red-500" : "text-accent-green"
            }`}
          >
            {isNegative ? (
              <ArrowDownRight size={12} />
            ) : (
              <ArrowUpRight size={12} />
            )}
            {header?.percentage?.toFixed(2)}%
          </div>
        </div>
      </div>

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




const SectorsPage = () => {
  return (
    <MarketDataProvider>
      <SectorsPageContent />
    </MarketDataProvider>
  );
};

export default SectorsPage;
