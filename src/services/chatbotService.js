import api from './api';

const chatbotService = {
    sendMessage: async (message) => {
        // return api.post('/chatbot/message', { message });

        // Mock Logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerMsg = message.toLowerCase();
                let reply = "I'm not sure about that. Try asking about stock prices or market trends.";

                if (lowerMsg.includes('price') || lowerMsg.includes('jkh')) {
                    reply = "The current price of JKH is LKR 185.50, up by 1.35% today.";
                } else if (lowerMsg.includes('gainers')) {
                    reply = "Top gainers today are LOLC (+4.18%), SAMP (+1.50%), and HAYL (+1.37%).";
                } else if (lowerMsg.includes('dividend')) {
                    reply = "Dividend Yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price.";
                } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                    reply = "Hello! I'm your CSE Insight AI assistant. How can I help you with your investments today?";
                }

                resolve({ reply });
            }, 1000);
        });
    },

    getHistory: async (userId) => {
        // return api.get(`/chatbot/history/${userId}`);
        return Promise.resolve([]);
    }
};

export default chatbotService;
