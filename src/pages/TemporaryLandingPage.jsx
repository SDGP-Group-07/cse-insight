import React from 'react';
import { TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const TemporaryLandingPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-primary-dark text-white">
            {/* Hero Section */}
            <section className="relative px-6 py-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
                        <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-sm font-medium text-gray-300">Platform Under Development</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 animate-fade-in-up">
                        Building the Future of <br />
                        <span className="text-accent-cyan">CSE Investment</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
                        We are crafting an AI-powered ecosystem to revolutionize how you analyze, track, and trade on the Colombo Stock Exchange.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
                        <Link to="/login">
                            <Button variant="primary" className="px-8 py-4 text-lg group">
                                Join the Waitlist
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/wiki">
                            <Button variant="outline" className="px-8 py-4 text-lg">
                                Explore Wiki
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Who We Are & What We Do */}
            <section className="py-20 bg-primary-mid/30 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                        {/* Who We Are */}
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                                <Users size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Who We Are</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We are a team of passionate developers, financial analysts, and AI enthusiasts dedicated to democratizing financial intelligence in Sri Lanka.
                                Our mission is to bridge the gap between complex market data and actionable insights for every investor.
                            </p>
                        </div>

                        {/* What We Are Doing */}
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                                <Target size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">What We Are Doing</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We are building <strong>CSE Insight</strong>, a comprehensive platform that combines real-time market data with advanced AI analytics.
                                From predictive modeling to automated document analysis, we are creating tools that empower you to make smarter, data-driven investment decisions.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default TemporaryLandingPage;
