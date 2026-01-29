import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { CheckCircle, Truck, CreditCard } from 'lucide-react';

const Checkout = () => {
    const { user } = useAuth();
    const { refreshCart } = useCart();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPreview();
    }, [user]);

    const fetchPreview = async () => {
        try {
            const response = await api.get(`/invoice/preview/${user.userId}`);
            setPreview(response.data);
        } catch (error) {
            console.error("Error fetching preview", error);
            toast.error("Could not load checkout details");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        setProcessing(true);
        try {
            // Generate Invoice
            const response = await api.post(`/invoice/generate/${user.userId}`);

            // Extract Invoice ID from response
            const invoiceData = response.data;
            let invoiceId = null;

            // Handle structure variations (if any, though usually response.data is the DTO)
            if (invoiceData && invoiceData.invoice && invoiceData.invoice.invoiceId) {
                invoiceId = invoiceData.invoice.invoiceId;
            } else if (invoiceData.invoiceId) {
                invoiceId = invoiceData.invoiceId;
            }

            // Trigger Download if ID exists
            if (invoiceId) {
                try {
                    // Use API_URL from config or construct relative if proxy is set
                    // Assuming standard /invoice route. Adjust base URL if needed.
                    const downloadUrl = `${api.defaults.baseURL || 'http://localhost:8080'}/invoice/download/${invoiceId}`;

                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', `Invoice_${invoiceId}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    toast.success("Invoice downloaded!");
                } catch (dlError) {
                    console.error("Download trigger failed", dlError);
                    toast.warning("Order placed, but invoice download failed.");
                }
            }

            // Clear local cart context
            refreshCart();

            toast.success("Order placed successfully!");
            navigate('/order-success');
        } catch (error) {
            console.error("Order failed", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!preview || preview.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
                    <button onClick={() => navigate('/products')} className="btn btn-primary">Continue Shopping</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Shipping & Payment (Mock) */}
                    <div className="flex-1 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-indigo-600">
                                <Truck size={24} />
                                <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" className="input" placeholder="Address Line 1" defaultValue="123 Main St" />
                                <input type="text" className="input" placeholder="City" defaultValue="Mumbai" />
                                <input type="text" className="input" placeholder="State/Province" defaultValue="Maharashtra" />
                                <input type="text" className="input" placeholder="Postal Code" defaultValue="400001" />
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-indigo-600">
                                <CreditCard size={24} />
                                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer bg-indigo-50 border-indigo-200">
                                    <input type="radio" name="payment" defaultChecked className="accent-indigo-600" />
                                    <span className="font-medium">Credit / Debit Card</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input type="radio" name="payment" className="accent-indigo-600" />
                                    <span className="font-medium">UPI / Net Banking</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input type="radio" name="payment" className="accent-indigo-600" />
                                    <span className="font-medium">Cash on Delivery</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {preview.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-sm">
                                        <span className="text-gray-600 flex-1 pr-2">
                                            {item.productName} <span className="text-xs text-gray-400">x{item.quantity}</span>
                                        </span>
                                        <span className="font-medium">₹{item.totalAmount}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{preview.subTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>₹{preview.tax}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-xl text-accent">
                                    <span>Grand Total</span>
                                    <span>₹{preview.grandTotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={processing}
                                className="btn btn-primary w-full py-4 text-lg shadow-lg flex items-center justify-center"
                            >
                                {processing ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Place Order <CheckCircle className="ml-2 w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
