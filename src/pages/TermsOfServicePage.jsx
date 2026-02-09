import React from 'react';
import { FileText } from 'lucide-react';
import Card from '../components/common/Card';

const TermsOfServicePage = () => {
    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-accent-cyan/20">
                            <FileText className="w-8 h-8 text-accent-cyan" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                            <p className="text-gray-400">Last updated: February 2026</p>
                        </div>
                    </div>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing or using CSE Insight, you agree to be bound by these Terms of Service. 
                            If you do not agree to these terms, please do not use our services.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">2. Use of Services</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            You agree to use our services only for lawful purposes and in accordance with these terms. You must not:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                            <li>Use our services for any illegal purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Interfere with the proper functioning of our services</li>
                            <li>Copy, distribute, or modify any part of the platform without permission</li>
                        </ul>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">3. Educational Purpose</h2>
                        <p className="text-gray-400 leading-relaxed">
                            CSE Insight is an educational platform designed to help users learn about the Colombo Stock Exchange. 
                            The information provided is for educational purposes only and should not be considered as financial advice.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">4. Account Responsibilities</h2>
                        <p className="text-gray-400 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account credentials and for all 
                            activities that occur under your account. You agree to notify us immediately of any unauthorized 
                            use of your account.
                        </p>
                    </Card>

                    <Card className="mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-400 leading-relaxed">
                            All content, features, and functionality of CSE Insight are owned by us and are protected by 
                            international copyright, trademark, and other intellectual property laws.
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-bold text-white mb-4">6. Changes to Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We reserve the right to modify these terms at any time. We will notify users of any material 
                            changes by posting the new terms on this page with an updated revision date.
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default TermsOfServicePage;
