import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol, interval = '1D', onLoadingChange }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !symbol) return;

        onLoadingChange?.(true);

        container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
        script.type = 'text/javascript';
        script.async = true;

        const fallbackReadyTimer = window.setTimeout(() => {
            onLoadingChange?.(false);
        }, 1400);

        script.onload = () => {
            window.setTimeout(() => {
                onLoadingChange?.(false);
            }, 220);
        };

        script.onerror = () => {
            onLoadingChange?.(false);
        };

        script.innerHTML = JSON.stringify({
            colorTheme: 'dark',
            displayMode: 'single',
            isTransparent: true,
            locale: 'en',
            interval,
            disableInterval: false,
            width: '100%',
            height: 460,
            symbol,
            showIntervalTabs: true,
        });

        container.appendChild(script);

        return () => {
            window.clearTimeout(fallbackReadyTimer);
            container.innerHTML = '';
        };
    }, [symbol, interval, onLoadingChange]);

    if (!symbol) {
        return (
            <div className="w-full rounded-lg border border-white/10 bg-white/5 overflow-hidden" style={{ height: 460 }}>
                <div className="flex gap-2 px-4 pt-4 pb-3 border-b border-white/10">
                    {['1m', '5m', '15m', '30m', '1h', '2h', '4h'].map((t) => (
                        <div key={t} className="h-7 w-10 rounded bg-white/10" />
                    ))}
                </div>

                <div className="flex flex-col items-center pt-8 pb-2 gap-4">
                    <div className="relative flex items-end justify-center" style={{ width: 220, height: 110 }}>
                        <div
                            className="absolute border-8 border-white/10 rounded-t-full"
                            style={{ width: 200, height: 100, borderBottom: 'none' }}
                        />
                        <div
                            className="absolute bg-white/20 rounded-full"
                            style={{ width: 3, height: 70, bottom: 0, left: '50%', transform: 'translateX(-50%) rotate(-20deg)', transformOrigin: 'bottom center' }}
                        />
                    </div>

                    <div className="flex gap-12">
                        {['Sell', 'Neutral', 'Buy'].map((label) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                                <div className="h-7 w-7 rounded bg-white/10" />
                                <span className="text-xs text-white/20">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 px-4 pb-3 mt-2 border-b border-white/10">
                    {['Summary', 'Oscillators', 'Moving Averages'].map((t) => (
                        <div key={t} className="h-5 w-24 rounded bg-white/10" />
                    ))}
                </div>

                <div className="px-4 pt-3 space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="h-3 w-32 rounded bg-white/10" />
                            <div className="h-3 w-14 rounded bg-white/10" />
                            <div className="h-3 w-10 rounded bg-white/10" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const tvSymbolPath = symbol.replace(':', '-').replace(/\./g, '');

    return (
        <div
            ref={containerRef}
            className="tradingview-widget-container w-full"
            style={{ height: 460 }}
        >
            <div className="tradingview-widget-container__widget" />
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
 