import React, { useEffect, useRef, memo } from 'react';
import { Info } from 'lucide-react';

const PriceChart = ({ symbol }) => {
  const containerRef = useRef(null);
  const tvSymbol = symbol ? `CSELK:${symbol}` : 'CSELK:JKH';

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: false,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: true,
      hotlist: false,
      interval: 'D',
      locale: 'en',
      save_image: true,
      style: '1',
      symbol: tvSymbol,
      theme: 'dark',
      timezone: 'Etc/UTC',
      backgroundColor: '#1a1625',
      gridColor: 'rgba(242, 242, 242, 0.06)',
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      autosize: false,
    });
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [tvSymbol]);

  return (
    <div className="relative">
      <a
        href="/wiki/Candlestick%20chart"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open candlestick chart wiki article"
        title="Learn about candlestick charts"
        className="absolute right-1 top-1 z-10 inline-flex items-center justify-center rounded-full bg-[#2a233d]/90 border border-[#3e3753] p-2 text-[#9b96b2] hover:text-white hover:border-accent-cyan transition-colors"
      >
        <Info size={16} />
      </a>
      <div
        className="tradingview-widget-container h-[600px]"
        ref={containerRef}
      />
    </div>
  );
};

export default memo(PriceChart);
