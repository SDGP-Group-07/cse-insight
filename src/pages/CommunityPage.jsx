import React from 'react';
import { Users, MessageCircle, Github, ExternalLink, Heart, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CommunityPage = () => {
    const communityLinks = [
        {
            title: 'Discord Community',
            description: 'Join our Discord server to chat with other investors and get real-time support.',
            icon: MessageCircle,
            color: 'accent-purple',
            link: '#',
            members: '500+',
        },
        {
            title: 'GitHub Repository',
            description: 'Contribute to CSE Insight, report issues, or explore the codebase.',
            icon: Github,
            color: 'white',
            link: '#',
            members: 'Open Source',
        },
    ];

    const contributors = [
        { name: 'Shaahid Fathul', role: 'RAG Developer', avatar: 'SF' },
        { name: 'Lasantha Karunarathne', role: 'Backend Developer', avatar: 'LK' },
        { name: 'Lasantha Karunarathne', role: 'Frontend Developer', avatar: 'LK' },
        { name: 'Lasantha Karunarathne', role: 'UI/UX Designer', avatar: 'LK' },
        { name: 'Omalshi Rajapaksha', role: 'ML Engineer', avatar: 'OR' },
        { name: 'Disni Perera', role: 'SEO / Social Media', avatar: 'DP' },
        { name: 'Dulangi Perera', role: 'QA Engineer', avatar: 'DP' },
        { name: 'Shaahid Fathul', role: 'Team Leader', avatar: 'SF' },
        { name: 'Dulangi Perera', role: 'BA Engineer', avatar: 'DP' },
        { name: 'Disni Perera', role: 'BA Engineer', avatar: 'DP' },
    ];

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex p-3 rounded-xl bg-accent-cyan/20 mb-4">
                            <Users className="w-8 h-8 text-accent-cyan" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Community</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Join our growing community of investors and developers building the future of CSE investment
                        </p>
                    </div>

                    {/* Community Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {communityLinks.map((item) => (
                            <Card key={item.title} className="hover:border-white/20 transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl bg-${item.color}/20`}>
                                        <item.icon className={`w-6 h-6 text-${item.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                            <span className="text-sm text-gray-500">{item.members}</span>
                                        </div>
                                        <p className="text-gray-400 mb-4">{item.description}</p>
                                        <a
                                            href={item.link}
                                            className="inline-flex items-center gap-2 text-accent-cyan hover:underline"
                                        >
                                            Join Now <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Contributors */}
                    <Card className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Our Team</h2>
                            <div className="flex items-center gap-2 text-accent-pink">
                                <Heart size={16} fill="currentColor" />
                                <span className="text-sm">Built with love</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {contributors.map((contributor) => (
                                <div key={contributor.name} className="text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                                        {contributor.avatar}
                                    </div>
                                    <h4 className="font-bold text-white text-sm">{contributor.name}</h4>
                                    <p className="text-xs text-gray-500">{contributor.role}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Contribute CTA */}
                    <Card className="bg-gradient-to-r from-accent-cyan/10 to-accent-green/10 border-accent-cyan/20">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Star className="w-12 h-12 text-yellow-500" />
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Want to contribute?</h3>
                                    <p className="text-gray-400">
                                        We welcome contributions from the community. Check out our GitHub!
                                    </p>
                                </div>
                            </div>
                            <Button variant="primary" className="whitespace-nowrap">
                                <Github size={18} className="mr-2" />
                                View on GitHub
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default CommunityPage;
