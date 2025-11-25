import React from 'react';
import { Shield, Users, BarChart2 } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="about" className="py-24 bg-primary-mid/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent-cyan to-accent-purple opacity-30 blur-2xl rounded-full"></div>
                            <img
                                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Stock market analysis"
                                className="relative rounded-2xl border border-white/10 shadow-2xl"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -right-8 bg-primary-dark/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl hidden md:block">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="bg-green-500/20 p-2 rounded-lg">
                                        <BarChart2 className="text-green-500 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Market Growth</p>
                                        <p className="text-white font-bold text-lg">+24.5%</p>
                                    </div>
                                </div>
                                <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Empowering Sri Lankan <br />
                            <span className="text-accent-cyan">Investors</span>
                        </h2>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            CSE Insight bridges the gap between complex financial data and actionable investment decisions.
                            We believe that financial freedom should be accessible to everyone, not just institutional investors.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/5 p-3 rounded-lg mt-1">
                                    <Shield className="text-accent-purple w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Trusted Data</h3>
                                    <p className="text-gray-400">Direct integration with Colombo Stock Exchange for accurate, real-time reporting.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/5 p-3 rounded-lg mt-1">
                                    <Users className="text-accent-cyan w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Community Driven</h3>
                                    <p className="text-gray-400">Join thousands of local investors sharing insights and strategies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
