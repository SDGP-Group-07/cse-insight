import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-6">
                    
                </div>
                <h2 className="text-center text-3xl font-bold text-white mb-2">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-400 mb-8">
                    Sign in to access your investment dashboard
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-primary-mid/60 backdrop-blur-xl py-8 px-4 shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/10 sm:rounded-2xl sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
