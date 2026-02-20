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
    return 'N/A';
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

const normalizeCompany = (payload, symbolFallback) => {
  const info = payload?.reqSymbolInfo ?? {};
  const betaInfo = payload?.reqSymbolBetaInfo ?? {};

  const price = parseNumber(info.lastTradedPrice ?? info.closingPrice ?? 0);
  const change = parseNumber(info.change ?? 0);
  const changePercent = parseNumber(
    info.changePercentage ?? info.changePercent ?? 0,
  );
  const high52 = parseNumber(
    info.p12HiPrice ?? info.ytdHiPrice ?? info.allHiPrice ?? info.hiTrade ?? 0,
  );
  const low52 = parseNumber(
    info.p12LowPrice ??
      info.ytdLowPrice ??
      info.allLowPrice ??
      info.lowTrade ??
      0,
  );

  return {
    symbol: info.symbol ?? payload?.symbol ?? symbolFallback ?? '',
    name: info.name ?? payload?.name ?? '',
    sector: payload?.sector ?? 'Unknown',
    price,
    change,
    changePercent,
    high52,
    low52,
    marketCap: formatShortNumber(info.marketCap ?? 0),
    totalMarketCap: parseNumber(info.marketCapPercentage ?? 0) * 100,
    hiTrade: parseNumber(info.hiTrade ?? 0),
    lowTrade: parseNumber(info.lowTrade ?? 0),
    peRatio: parseNumber(payload?.peRatio ?? 0),
    eps: parseNumber(payload?.eps ?? 0),
    dividendYield: parseNumber(payload?.dividendYield ?? 0),
    beta: parseNumber(betaInfo.triASIBetaValue ?? betaInfo.betaValueSPSL ?? 0),
    sharesOutstanding: formatShortNumber(
      info.symbolIndexShareVolume ?? info.quantityIssued ?? 0,
    ),
    description:
      payload?.description ?? 'Company description is not available yet.',
    website: payload?.website ?? '',
    logoPath: payload?.reqLogo?.path ?? null,
  };
};

const normalizeCompanyProfile = (payload, symbolFallback) => {
  const profile = payload ?? {};
  const summary = Array.isArray(profile.businessSummary)
    ? profile.businessSummary[0]?.body
    : undefined;

  return {
    symbol: profile.symbol ?? symbolFallback ?? '',
    name: profile.name ?? '',
    sector: profile.sector ?? 'Unknown',
    website: profile.web ?? profile.website ?? '',
    description: summary ?? 'Company description is not available yet.',
  };
};

const companyService = {
  getFinancials: async (symbol) => {
    // return api.get(`/companies/${symbol}/financials`);
    return Promise.resolve([
      { period: 'Q3 2024', revenue: '45.2B', profit: '4.5B', eps: '3.20' },
      { period: 'Q2 2024', revenue: '42.1B', profit: '3.8B', eps: '2.80' },
      { period: 'Q1 2024', revenue: '40.5B', profit: '3.5B', eps: '2.50' },
      { period: 'Q4 2023', revenue: '48.0B', profit: '5.1B', eps: '3.80' },
    ]);
  },

  getNews: async (symbol) => {
    // return api.get(`/companies/${symbol}/news`);
    return Promise.resolve([
      {
        id: 1,
        title: `${symbol} declares interim dividend`,
        date: '2 hours ago',
        source: 'CSE',
      },
      {
        id: 2,
        title: 'Quarterly profits rise by 15%',
        date: '1 day ago',
        source: 'Daily FT',
      },
      {
        id: 3,
        title: 'New strategic partnership announced',
        date: '3 days ago',
        source: 'Reuters',
      },
    ]);
  },

  getCompanies: async (sectorId = null) => {
    const params = new URLSearchParams();
    if (sectorId && sectorId !== 'all') {
      params.append('sectorId', sectorId);
    }
    const queryString = params.toString();
    const url = queryString
      ? `/cse/companies?${queryString}`
      : '/cse/companies';
    return await api.get(url);
  },

  getSectors: async () => {
    const response = await api.get('/cse/sectors');
    const data = unwrapApiData(response);
    const list = Array.isArray(data?.indicesList)
      ? data.indicesList
      : Array.isArray(data)
        ? data
        : [];
    return list;
  },

  getCompany: async (symbol) => {
    const [companyResponse, profileResponse] = await Promise.all([
      api.get(`/cse/company/${symbol}`),
      api.get(`/cse/company-profile/${symbol}`),
    ]);
    const companyData = unwrapApiData(companyResponse);
    const profileData = unwrapApiData(profileResponse);

    const base = normalizeCompany(companyData, symbol);
    const profile = normalizeCompanyProfile(profileData, symbol);

    return {
      ...base,
      ...profile,
      symbol: profile.symbol || base.symbol,
      name: profile.name || base.name,
    };
  },

  getCompanyProfile: async (symbol) => {
    const response = await api.get(`/cse/company-profile/${symbol}`);
    const data = unwrapApiData(response);
    return normalizeCompanyProfile(data, symbol);
  },
};

export default companyService;
