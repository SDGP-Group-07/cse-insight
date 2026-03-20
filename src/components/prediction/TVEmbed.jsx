import React, { useEffect, useRef } from 'react';

/**
 * Generic TradingView embed helper.
 * widgetSrc  – the JS filename from s3.tradingview.com/external-embedding/
 * config     – JSON config passed as the script body
 * height     – pixel height of the container
 */
const TVEmbed = ({ widgetSrc, config, height = 220 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement('script');
    script.src = `https://s3.tradingview.com/external-embedding/${widgetSrc}`;
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({ ...config, colorTheme: 'dark', isTransparent: true, locale: 'en' });
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [widgetSrc, JSON.stringify(config)]);

  return (
    <div
      ref={ref}
      className="tradingview-widget-container w-full overflow-hidden"
      style={{ height }}
    />
  );
};

export default TVEmbed;
