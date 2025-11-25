import React from 'react';
import Card from '../common/Card';

const CompanyProfile = ({ company }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-lg font-bold text-white mb-4">Company Profile</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {company.description}
                </p>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-gray-400">Sector</span>
                        <span className="text-white">{company.sector}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-gray-400">Website</span>
                        <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline">
                            {company.website}
                        </a>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-bold text-white mb-4">Financial Highlights</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-400 border-b border-white/10">
                                <th className="text-left py-2">Period</th>
                                <th className="text-right py-2">Revenue</th>
                                <th className="text-right py-2">Net Profit</th>
                                <th className="text-right py-2">EPS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5">
                                <td className="py-3 text-white">Q3 2024</td>
                                <td className="text-right text-gray-300">45.2B</td>
                                <td className="text-right text-gray-300">4.5B</td>
                                <td className="text-right text-gray-300">3.20</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 text-white">Q2 2024</td>
                                <td className="text-right text-gray-300">42.1B</td>
                                <td className="text-right text-gray-300">3.8B</td>
                                <td className="text-right text-gray-300">2.85</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="py-3 text-white">Q1 2024</td>
                                <td className="text-right text-gray-300">40.5B</td>
                                <td className="text-right text-gray-300">3.2B</td>
                                <td className="text-right text-gray-300">2.45</td>
                            </tr>
                            <tr>
                                <td className="py-3 text-white">Q4 2023</td>
                                <td className="text-right text-gray-300">48.6B</td>
                                <td className="text-right text-gray-300">5.1B</td>
                                <td className="text-right text-gray-300">3.80</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default CompanyProfile;
