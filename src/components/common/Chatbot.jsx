import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader } from 'lucide-react';
import Button from '../common/Button';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! I am your CSE Insight Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock AI response delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('price') && lowerQuery.includes('jkh')) {
            return "The current price of John Keells Holdings (JKH) is LKR 195.50, up by 1.30% today.";
        }
        if (lowerQuery.includes('invest') && lowerQuery.includes('banking')) {
            return "Banking stocks are currently showing mixed performance. Commercial Bank is down slightly, while Sampath Bank is up 1.59%. It might be a good opportunity to buy on dips, but please consult a financial advisor.";
        }
        if (lowerQuery.includes('gainers')) {
            return "Top gainers today include LOLC (+3.70%), Sampath Bank (+1.59%), and JKH (+1.30%).";
        }
        if (lowerQuery.includes('dividend')) {
            return "Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price. For example, Commercial Bank currently has a dividend yield of 6.5%.";
        }
        if (lowerQuery.includes('compare') && lowerQuery.includes('comb') && lowerQuery.includes('hnb')) {
            return "Comparing Commercial Bank (COMB) and HNB: COMB is trading at LKR 92.10 with a P/E of 5.8, while HNB is at LKR 185.00 with a P/E of 6.5. COMB offers a higher dividend yield (6.5%) compared to HNB (4.5%).";
        }

        return "I'm not sure about that specific query. I can help you with stock prices, market trends, and basic financial concepts. Try asking 'What's the price of JKH?' or 'Show me top gainers'.";
    };

    const suggestions = [
        "Price of JKH?",
        "Top gainers today",
        "Explain dividend yield",
        "Banking sector outlook"
    ];

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-green text-primary-dark shadow-lg hover:shadow-[0_0_20px_rgba(0,245,212,0.5)] transition-all duration-300 z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={24} />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-primary-mid border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`} style={{ height: '500px' }}>
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-primary-dark/50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-accent-cyan/20 rounded-lg">
                            <Bot size={18} className="text-accent-cyan" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">CSE Assistant</h3>
                            <p className="text-xs text-accent-green flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                    ? 'bg-accent-cyan text-primary-dark rounded-tr-none'
                                    : 'bg-white/10 text-gray-200 rounded-tl-none'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {messages.length === 1 && (
                    <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                        {suggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => { setInput(s); handleSend(); }}
                                className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-accent-cyan hover:bg-white/10 transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-primary-dark/30 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about stocks..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-cyan placeholder-gray-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="p-2 bg-accent-cyan text-primary-dark rounded-lg hover:bg-accent-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
