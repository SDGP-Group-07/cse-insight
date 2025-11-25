import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Import GIF assets
import lotusGif from '../../assets/lotus.gif';
import greenGif from '../../assets/green.gif';

const Hero = () => {
    const { theme } = useTheme();
    const backgroundGif = theme === 'dark' ? lotusGif : greenGif;

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-primary-dark z-0">
                {/* Dynamic GIF Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundGif}
                        alt="Background Animation"
                        className="w-full h-full object-cover opacity-100 transition-opacity duration-700"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-primary-mid/50 to-primary-dark z-10"></div>
                {/* Abstract Chart Background */}
                <svg className="absolute bottom-0 left-0 right-0 w-full h-3/4 opacity-10 z-0" viewBox="0 0 1440 600" preserveAspectRatio="none">
                    <path fill="url(#gradient)" d="M0,400 L60,380 L120,420 L180,350 L240,390 L300,300 L360,340 L420,280 L480,320 L540,250 L600,290 L660,220 L720,260 L780,180 L840,230 L900,150 L960,200 L1020,120 L1080,170 L1140,100 L1200,150 L1260,80 L1320,130 L1380,50 L1440,100 L1440,600 L0,600 Z" />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00f5d4" />
                            <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></span>
                    <span className="text-sm text-gray-300">AI-Powered Market Intelligence</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
                    UNLOCK YOUR POTENTIAL <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan via-white to-accent-purple">
                        WITH CSE INSIGHT
                    </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                    Democratizing stock market investing in Sri Lanka with real-time data,
                    educational resources, and AI-driven analysis for smarter decisions.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                    <Link to="/register">
                        <Button variant="primary" className="w-full md:w-auto text-lg px-8 py-4">
                            Start Learning <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Link to="/dashboard">
                        <Button variant="secondary" className="w-full md:w-auto text-lg px-8 py-4">
                            View Dashboard Demo <PlayCircle className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                {/* Stats / Trust Indicators */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 animate-fade-in-up delay-500">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">290+</h3>
                        <p className="text-gray-500 text-sm">Listed Companies</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">Real-time</h3>
                        <p className="text-gray-500 text-sm">Market Data</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">AI</h3>
                        <p className="text-gray-500 text-sm">Powered Analysis</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                        <p className="text-gray-500 text-sm">Free Education</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
