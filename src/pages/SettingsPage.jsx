import React, { useState } from 'react';
import { Bell, Shield, Moon, Globe, Monitor } from 'lucide-react';
import Button from '../components/common/Button';
import ThemeToggle from '../components/common/ThemeToggle';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        marketAlerts: false,
        newsDigest: true
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-gray-400">Customize your application preferences</p>
                </div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <div className="bg-primary-mid/30 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <Monitor className="text-accent-purple" size={24} />
                            <h2 className="text-xl font-bold">Appearance</h2>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="font-medium text-white">Theme Preference</p>
                                <p className="text-sm text-gray-400">Switch between light and dark modes</p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-primary-mid/30 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="text-accent-cyan" size={24} />
                            <h2 className="text-xl font-bold">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                                { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                                { id: 'marketAlerts', label: 'Market Alerts', desc: 'Get notified about significant market movements' },
                                { id: 'newsDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of your portfolio' }
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="font-medium text-white">{item.label}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications[item.id]}
                                            onChange={() => toggleNotification(item.id)}
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-primary-mid/30 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-accent-green" size={24} />
                            <h2 className="text-xl font-bold">Security</h2>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl mb-4">
                            <div>
                                <p className="font-medium text-white">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                            </div>
                            <Button variant="outline" className="text-sm">Enable 2FA</Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="font-medium text-white">Change Password</p>
                                <p className="text-sm text-gray-400">Update your account password</p>
                            </div>
                            <Button variant="outline" className="text-sm">Update</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
