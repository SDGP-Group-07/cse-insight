import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [subscribedCompanies, setSubscribedCompanies] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedSubs = localStorage.getItem('subscribedCompanies');
        if (savedSubs) {
            setSubscribedCompanies(JSON.parse(savedSubs));
        }

        // Mock initial notifications
        setNotifications([
            { id: 1, title: 'Welcome!', message: 'Welcome to CSE Insight. Start by subscribing to companies.', time: 'Just now', read: false },
        ]);
    }, []);

    // Save subscriptions to local storage
    useEffect(() => {
        localStorage.setItem('subscribedCompanies', JSON.stringify(subscribedCompanies));
    }, [subscribedCompanies]);

    const subscribe = (symbol) => {
        if (!subscribedCompanies.includes(symbol)) {
            setSubscribedCompanies([...subscribedCompanies, symbol]);
            addNotification({
                title: 'Subscribed',
                message: `You are now subscribed to ${symbol}. You will receive alerts for price changes.`,
                type: 'success'
            });
        }
    };

    const unsubscribe = (symbol) => {
        if (subscribedCompanies.includes(symbol)) {
            setSubscribedCompanies(subscribedCompanies.filter(s => s !== symbol));
            addNotification({
                title: 'Unsubscribed',
                message: `You have unsubscribed from ${symbol}.`,
                type: 'info'
            });
        }
    };

    const isSubscribed = (symbol) => {
        return subscribedCompanies.includes(symbol);
    };

    const addNotification = ({ title, message, type = 'info' }) => {
        const newNotification = {
            id: Date.now(),
            title,
            message,
            time: 'Just now',
            read: false,
            type
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            subscribedCompanies,
            subscribe,
            unsubscribe,
            isSubscribed,
            markAsRead,
            markAllAsRead,
            clearAll,
            unreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
