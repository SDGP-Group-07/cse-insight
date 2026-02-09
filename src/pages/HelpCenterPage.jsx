import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, ChevronDown, ChevronRight, MessageCircle, Mail, BookOpen } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const HelpCenterPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);

    const faqs = [
        {
            question: 'How do I create an account?',
            answer: 'Click on the "Get Started" button in the top right corner of the page. Fill in your details including name, email, and password. Verify your email address and you\'re ready to start exploring!',
        },
        {
            question: 'Is CSE Insight free to use?',
            answer: 'Yes! CSE Insight is completely free to use for educational purposes. We believe everyone should have access to quality market education.',
        },
        {
            question: 'Where does the market data come from?',
            answer: 'Our market data is sourced from the Colombo Stock Exchange (CSE) and other reliable financial data providers. Note that data may be delayed and is provided for educational purposes only.',
        },
        {
            question: 'How do I add companies to my watchlist?',
            answer: 'Navigate to any company page and click the bell icon to subscribe to alerts. You can also add companies to your watchlist from the Companies page by clicking the star icon.',
        },
        {
            question: 'What is the AI Chatbot?',
            answer: 'The AI Chatbot is an intelligent assistant that can answer questions about the stock market, explain financial terms, and help you understand market concepts. It\'s designed to be a learning companion.',
        },
        {
            question: 'How accurate are the price predictions?',
            answer: 'Price predictions are generated using machine learning models and should be used for educational purposes only. They are not financial advice and past performance does not guarantee future results.',
        },
        {
            question: 'Can I use CSE Insight on mobile?',
            answer: 'Yes! CSE Insight is fully responsive and works on all devices including smartphones and tablets. We recommend using a modern browser for the best experience.',
        },
        {
            question: 'How do I report a bug or request a feature?',
            answer: 'You can report bugs or request features through our Community page on GitHub, or by contacting us directly at support@cseinsight.com.',
        },
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex p-3 rounded-xl bg-accent-green/20 mb-4">
                            <HelpCircle className="w-8 h-8 text-accent-green" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Find answers to common questions and learn how to get the most out of CSE Insight
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative mb-12">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        <Link to="/documentation">
                            <Card className="hover:border-accent-cyan/50 transition-colors cursor-pointer h-full">
                                <BookOpen className="w-8 h-8 text-accent-cyan mb-3" />
                                <h3 className="font-bold text-white mb-2">Documentation</h3>
                                <p className="text-sm text-gray-400">Browse our detailed guides and tutorials</p>
                            </Card>
                        </Link>
                        <Link to="/community">
                            <Card className="hover:border-accent-purple/50 transition-colors cursor-pointer h-full">
                                <MessageCircle className="w-8 h-8 text-accent-purple mb-3" />
                                <h3 className="font-bold text-white mb-2">Community</h3>
                                <p className="text-sm text-gray-400">Join our Discord and get help from others</p>
                            </Card>
                        </Link>
                        <a href="mailto:support@cseinsight.com">
                            <Card className="hover:border-accent-green/50 transition-colors cursor-pointer h-full">
                                <Mail className="w-8 h-8 text-accent-green mb-3" />
                                <h3 className="font-bold text-white mb-2">Contact Us</h3>
                                <p className="text-sm text-gray-400">Email us directly for support</p>
                            </Card>
                        </a>
                    </div>

                    {/* FAQs */}
                    <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <Card
                                key={index}
                                className={`cursor-pointer transition-colors ${expandedFaq === index ? 'border-accent-cyan/50' : 'hover:border-white/20'}`}
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-white pr-4">{faq.question}</h3>
                                    {expandedFaq === index ? (
                                        <ChevronDown className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                </div>
                                {expandedFaq === index && (
                                    <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
                                )}
                            </Card>
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <Card className="text-center py-12">
                            <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                            <p className="text-gray-400 mb-4">Try different keywords or contact us directly</p>
                            <a href="mailto:support@cseinsight.com">
                                <Button variant="primary">Contact Support</Button>
                            </a>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HelpCenterPage;
