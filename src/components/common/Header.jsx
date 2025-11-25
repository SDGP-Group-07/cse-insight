import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings, List, BookOpen, BarChart2, Calendar, FileText, TrendingUp, PieChart } from 'lucide-react';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard', protected: true },
        {
            name: 'Learn',
            path: '#',
            dropdown: [
                { name: 'Wiki', path: '/wiki', icon: BookOpen },
                { name: 'Tutorials', path: '#', icon: FileText, disabled: true }
            ]
        },
        {
            name: 'Tools',
            path: '#',
            dropdown: [
                { name: 'AI Chatbot', path: '#', icon: MessageSquare, action: 'toggleChat' },
                { name: 'Document Analyzer', path: '#', icon: FileText, disabled: true },
                { name: 'Price Predictions', path: '#', icon: TrendingUp, disabled: true },
                { name: 'Dividend Calendar', path: '/tools/dividends', icon: Calendar },
                { name: 'Brokers Directory', path: '/tools/brokers', icon: User },
                { name: 'Technical Analysis', path: '/tools/technical-analysis', icon: BarChart2 }
            ]
        },
        {
            name: 'Companies',
            path: '#',
            protected: true,
            dropdown: [
                { name: 'All Companies', path: '/companies', icon: List },
                { name: 'Sectors', path: '/sectors', icon: PieChart },
                { name: 'Compare', path: '/compare', icon: BarChart2, disabled: true }
            ]
        }
    ];

    // Import MessageSquare locally to avoid circular dependency if needed, or just use icon
    function MessageSquare({ size, className }) {
        return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-dark/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center text-primary-dark font-bold text-xl group-hover:scale-105 transition-transform">
                        C
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        CSE Insight
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => {
                        if (link.protected && !user) return null;

                        if (link.dropdown) {
                            return (
                                <div
                                    key={link.name}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(link.name)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-accent-cyan transition-colors py-2">
                                        {link.name}
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute top-full left-0 w-56 pt-2 transition-all duration-200 ${activeDropdown === link.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                                        <div className="bg-primary-mid border border-white/10 rounded-xl shadow-xl overflow-hidden p-2">
                                            {link.dropdown.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.disabled
                                                        ? 'text-gray-600 cursor-not-allowed'
                                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                        }`}
                                                    onClick={(e) => item.disabled && e.preventDefault()}
                                                >
                                                    <item.icon size={16} className={item.disabled ? 'text-gray-600' : 'text-accent-cyan'} />
                                                    {item.name}
                                                    {item.disabled && <span className="ml-auto text-[10px] uppercase bg-white/5 px-1.5 py-0.5 rounded text-gray-500">Soon</span>}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-accent-cyan ${location.pathname === link.path ? 'text-accent-cyan' : 'text-gray-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Auth Buttons & Theme Toggle */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />

                    {user ? (
                        <div
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown('account')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-white font-bold text-xs">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <ChevronDown size={14} className="text-gray-400 mr-2" />
                            </button>

                            {/* Account Dropdown */}
                            <div className={`absolute top-full right-0 w-48 pt-2 transition-all duration-200 ${activeDropdown === 'account' ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                                <div className="bg-primary-mid border border-white/10 rounded-xl shadow-xl overflow-hidden p-2">
                                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                        <User size={16} className="text-accent-cyan" />
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                        <Settings size={16} className="text-accent-cyan" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" className="px-6 py-2 text-sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-dark border-b border-white/10 shadow-2xl p-4 flex flex-col gap-4 animate-fade-in-up">
                    {navLinks.map((link) => {
                        if (link.protected && !user) return null;

                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="space-y-2">
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-wider px-4">{link.name}</div>
                                    {link.dropdown.map(item => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`block px-4 py-2 text-sm rounded-lg ${item.disabled ? 'text-gray-600' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                            onClick={() => !item.disabled && setIsMobileMenuOpen(false)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2">
                                                    <item.icon size={16} />
                                                    {item.name}
                                                </span>
                                                {item.disabled && <span className="text-[10px] uppercase bg-white/5 px-1.5 py-0.5 rounded text-gray-500">Soon</span>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-4 py-2 text-sm font-medium rounded-lg ${location.pathname === link.path ? 'bg-accent-cyan/10 text-accent-cyan' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="border-t border-white/10 pt-4 mt-2 flex flex-col gap-3">
                        <div className="flex justify-between items-center px-4">
                            <span className="text-sm text-gray-400">Theme</span>
                            <ThemeToggle />
                        </div>

                        {user ? (
                            <>
                                <div className="px-4 py-2 bg-white/5 rounded-lg mx-4">
                                    <p className="text-sm font-bold text-white">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="mx-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2 px-4">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full justify-center">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
