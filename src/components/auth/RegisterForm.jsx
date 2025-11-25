import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, AlertCircle, Loader, Check } from 'lucide-react';
import Button from '../common/Button';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    const [errors, setErrors] = useState({});
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (formData.fullName.length < 3) {
            newErrors.fullName = 'Name must be at least 3 characters';
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation: min 8 chars, 1 uppercase, 1 number, 1 special char
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must have 8+ chars, 1 uppercase, 1 number, 1 special char';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.terms) {
            newErrors.terms = 'You must accept the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const result = await register(formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrors(prev => ({ ...prev, form: result.error }));
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
                {errors.form && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
                        <AlertCircle size={20} />
                        <span>{errors.form}</span>
                    </div>
                )}

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full bg-primary-dark/50 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors`}
                            placeholder="John Doe"
                        />
                    </div>
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-primary-dark/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors`}
                            placeholder="name@example.com"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-primary-dark/50 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-1">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full bg-primary-dark/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-gray-600 text-accent-cyan focus:ring-accent-cyan bg-primary-dark/50"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label className="text-gray-400">
                            I agree to the <a href="#" className="text-accent-cyan hover:underline">Terms of Service</a> and <a href="#" className="text-accent-cyan hover:underline">Privacy Policy</a>
                        </label>
                        {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full justify-center"
                    disabled={loading}
                >
                    {loading ? <Loader className="animate-spin" /> : 'Create Account'}
                </Button>

                <p className="text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent-cyan hover:text-accent-green font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
