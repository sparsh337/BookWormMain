import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { Lock, Mail, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        const result = await login(email, password);
        setIsSubmitting(false);

        if (result.success) {
            // Check if the user is actually an admin
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.role === 'ROLE_ADMIN') {
                toast.success("Welcome, Admin!");
                navigate('/admin/dashboard');
            } else {
                toast.error("Access denied. You are not an administrator.");
                // Log them out if they tried to login as regular user on admin page
                // Or just don't redirect and show error.
            }
        } else {
            toast.error(typeof result.message === 'string' ? result.message : "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                    <div className="bg-indigo-900 p-8 text-center text-white">
                        <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold">Admin Portal</h2>
                        <p className="opacity-80 mt-1">Authorized Personnel Only</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="admin@bookworm.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password"
                                        className="input"
                                        style={{ paddingLeft: '3rem' }}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full py-3 text-lg"
                            >
                                {isSubmitting ? 'Verifying...' : 'Login as Admin'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
