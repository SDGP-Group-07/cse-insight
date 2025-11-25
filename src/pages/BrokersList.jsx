import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Search, MapPin, Phone, Globe, Star, Check } from 'lucide-react';

const BrokersList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrokers, setSelectedBrokers] = useState([]);

    const brokers = [
        {
            id: 1,
            name: 'John Keells Stock Brokers',
            license: 'TM-001',
            rating: 4.8,
            location: 'Colombo 02',
            phone: '+94 11 234 5678',
            website: 'www.jksb.com',
            onlineTrading: true,
            mobileApp: true,
            minDeposit: 'LKR 100,000',
            fees: '0.64% - 1.12%'
        },
        {
            id: 2,
            name: 'Asia Securities',
            license: 'TM-002',
            rating: 4.7,
            location: 'Colombo 03',
            phone: '+94 11 245 6789',
            website: 'www.asiasecurities.lk',
            onlineTrading: true,
            mobileApp: true,
            minDeposit: 'LKR 50,000',
            fees: '0.64% - 1.12%'
        },
        {
            id: 3,
            name: 'Bartleet Religare Securities',
            license: 'TM-003',
            rating: 4.5,
            location: 'Colombo 02',
            phone: '+94 11 522 0200',
            website: 'www.bartleetreligare.com',
            onlineTrading: true,
            mobileApp: false,
            minDeposit: 'LKR 25,000',
            fees: '0.64% - 1.12%'
        },
        {
            id: 4,
            name: 'Capital Trust Securities',
            license: 'TM-004',
            rating: 4.6,
            location: 'Colombo 07',
            phone: '+94 11 212 3456',
            website: 'www.capitaltrust.lk',
            onlineTrading: true,
            mobileApp: true,
            minDeposit: 'LKR 10,000',
            fees: '0.64% - 1.12%'
        }
    ];

    const toggleSelection = (id) => {
        if (selectedBrokers.includes(id)) {
            setSelectedBrokers(selectedBrokers.filter(b => b !== id));
        } else {
            if (selectedBrokers.length < 2) {
                setSelectedBrokers([...selectedBrokers, id]);
            }
        }
    };

    const filteredBrokers = brokers.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Brokers Directory</h1>
                    <p className="text-gray-400">Find and compare CSE-approved stockbrokers.</p>
                </div>

                {/* Search & Compare Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search brokers..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent-cyan"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {selectedBrokers.length > 0 && (
                        <div className="flex items-center gap-4 bg-accent-cyan/10 px-4 py-2 rounded-lg border border-accent-cyan/20">
                            <span className="text-accent-cyan font-medium text-sm">{selectedBrokers.length} Selected</span>
                            <Button variant="primary" className="py-1.5 h-auto text-sm" disabled={selectedBrokers.length < 2}>
                                Compare Now
                            </Button>
                            <button onClick={() => setSelectedBrokers([])} className="text-gray-400 hover:text-white text-sm">Clear</button>
                        </div>
                    )}
                </div>

                {/* Brokers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBrokers.map((broker) => (
                        <Card key={broker.id} className={`relative transition-all ${selectedBrokers.includes(broker.id) ? 'border-accent-cyan ring-1 ring-accent-cyan' : ''}`}>
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => toggleSelection(broker.id)}
                                    className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${selectedBrokers.includes(broker.id)
                                            ? 'bg-accent-cyan border-accent-cyan text-primary-dark'
                                            : 'border-gray-500 text-transparent hover:border-white'
                                        }`}
                                >
                                    <Check size={14} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-1">{broker.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs">License: {broker.license}</span>
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star size={12} fill="currentColor" />
                                        <span>{broker.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-300 mb-6">
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-accent-purple" />
                                    {broker.location}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-accent-green" />
                                    {broker.phone}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-accent-cyan" />
                                    <a href={`https://${broker.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white">
                                        {broker.website}
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <p className="text-xs text-gray-500">Online Trading</p>
                                    <p className={`font-bold ${broker.onlineTrading ? 'text-accent-green' : 'text-red-500'}`}>
                                        {broker.onlineTrading ? 'Yes' : 'No'}
                                    </p>
                                </div>
                                <div className="bg-white/5 p-2 rounded text-center">
                                    <p className="text-xs text-gray-500">Mobile App</p>
                                    <p className={`font-bold ${broker.mobileApp ? 'text-accent-green' : 'text-red-500'}`}>
                                        {broker.mobileApp ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full justify-center">View Profile</Button>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BrokersList;
