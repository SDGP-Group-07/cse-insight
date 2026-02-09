import React from 'react';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';
import Card from '../components/common/Card';

const PrivacyPolicyPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-accent-purple/20">
                            <Shield className="w-8 h-8 text-accent-purple" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                            <p className="text-gray-400">Last updated: February 2026</p>
                        </div>
                    </div>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            CSE Insight collects information you provide directly to us, such as when you create an account, 
                            use our services, or contact us for support. This may include:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Name and email address</li>
                            <li>Account credentials</li>
                            <li>Investment preferences and watchlists</li>
                            <li>Usage data and analytics</li>
                        </ul>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Personalize your experience</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                        </ul>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal data 
                            against unauthorized access, alteration, disclosure, or destruction. However, no method of 
                            transmission over the Internet is 100% secure.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">4. Your Rights</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                        </ul>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-white mb-4">5. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@cseinsight.com" className="text-accent-cyan hover:underline">
                                privacy@cseinsight.com
                            </a>
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
