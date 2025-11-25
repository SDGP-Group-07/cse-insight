import React from 'react';
import Chatbot from '../components/common/Chatbot';

const ChatbotPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-primary-dark text-white px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-green">
                    AI Investment Assistant
                </h1>
                <p className="text-gray-400 mb-8">
                    Ask me anything about the Colombo Stock Exchange, market trends, or specific company performance.
                </p>

                {/* We can reuse the Chatbot component, but maybe we want it embedded rather than floating here?
            For now, let's just use the existing Chatbot component which is designed as a floating widget.
            Ideally, we would refactor Chatbot to be embeddable.
            For this page, let's create a placeholder that says "Chatbot is active" or similar, 
            OR we can try to style a container to hold the chat interface if we refactor.
            
            Given the constraints, let's make a simple embedded view.
        */}
                <div className="bg-primary-mid border border-white/10 rounded-2xl p-6 h-[600px] flex flex-col items-center justify-center text-center">
                    <p className="text-xl text-gray-300 mb-4">The AI Chatbot is always available!</p>
                    <p className="text-gray-500">Click the chat icon in the bottom right corner to start a conversation.</p>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
