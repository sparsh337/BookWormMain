import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cartItems, cartTotal, addToCart, removeFromCart, reduceQuantity, clearCart, refreshCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        refreshCart();
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view your cart</h2>
                    <Link to="/login" className="btn btn-primary">Log In</Link>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                        <Trash2 className="w-12 h-12 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any books yet.</p>
                    <Link to="/products" className="btn btn-primary px-8">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.cartId} className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-center">
                                {/* Image Placeholder */}
                                <div className="w-20 h-24 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-gray-300">
                                    <span className="text-xs">IMG</span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-lg leading-tight">{item.product.productName}</h3>
                                    <p className="text-sm text-gray-500 mb-1">
                                        {item.product.authors?.map(a => a.authorName).join(', ')}
                                    </p>
                                    <div className="flex gap-2 items-center">
                                        {item.tranType === 'L' ? (
                                            <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-sm">Library Borrow (Free)</span>
                                        ) : item.tranType === 'R' ? (
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-sm">Rent ({item.rentDays} days)</span>
                                                <span className="font-semibold text-accent">₹{((item.product.rentPerDay || 0) * item.rentDays * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            <span className="font-semibold text-accent">₹{item.product.offerPrice || item.product.basePrice}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity Controls - Always 1 for eBooks */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 font-medium">Qty: 1</span>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product.productId)}
                                    className="text-red-500 p-2 hover:bg-red-50 rounded-full"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        <button onClick={clearCart} className="text-red-500 text-sm hover:underline mt-4">
                            Clear Shopping Cart
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
