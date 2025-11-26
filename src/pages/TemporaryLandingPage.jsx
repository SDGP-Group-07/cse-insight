import React, { useState, useEffect } from 'react';
import { Users, Target, ArrowRight, Check, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Footer from '../components/common/Footer';

// Import GIF assets
import lotusGif from '../assets/lotus.gif';
import greenGif from '../assets/green.gif';
import logo from '../assets/logo.png';

const TemporaryLandingPage = () => {
    const { theme } = useTheme();
    const backgroundGif = theme === 'dark' ? lotusGif : greenGif;
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Countdown Timer Logic (1 Month from now)
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + 1);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            // Simulate API call
            setTimeout(() => {
                setIsSubmitted(true);
                setEmail('');
            }, 500);
        }
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans flex flex-col">
            {/* Simplified Header */}
            <header className="absolute top-0 left-0 right-0 z-50 py-6">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="CSE Insight Logo" className="w-10 h-10 object-contain" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            CSE Insight
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-primary-dark z-0">
                        <div className="absolute inset-0 z-0">
                            <img
                                src={backgroundGif}
                                alt="Background Animation"
                                className="w-full h-full object-cover opacity-70"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/50 to-primary-dark z-10"></div>
                    </div>

                    {/* Social Media Sidebar */}
                    <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-30">
                        <a href="https://facebook.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors transform hover:scale-110">
                            <Facebook size={24} />
                        </a>
                        <a href="https://twitter.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors transform hover:scale-110">
                            <Twitter size={24} />
                        </a>
                        <a href="https://instagram.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors transform hover:scale-110">
                            <Instagram size={24} />
                        </a>
                        <a href="https://linkedin.com/company/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors transform hover:scale-110">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://youtube.com/cseinsight" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-cyan transition-colors transform hover:scale-110">
                            <Youtube size={24} />
                        </a>
                    </div>

                    <div className="container mx-auto px-6 relative z-20 text-center max-w-4xl">
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

                        {/* Countdown Timer */}
                        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-200">
                            {[
                                { label: 'Days', value: timeLeft.days },
                                { label: 'Hours', value: timeLeft.hours },
                                { label: 'Minutes', value: timeLeft.minutes },
                                { label: 'Seconds', value: timeLeft.seconds }
                            ].map((item, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{String(item.value).padStart(2, '0')}</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Waitlist Form */}
                        <div className="max-w-md mx-auto animate-fade-in-up delay-300">
                            {isSubmitted ? (
                                <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-6 flex items-center justify-center gap-3 text-accent-green">
                                    <Check size={24} />
                                    <span className="font-medium">You have successfully joined the waitlist!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Button type="submit" variant="primary" className="px-6 py-3 group whitespace-nowrap">
                                        Join Waitlist
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </form>
                            )}
                            <p className="text-sm text-gray-500 mt-4">
                                Be the first to know when we launch. No spam, ever.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Who We Are & What We Do */}
                <section className="py-20 bg-primary-mid/30 border-y border-white/5 relative z-20">
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
            </main>

            <Footer />
        </div>
    );
};

export default TemporaryLandingPage;
