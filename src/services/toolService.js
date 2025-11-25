import api from './api';

const toolService = {
    getDividendCalendar: async () => {
        // return api.get('/dividends/calendar');
        return Promise.resolve([
            { id: 1, symbol: 'JKH', company: 'John Keells Holdings', type: 'Final', amount: 1.50, exDate: '2024-11-28', payDate: '2024-12-15' },
            { id: 2, symbol: 'COMB', company: 'Commercial Bank', type: 'Interim', amount: 2.00, exDate: '2024-11-30', payDate: '2024-12-18' },
            { id: 3, symbol: 'SAMP', company: 'Sampath Bank', type: 'Final', amount: 3.25, exDate: '2024-12-05', payDate: '2024-12-22' },
            { id: 4, symbol: 'HNB', company: 'Hatton National Bank', type: 'Interim', amount: 4.00, exDate: '2024-12-10', payDate: '2024-12-28' },
            { id: 5, symbol: 'DIAL', company: 'Dialog Axiata', type: 'Final', amount: 0.80, exDate: '2024-12-12', payDate: '2025-01-05' },
        ]);
    },

    getBrokers: async () => {
        // return api.get('/brokers');
        return Promise.resolve([
            {
                id: 1,
                name: 'John Keells Stock Brokers',
                license: 'TM-001',
                rating: 4.8,
                location: 'Colombo 02',
                phone: '+94 11 234 5678',
                website: 'www.jksb.com',
                onlineTrading: true,
                mobileApp: true,
                minDeposit: 'LKR 100,000',
                fees: '0.64% - 1.12%'
            },
            // ... other brokers
        ]);
    },

    getTechnicalData: async (symbol) => {
        // return api.get(`/technical/${symbol}`);
        // Mock data generation
        const data = [];
        let price = 100;
        for (let i = 0; i < 50; i++) {
            price = price + (Math.random() - 0.5) * 5;
            data.push({
                date: i,
                price: price,
                sma: price + (Math.random() - 0.5) * 2,
                ema: price + (Math.random() - 0.5) * 3,
                volume: Math.floor(Math.random() * 5000) + 1000
            });
        }
        return Promise.resolve(data);
    }
};

export default toolService;
