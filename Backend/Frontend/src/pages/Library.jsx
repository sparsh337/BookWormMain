import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, Calendar, AlertCircle, Library as LibIcon, Trash2, X, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Library = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [mediaLoading, setMediaLoading] = useState(false);

    useEffect(() => {
        document.title = "Digital Library | BookWorm";
        if (user) {
            fetchLibrary();
        }
    }, [user]);

    // 🔒 SCROLL LOCK
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedItem]);

    // 🛡️ DRM PROTECTION: Keyboard Shortcuts & Right-Click
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedItem) return;

            // Block Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (Source), F12 (DevTools)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
                e.preventDefault();
                toast.warning("Secure View: Printing and Saving are restricted.", { position: "top-center", autoClose: 2000 });
            }
            if (e.key === 'F12') {
                e.preventDefault();
            }
        };

        const handleContextMenu = (e) => {
            if (selectedItem) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('contextmenu', handleContextMenu);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [selectedItem]);

    const fetchLibrary = async () => {
        try {
            const response = await api.get(`/api/library/${user.userId}`);
            setItems(response.data);
        } catch (error) {
            console.error("Failed to fetch library", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReadNow = async (item) => {
        if (item.productExpiryDate && new Date(item.productExpiryDate) < new Date()) {
            toast.error("Subscription expired. Please renew to read.");
            return;
        }

        setSelectedItem(item);
        setMediaLoading(true);

        try {
            const response = await api.get(`/api/media/${item.product.productId}`, {
                responseType: 'blob'
            });
            const url = URL.createObjectURL(response.data);
            setMediaUrl(url);
        } catch (error) {
            console.error("Error fetching media", error);
            toast.error("Could not load book content. Please try again.");
            setSelectedItem(null);
        } finally {
            setMediaLoading(false);
        }
    };

    const closeReader = () => {
        if (mediaUrl) URL.revokeObjectURL(mediaUrl);
        setMediaUrl(null);
        setSelectedItem(null);
    };

    const handleRemove = async (shelfId, tranType) => {
        const text = tranType === 'L'
            ? "Are you sure you want to return this library book? This will free up a subscription slot."
            : "Are you sure you want to remove this rented book from your library?";

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6366f1',
            confirmButtonText: 'Yes, remove it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/api/library/id/${shelfId}`);
                Swal.fire(
                    'Removed!',
                    'The book mapping has been updated.',
                    'success'
                );
                fetchLibrary();
            } catch (error) {
                console.error("Failed to remove item", error);
                toast.error("Failed to remove item");
            }
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'R': return { label: 'Rented', color: 'bg-gray-200 text-gray-900 shadow-sm' };
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
        <>
            {/* 🛡️ IMMERSIVE PAGE TAKEOVER READER (100% FULLSCREEN) */}
            {selectedItem && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999,
                        backgroundColor: '#020617',
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box'
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {/* 💎 Header: Compacted */}
                    <header style={{
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 24px',
                        backgroundColor: '#111827',
                        borderBottom: '1px solid #1e293b',
                        flexShrink: 0,
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '56px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                <img
                                    src={`/covers/${encodeURIComponent(selectedItem.product.productName)}.jpg`}
                                    alt="Cover"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40'; }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '900', margin: 0, lineHeight: 1.2 }}>
                                    {selectedItem.product.productName}
                                </h2>
                                <p style={{ color: '#64748b', fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '2px 0 0 0' }}>
                                    By {selectedItem.product.authors?.map(a => a.authorName).join(', ')}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={closeReader}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '10px',
                                color: '#cbd5e1',
                                fontWeight: '900',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textTransform: 'uppercase',
                                fontSize: '10px',
                                letterSpacing: '0.05em'
                            }}
                        >
                            <span className="hidden md:block">Exit</span>
                            <X size={16} />
                        </button>
                    </header>

                    {/* 📖 Content Area: Explicit Flex-Grow */}
                    <main style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: '#0f172a',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto'
                    }}>
                        {mediaLoading ? (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#020617',
                                color: 'white',
                                zIndex: 30
                            }}>
                                <div className="animate-spin" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(99,102,241,0.1)', borderTopColor: '#6366f1', marginBottom: '20px' }}></div>
                                <p style={{ fontWeight: '900', color: '#818cf8', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.4em' }}>Unlocking Vault</p>
                            </div>
                        ) : mediaUrl ? (
                            selectedItem.product.productType?.typeDesc?.toUpperCase() === 'EBOOK' ? (
                                <div style={{ width: '100%', height: '100%', padding: '0', margin: '0', display: 'flex' }}>
                                    <iframe
                                        src={`${mediaUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                                        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                                        title="Reader"
                                    />
                                </div>
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617', padding: '40px' }}>
                                    <div style={{ width: '250px', height: '350px', backgroundColor: '#0f172a', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}>
                                        <img
                                            src={`/covers/${encodeURIComponent(selectedItem.product.productName)}.jpg`}
                                            alt={selectedItem.product.productName}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                                            }}
                                        />
                                    </div>
                                    <h3 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
                                        {selectedItem.product.productName}
                                    </h3>
                                    <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '40px', textAlign: 'center' }}>
                                        {selectedItem.product.authors?.map(a => a.authorName).join(', ')}
                                    </p>
                                    <audio controls src={mediaUrl} style={{ width: '100%', maxWidth: '600px', height: '54px', borderRadius: '27px', zIndex: 10, position: 'relative' }} controlsList="nodownload" />
                                </div>
                            )
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', padding: '40px' }}>
                                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#0f172a', borderRadius: '28px', border: '1px solid #1e293b', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                                    <AlertCircle size={54} style={{ color: '#ef4444', marginBottom: '20px' }} />
                                    <h4 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '10px' }}>Stream Failed</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>Secure connection interrupted. Please return to your library and try again.</p>
                                    <button onClick={closeReader} style={{ marginTop: '30px', width: '100%', padding: '14px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.1em' }}>Back to Library</button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}

            <div className="min-h-screen bg-gray-50 pb-20">
                <Navbar />
                <div className="container py-10">
                    <div className="flex items-center justify-center mb-10">
                        <div className="bg-white p-4 rounded-full shadow-sm text-indigo-600 mr-4">
                            <LibIcon size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                My Library
                            </h1>
                            <p className="text-gray-500">Your rented and borrowed books</p>
                        </div>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
                                <LibIcon size={48} className="text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-700 mb-2">Library is Empty</h2>
                            <p className="text-gray-500 mb-6">You haven't rented any books yet.</p>
                            <a href="/products" className="btn btn-primary">Browse Store</a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map(item => {
                                const { label, color } = getTypeLabel(item.tranType);
                                const isExpired = item.productExpiryDate && new Date(item.productExpiryDate) < new Date();

                                return (
                                    <div
                                        key={item.shelfId}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group"
                                    >
                                        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide z-20 ${color}`}>
                                            {label}
                                        </div>

                                        <div className="p-4 flex flex-col h-full">
                                            {/* Fixed Size Image Box */}
                                            <div className="w-full h-64 bg-gray-100 rounded-lg shadow-sm mb-4 overflow-hidden relative">
                                                <img
                                                    src={`/covers/${encodeURIComponent(item.product.productName)}.jpg`}
                                                    alt={item.product.productName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Cover';
                                                    }}
                                                />
                                            </div>

                                            {/* Details & Action Buttons Below */}
                                            <div className="flex-1 flex flex-col">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 text-center">{item.product.productName}</h3>
                                                <p className="text-sm text-gray-500 mb-2 text-center">
                                                    {item.product.authors?.map(a => a.authorName).join(', ')}
                                                </p>

                                                <div className="flex justify-center mb-4">
                                                    {item.productExpiryDate && (
                                                        <div className={`flex items-center gap-1 text-xs ${isExpired ? 'text-red-500' : 'text-orange-600'} bg-orange-50 px-2 py-1 rounded-full inline-flex`}>
                                                            {isExpired ? <AlertCircle size={12} /> : <Clock size={12} />}
                                                            <span className="font-medium">
                                                                {isExpired ? 'Expired' : 'Expires: '} {item.productExpiryDate}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50 justify-center">
                                                    <button
                                                        onClick={() => handleReadNow(item)}
                                                        className="btn btn-primary btn-sm flex items-center justify-center gap-2 text-xs py-2 rounded-lg font-bold px-10 flex-none"
                                                    >
                                                        <BookOpen size={14} /> READ NOW
                                                    </button>
                                                    {item.tranType === 'R' && (
                                                        <button
                                                            onClick={() => handleRemove(item.shelfId, item.tranType)}
                                                            className="btn btn-sm flex-shrink-0 bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-all p-2 rounded-lg"
                                                            title="Remove from Library"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Library;
