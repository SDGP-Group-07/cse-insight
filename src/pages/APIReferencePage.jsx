import React, { useState } from 'react';
import { Code, Copy, Check, ChevronRight, Lock, Zap, Server } from 'lucide-react';
import Card from '../components/common/Card';

const APIReferencePage = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const endpoints = [
        {
            method: 'GET',
            path: '/api/v1/market/overview',
            description: 'Get current market overview including indices and summary',
            auth: false,
        },
        {
            method: 'GET',
            path: '/api/v1/companies',
            description: 'List all companies with pagination and filtering',
            auth: false,
        },
        {
            method: 'GET',
            path: '/api/v1/companies/:symbol',
            description: 'Get detailed company information by symbol',
            auth: false,
        },
        {
            method: 'GET',
            path: '/api/v1/companies/:symbol/price-history',
            description: 'Get historical price data for a company',
            auth: true,
        },
        {
            method: 'GET',
            path: '/api/v1/sectors',
            description: 'Get all sectors with performance data',
            auth: false,
        },
        {
            method: 'POST',
            path: '/api/v1/auth/login',
            description: 'Authenticate user and receive JWT token',
            auth: false,
        },
        {
            method: 'GET',
            path: '/api/v1/user/watchlist',
            description: 'Get user watchlist',
            auth: true,
        },
        {
            method: 'POST',
            path: '/api/v1/user/watchlist',
            description: 'Add company to watchlist',
            auth: true,
        },
    ];

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET': return 'text-accent-green bg-accent-green/10';
            case 'POST': return 'text-blue-400 bg-blue-400/10';
            case 'PUT': return 'text-yellow-400 bg-yellow-400/10';
            case 'DELETE': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-accent-green/20">
                            <Code className="w-8 h-8 text-accent-green" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">API Reference</h1>
                            <p className="text-gray-400">RESTful API documentation for CSE Insight</p>
                        </div>
                    </div>

                    {/* API Overview */}
                    <Card className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <Server className="w-6 h-6 text-accent-cyan mb-2" />
                                <h3 className="font-bold text-white">Base URL</h3>
                                <code className="text-sm text-gray-400">https://api.cseinsight.com/v1</code>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <Lock className="w-6 h-6 text-accent-purple mb-2" />
                                <h3 className="font-bold text-white">Authentication</h3>
                                <code className="text-sm text-gray-400">Bearer Token (JWT)</code>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <Zap className="w-6 h-6 text-accent-green mb-2" />
                                <h3 className="font-bold text-white">Rate Limit</h3>
                                <code className="text-sm text-gray-400">100 requests/minute</code>
                            </div>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            The CSE Insight API provides programmatic access to market data, company information, 
                            and user-related features. All responses are in JSON format.
                        </p>
                    </Card>

                    {/* Endpoints */}
                    <h2 className="text-xl font-bold text-white mb-4">Endpoints</h2>
                    <div className="space-y-4">
                        {endpoints.map((endpoint, index) => (
                            <Card key={index} className="hover:border-white/20 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                                            {endpoint.method}
                                        </span>
                                        <code className="text-sm text-white font-mono">{endpoint.path}</code>
                                        {endpoint.auth && (
                                            <Lock size={14} className="text-yellow-500" title="Requires authentication" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(endpoint.path, index)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copiedIndex === index ? (
                                            <><Check size={14} className="text-accent-green" /> Copied</>
                                        ) : (
                                            <><Copy size={14} /> Copy</>
                                        )}
                                    </button>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{endpoint.description}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Coming Soon */}
                    <Card className="mt-8 bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border-accent-purple/20">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-accent-purple/20">
                                <Zap className="w-6 h-6 text-accent-purple" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">API Access Coming Soon</h3>
                                <p className="text-gray-400">
                                    Full API access will be available in a future update. Stay tuned!
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default APIReferencePage;
