import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';

const DisclaimerPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-yellow-500/20">
                            <AlertTriangle className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Disclaimer</h1>
                            <p className="text-gray-400">Last updated: February 2026</p>
                        </div>
                    </div>

                    <Card className="mb-6 border-yellow-500/20">
                        <div className="flex items-start gap-4 p-4 bg-yellow-500/10 rounded-lg mb-6">
                            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                            <p className="text-yellow-200 font-medium">
                                The information provided on CSE Insight is for educational and informational purposes only. 
                                It should not be construed as investment advice.
                            </p>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-4">No Financial Advice</h2>
                        <p className="text-gray-400 leading-relaxed">
                            CSE Insight does not provide financial, investment, legal, or tax advice. The content on this 
                            platform is intended to be used for educational purposes only. You should consult with a 
                            qualified financial advisor before making any investment decisions.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Data Accuracy</h2>
                        <p className="text-gray-400 leading-relaxed">
                            While we strive to provide accurate and up-to-date information, we make no representations 
                            or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                            or suitability of the information contained on this platform.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Investment Risks</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Investing in the stock market involves substantial risk, including the possible loss of 
                            principal. Past performance is not indicative of future results. You should be aware of:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Market volatility and potential losses</li>
                            <li>The risk of losing your entire investment</li>
                            <li>The importance of diversification</li>
                            <li>The need for proper research before investing</li>
                        </ul>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">AI-Generated Content</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Some content on this platform is generated using artificial intelligence. While we strive for 
                            accuracy, AI-generated content may contain errors or inaccuracies. Always verify important 
                            information from official sources.
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-white mb-4">Third-Party Links</h2>
                        <p className="text-gray-400 leading-relaxed">
                            This platform may contain links to third-party websites or services that are not owned or 
                            controlled by CSE Insight. We have no control over, and assume no responsibility for, the 
                            content, privacy policies, or practices of any third-party websites or services.
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DisclaimerPage;
