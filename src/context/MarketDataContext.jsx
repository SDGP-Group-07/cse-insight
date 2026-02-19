import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import marketService from '../services/marketService';

const MarketDataContext = createContext(null);

export const MarketDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({
    indices: {
      aspi: { value: 0, change: 0, changePercent: 0 },
      sp20: { value: 0, change: 0, changePercent: 0 },
      shareVolume: 0,
      turnover: '',
      trades: 0,
      lastUpdated: null,
    },
    marketStatus: '',
    stocks: [],
    gainers: [],
    losers: [],
    sectors: [],
    announcements: [],
  });

  const createSectionStatus = () => ({
    loading: false,
    error: null,
    empty: false,
  });
  const [status, setStatus] = useState({
    indices: createSectionStatus(),
    marketStatus: createSectionStatus(),
    stocks: createSectionStatus(),
    gainers: createSectionStatus(),
    losers: createSectionStatus(),
    sectors: createSectionStatus(),
    announcements: createSectionStatus(),
  });

  const refreshIntervalMs = 60_000;

  const updateStatus = (key, patch) => {
    setStatus((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...patch },
    }));
  };

  const loadSection = async (key, loader, applyData, isEmpty) => {
    updateStatus(key, { loading: true, error: null });
    try {
      const data = await loader();
      applyData(data);
      updateStatus(key, { loading: false, empty: isEmpty(data) });
    } catch (error) {
      updateStatus(key, {
        loading: false,
        error: error?.message ?? 'Request failed',
      });
    }
  };

  const sectionConfig = {
    indices: {
      loader: marketService.getIndices,
      apply: (indices) => setMarketData((prev) => ({ ...prev, indices })),
      isEmpty: (indices) => !indices || !indices.aspi,
    },
    stocks: {
      loader: marketService.getMarketSummary,
      apply: (stocks) => setMarketData((prev) => ({ ...prev, stocks })),
      isEmpty: (stocks) => !stocks || stocks.length === 0,
    },
    gainers: {
      loader: marketService.getTopGainers,
      apply: (gainers) => setMarketData((prev) => ({ ...prev, gainers })),
      isEmpty: (gainers) => !gainers || gainers.length === 0,
    },
    losers: {
      loader: marketService.getTopLosers,
      apply: (losers) => setMarketData((prev) => ({ ...prev, losers })),
      isEmpty: (losers) => !losers || losers.length === 0,
    },
    sectors: {
      loader: marketService.getSectorPerformance,
      apply: (sectors) => setMarketData((prev) => ({ ...prev, sectors })),
      isEmpty: (sectors) => !sectors || sectors.length === 0,
    },
    marketStatus: {
      loader: marketService.getMarketStatus,
      apply: (marketStatus) => setMarketData((prev) => ({ ...prev, marketStatus })),
      isEmpty: (s) => !s,
    },
    announcements: {
      loader: marketService.getFinancialAnnouncements,
      apply: (announcements) => setMarketData((prev) => ({ ...prev, announcements })),
      isEmpty: (announcements) => !announcements || announcements.length === 0,
    },
  };

  const refreshSection = async (key) => {
    const config = sectionConfig[key];
    if (!config) {
      return;
    }
    await loadSection(key, config.loader, config.apply, config.isEmpty);
  };

  const refreshAll = async () => {
    await Promise.allSettled(
      Object.keys(sectionConfig).map((key) => refreshSection(key)),
    );
  };

  useEffect(() => {
    refreshAll();
    const stopRefresh = marketService.createRefreshTimer(
      refreshAll,
      refreshIntervalMs,
    );
    return () => stopRefresh();
  }, []);

  const loading = useMemo(
    () => Object.values(status).some((section) => section.loading),
    [status],
  );

  return (
    <MarketDataContext.Provider
      value={{ marketData, loading, status, refreshAll, refreshSection }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within MarketDataProvider');
  }
  return context;
};
