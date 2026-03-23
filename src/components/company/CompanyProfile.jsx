import React from 'react';
import Card from '../common/Card';

const CompanyProfile = ({ company }) => {
  const website = company.website?.trim();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_487px] gap-6">
      <Card
        hover={false}
        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-[#3e3753] rounded-lg"
      >
        <h3 className="text-[18px] font-normal text-white mb-4">
          Company Profile
        </h3>
        <p className="text-[#9b96b2] text-sm leading-relaxed mb-6">
          {company.description}
        </p>
        <div className="text-sm">
          <div className="flex justify-between py-3 border-t border-[#3e3753]">
            <span className="text-[#9b96b2]">Sector</span>
            <span className="text-white">{company.sector}</span>
          </div>
          <div className="flex justify-between py-3 border-t border-[#3e3753]">
            <span className="text-[#9b96b2]">Website</span>
            {website ? (
              <a
                href={`https://${website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-cyan"
              >
                {website}
              </a>
            ) : (
              <span className="text-white">N/A</span>
            )}
          </div>
        </div>
      </Card>

      <Card
        hover={false}
        className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-[#3e3753] rounded-lg"
      >
        <h3 className="text-[18px] font-normal text-white mb-4">
          Financial Highlights
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#9b96b2]">
                <th className="text-left py-2 pl-3">Period</th>
                <th className="text-right py-2">Revenue</th>
                <th className="text-right py-2">Net Profit</th>
                <th className="text-right py-2 pr-3">EPS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#3e3753]">
                <td className="py-3 pl-3 text-white">Q3 2024</td>
                <td className="text-right text-white">45.2B</td>
                <td className="text-right text-white">4.5B</td>
                <td className="text-right pr-3 text-white">3.20</td>
              </tr>
              <tr className="border-t border-[#3e3753] bg-purple-900/20">
                <td className="py-3 pl-3 text-white">Q2 2024</td>
                <td className="text-right text-white">42.1B</td>
                <td className="text-right text-white">3.8B</td>
                <td className="text-right pr-3 text-white">2.85</td>
              </tr>
              <tr className="border-t border-[#3e3753]">
                <td className="py-3 pl-3 text-white">Q1 2024</td>
                <td className="text-right text-white">40.5B</td>
                <td className="text-right text-white">3.2B</td>
                <td className="text-right pr-3 text-white">2.45</td>
              </tr>
              <tr className="border-t border-[#3e3753]">
                <td className="py-3 pl-3 text-white">Q4 2023</td>
                <td className="text-right text-white">48.6B</td>
                <td className="text-right text-white">5.1B</td>
                <td className="text-right pr-3 text-white">3.80</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CompanyProfile;
