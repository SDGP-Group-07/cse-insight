import React, { useState } from 'react';
import Header from '../components/common/Header';
import WikiSidebar from '../components/wiki/WikiSidebar';
import WikiArticle from '../components/wiki/WikiArticle';

const WikiPage = () => {
    const [activeTopic, setActiveTopic] = useState('What is a stock exchange?');

    const handleMarkRead = () => {
        // Logic to mark as read
        console.log(`Marked ${activeTopic} as read`);
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans">
            <Header />

            <div className="flex flex-col lg:flex-row pt-20">
                {/* Sidebar - Hidden on mobile, toggleable in real app */}
                <div className="hidden lg:block">
                    <WikiSidebar activeTopic={activeTopic} onSelectTopic={setActiveTopic} />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-[calc(100vh-80px)]">
                    <WikiArticle topic={activeTopic} onMarkRead={handleMarkRead} />
                </main>
            </div>
        </div>
    );
};

export default WikiPage;
