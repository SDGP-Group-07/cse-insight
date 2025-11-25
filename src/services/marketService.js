import api from './api';

const marketService = {
    getIndices: async () => {
        // return api.get('/market/indices');
        return Promise.resolve([
            { name: 'ASPI', value: 11245.32, change: 125.45, changePercent: 1.12, status: 'up' },
            { name: 'S&P SL20', value: 3245.12, change: -12.30, changePercent: -0.38, status: 'down' }
        ]);
    },

    getStocks: async () => {
        // return api.get('/market/stocks');
        return Promise.resolve([
            { id: 1, symbol: 'JKH', name: 'John Keells Holdings', price: 185.50, change: 2.50, changePercent: 1.35, volume: '1.2M' },
            { id: 2, symbol: 'COMB', name: 'Commercial Bank', price: 92.10, change: -0.40, changePercent: -0.43, volume: '850K' },
            { id: 3, symbol: 'SAMP', name: 'Sampath Bank', price: 74.30, change: 1.10, changePercent: 1.50, volume: '2.1M' },
            { id: 4, symbol: 'HNB', name: 'Hatton National Bank', price: 165.00, change: 0.00, changePercent: 0.00, volume: '450K' },
            { id: 5, symbol: 'DIAL', name: 'Dialog Axiata', price: 9.20, change: 0.10, changePercent: 1.09, volume: '5.4M' },
            { id: 6, symbol: 'EXPO', name: 'Expolanka Holdings', price: 145.75, change: -3.25, changePercent: -2.18, volume: '320K' },
            { id: 7, symbol: 'LOLC', name: 'LOLC Holdings', price: 380.25, change: 15.25, changePercent: 4.18, volume: '120K' },
            { id: 8, symbol: 'HAYL', name: 'Hayleys PLC', price: 88.90, change: 1.20, changePercent: 1.37, volume: '670K' },
        ]);
    },

    getTopGainers: async () => {
        // return api.get('/market/top-gainers');
        return Promise.resolve([
            { symbol: 'LOLC', price: 380.25, change: 4.18 },
            { symbol: 'SAMP', price: 74.30, change: 1.50 },
            { symbol: 'HAYL', price: 88.90, change: 1.37 },
        ]);
    },

    getTopLosers: async () => {
        // return api.get('/market/top-losers');
        return Promise.resolve([
            { symbol: 'EXPO', price: 145.75, change: -2.18 },
            { symbol: 'COMB', price: 92.10, change: -0.43 },
            { symbol: 'S&P SL20', price: 3245.12, change: -0.38 },
        ]);
    },

    getSectorPerformance: async () => {
        // return api.get('/market/sectors');
        return Promise.resolve([
            { name: 'Banking', change: 1.5 },
            { name: 'Telco', change: 0.8 },
            { name: 'Energy', change: -0.5 },
            { name: 'Insurance', change: 2.1 },
            { name: 'Food & Bev', change: -1.2 },
            { name: 'Transport', change: -0.3 },
        ]);
    }
};

export default marketService;
