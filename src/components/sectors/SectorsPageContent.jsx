import React, { useEffect, useState } from "react";
import { Loader, Info } from "lucide-react";
import sectorService from "../../services/sectorService";
import SectorInsightCard from "./SectorInsightCard";

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

          <p className="text-gray-400">Real-time aggregated analytics across CSE industries</p>
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

export default SectorsPageContent;
