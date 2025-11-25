import React, { createContext, useContext, useState, useEffect } from 'react';

const MarketDataContext = createContext(null);

export const MarketDataProvider = ({ children }) => {
    const [marketData, setMarketData] = useState({
        indices: {
            aspi: { value: 11250.45, change: 125.30, changePercent: 1.12 },
            sp20: { value: 3240.15, change: -12.50, changePercent: -0.38 },
            turnover: '2.5B',
            trades: 15420,
            lastUpdated: new Date().toISOString()
        },
        stocks: [
            {
                symbol: 'JKH',
                name: 'John Keells Holdings PLC',
                price: 195.50,
                change: 2.50,
                changePercent: 1.30,
                volume: '1.2M',
                turnover: '234.6M',
                high52: 210.00,
                low52: 165.00,
                marketCap: '250B',
                peRatio: 12.5,
                eps: 15.60,
                dividendYield: 2.5,
                beta: 1.1,
                sharesOutstanding: '1.3B',
                sector: 'Capital Goods',
                description: 'John Keells Holdings PLC is the largest listed conglomerate in Sri Lanka. From a modest beginning as a produce and exchange broker in the early 1870s, it has been known to constantly re-invent, re-align and reposition itself in exploring new frontiers while continuing to be inspired by our core values.',
                website: 'www.keells.com'
            },
            {
                symbol: 'COMB',
                name: 'Commercial Bank of Ceylon PLC',
                price: 92.10,
                change: -0.40,
                changePercent: -0.43,
                volume: '850K',
                turnover: '78.2M',
                high52: 105.00,
                low52: 75.00,
                marketCap: '180B',
                peRatio: 5.8,
                eps: 18.20,
                dividendYield: 6.5,
                beta: 0.9,
                sharesOutstanding: '1.2B',
                sector: 'Banks',
                description: 'Commercial Bank of Ceylon PLC is a leading commercial bank in Sri Lanka. It offers a wide range of financial services including personal banking, corporate banking, and international banking.',
                website: 'www.combank.lk'
            },
            { symbol: 'SAMP', name: 'Sampath Bank PLC', price: 76.80, change: 1.20, changePercent: 1.59, volume: '2.1M', turnover: '161.2M', high52: 85.00, low52: 60.00, marketCap: '140B', peRatio: 6.2, eps: 12.40, dividendYield: 5.8, beta: 1.0, sharesOutstanding: '1.1B', sector: 'Banks', description: 'Sampath Bank PLC is a licensed commercial bank incorporated in Sri Lanka.', website: 'www.sampath.lk' },
            { symbol: 'HNB', name: 'Hatton National Bank PLC', price: 185.00, change: 0.00, changePercent: 0.00, volume: '450K', turnover: '83.2M', high52: 200.00, low52: 150.00, marketCap: '160B', peRatio: 6.5, eps: 28.50, dividendYield: 4.5, beta: 0.95, sharesOutstanding: '500M', sector: 'Banks', description: 'HNB is a premier private sector commercial bank in Sri Lanka.', website: 'www.hnb.net' },
            { symbol: 'EXPO', name: 'Expolanka Holdings PLC', price: 145.25, change: -3.75, changePercent: -2.52, volume: '3.5M', turnover: '508.3M', high52: 240.00, low52: 130.00, marketCap: '280B', peRatio: 8.5, eps: 17.10, dividendYield: 1.2, beta: 1.5, sharesOutstanding: '1.9B', sector: 'Transportation', description: 'Expolanka Holdings PLC is a diversified conglomerate with interests in transportation, logistics, and leisure.', website: 'www.expolanka.com' },
            { symbol: 'LOLC', name: 'LOLC Holdings PLC', price: 420.00, change: 15.00, changePercent: 3.70, volume: '120K', turnover: '50.4M', high52: 550.00, low52: 350.00, marketCap: '400B', peRatio: 15.2, eps: 27.60, dividendYield: 0.8, beta: 1.8, sharesOutstanding: '475M', sector: 'Diversified Financials', description: 'LOLC Holdings PLC is one of the largest and most diversified conglomerates in Sri Lanka.', website: 'www.lolc.com' },
            { symbol: 'HAYL', name: 'Hayleys PLC', price: 88.50, change: 1.10, changePercent: 1.26, volume: '600K', turnover: '53.1M', high52: 110.00, low52: 70.00, marketCap: '95B', peRatio: 7.1, eps: 12.45, dividendYield: 3.2, beta: 1.2, sharesOutstanding: '750M', sector: 'Capital Goods', description: 'Hayleys PLC is a diversified multinational conglomerate.', website: 'www.hayleys.com' },
            { symbol: 'DIAL', name: 'Dialog Axiata PLC', price: 9.80, change: 0.10, changePercent: 1.03, volume: '5.4M', turnover: '52.9M', high52: 12.50, low52: 8.50, marketCap: '80B', peRatio: 9.5, eps: 1.03, dividendYield: 7.5, beta: 0.8, sharesOutstanding: '8.2B', sector: 'Telecommunication', description: 'Dialog Axiata PLC is Sri Lanka’s flagship telecommunications service provider.', website: 'www.dialog.lk' },
            { symbol: 'SLT', name: 'Sri Lanka Telecom PLC', price: 95.00, change: -1.50, changePercent: -1.55, volume: '150K', turnover: '14.2M', high52: 115.00, low52: 85.00, marketCap: '170B', peRatio: 10.2, eps: 9.30, dividendYield: 2.8, beta: 0.7, sharesOutstanding: '1.8B', sector: 'Telecommunication', description: 'Sri Lanka Telecom is the national telecommunications services provider in Sri Lanka.', website: 'www.slt.lk' },
            { symbol: 'MELS', name: 'Melstacorp PLC', price: 82.40, change: 0.60, changePercent: 0.73, volume: '320K', turnover: '26.3M', high52: 95.00, low52: 65.00, marketCap: '130B', peRatio: 8.8, eps: 9.35, dividendYield: 4.1, beta: 1.1, sharesOutstanding: '1.1B', sector: 'Food & Beverage', description: 'Melstacorp PLC is a diversified conglomerate.', website: 'www.melstacorp.com' },
        ],
        gainers: [
            { symbol: 'LOLC', price: 420.00, changePercent: 3.70 },
            { symbol: 'SAMP', price: 76.80, changePercent: 1.59 },
            { symbol: 'JKH', price: 195.50, changePercent: 1.30 },
            { symbol: 'HAYL', price: 88.50, changePercent: 1.26 },
            { symbol: 'DIAL', price: 9.80, changePercent: 1.03 },
        ],
        losers: [
            { symbol: 'EXPO', price: 145.25, changePercent: -2.52 },
            { symbol: 'SLT', price: 95.00, changePercent: -1.55 },
            { symbol: 'COMB', price: 92.10, changePercent: -0.43 },
            { symbol: 'SP20', price: 3240.15, changePercent: -0.38 },
        ],
        sectors: [
            { name: 'Banks', change: 1.2 },
            { name: 'Capital Goods', change: 0.8 },
            { name: 'Energy', change: -0.5 },
            { name: 'Food & Bev', change: 2.1 },
            { name: 'Materials', change: -1.1 },
            { name: 'Real Estate', change: 0.3 },
        ],
        news: [
            { id: 1, title: 'JKH reports strong Q3 earnings driven by tourism sector', category: 'Earnings', time: '2 hours ago' },
            { id: 2, title: 'Central Bank maintains policy rates steady', category: 'Economy', time: '4 hours ago' },
            { id: 3, title: 'Sampath Bank declares final dividend of Rs. 5.00', category: 'Dividend', time: '1 day ago' },
            { id: 4, title: 'CSE turnover crosses 2.5B mark amid foreign buying', category: 'Market', time: '1 day ago' },
        ]
    });

    const [loading, setLoading] = useState(false);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setMarketData(prev => ({
                ...prev,
                indices: {
                    ...prev.indices,
                    aspi: { ...prev.indices.aspi, value: prev.indices.aspi.value + (Math.random() - 0.5) * 10 },
                    lastUpdated: new Date().toISOString()
                }
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <MarketDataContext.Provider value={{ marketData, loading }}>
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
