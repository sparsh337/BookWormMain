import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();

    // Check if we are checking out a package (Membership) or Cart
    const isPackageMode = location.state?.type === 'package';
    const packageData = location.state?.data;

    useEffect(() => {
        document.title = "Checkout | BookWorm";
        if (!user) {
            navigate('/login');
            return;
        }
        if (!isPackageMode) {
            fetchPreview();
        } else {
            setLoading(false);
        }
    }, [user, isPackageMode]);

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
            if (isPackageMode) {
                // handle Package Purchase
                const response = await api.post('/api/library-packages/purchase', {
                    userId: user.userId,
                    packageId: packageData.packageId,
                    tranType: 'U'
                });

                // Trigger Download if ID exists (Backend needs to update to return JSON with invoiceId)
                // Currently backend returns String. If it changes to JSON, this works. 
                // If string, we assume success but no download unless we change backend.
                if (response.data && response.data.invoiceId) {
                    try {
                        const downloadUrl = `${api.defaults.baseURL || ''}/invoice/download/${response.data.invoiceId}`;
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.setAttribute('download', `Invoice_${response.data.invoiceId}.pdf`);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    } catch (e) {
                        console.error("Download failed", e);
                    }
                }

                toast.success("Subscription Activated! Check your email for the invoice.");
                navigate('/products?mode=library');
            } else {
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
                        const downloadUrl = `${api.defaults.baseURL || ''}/invoice/download/${invoiceId}`;

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

                toast.success("Order placed! Invoice sent to your email.");
                navigate('/order-success');
            }
        } catch (error) {
            console.error("Order failed", error);
            toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
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

    if (!isPackageMode && (!preview || preview.items.length === 0)) {
        return (
            <div className="min-h-screen bg-body flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
                    <button onClick={() => navigate('/products')} className="btn btn-primary">Continue Shopping</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-body pb-20">
            <Navbar />

            <div className="container py-8">
                <h1 className="text-3xl font-bold mb-8 text-main">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Payment Only */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 mb-4 text-indigo-600">
                                <CreditCard size={24} />
                                <h2 className="text-xl font-bold text-main">Payment Method</h2>
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200">
                                    <input type="radio" name="payment" defaultChecked className="accent-indigo-600" />
                                    <span className="font-medium">Credit / Debit Card</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-body">
                                    <input type="radio" name="payment" className="accent-indigo-600" />
                                    <span className="font-medium">UPI / Net Banking</span>
                                </label>
                            </div>
                            <div className="mt-4 p-4 bg-green-500/10 text-green-500 rounded-lg text-sm border border-green-500/20">
                                <span className="font-semibold">Instant Digital Delivery:</span> Your eBooks will be available to you immediately after purchase.
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-main">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {(isPackageMode ? [{
                                    productName: packageData.packageName,
                                    quantity: 1,
                                    totalPrice: packageData.price
                                }] : preview.items).map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-sm">
                                        <span className="text-gray-600 flex-1 pr-2">
                                            {item.productName} <span className="text-xs text-gray-400">x{item.quantity}</span>
                                        </span>
                                        <span className="font-medium text-main">₹{item.totalPrice}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4 space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{isPackageMode ? packageData.price : preview.subTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>₹{isPackageMode ? 0 : preview.tax}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-xl text-accent">
                                    <span>Grand Total</span>
                                    <span>₹{isPackageMode ? packageData.price : preview.grandTotal}</span>
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
                                        Get eBooks <CheckCircle className="ml-2 w-5 h-5" />
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
