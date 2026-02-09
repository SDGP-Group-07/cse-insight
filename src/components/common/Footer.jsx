import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-primary-mid/30 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src={logo}
                                alt="CSE Insight Logo"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="text-xl font-bold text-white">CSE INSIGHT</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            AI-powered market intelligence platform for smart investors and traders in Sri Lanka.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors"><Facebook size={20} /></a>
                            <a href="https://twitter.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors"><Twitter size={20} /></a>
                            <a href="https://instagram.com/cse.insights" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors"><Instagram size={20} /></a>
                            <a href="https://linkedin.com/company/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Platform</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/dashboard" className="hover:text-accent-cyan transition-colors">Market Dashboard</Link></li>
                            <li><Link to="/chatbot" className="hover:text-accent-cyan transition-colors">AI Chatbot</Link></li>
                            <li><Link to="/wiki" className="hover:text-accent-cyan transition-colors">Wiki Navigator</Link></li>
                            <li><Link to="/predictions" className="hover:text-accent-cyan transition-colors">Prediction Lab</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/documentation" className="hover:text-accent-cyan transition-colors">Documentation</Link></li>
                            <li><Link to="/api-reference" className="hover:text-accent-cyan transition-colors">API Reference</Link></li>
                            <li><Link to="/community" className="hover:text-accent-cyan transition-colors">Community</Link></li>
                            <li><Link to="/help" className="hover:text-accent-cyan transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/privacy-policy" className="hover:text-accent-cyan transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-accent-cyan transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-accent-cyan transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/disclaimer" className="hover:text-accent-cyan transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} CSE Insight. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Data provided for educational purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

