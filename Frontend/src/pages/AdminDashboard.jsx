import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { LayoutDashboard, Coins, BookOpen, User, Calendar, Hash } from 'lucide-react';

const AdminDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');

    useEffect(() => {
        const fetchRoyalties = async () => {
            try {
                const response = await api.get('/admin/royalties');
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching royalties:", error);
                toast.error("Failed to load royalty data. Please ensure you have admin privileges.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoyalties();
    }, []);

    const getTypeLabel = (type) => {
        switch (type) {
            case 'P': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Purchase</span>;
            case 'R': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Rent</span>;
            case 'L': return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Library</span>;
            default: return type;
        }
    };

    const filteredTransactions = transactions.filter(t => {
        const title = t.product?.productName?.toLowerCase() || '';
        const author = t.author?.authorName?.toLowerCase() || '';
        const matchesSearch = title.includes(searchTerm.toLowerCase()) || author.includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || t.tranType === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
                            Admin Royalty Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">Monitor author royalties and sales performance across the platform.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                            <Coins className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Results Found</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by book title or author..."
                            className="input w-full pl-10 h-11"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-64">
                        <select
                            className="input h-11"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="ALL">All Transaction Types</option>
                            <option value="P">Purchase Only</option>
                            <option value="R">Rentals Only</option>
                            <option value="L">Library Plans</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"><Hash className="w-3 h-3 inline mr-1" />ID</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"><BookOpen className="w-3 h-3 inline mr-1" />Product</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"><User className="w-3 h-3 inline mr-1" />Author</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Sale Price</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Royalty %</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right text-indigo-600">Royalty Amt</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"><Calendar className="w-3 h-3 inline mr-1" />Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                                <p>Loading royalty data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-12 text-center text-gray-500 italic">
                                            No royalty transactions found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-400">#{t.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-900">{t.product?.productName}</div>
                                                <div className="text-xs text-gray-500">{t.product?.isbn}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{t.author?.authorName}</td>
                                            <td className="px-6 py-4">{getTypeLabel(t.tranType)}</td>
                                            <td className="px-6 py-4 text-sm text-center">{t.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-right font-medium">₹{t.salePrice?.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm text-center">
                                                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold text-xs">
                                                    {t.royaltyPercent}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right font-bold text-indigo-600">₹{t.royaltyAmount?.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(t.transactionDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
