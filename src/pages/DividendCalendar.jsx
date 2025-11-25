import React, { useState } from 'react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { Calendar as CalendarIcon, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const DividendCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filter, setFilter] = useState('All');

    // Mock Dividend Data
    const dividends = [
        { id: 1, symbol: 'JKH', company: 'John Keells Holdings', type: 'Final', amount: 1.50, exDate: '2024-11-28', payDate: '2024-12-15' },
        { id: 2, symbol: 'COMB', company: 'Commercial Bank', type: 'Interim', amount: 2.00, exDate: '2024-11-30', payDate: '2024-12-18' },
        { id: 3, symbol: 'SAMP', company: 'Sampath Bank', type: 'Final', amount: 3.25, exDate: '2024-12-05', payDate: '2024-12-22' },
        { id: 4, symbol: 'HNB', company: 'Hatton National Bank', type: 'Interim', amount: 4.00, exDate: '2024-12-10', payDate: '2024-12-28' },
        { id: 5, symbol: 'DIAL', company: 'Dialog Axiata', type: 'Final', amount: 0.80, exDate: '2024-12-12', payDate: '2025-01-05' },
    ];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    // Simple calendar generation logic (simplified for UI demo)
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-white/5 rounded-lg opacity-50"></div>);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayDividends = dividends.filter(d => d.exDate === dateStr);

            days.push(
                <div key={i} className="h-24 bg-white/5 rounded-lg p-2 border border-white/5 hover:border-accent-cyan/50 transition-colors relative">
                    <span className="text-gray-400 text-sm font-medium">{i}</span>
                    {dayDividends.map(d => (
                        <div key={d.id} className="mt-1 text-xs bg-accent-green/20 text-accent-green px-1 py-0.5 rounded truncate" title={`${d.symbol} - ${d.type}`}>
                            {d.symbol} XD
                        </div>
                    ))}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />
            <main className="container mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            <CalendarIcon className="text-accent-cyan" />
                            Dividend Calendar
                        </h1>
                        <p className="text-gray-400">Track upcoming dividend payments and ex-dividend dates.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 text-accent-cyan rounded-lg hover:bg-accent-cyan/20 transition-colors text-sm">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar View */}
                    <div className="lg:col-span-2">
                        <Card>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={20} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-gray-400 text-sm font-medium">
                                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {renderCalendarDays()}
                            </div>
                        </Card>
                    </div>

                    {/* Upcoming List */}
                    <div>
                        <Card className="h-full">
                            <h3 className="text-lg font-bold text-white mb-4">Upcoming Dividends</h3>
                            <div className="space-y-4">
                                {dividends.map((div) => (
                                    <div key={div.id} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-accent-cyan/30 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-white">{div.symbol}</h4>
                                                <p className="text-xs text-gray-400">{div.company}</p>
                                            </div>
                                            <span className="px-2 py-1 rounded bg-accent-green/10 text-accent-green text-xs font-bold">
                                                LKR {div.amount.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                                            <div>
                                                <p className="text-gray-500">Ex-Date</p>
                                                <p className="text-gray-300">{div.exDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500">Payment</p>
                                                <p className="text-gray-300">{div.payDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DividendCalendar;
