import api from './api';

// Mock user for development until backend is ready
const MOCK_USER = {
    id: '1',
    name: 'Demo User',
    email: 'demo@cse.lk',
    role: 'investor',
    token: 'mock-jwt-token-12345'
};

const authService = {
    register: async (userData) => {
        try {
            // TODO: Uncomment when backend is ready
            // const response = await api.post('/auth/register', userData);
            // return response.data;

            // Mock Implementation
            r // TODO: Uncomment when backend is ready
            // const response = await api.post('/auth/login', credentials);
            // return response.data;

            // Mock Implementation
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (credentials.email === 'demo@cse.lk' && credentials.password === 'Password123!') {
                        localStorage.setItem('user', JSON.stringify(MOCK_USER));
                        localStorage.setItem('token', MOCK_USER.token);
                        resolve(MOCK_USER);
                    } else {
                        reject(new Error('Invalid email or password'));
                    }
                }, 1000);
                })} catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    login: async (credentials) => {
        try {
            // TODO: Uncomment when backend is ready
            // const response = await api.post('/auth/login', credentials);
            // return response.data;

            // Mock Implementation
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (credentials.email === 'demo@cse.lk' && credentials.password === 'Password123!') {
                        localStorage.setItem('user', JSON.stringify(MOCK_USER));
                        localStorage.setItem('token', MOCK_USER.token);
                        resolve(MOCK_USER);
                    } else {
                        reject(new Error('Invalid email or password'));
                    }
                }, 1000)})
        } catch (error) {
             throw error.response ? error.response.data : error.message;
        }
    },

    logout: async () => {
        try {
            // TODO: Uncomment when backend is ready
            // await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API error:', error);
        }
    },

    
};

export default authService;
