import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Bell } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();
    const { subscribedCompanies } = useNotification();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        location: user?.location || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateProfile(formData);
        setSaving(false);
        if (result.success) {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            location: user?.location || '',
        });
        setIsEditing(false);
    };

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
                            {!isEditing && (
                                <Button variant="outline" className="text-sm flex items-center gap-2" onClick={() => setIsEditing(true)}>
                                    <Edit size={14} /> Edit Profile
                                </Button>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 w-full space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Full Name</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <User size={18} className="text-accent-cyan" />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="flex-1 bg-transparent text-gray-200 outline-none border-b border-accent-cyan/50 focus:border-accent-cyan"
                                            />
                                        ) : (
                                            <span className="text-gray-200">{user?.name || 'User Name'}</span>
                                        )}
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
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+94 77 123 4567"
                                                className="flex-1 bg-transparent text-gray-200 outline-none border-b border-accent-cyan/50 focus:border-accent-cyan"
                                            />
                                        ) : (
                                            <span className="text-gray-200">{user?.phone || 'Not set'}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-500">Location</label>
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                                        <MapPin size={18} className="text-accent-cyan" />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="Colombo, Sri Lanka"
                                                className="flex-1 bg-transparent text-gray-200 outline-none border-b border-accent-cyan/50 focus:border-accent-cyan"
                                            />
                                        ) : (
                                            <span className="text-gray-200">{user?.location || 'Not set'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                    <Button variant="ghost" onClick={handleCancel} disabled={saving}>
                                        <X size={16} className="mr-1" /> Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleSave} disabled={saving}>
                                        <Save size={16} className="mr-1" /> {saving ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Subscribed Companies Section */}
                <div className="mt-8 bg-primary-mid/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-accent-cyan" size={24} />
                        <h2 className="text-xl font-bold">Subscribed Companies</h2>
                    </div>

                    {subscribedCompanies.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400 mb-4">You haven't subscribed to any companies yet.</p>
                            <Button variant="outline" onClick={() => navigate('/companies')}>
                                Browse Companies
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {subscribedCompanies.map((symbol) => (
                                <button
                                    key={symbol}
                                    onClick={() => navigate(`/company/${symbol}`)}
                                    className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-accent-cyan/30 transition-all cursor-pointer"
                                >
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple/40 to-accent-cyan/40 flex items-center justify-center text-xs font-bold text-white">
                                        {symbol.charAt(0)}
                                    </span>
                                    <span className="text-sm text-gray-200 font-medium">{symbol}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
