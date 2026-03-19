import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    setUser(userData);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('refreshToken');
                    setUser(null);
                }
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const userData = await authService.login({ email, password });
            setUser(userData);
            return { success: true };
        } catch (err) {
            const msg = err.message || err.Message || 'Login failed';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const newUser = await authService.register(userData);
            setUser(newUser);
            return { success: true };
        } catch (err) {
            const msg = err.message || err.Message || 'Registration failed';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        try {
            setError(null);
            const updatedUser = await authService.updateProfile(profileData);
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (err) {
            const msg = err.message || err.Message || 'Profile update failed';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, updateProfile, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
