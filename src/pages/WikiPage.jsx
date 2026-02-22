import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import WikiSidebar from '../components/wiki/WikiSidebar';
import WikiArticle from '../components/wiki/WikiArticle';

const WikiPage = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const defaultTopic = 'What is a stock exchange?';
    const [activeTopic, setActiveTopic] = useState(topic ? decodeURIComponent(topic) : defaultTopic);

    React.useEffect(() => {
        setActiveTopic(topic ? decodeURIComponent(topic) : defaultTopic);
    }, [topic]);

    const handleSelectTopic = (selectedTopic) => {
        navigate(`/wiki/${encodeURIComponent(selectedTopic)}`);
    };

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
                    <WikiSidebar activeTopic={activeTopic} onSelectTopic={handleSelectTopic} />
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
