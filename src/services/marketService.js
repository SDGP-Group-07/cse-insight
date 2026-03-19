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
  marketCap: parseNumber(raw?.marketCap ?? 0),
  marketCapPercentage: parseNumber(raw?.marketCapPercentage ?? 0),
});

const normalizeMover = (raw) => ({
  symbol: raw?.symbol ?? raw?.stockCode ?? raw?.securityCode ?? '',
  price: parseNumber(raw?.price ?? raw?.lastTradedPrice ?? raw?.lastPrice ?? 0),
  changePercent: parseNumber(
    raw?.changePercent ?? raw?.changePercentage ?? raw?.percentageChange ?? 0,
  ),
  changePercent: parseNumber(
    raw?.changePercent ??
    raw?.changePercentage ??
    raw?.percentageChange ??
    0
  ),
  tradeDate:
    raw?.tradeDate ??
    raw?.lastTradedTime ??
    raw?.lastTradedAt ??
    null,
  shareVolume: parseNumber(
    raw?.shareVolume ??
    raw?.volume ??
    raw?.tradeVolume ??
    0
  ),
  percentageShareVolume: parseNumber(
    raw?.percentageShareVolume ??
    raw?.percentageVolume ??
    0
  ),
  marketCap: parseNumber(raw?.marketCap ?? 0),
  marketCapPercentage: parseNumber(raw?.marketCapPercentage ?? 0),
});

const normalizeSector = (raw) => ({
  name: raw?.name ?? raw?.sectorName ?? raw?.sector ?? '',
  change: parseNumber(
    raw?.change ?? raw?.changePercentage ?? raw?.percentageChange ?? 0,
  ),
});

const marketService = {
  getIndices: async () => {
    const [aspiResponse, snpResponse, summaryResponse, statusResponse, dailyResponse] = await Promise.all([
      api.get('/cse/aspi'),
      api.get('/cse/snp'),
      api.get('/cse/market-summary'),
      api.get('/cse/market-status'),
      api.get('/cse/daily-market-summary'),
    ]);

    const aspiRaw = unwrapApiData(aspiResponse);
    const snpRaw = unwrapApiData(snpResponse);
    const summaryRaw = unwrapApiData(summaryResponse);

    // Extract from daily market summary (more reliable)
    let dailyData = null;
    const dailyRaw = unwrapApiData(dailyResponse);
    if (Array.isArray(dailyRaw) && dailyRaw.length > 0) {
      const mostRecentDay = dailyRaw[0];
      if (Array.isArray(mostRecentDay) && mostRecentDay.length > 0) {
        dailyData = mostRecentDay[0];
      }
    }

    return {
      aspi: normalizeIndexData(aspiRaw),
      sp20: normalizeIndexData(snpRaw),
      shareVolume: parseNumber(
        dailyData?.volumeOfTurnOverNumber ??
        summaryRaw?.shareVolume ?? 0
      ),
      turnover: formatShortNumber(
        dailyData?.marketTurnover ??
        summaryRaw?.tradeVolume ??
        summaryRaw?.turnover ??
        summaryRaw?.marketTurnover ??
        summaryRaw?.totalTurnover,
      ),
      trades: parseNumber(
        dailyData?.marketTrades ??
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

  getMostActive: async () => {
    const response = await api.get('/cse/most-active');
    const data = unwrapApiData(response) ?? [];
    return Array.isArray(data) ? data.map(normalizeMover) : [];
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

    const rows =
      Array.isArray(data?.reqByMarketcap)
        ? data.reqByMarketcap
        : Array.isArray(data?.reqTradeSummery)
          ? data.reqTradeSummery
          : [];
    console.log(data);
    return rows.map(normalizeStock);

  },

  getMarketCap: async () => {
    const response = await api.get('/cse/market-cap');
    const data = unwrapApiData(response);

    const rows = Array.isArray(data?.reqByMarketcap)
      ? data.reqByMarketcap
      : [];

    return rows.map(normalizeStock);
  },

  getMarketStatus: async () => {
    const response = await api.get('/cse/market-status');
    const data = unwrapApiData(response);
    if (!data) return null;
    if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'status')) {
      return data.status;
    }
    // In case the API returns a plain string
    if (typeof data === 'string') return data;
    return null;
  },

  getDailyMarketSummary: async () => {
    const response = await api.get('/cse/daily-market-summary');
    const data = unwrapApiData(response);
    if (!Array.isArray(data) || data.length === 0) return null;

    const mostRecentDay = data[0];
    if (!Array.isArray(mostRecentDay) || mostRecentDay.length === 0) return null;

    const summary = mostRecentDay[0];
    return {
      turnover: summary?.marketTurnover ?? 0,
      shareVolume: summary?.volumeOfTurnOverNumber ?? 0,
      trades: summary?.marketTrades ?? 0,
    };
  },

  getFinancialAnnouncements: async () => {
    const response = await api.get('/cse/announcements/financial');
    const data = unwrapApiData(response);
    if (!data) return [];

    // Handle the API typo: reqFinancialAnnouncemnets
    const announcements = data.reqFinancialAnnouncemnets ?? data.announcements ?? [];
    if (!Array.isArray(announcements)) return [];
    const buildFileUrl = (path) => {
      if (!path || typeof path !== "string") return "";

      if (/^https?:\/\//i.test(path)) return path;

      return `https://cdn.cse.lk/${path.replace(/^\/+/, "")}`;
    };

    return announcements.map((item) => ({
      id: item.id,
      name: item.name ?? item.symbol ?? "Unknown",
      symbol: item.symbol ?? "",
      title: item.fileText ?? "",
      uploadedDate: item.uploadedDate ?? "",
      logoUrl: item.logoUrl ?? "",
      path: item.path ?? "",
      url: buildFileUrl(item.path), // ⭐ full PDF link
    }));
    
    return announcements.map((item) => ({
      id: item.id,
      name: item.name ?? item.symbol ?? 'Unknown',
      symbol: item.symbol ?? '',
      title: item.fileText ?? '',
      uploadedDate: item.uploadedDate ?? '',
      logoUrl: item.logoUrl ?? '',
      path: item.path ?? '',
    }));
  },

  createRefreshTimer: (callback, intervalMs) => {
    const timerId = setInterval(() => {
      callback();
    }, intervalMs);
    return () => clearInterval(timerId);
  },
};

export default marketService;
