import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol = 'CSELK:JKH.N0000' }) {
    const container = useRef(null);

    useEffect(() => {
        if (!container.current) {
            return undefined;
        }

        container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            colorTheme: 'dark',
            displayMode: 'single',
            isTransparent: false,
            locale: 'en',
            interval: '1m',
            disableInterval: false,
            width: '100%',
            height: 520,
            symbol,
            showIntervalTabs: true,
        });

        container.current.appendChild(script);

        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [symbol]);

    const tvSymbolPath = symbol.replace(':', '-').replace('.', '');

    return (
        <div className="tradingview-widget-container w-full" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href={`https://www.tradingview.com/symbols/${tvSymbolPath}/technicals/`}
                    rel="noopener nofollow"
                    target="_blank"
                >
                    <span className="blue-text">{symbol} stock analysis</span>
                </a>
                <span className="trademark"> by TradingView</span>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);