import api from './api';

const companyService = {
    getCompanyDetails: async (symbol) => {
        // return api.get(`/companies/${symbol}`);

        // Mock Data Logic
        const mockCompanies = {
            'JKH': {
                symbol: 'JKH',
                name: 'John Keells Holdings PLC',
                sector: 'Capital Goods',
                price: 185.50,
                change: 2.50,
                changePercent: 1.35,
                high52: 205.00,
                low52: 160.00,
                marketCap: '250B',
                peRatio: 12.5,
                eps: 14.80,
                dividendYield: 3.2,
                beta: 1.1,
                sharesOutstanding: '1.3B',
                description: 'John Keells Holdings PLC is the largest listed conglomerate in Sri Lanka. From a modest beginning as a produce and exchange broker in the early 1870s, it now operates in 7 major industry sectors.',
                website: 'www.keells.com'
            },
            'COMB': {
                symbol: 'COMB',
                name: 'Commercial Bank of Ceylon PLC',
                sector: 'Banks',
                price: 92.10,
                change: -0.40,
                changePercent: -0.43,
                high52: 105.00,
                low52: 80.00,
                marketCap: '180B',
                peRatio: 8.4,
                eps: 10.95,
                dividendYield: 4.5,
                beta: 0.9,
                sharesOutstanding: '1.1B',
                description: 'Commercial Bank is the largest private bank in Sri Lanka and the only Sri Lankan bank to be ranked among the Top 1000 Banks of the World for 11 successive years.',
                website: 'www.combank.lk'
            }
        };

        return Promise.resolve(mockCompanies[symbol] || mockCompanies['JKH']);
    },

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
            { id: 1, title: `${symbol} declares interim dividend`, date: '2 hours ago', source: 'CSE' },
            { id: 2, title: 'Quarterly profits rise by 15%', date: '1 day ago', source: 'Daily FT' },
            { id: 3, title: 'New strategic partnership announced', date: '3 days ago', source: 'Reuters' },
        ]);
    }
};

export default companyService;
