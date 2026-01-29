import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full"
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-green-100 p-4 rounded-full text-green-600">
                            <CheckCircle size={64} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="btn btn-secondary flex items-center justify-center gap-2">
                            <Home size={18} /> Go Home
                        </Link>
                        <Link to="/products" className="btn btn-primary flex items-center justify-center gap-2">
                            <ShoppingBag size={18} /> Continue Shopping
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccess;
