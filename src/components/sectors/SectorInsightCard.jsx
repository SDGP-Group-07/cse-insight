import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

const SectorInsightCard = ({ sectorResponse }) => {
  const { header, valuation, insights } = sectorResponse.data;

  const isNegative = header?.change < 0;
  const sectorId = header?.sectorId;

  const formatCap = (val) => {
    if (!val) return "-";
    if (val >= 1e12) return (val / 1e12).toFixed(2) + "T";
    if (val >= 1e9) return (val / 1e9).toFixed(2) + "B";
    return val.toLocaleString();
  };

  const advWidth = (insights.advancers / valuation.companiesListed) * 100 || 0;
  const uncWidth = (insights.unchanged / valuation.companiesListed) * 100 || 0;
  const decWidth = (insights.decliners / valuation.companiesListed) * 100 || 0;

  return (
    <Link
      to={`/companies?sector=${sectorId}`}
      className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
      aria-label={`View companies in ${header?.sectorName ?? "selected"} sector`}
    >
      <Card className="relative overflow-hidden p-0 hover:border-accent-cyan/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
        <div className="p-5 border-b border-white/10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  {header.sectorName}
                  <span className="text-gray-400 ml-1 text-sm">#{header.sectorId}</span>
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
                {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                {header.change} ({header.percentage.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>

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

        <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10">
          <div className="p-4 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Valuation
            </p>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">P/E Ratio</span>
              <span className="font-semibold text-white">{valuation.pe}x</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">P/B Ratio</span>
              <span className="font-semibold text-white">{valuation.pb}x</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Div. Yield</span>
              <span className="font-semibold text-accent-green">{valuation.dividendYield}%</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Insights
            </p>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Market Cap</span>
              <span className="font-semibold text-white">{formatCap(insights.totalMarketCap)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Wtd. Beta</span>
              <span className="font-semibold text-white">{insights.weightedBeta.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Companies</span>
              <span className="font-semibold text-white">
                {valuation.companiesTraded} / {valuation.companiesListed}
              </span>
            </div>
          </div>
        </div>

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

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/35 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 rounded-md border border-accent-cyan/25 bg-primary-dark/65 px-3 py-2 backdrop-blur-[1px]">
            <p className="text-[11px] font-semibold text-accent-cyan/90 tracking-wide uppercase">
              Click to view sector companies
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default SectorInsightCard;
