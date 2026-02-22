import React, { useEffect, useRef, memo } from 'react';
import Card from '../common/Card';

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
      autosize: true,
    });
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [tvSymbol]);

  return (
    <div
      className="tradingview-widget-container h-[600px]"
      ref={containerRef}
    />
  );
};

export default memo(PriceChart);
