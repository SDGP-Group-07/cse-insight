import React from 'react';
import { Cookie } from 'lucide-react';
import Card from '../components/common/Card';

const CookiePolicyPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-accent-green/20">
                            <Cookie className="w-8 h-8 text-accent-green" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
                            <p className="text-gray-400">Last updated: February 2026</p>
                        </div>
                    </div>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">What Are Cookies?</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Cookies are small text files that are placed on your device when you visit our website. 
                            They help us provide you with a better experience by remembering your preferences and 
                            understanding how you use our platform.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Types of Cookies We Use</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-bold text-white mb-2">Essential Cookies</h3>
                                <p className="text-gray-400 text-sm">
                                    Required for the website to function properly. These cannot be disabled.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-bold text-white mb-2">Analytics Cookies</h3>
                                <p className="text-gray-400 text-sm">
                                    Help us understand how visitors interact with our website.
                                </p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-bold text-white mb-2">Preference Cookies</h3>
                                <p className="text-gray-400 text-sm">
                                    Remember your settings and preferences like theme and language.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Managing Cookies</h2>
                        <p className="text-gray-400 leading-relaxed">
                            You can control and manage cookies through your browser settings. Please note that 
                            removing or blocking cookies may impact your experience and limit certain functionality 
                            of the website.
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed">
                            If you have any questions about our use of cookies, please contact us at{' '}
                            <a href="mailto:support@cseinsight.com" className="text-accent-cyan hover:underline">
                                support@cseinsight.com
                            </a>
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default CookiePolicyPage;
