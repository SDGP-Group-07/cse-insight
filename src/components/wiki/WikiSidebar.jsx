import React from 'react';
import { BookOpen, FileText, TrendingUp, Users, AlertTriangle, BarChart2, CandlestickChart } from 'lucide-react';

const WikiSidebar = ({ activeTopic, onSelectTopic }) => {
    const topics = [
        {
            id: 'glossary',
            title: 'Stock Market Glossary',
            icon: BookOpen,
            subtopics: [
                'Glossary'
            ]
        },
        {
            id: 'cse-basics',
            title: 'How the CSE Works',
            icon: BookOpen,
            subtopics: [
                'What is a stock exchange?',
                'CSE history and structure',
                'Account opening process',
                'Trading hours and mechanisms',
                'Settlement process'
            ]
        },
        {
            id: 'financials',
            title: 'Financial Statements',
            icon: FileText,
            subtopics: [
                'Balance sheet basics',
                'Income statement interpretation',
                'Cash flow analysis',
                'Key financial ratios'
            ]
        },
        {
            id: 'strategies',
            title: 'Investment Strategies',
            icon: TrendingUp,
            subtopics: [
                'Blue chip vs growth stocks',
                'Value investing',
                'Dividend investing',
                'Risk management',
                'Day trading basics',
                'Position trading basics',
                'Swing trading basics'
            ]
        },
        {
            id: 'dos-donts',
            title: "Dos and Don'ts",
            icon: AlertTriangle,
            subtopics: [
                'Investment best practices',
                'Red flags to avoid',
                'Portfolio diversification',
                'Emotional discipline'
            ]
        },
        {
            id: 'analysis',
            title: 'Market Analysis',
            icon: BarChart2,
            subtopics: [
                'Fundamental analysis',
                'Sector dashboard',
                'Technical analysis gauge',
                'Market Intelligence Terminal',
                'Using indices'
            ]
        },
        {
            id: 'brokers',
            title: 'Role of Stockbrokers',
            icon: Users,
            subtopics: [
                'What brokers do',
                'How to choose a broker',
                'Brokerage fees structure'
            ]
        },
        {
            id: 'charts',
            title: 'Charts',
            icon: CandlestickChart,
            subtopics: [
                'Candlestick chart'
            ]
        }
    ];

    return (
        <div className="w-full lg:w-64 bg-primary-mid/30 backdrop-blur-md border-r border-white/10 h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
            <div className="p-4">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-accent-cyan" />
                    Wiki Navigator
                </h2>

                <div className="space-y-6">
                    {topics.map((topic) => (
                        <div key={topic.id}>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <topic.icon size={14} />
                                {topic.title}
                            </h3>
                            <ul className="space-y-1 border-l border-white/10 ml-1.5">
                                {topic.subtopics.map((subtopic) => (
                                    <li key={subtopic}>
                                        <button
                                            onClick={() => onSelectTopic(subtopic)}
                                            className={`block w-full text-left px-4 py-1.5 text-sm transition-colors border-l-2 -ml-[1px] ${activeTopic === subtopic
                                                    ? 'text-accent-cyan border-accent-cyan bg-accent-cyan/5'
                                                    : 'text-gray-400 border-transparent hover:text-white hover:border-white/30'
                                                }`}
                                        >
                                            {subtopic}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WikiSidebar;
