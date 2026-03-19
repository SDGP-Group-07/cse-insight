import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import authService from '../services/authService';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [subscribedCompanies, setSubscribedCompanies] = useState([]);
    const { user } = useAuth();

    // Load subscriptions from backend when user changes
    useEffect(() => {
        const loadSubscriptions = async () => {
            if (user) {
                // If user data already has subscriptions from the /me endpoint, use those
                if (user.subscribedCompanies && user.subscribedCompanies.length > 0) {
                    setSubscribedCompanies(user.subscribedCompanies);
                } else {
                    // Otherwise fetch from dedicated endpoint
                    try {
                        const subs = await authService.getSubscriptions();
                        setSubscribedCompanies(subs);
                    } catch (err) {
                        console.error('Failed to load subscriptions:', err);
                        // Fallback to localStorage
                        const savedSubs = localStorage.getItem('subscribedCompanies');
                        if (savedSubs) {
                            setSubscribedCompanies(JSON.parse(savedSubs));
                        }
                    }
                }
            } else {
                setSubscribedCompanies([]);
            }
        };

        loadSubscriptions();

        // Mock initial notifications
        setNotifications([
            { id: 1, title: 'Welcome!', message: 'Welcome to CSE Insight. Start by subscribing to companies.', time: 'Just now', read: false },
        ]);
    }, [user]);

    // Keep localStorage in sync as fallback
    useEffect(() => {
        localStorage.setItem('subscribedCompanies', JSON.stringify(subscribedCompanies));
    }, [subscribedCompanies]);

    const subscribe = async (symbol) => {
        if (!subscribedCompanies.includes(symbol)) {
            // Optimistically update UI
            setSubscribedCompanies(prev => [...prev, symbol]);
            addNotification({
                title: 'Subscribed',
                message: `You are now subscribed to ${symbol}. You will receive alerts for price changes.`,
                type: 'success'
            });

            // Sync with backend
            if (user) {
                try {
                    await authService.subscribeCompany(symbol);
                } catch (err) {
                    console.error('Subscribe API error:', err);
                    // Revert on failure
                    setSubscribedCompanies(prev => prev.filter(s => s !== symbol));
                }
            }
        }
    };

    const unsubscribe = async (symbol) => {
        if (subscribedCompanies.includes(symbol)) {
            // Optimistically update UI
            setSubscribedCompanies(prev => prev.filter(s => s !== symbol));
            addNotification({
                title: 'Unsubscribed',
                message: `You have unsubscribed from ${symbol}.`,
                type: 'info'
            });

            // Sync with backend
            if (user) {
                try {
                    await authService.unsubscribeCompany(symbol);
                } catch (err) {
                    console.error('Unsubscribe API error:', err);
                    // Revert on failure
                    setSubscribedCompanies(prev => [...prev, symbol]);
                }
            }
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
