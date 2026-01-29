import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userMail: '',
        phoneNo: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { userName, userMail, phoneNo, password, confirmPassword } = formData;
        if (!userName || !userMail || !phoneNo || !password) return "All fields required";

        // Password: Min 6, 1 number, 1 special char
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must be at least 6 characters, with 1 number and 1 special symbol";
        }

        if (password !== confirmPassword) return "Passwords do not match";

        // Phone: Starts with 6-9, 10 digits
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phoneNo)) return "Invalid Phone Number. Must be 10 digits starting with 6-9";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            toast.error(error);
            return;
        }

        setIsSubmitting(true);
        // Backend doesn't take confirmPassword
        const { confirmPassword, ...dataToSend } = formData;

        const result = await register(dataToSend);
        setIsSubmitting(false);

        if (result.success) {
            toast.success("Registration successful! Please log in.");
            navigate('/login');
        } else {
            toast.error(typeof result.message === 'string' ? result.message : "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-500 mt-2">Join BookWorm today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="userName"
                                className="input"
                                placeholder="John Doe"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="userMail"
                                className="input"
                                placeholder="you@example.com"
                                value={formData.userMail}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNo"
                                className="input"
                                placeholder="9876543210"
                                value={formData.phoneNo}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">
                            Password must be 6+ chars with a special character and number.
                        </p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-full py-3 mt-4"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-accent font-bold hover:underline">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
