import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        document.title = "Login | BookWorm";
    }, []);

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
            toast.success("Welcome back!");

            // Check for Admin role and redirect accordingly
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } else {
            toast.error(typeof result.message === 'string' ? result.message : "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-body flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col md:flex-row border border-border">
                    <div className="w-full p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-main">Welcome Back</h2>
                            <p className="text-gray-500 mt-2">Sign in to continue your reading details</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        className="input pl-10"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password"
                                        className="input pl-10"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-right mt-2">
                                    <a href="#" className="text-sm text-accent hover:underline">Forgot password?</a>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary w-full py-3"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </button>

                            <div className="mt-4 border-t border-border pt-4">
                                <a
                                    href="http://localhost:3000/oauth2/authorization/google"
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg shadow-sm bg-white text-main font-medium hover:bg-body transition-all"
                                >
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                    Continue with Google
                                </a>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account? <Link to="/register" className="text-accent font-bold hover:underline">Create one</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
