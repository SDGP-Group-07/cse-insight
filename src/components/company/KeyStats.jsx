import React from 'react';
import Card from '../common/Card';

const KeyStats = ({ company }) => {
  const formatNumber = (value, decimals = 2) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    const parsed = Number(String(value).replace(/,/g, ''));
    return Number.isNaN(parsed) ? 'N/A' : parsed.toFixed(decimals);
  };

  const stats = [
    { label: 'Market Cap', value: company.marketCap },
    {
      label: 'Total Market Cap',
      value:
        company.totalMarketCap === null || company.totalMarketCap === undefined
          ? 'N/A'
          : `${formatNumber(company.totalMarketCap)}%`,
    },
    { label: 'Beta', value: company.beta },
    { label: 'Shares Outstanding', value: company.sharesOutstanding },
    {
      label: "Day's Price Range",
      value: `LKR ${formatNumber(company.hiTrade)} - ${formatNumber(
        company.lowTrade,
      )}`,
      spanFull: true,
    },
    { label: '52 Week High', value: `LKR ${formatNumber(company.high52)}` },
    { label: '52 Week Low', value: `LKR ${formatNumber(company.low52)}` },
  ];

  return (
    <Card
      hover={false}
      className="bg-[#2a233d] border border-[#3e3753] rounded-lg h-full"
    >
      <h3 className="text-[18px] font-normal text-white mb-4">
        Key Statistics
      </h3>
      <div className="grid grid-cols-2 text-sm">
        {(() => {
          let nonFullIndex = 0;
          const totalNonFull = stats.filter((stat) => !stat.spanFull).length;
          const totalRows = Math.ceil(totalNonFull / 2);

          return stats.map((stat, index) => {
            const isFull = stat.spanFull === true;
            let isLeft = false;
            let rowIndex = 0;

            if (!isFull) {
              isLeft = nonFullIndex % 2 === 0;
              rowIndex = Math.floor(nonFullIndex / 2);
              nonFullIndex += 1;
            }

            const hasBottomBorder = isFull
              ? index < stats.length - 1
              : rowIndex < totalRows - 1;
            const borderClass = isFull
              ? `${hasBottomBorder ? 'border-b border-[#3e3753]' : ''}`
              : `${isLeft ? 'pr-4 border-r border-[#3e3753]' : 'pl-4'} ${hasBottomBorder ? 'border-b border-[#3e3753]' : ''}`;

            return (
              <div
                key={stat.label}
                className={`py-3 ${borderClass} ${isFull ? 'col-span-2' : ''}`}
              >
                <p className="text-[12px] text-[#9b96b2] mb-1">{stat.label}</p>
                <p className="text-[14px] text-white">{stat.value}</p>
              </div>
            );
          });
        })()}
      </div>
    </Card>
  );
};

export default KeyStats;
