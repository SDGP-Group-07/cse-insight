import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-primary-dark text-white font-sans pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                    <p className="text-gray-400">Manage your personal information and account details</p>
                </div>

                <div className="bg-primary-mid/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-primary-mid">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <Button variant="outline" className="text-sm flex items-center gap-2">
                                <Edit size={14} /> Change Avatar
                            </Button>
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 w-full space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Full Name</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <User size={18} className="text-accent-cyan" />
                                        <span className="text-gray-200">{user?.name || 'User Name'}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Email Address</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <Mail size={18} className="text-accent-cyan" />
                                        <span className="text-gray-200">{user?.email || 'user@example.com'}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Phone Number</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <Phone size={18} className="text-accent-cyan" />
                                        <span className="text-gray-200">+94 77 123 4567</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Location</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <MapPin size={18} className="text-accent-cyan" />
                                        <span className="text-gray-200">Colombo, Sri Lanka</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                <Button variant="ghost">Cancel</Button>
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
