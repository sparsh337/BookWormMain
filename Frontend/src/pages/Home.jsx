import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import DemoDashboard from '../components/DemoDashboard';
import api from '../api/axios';
import { ArrowRight, Star, Book, TrendingUp, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    // Helper to get image (copied from ProductCard or similar logic)
    const getImageForProduct = (productName) => {
        if (!productName) return null;
        const lowerName = productName.toLowerCase();
        if (lowerName.includes('1984')) return '/images/1984.jpg';
        if (lowerName.includes('alchemist')) return '/images/alchemist.jpg';
        if (lowerName.includes('gatsby')) return '/images/gatsby.jpg';
        if (lowerName.includes('mockingbird')) return '/images/mockingbird.jpg';
        // Add more mappings as needed
        return null;
    };

    // Placeholder images for the "Books Read" section
    const books = [
        '/images/placeholder_1.png',
        '/images/placeholder_2.png',
        '/images/placeholder_3.png',
        '/images/1984.jpg',
        '/images/alchemist.jpg'
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/products');
                // Just take the first 4 as featured for now
                setFeaturedProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen pb-20">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-indigo-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 animate-pulse-slow"></div>
                <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.span
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block backdrop-blur-md border border-indigo-500/30"
                        >
                            Discover Your Next Adventure
                        </motion.span>
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl md:text-7xl font-bold leading-tight mb-4"
                        >
                            Books that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-300% animate-gradient">
                                Ignite Minds.
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-xl text-gray-300 max-w-xl mb-8"
                        >
                            Explore our vast collection of bestsellers, classics, and hidden gems.
                            Get them delivered to your doorstep or read instantly.
                        </motion.p>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="flex gap-4"
                        >
                            <Link to="/products" className="btn btn-primary px-8 py-3 text-lg shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 hover:-translate-y-1">
                                Browse Collections
                            </Link>
                            {!user ? (
                                <Link to="/register" className="btn bg-white/10 text-white hover:bg-white/20 px-8 py-3 text-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                                    Join Community
                                </Link>
                            ) : (
                                <Link to="/library" className="btn bg-white/10 text-white hover:bg-white/20 px-8 py-3 text-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                                    My Dashboard
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Books Shelf (Visible to All) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="bg-[#ffedd5]/10 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group hover:bg-[#ffedd5]/20 transition-colors duration-500 border border-white/10"
                    >
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-orange-200 mb-6">Books Read 2025</h3>
                            <div className="flex -space-x-8 perspective-1000 justify-center">
                                {books.map((src, i) => (
                                    <motion.img
                                        key={i}
                                        src={src}
                                        initial={{ rotateY: -30, x: -100, opacity: 0 }}
                                        animate={{
                                            rotateY: [-15, -5, -15],
                                            y: [0, -10, 0],
                                            x: 0,
                                            opacity: 1
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatType: "mirror",
                                            delay: i * 0.2,
                                            ease: "easeInOut"
                                        }}
                                        whileHover={{ rotateY: 0, zIndex: 50, scale: 1.1, margin: "0 20px" }}
                                        className="w-20 h-32 object-cover rounded-md shadow-2xl border-l border-white/20 transform-style-3d cursor-pointer"
                                        style={{ zIndex: i }}
                                        alt="Book"
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -bottom-10 -right-10 text-orange-300/20">
                            <Book size={200} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Favorite Genres Section (Visible to All) */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-500">
                        <div className="z-10 text-center">
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">Your Favorite Genres</h4>
                            <p className="text-gray-500 font-medium">Discover books tailored to your unique taste.</p>
                        </div>

                        <div className="w-full overflow-hidden mask-gradient-x relative z-10 flex items-center h-24">
                            <motion.div
                                className="flex gap-4 whitespace-nowrap"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                            >
                                {[...['Sci\u2011Fi', 'Mystery', 'Romance', 'Fantasy', 'Self\u2011Help', 'Thriller', 'History'], ...['Sci\u2011Fi', 'Mystery', 'Romance', 'Fantasy', 'Self\u2011Help', 'Thriller', 'History'], ...['Sci\u2011Fi', 'Mystery', 'Romance', 'Fantasy', 'Self\u2011Help', 'Thriller', 'History']].map((genre, i) => (
                                    <motion.span
                                        key={`${genre}-${i}`}
                                        whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2, zIndex: 10 }}
                                        className={`px-8 py-4 rounded-full text-base sm:text-lg font-bold shadow-md cursor-pointer border border-white/50 flex-shrink-0 whitespace-nowrap
                                                ${i % 4 === 0 ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700' : ''}
                                                ${i % 4 === 1 ? 'bg-gradient-to-br from-pink-50 to-pink-100 text-pink-700' : ''}
                                                ${i % 4 === 2 ? 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700' : ''}
                                                ${i % 4 === 3 ? 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700' : ''}
                                            `}
                                    >
                                        {genre}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Featured Section (Trending Now) - Carousel Layout */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                <div className="container relative">
                    {/* Header */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12 flex items-center justify-between"
                    >
                        <div>
                            <h2 className="text-4xl font-bold mb-3 flex items-center gap-3">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 animate-gradient font-serif tracking-tight">
                                    Trending Now
                                </span>
                                <span className="flex h-3 w-3 relative mt-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                            </h2>
                            <p className="text-gray-500 text-lg">Handpicked favorites just for you</p>
                        </div>

                        <Link to="/products" className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group">
                            View All <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.length > 0 ? (
                                featuredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.productId}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                        className="h-full"
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    No featured books available at the moment.
                                </div>
                            )}
                        </div>
                    )}
                </div >
            </section >

            {/* Demo Dashboard (Rest of Stats) */}
            <DemoDashboard />

            {/* Features Banner */}
            <section className="bg-indigo-50 py-16 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

                <div className="container grid md:grid-cols-3 gap-8 relative z-10">
                    {[
                        { icon: Star, title: "Curated Selection", desc: "We handpick every book to ensure quality and relevance for our readers." },
                        { icon: Star, title: "Fast Delivery", desc: "Get your physical books delivered within 2-3 business days." },
                        { icon: Star, title: "Community Driven", desc: "Join discussions, write reviews and share your passion with others." },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="flex flex-col items-center text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="bg-white p-4 rounded-full shadow-md mb-4 text-accent group-hover:scale-110 transition-transform duration-300">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div >
    );
};

export default Home;
