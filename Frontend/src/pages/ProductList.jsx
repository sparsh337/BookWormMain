import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Filter, X, ArrowRight } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ownedItems, setOwnedItems] = useState([]);
    const { user } = useAuth();

    // Filters
    // Filters (Multi-select)
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    const { cartItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    const search = searchParams.get('search');

    useEffect(() => {
        const fetchShelf = async () => {
            if (user?.userId) {
                try {
                    const [shelfRes, libraryRes] = await Promise.all([
                        api.get(`/api/shelf/${user.userId}`),
                        api.get(`/api/library/${user.userId}`)
                    ]);

                    const allItems = [...shelfRes.data, ...libraryRes.data];

                    const owned = allItems.map(item => ({
                        productId: item.product.productId,
                        tranType: item.tranType,
                        expiry: item.productExpiryDate
                    }));
                    setOwnedItems(owned);
                } catch (e) {
                    console.error("Failed to fetch shelf", e);
                }
            }
        };
        fetchShelf();
    }, [user]);

    useEffect(() => {
        // Fetch Metadata
        const fetchMetadata = async () => {
            try {
                const [gRes, lRes] = await Promise.all([
                    api.get('/api/category/genres'),
                    api.get('/api/category/languages')
                ]);
                setGenres(gRes.data);
                setLanguages(lRes.data);
            } catch (e) {
                console.error("Failed to fetch filters", e);
            }
        };
        fetchMetadata();
    }, []);

    useEffect(() => {
        // Fetch Products with filters
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let response;

                // If using multi-filters
                if (selectedGenres.length > 0 || selectedLanguages.length > 0) {
                    const params = new URLSearchParams();
                    if (selectedGenres.length > 0) params.append('genreIds', selectedGenres.join(','));
                    if (selectedLanguages.length > 0) params.append('languageIds', selectedLanguages.join(','));

                    response = await api.get(`/api/category/filter?${params.toString()}`);
                }
                // Default / Search fallback
                else {
                    const params = {};
                    if (search) params.search = search;
                    response = await api.get('/api/category/products', { params });
                }

                let data = response.data;
                // Filter for library mode if requested
                if (mode === 'library') {
                    data = data.filter(p => p.library);
                }

                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedGenres, selectedLanguages, mode, search]);

    // Filter Toggle Handlers
    const toggleGenre = (id) => {
        setSelectedGenres(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleLanguage = (id) => {
        setSelectedLanguages(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />

            <div className="container py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {mode === 'library' ? 'Library Collection' : 'Explore Books'}
                        </h1>
                        <p className="text-gray-500">
                            {mode === 'library'
                                ? 'Select books for your subscription plan.'
                                : 'Find your next favorite read from our collection.'}
                        </p>
                    </div>

                    <button
                        className="md:hidden btn btn-secondary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} /> Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className={`
                 w-full md:w-64 bg-white p-6 rounded-lg shadow-sm h-fit space-y-6
                 ${showFilters ? 'block' : 'hidden md:block'}
             `}>
                        <div className="flex justify-between items-center md:hidden mb-4">
                            <h2 className="font-bold text-lg">Filters</h2>
                            <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Genres</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-accent">
                                    <input
                                        type="checkbox"
                                        checked={selectedGenres.length === 0}
                                        onChange={() => setSelectedGenres([])}
                                        className="accent-accent"
                                    />
                                    <span>All Genres</span>
                                </label>
                                {genres.map(g => (
                                    <label key={g.genreId} className="flex items-center gap-2 cursor-pointer hover:text-accent">
                                        <input
                                            type="checkbox"
                                            value={g.genreId}
                                            checked={selectedGenres.includes(g.genreId)}
                                            onChange={() => toggleGenre(g.genreId)}
                                            className="accent-accent"
                                        />
                                        <span>{g.genreDesc}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="font-semibold mb-3">Languages</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer hover:text-accent">
                                    <input
                                        type="checkbox"
                                        checked={selectedLanguages.length === 0}
                                        onChange={() => setSelectedLanguages([])}
                                        className="accent-accent"
                                    />
                                    <span>All Languages</span>
                                </label>
                                {languages.map(l => (
                                    <label key={l.languageId} className="flex items-center gap-2 cursor-pointer hover:text-accent">
                                        <input
                                            type="checkbox"
                                            value={l.languageId}
                                            checked={selectedLanguages.includes(l.languageId)}
                                            onChange={() => toggleLanguage(l.languageId)}
                                            className="accent-accent"
                                        />
                                        <span>{l.languageDesc}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map(product => {
                                    const owned = ownedItems.find(item => item.productId === product.productId);
                                    return (
                                        <ProductCard
                                            key={product.productId}
                                            product={product}
                                            mode={mode}
                                            ownedStatus={owned}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
                                <button
                                    onClick={() => { setSelectedGenres([]); setSelectedLanguages([]) }}
                                    className="mt-4 text-accent font-medium hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Footer for Library Mode */}
            {mode === 'library' && cartItems.filter(i => i.tranType === 'L').length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 animate-slide-up z-50">
                    <div className="container flex justify-between items-center">
                        <div>
                            <span className="text-gray-600">Selected Books:</span>
                            <span className="text-2xl font-bold text-indigo-600 ml-2">
                                {cartItems.filter(i => i.tranType === 'L').length}
                            </span>
                        </div>
                        <button
                            onClick={() => navigate('/cart')}
                            className="btn btn-primary px-8 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg hover:scale-105 transition-transform"
                        >
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
