import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Library, Check, Star } from 'lucide-react';
import Swal from 'sweetalert2';

const LibraryPackages = () => {
    const { user } = useAuth();
    const [packages, setPackages] = useState([]);
    const [activeSubscription, setActiveSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                // Fetch packages
                const pkgRes = await api.get('/api/library-packages');
                setPackages(pkgRes.data);

                // Fetch active subscription
                try {
                    const subRes = await api.get(`/api/subscriptions/active/${user.userId}`);
                    if (subRes.status === 200) {
                        setActiveSubscription(subRes.data);
                    }
                } catch (subError) {
                    // 404/204 means no active subscription, ignore
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handlePurchase = async (packageId) => {
        if (!user) {
            toast.warning("Please login to purchase a subscription");
            return;
        }
        setPurchasing(packageId);
        try {
            await api.post('/api/library-packages/purchase', {
                userId: user.userId,
                packageId: packageId,
                tranType: 'U' // Assuming U for upgrade/subscription or similar, though backend mainly uses packageId
            });
            toast.success("Subscription Activated! Please select your books from the collection.");
            navigate('/products?mode=library');
        } catch (error) {
            console.error("Purchase failed", error);
            toast.error(error.response?.data?.message || "Failed to purchase subscription");
        } finally {
            setPurchasing(null);
        }
    };

    const handleCancelMembership = async () => {
        if (!user || !activeSubscription) return;

        const result = await Swal.fire({
            title: 'Cancel Membership?',
            text: "You will lose access to the library collection immediately. This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/api/subscriptions/cancel/${user.userId}`);
            await Swal.fire(
                'Cancelled!',
                'Your membership has been cancelled.',
                'success'
            );
            setActiveSubscription(null);
            // Optionally clear library cart items here or let the backend/user handle it
        } catch (error) {
            console.error("Cancellation failed", error);
            Swal.fire('Error', 'Failed to cancel membership', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <div className="container py-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 inline-block">
                        Premium Access
                    </span>
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">Unlock the Library</h1>
                    <p className="text-xl text-gray-500">
                        Get access to thousands of books with our flexible subscription plans.
                        Read as much as you want.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : activeSubscription ? (
                    // ACTIVE SUBSCRIPTION DASHBOARD
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
                        <div style={{ backgroundColor: '#4f46e5', padding: '2rem', color: 'white' }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span style={{ backgroundColor: '#6366f1', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' }}>
                                        Active Plan
                                    </span>
                                    <h2 className="text-3xl font-bold" style={{ color: 'white' }}>{activeSubscription.libraryPackage.packageName}</h2>
                                    <p style={{ color: '#e0e7ff', marginTop: '0.5rem' }}>Member since {new Date(activeSubscription.startDate).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-bold" style={{ color: 'white', textAlign: 'right' }}>{
                                        Math.ceil((new Date(activeSubscription.endDate) - new Date()) / (1000 * 60 * 60 * 24))
                                    }</div>
                                    <div style={{ color: '#e0e7ff', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', textAlign: 'right' }}>Days Remaining</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Book Limit</div>
                                    <div className="text-2xl font-bold text-gray-900">{activeSubscription.libraryPackage.maxSelectableBooks} Books</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="text-sm text-gray-500 mb-1">Validity</div>
                                    <div className="text-2xl font-bold text-gray-900">{activeSubscription.libraryPackage.validityDays} Days</div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleCancelMembership}
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '0.75rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                                >
                                    Cancel Membership
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // PACKAGES LIST
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {packages.map(pkg => (
                            <div key={pkg.packageId} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative hover:-translate-y-2 transition-transform duration-300">
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.packageName}</h3>
                                    <div className="flex items-baseline mb-6">
                                        <span className="text-4xl font-extrabold text-gray-900">₹{pkg.price}</span>
                                        <span className="text-gray-500 ml-2">/ {pkg.validityDays} days</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start gap-3">
                                            <Check className="text-green-500 shrink-0 mt-1" size={18} />
                                            <span className="text-gray-600">Access to standard library collection</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="text-green-500 shrink-0 mt-1" size={18} />
                                            <span className="text-gray-600">
                                                Select up to <strong className="text-gray-900">{pkg.maxSelectableBooks} books</strong> for your library
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handlePurchase(pkg.packageId)}
                                        disabled={purchasing === pkg.packageId}
                                        className="w-full btn btn-primary py-3 rounded-xl font-bold text-lg"
                                    >
                                        {purchasing === pkg.packageId ? 'Processing...' : 'Choose Plan'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibraryPackages;
