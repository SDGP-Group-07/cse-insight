import api from './api';

const unwrapApiData = (response) => {
  if (!response) {
    return null;
  }
  if (
    response.data &&
    Object.prototype.hasOwnProperty.call(response.data, 'data')
  ) {
    return response.data.data;
  }
  return response.data ?? response;
};

const parseNumber = (value, fallback = 0) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/,/g, '');
    const parsed = Number(cleaned);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

const formatShortNumber = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  const num = parseNumber(value, NaN);
  if (Number.isNaN(num)) {
    return String(value);
  }
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toFixed(0);
};

const normalizeIndexData = (raw) => ({
  value: parseNumber(raw?.value ?? raw?.indexValue ?? raw?.currentValue ?? 0),
  change: parseNumber(raw?.change ?? raw?.changeValue ?? raw?.priceChange ?? 0),
  changePercent: parseNumber(
    raw?.changePercent ?? raw?.changePercentage ?? raw?.percentageChange ?? 0,
  ),
});

const normalizeStock = (raw) => ({
  symbol: raw?.symbol ?? raw?.stockCode ?? raw?.securityCode ?? '',
  name: raw?.name ?? raw?.securityName ?? raw?.companyName ?? '',
  price: parseNumber(raw?.price ?? raw?.lastTradedPrice ?? raw?.lastPrice ?? 0),
  change: parseNumber(raw?.change ?? raw?.priceChange ?? raw?.changeValue ?? 0),
  changePercent: parseNumber(
    raw?.changePercent ??
      raw?.changePercentage ??
      raw?.percentageChange ??
      0,
  ),
  volume:
    raw?.volume ??
    raw?.sharevolume ??
    raw?.tradevolume ??
    raw?.tradeVolume ??
    raw?.volumeTraded ??
    '',
  previousClose: parseNumber(
    raw?.previousClose ?? raw?.closingPrice ?? raw?.previous_close ?? 0,
  ),
  open: parseNumber(raw?.open ?? raw?.openingPrice ?? 0),
  high: parseNumber(raw?.high ?? raw?.highPrice ?? 0),
  low: parseNumber(raw?.low ?? raw?.lowPrice ?? 0),
  sharevolume: parseNumber(raw?.sharevolume ?? raw?.crossingVolume ?? 0),
  tradevolume: parseNumber(raw?.tradevolume ?? raw?.crossingTradeVol ?? 0),
  turnover: parseNumber(raw?.turnover ?? raw?.tradeTurnover ?? raw?.valueTraded ?? 0),
  lastTradedTime: raw?.lastTradedTime ?? raw?.lastTradedAt ?? raw?.lastTradedTimestamp ?? null,
});

const normalizeMover = (raw) => ({
  symbol: raw?.symbol ?? raw?.stockCode ?? raw?.securityCode ?? '',
  price: parseNumber(raw?.price ?? raw?.lastTradedPrice ?? raw?.lastPrice ?? 0),
  changePercent: parseNumber(
    raw?.changePercent ?? raw?.changePercentage ?? raw?.percentageChange ?? 0,
  ),
});

const normalizeSector = (raw) => ({
  name: raw?.name ?? raw?.sectorName ?? raw?.sector ?? '',
  change: parseNumber(
    raw?.change ?? raw?.changePercentage ?? raw?.percentageChange ?? 0,
  ),
});

const marketService = {
  getIndices: async () => {
    const [aspiResponse, snpResponse, summaryResponse] = await Promise.all([
      api.get('/cse/aspi'),
      api.get('/cse/snp'),
      api.get('/cse/market-summary'),
    ]);

    const aspiRaw = unwrapApiData(aspiResponse);
    const snpRaw = unwrapApiData(snpResponse);
    const summaryRaw = unwrapApiData(summaryResponse);

    return {
      aspi: normalizeIndexData(aspiRaw),
      sp20: normalizeIndexData(snpRaw),
      turnover: formatShortNumber(
        summaryRaw?.turnover ??
          summaryRaw?.marketTurnover ??
          summaryRaw?.totalTurnover,
      ),
      trades: parseNumber(
        summaryRaw?.trades ??
          summaryRaw?.totalTrades ??
          summaryRaw?.tradeCount ??
          0,
      ),
      lastUpdated: new Date().toISOString(),
    };
  },

  getStocks: async () => {
    return marketService.getMarketSummary();
  },

  getTopGainers: async () => {
    const response = await api.get('/cse/top-gainers');
    const data = unwrapApiData(response) ?? [];
    return Array.isArray(data) ? data.map(normalizeMover) : [];
  },

  getTopLosers: async () => {
    const response = await api.get('/cse/top-losers');
    const data = unwrapApiData(response) ?? [];
    return Array.isArray(data) ? data.map(normalizeMover) : [];
  },

  getSectorPerformance: async () => {
    const response = await api.get('/cse/sectors');
    const data = unwrapApiData(response) ?? [];
    return Array.isArray(data) ? data.map(normalizeSector) : [];
  },

  getMarketSummary: async () => {
    const response = await api.get('/cse/trade-summary');
    const data = unwrapApiData(response);
    const rows = Array.isArray(data)
      ? data
      : Array.isArray(data?.reqTradeSummery)
        ? data.reqTradeSummery
        : Array.isArray(data?.data)
          ? data.data
        : [];
    return rows.map(normalizeStock);
  },

  createRefreshTimer: (callback, intervalMs) => {
    const timerId = setInterval(() => {
      callback();
    }, intervalMs);
    return () => clearInterval(timerId);
  },
};

export default marketService;
