import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Rocket, Server, Database, Shield, ArrowRight } from 'lucide-react';
import Card from '../components/common/Card';

const DocumentationPage = () => {
    const sections = [
        {
            title: 'Getting Started',
            icon: Rocket,
            color: 'accent-cyan',
            description: 'Learn the basics of using CSE Insight',
            links: [
                { name: 'Quick Start Guide', path: '#' },
                { name: 'Platform Overview', path: '#' },
                { name: 'Creating Your Account', path: '#' },
                { name: 'Dashboard Walkthrough', path: '#' },
            ]
        },
        {
            title: 'Features',
            icon: BookOpen,
            color: 'accent-purple',
            description: 'Explore all platform features',
            links: [
                { name: 'Market Dashboard', path: '/dashboard' },
                { name: 'Company Analysis', path: '/companies' },
                { name: 'Wiki Navigator', path: '/wiki' },
                { name: 'AI Chatbot', path: '#' },
            ]
        },
        {
            title: 'API Reference',
            icon: Code,
            color: 'accent-green',
            description: 'Technical documentation for developers',
            links: [
                { name: 'API Overview', path: '/api-reference' },
                { name: 'Authentication', path: '#' },
                { name: 'Endpoints', path: '#' },
                { name: 'Rate Limits', path: '#' },
            ]
        },
        {
            title: 'Data & Analytics',
            icon: Database,
            color: 'accent-pink',
            description: 'Understanding our data sources',
            links: [
                { name: 'Data Sources', path: '#' },
                { name: 'Market Indicators', path: '#' },
                { name: 'Technical Analysis', path: '/technical-analysis' },
                { name: 'Predictions', path: '#' },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to know about using CSE Insight effectively
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <input
                            type="text"
                            placeholder="Search documentation..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan"
                        />
                    </div>

                    {/* Documentation Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sections.map((section) => (
                            <Card key={section.title} className="hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-${section.color}/20`}>
                                        <section.icon className={`w-6 h-6 text-${section.color}`} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{section.title}</h2>
                                        <p className="text-sm text-gray-400">{section.description}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                to={link.path}
                                                className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors group"
                                            >
                                                {link.name}
                                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </div>

                    {/* Help Section */}
                    <Card className="mt-12 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 border-accent-cyan/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Need more help?</h3>
                                <p className="text-gray-400">
                                    Can't find what you're looking for? Visit our Help Center or contact support.
                                </p>
                            </div>
                            <Link
                                to="/help"
                                className="px-6 py-3 bg-accent-cyan text-primary-dark font-bold rounded-lg hover:bg-accent-cyan/90 transition-colors whitespace-nowrap"
                            >
                                Visit Help Center
                            </Link>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DocumentationPage;
