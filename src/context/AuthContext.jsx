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
                // Use verifyToken or getCurrentUser depending on what's available/preferred
                // The user requested verifyToken, so we'll use that if it returns user data,
                // otherwise we might need to fetch user data separately.
                // Looking at authService, verifyToken returns boolean.
                // Let's use getCurrentUser for now as it's synchronous in the mock, 
                // but ideally we should verify with backend.
                // For now, let's stick to the user's requested logic structure but adapt to our service.

                const isValid = await authService.verifyToken();
                if (isValid) {
                    const userData = authService.getCurrentUser();
                    setUser(userData);
                } else {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const user = await authService.login({ email, password });
            // authService.login already sets localStorage in our current implementation,
            // but the user's snippet does it here. We should align.
            // Our authService.login returns the user object.
            // We'll let authService handle the API call, and we update state here.
            setUser(user);
            return { success: true };
        } catch (err) {
            setError(err.message || 'Login failed');
            return { success: false, error: err.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const user = await authService.register(userData);
            setUser(user);
            return { success: true };
        } catch (err) {
            setError(err.message || 'Registration failed');
            return { success: false, error: err.message || 'Registration failed' };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, checkAuth }}>
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
