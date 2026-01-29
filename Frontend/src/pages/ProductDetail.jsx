import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Calendar, Book, Globe, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const location = window.location; // or useLocation from react-router
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');

    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rentDays, setRentDays] = useState(7);
    const { addToCart } = useCart();
    const [ownedStatus, setOwnedStatus] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        // Fetch User Shelf to check ownership
        const checkOwnership = async () => {
            if (user?.userId && id) {
                try {
                    // Fetch both Purchases (Shelf) and Rented/Library items
                    const [shelfRes, libraryRes] = await Promise.all([
                        api.get(`/api/shelf/${user.userId}`),
                        api.get(`/api/library/${user.userId}`)
                    ]);

                    const allItems = [...shelfRes.data, ...libraryRes.data];

                    // Loose equality check to handle string/number differences
                    const match = allItems.find(item => item.product.productId == id);

                    if (match) {
                        console.log("Ownership Match Found:", match);
                        setOwnedStatus({
                            tranType: match.tranType,
                            expiry: match.productExpiryDate
                        });
                        // toast.info(`Status: ${match.tranType === 'P' ? 'Purchased' : (match.tranType === 'R' ? 'Rented' : 'Library')}`);
                    } else {
                        setOwnedStatus(null);
                    }
                } catch (e) {
                    console.error("Failed to check ownership", e);
                }
            }
        };
        checkOwnership();
    }, [user, id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/products" className="text-accent hover:underline mt-4">Back to Shop</Link>
            </div>
        )
    }

    const authorText = product.authors?.map(a => a.authorName || 'Unknown').join(', ').trim() || 'Unknown Author';

    const renderActionButtons = () => {
        // CASE: ALREADY PURCHASED
        if (ownedStatus && ownedStatus.tranType === 'P') {
            return (
                <div className="p-6 rounded-xl border bg-green-100 text-green-700 border-green-200 text-center">
                    <h3 className="text-xl font-bold mb-2">Already Purchased</h3>
                    <p className="mb-4 text-sm opacity-90">
                        You own this book permanently.
                    </p>
                    <Link to="/myshelf" className="btn btn-success w-full justify-center">
                        Go to My Shelf
                    </Link>
                </div>
            );
        }

        // CASE: LIBRARY
        if (ownedStatus && ownedStatus.tranType === 'L') {
            return (
                <div className="p-6 rounded-xl border bg-purple-100 text-purple-700 border-purple-200 text-center">
                    <h3 className="text-xl font-bold mb-2">In Your Library</h3>
                    <p className="mb-4 text-sm opacity-90">
                        This book is part of your active library subscription.
                        {ownedStatus.expiry && <span className="block mt-1">Expires on: {new Date(ownedStatus.expiry).toLocaleDateString()}</span>}
                    </p>
                    <Link to="/library" className="btn btn-primary w-full justify-center">
                        Go to My Library
                    </Link>
                </div>
            );
        }

        // CASE: RENTED (Allow Purchase)
        const isRented = ownedStatus && ownedStatus.tranType === 'R';

        return (
            <div className="space-y-6">
                {/* SHOW RENTED STATUS IF RENTED */}
                {isRented && (
                    <div className="p-4 rounded-xl border bg-orange-100 text-orange-700 border-orange-200 text-center mb-6">
                        <h3 className="text-lg font-bold mb-1">Currently Rented</h3>
                        <p className="text-sm opacity-90 mb-3">
                            You have rented this book until {new Date(ownedStatus.expiry).toLocaleDateString()}.
                        </p>
                        <Link to="/myshelf" className="btn btn-sm btn-warning w-full justify-center text-white">
                            View in Shelf
                        </Link>
                    </div>
                )}

                {/* BUY ACTION (Always show unless Purchased) */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-3">Buy this Book</h4>
                    <p className="text-xs text-gray-500 mb-3">Own it forever!</p>
                    <button
                        onClick={() => addToCart(product.productId, 1, 'P')}
                        className="btn btn-primary w-full justify-center text-lg"
                    >
                        <ShoppingCart className="mr-2" /> Buy Now (₹{product.offerPrice || product.basePrice})
                    </button>
                </div>

                {/* RENT ACTION (Hide if already Rented) */}
                {product.rentable && !isRented && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-orange-200" style={{ backgroundColor: '#fff7ed' }}>
                        <h4 className="font-bold text-gray-900 mb-3" style={{ color: '#c2410c' }}>Rent this Book</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700 font-medium">Duration (Days):</span>
                                    <input
                                        type="number"
                                        min={product.minRentDays || 3}
                                        value={rentDays}
                                        onChange={(e) => setRentDays(parseInt(e.target.value) || 3)}
                                        className="w-20 p-2 border border-gray-300 rounded-lg text-center font-bold"
                                    />
                                </div>
                                <div className="text-xl font-bold" style={{ color: '#c2410c' }}>
                                    ₹{((product.rentPerDay || 0) * rentDays).toFixed(2)}
                                </div>
                            </div>
                            <button
                                onClick={() => addToCart(product.productId, 1, 'R', rentDays)}
                                className="btn w-full justify-center text-white"
                                style={{ backgroundColor: '#f97316' }} // Manual Orange
                            >
                                <Clock size={20} /> Rent Now
                            </button>
                        </div>
                    </div>
                )}

                {/* LIBRARY ACTION (Hide if owned in any way - usually) */}
                {/* logic note: if its rented, you probably don't want to add to library? or maybe you do. 
                    Let's hide it if rented as per user request context implies focus on purchase. 
                    Actually, let's strictly hide if any ownership exists, but we are in this block because its NOT P or L. 
                    So just check !isRented. */}
                {product.library && !isRented && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-indigo-200" style={{ backgroundColor: '#eef2ff' }}>
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h4 className="font-bold text-indigo-900">Library Collection</h4>
                                <p className="text-xs text-indigo-600">Available with Active Subscription</p>
                            </div>
                        </div>
                        <button
                            onClick={() => addToCart(product.productId, 1, 'L', 0)}
                            className="btn btn-primary w-full justify-center"
                        >
                            Add to Library
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <div className="container py-10">
                {/* Back Navigation */}
                <div className="mb-6">
                    {mode === 'library' ? (
                        <Link to="/products?mode=library" className="flex items-center gap-2 text-indigo-600 font-medium hover:underline">
                            ← Back to Library Collection
                        </Link>
                    ) : (
                        <Link to="/products" className="flex items-center gap-2 text-gray-500 hover:text-accent">
                            ← Back to Books
                        </Link>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="bg-gray-100 min-h-[100px] flex items-center justify-center p-8">
                            {getImageForProduct(product.productName) ? (
                                <div className="w-64 -h-auto shadow-2xl transform transition-transform duration-500 hover:scale-105">
                                    <img
                                        src={getImageForProduct(product.productName)}
                                        alt={product.productName}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </div>
                            ) : (
                                <div className="w-64 h-80 bg-white shadow-xl flex items-center justify-center text-gray-300">
                                    <Book size={64} />
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="p-8 md:p-12 flex flex-col">
                            <div className="mb-6">
                                <span className="text-indigo-600 font-bold tracking-wide uppercase text-sm">
                                    {product.genre?.genreDesc || 'Book'}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2 text-gray-900">
                                    {product.productName}
                                </h1>
                                <p className="text-xl text-gray-500">
                                    by {authorText}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-3xl font-bold text-accent">
                                    ₹{product.offerPrice || product.basePrice}
                                </div>
                                {product.offerPrice && (
                                    <div className="text-gray-400 line-through text-lg">
                                        ₹{product.basePrice}
                                    </div>
                                )}
                                {product.rentable && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        Rent Available
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                {product.shortDescription || product.longDescription}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={18} />
                                    <span>Published by {product.publisher?.publisherName || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Globe size={18} />
                                    <span>Language: {product.language?.languageDesc || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Book size={18} />
                                    <span>ISBN: {product.isbn || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                {renderActionButtons()}
                            </div>
                        </div>
                    </div>

                    {/* Long Description / Details Tab */}
                    <div className="p-8 md:p-12 border-t border-gray-100">
                        <h3 className="text-xl font-bold mb-4">About this Book</h3>
                        <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.longDescription || product.shortDescription || '' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper to map product names to local images
const getImageForProduct = (name) => {
    if (!name) return null;
    const lower = name.toLowerCase();

    if (lower.includes('1984')) return '/images/1984.jpg';
    if (lower.includes('atomic')) return '/images/atomic habbits.jpg';
    if (lower.includes('deep work')) return '/images/Deep_Work.jpg';
    if (lower.includes('alchemist')) return '/images/alchemist.jpg';
    if (lower.includes('mrutyunjay')) return '/images/Mrutyunjay_Marathi_novel.jpg';

    return null;
};

export default ProductDetail;
