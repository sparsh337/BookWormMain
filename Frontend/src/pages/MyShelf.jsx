import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Calendar, AlertCircle, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyShelf = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchShelf();
        }
    }, [user]);

    const fetchShelf = async () => {
        try {
            const response = await api.get(`/api/shelf/${user.userId}`);
            setItems(response.data);
        } catch (error) {
            console.error("Failed to fetch shelf", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (shelfId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this book from your shelf?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6366f1',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/api/shelf/id/${shelfId}`);
                Swal.fire(
                    'Deleted!',
                    'The book has been removed.',
                    'success'
                );
                fetchShelf();
            } catch (error) {
                console.error("Failed to remove book", error);
                toast.error("Failed to remove book");
            }
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'P': return { label: 'Purchased', color: 'bg-green-100 text-green-700' };
            case 'R': return { label: 'Rented', color: 'bg-orange-500 text-white shadow-sm' };
            case 'L': return { label: 'Library', color: 'bg-indigo-100 text-indigo-700' };
            default: return { label: 'Unknown', color: 'bg-gray-100 text-gray-700' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <div className="container py-10">
                <div className="flex items-center justify-center mb-10">
                    <div className="bg-white p-4 rounded-full shadow-sm text-indigo-600 mr-4">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            My Bookshelf
                        </h1>
                        <p className="text-gray-500">Your personal collection of books</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                        <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                            <BookOpen size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Shelf is Empty</h2>
                        <p className="text-gray-500 mb-6">You haven't purchased or rented any books yet.</p>
                        <a href="/products" className="btn btn-primary">Browse Store</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => {
                            const { label, color } = getTypeLabel(item.tranType);
                            const isExpired = item.productExpiryDate && new Date(item.productExpiryDate) < new Date();

                            return (
                                <div key={item.shelfId} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group">
                                    <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${color}`}>
                                        {label}
                                    </div>

                                    <div className="p-6">
                                        <div className="h-40 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-300 relative overflow-hidden">
                                            <BookOpen size={48} />
                                            {/* Buttons Container - Always Visible */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all gap-5">
                                                <button className="btn btn-primary btn-sm">Read Now</button>
                                                <button
                                                    onClick={() => handleRemove(item.shelfId)}
                                                    className="btn btn-sm border-none text-white p-2"
                                                    style={{ backgroundColor: '#ef4444' }}
                                                    title="Remove from Shelf"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{item.product.productName}</h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {item.product.authors?.map(a => a.authorName).join(', ')}
                                        </p>

                                        {item.productExpiryDate && item.tranType !== 'P' && (
                                            <div className={`flex items-center gap-2 text-sm ${isExpired ? 'text-red-500' : 'text-orange-600'} bg-orange-50 p-3 rounded-lg`}>
                                                {isExpired ? <AlertCircle size={16} /> : <Clock size={16} />}
                                                <span className="font-medium">
                                                    {isExpired ? 'Expired on ' : 'Expires on '}
                                                    {item.productExpiryDate}
                                                </span>
                                            </div>
                                        )}

                                        {(!item.productExpiryDate || item.tranType === 'P') && (
                                            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                                                <Calendar size={16} />
                                                <span className="font-medium">Lifetime Access</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyShelf;
