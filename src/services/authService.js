import api from './api';

const authService = {
    register: async (userData) => {
        try {
            const payload = {
                name: userData.fullName || userData.name,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                role: userData.role || 'investor'
            };
            const response = await api.post('/auth/register', payload);
            const { user, token, refreshToken } = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            return user;
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });
            const { user, token, refreshToken } = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            return user;
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            const user = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            return null;
        }
    },

    getCachedUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/auth/profile', profileData);
            const user = response.data.data;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    getSubscriptions: async () => {
        try {
            const response = await api.get('/auth/subscriptions');
            return response.data.data || [];
        } catch (error) {
            console.error('Get subscriptions error:', error);
            return [];
        }
    },

    subscribeCompany: async (companySymbol) => {
        try {
            await api.post('/auth/subscribe', { companySymbol });
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    },

    unsubscribeCompany: async (symbol) => {
        try {
            await api.delete(`/auth/subscribe/${symbol}`);
        } catch (error) {
            throw error.response?.data || { message: error.message };
        }
    }
};

export default authService;
