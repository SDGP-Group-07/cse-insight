import React from 'react';
import { BookOpen, TrendingUp, LayoutDashboard, BrainCircuit, Calendar, FileText } from 'lucide-react';
import Card from '../common/Card';

const Features = () => {
    const features = [
        {
            icon: <BookOpen className="w-8 h-8 text-accent-cyan" />,
            title: "Wiki Navigator",
            description: "Comprehensive learning platform covering CSE fundamentals, advanced trading strategies, and market analysis techniques.",
            color: "from-accent-cyan/20 to-accent-cyan/5"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-accent-purple" />,
            title: "Daily Market Summary",
            description: "Get real-time market data, trending stocks, daily news updates, and comprehensive market movement analysis.",
            color: "from-accent-purple/20 to-accent-purple/5"
        },
        {
            icon: <LayoutDashboard className="w-8 h-8 text-blue-400" />,
            title: "Company Dashboard",
            description: "AI-powered company analysis with automated report summaries, financial metrics, and performance analytics.",
            color: "from-blue-500/20 to-blue-500/5"
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-accent-green" />,
            title: "AI Model Lab",
            description: "Advanced predictive models using machine learning to forecast market trends and identify investment opportunities.",
            color: "from-accent-green/20 to-accent-green/5"
        },
        {
            icon: <Calendar className="w-8 h-8 text-orange-400" />,
            title: "Dividend Calendar",
            description: "Never miss dividend payments. Track ex-dates, payment schedules, and optimize your passive income strategy.",
            color: "from-orange-500/20 to-orange-500/5"
        },
        {
            icon: <FileText className="w-8 h-8 text-pink-400" />,
            title: "Document Analyzer",
            description: "RAG-powered financial report insights. Upload annual reports and get instant AI-generated summaries and risk assessments.",
            color: "from-pink-500/20 to-pink-500/5"
        }
    ];

    return (
        <section id="features" className="py-24 bg-primary-dark relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Everything You Need to <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-green">
                            Master the Market
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our platform combines traditional market data with cutting-edge AI technology
                        to give you the edge in your investment journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="group relative overflow-hidden border-white/5 hover:border-accent-cyan/30"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150`}></div>

                            <div className="relative z-10">
                                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-cyan transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
