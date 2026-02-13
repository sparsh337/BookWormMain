import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { LayoutDashboard, Coins, BookOpen, User, Calendar, Hash, LogOut, ArrowUpDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'DESC' });

    useEffect(() => {
        document.title = "Admin Dashboard | BookWorm";
        // Strict Admin Check
        if (user && user.role !== 'ROLE_ADMIN') {
            navigate('/');
            return;
        }
    }, [user, navigate]);

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



    const handleSort = (key) => {
        let direction = 'ASC';
        if (sortConfig.key === key && sortConfig.direction === 'ASC') {
            direction = 'DESC';
        }
        setSortConfig({ key, direction });
    };

    const filteredTransactions = transactions.filter(t => {
        const title = t.product?.productName?.toLowerCase() || '';
        const author = t.author?.authorName?.toLowerCase() || '';
        const matchesSearch = title.includes(searchTerm.toLowerCase()) || author.includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || t.tranType === filterType;
        return matchesSearch && matchesType;
    }).sort((a, b) => {
        let aValue, bValue;

        switch (sortConfig.key) {
            case 'id':
                aValue = a.id;
                bValue = b.id;
                break;
            case 'product':
                aValue = a.product?.productName?.toLowerCase() || '';
                bValue = b.product?.productName?.toLowerCase() || '';
                break;
            case 'author':
                aValue = a.author?.authorName?.toLowerCase() || '';
                bValue = b.author?.authorName?.toLowerCase() || '';
                break;
            case 'price':
                aValue = a.salePrice || 0;
                bValue = b.salePrice || 0;
                break;
            case 'date':
                aValue = new Date(a.transactionDate);
                bValue = new Date(b.transactionDate);
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return sortConfig.direction === 'ASC' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ASC' ? 1 : -1;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Dedicated Admin Navbar */}
            <nav className="bg-indigo-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
                            <BookOpen className="w-6 h-6 text-indigo-300" />
                        </div>
                        <span>BookWorm <span className="text-indigo-400 font-medium px-2 py-0.5 bg-indigo-800/50 rounded-md text-sm border border-indigo-700/50 ml-1">ADMIN</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 text-white px-4 py-2 rounded-xl border border-white/20 hover:border-red-500/50 transition-all group font-medium"
                            title="Sign Out"
                        >
                            <span>Logout</span>
                            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
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
                            {/* <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider"><Hash className="w-3 h-3 inline mr-1" />ID</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider"><BookOpen className="w-3 h-3 inline mr-1" />Product</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider"><User className="w-3 h-3 inline mr-1" />Author</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider text-right">Sale Price</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider text-center">Royalty %</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider text-right text-indigo-600">Royalty Amt</th>
                                    <th className="px-6 py-4 text-xs text-left font-semibold text-gray-500 uppercase tracking-wider"><Calendar className="w-3 h-3 inline mr-1" />Date</th>
                                </tr>
                            </thead> */}
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">
                                        <button
                                            onClick={() => handleSort('id')}
                                            className="flex items-center gap-1 hover:text-indigo-600 transition-colors uppercase"
                                        >
                                            <Hash className="w-3 h-3" /> ID
                                            <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'id' ? 'text-indigo-600' : 'text-gray-300'}`} />
                                        </button>
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">
                                        <button
                                            onClick={() => handleSort('product')}
                                            className="flex items-center gap-1 hover:text-indigo-600 transition-colors uppercase"
                                        >
                                            <BookOpen className="w-3 h-3" /> Product
                                            <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'product' ? 'text-indigo-600' : 'text-gray-300'}`} />
                                        </button>
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">
                                        <button
                                            onClick={() => handleSort('author')}
                                            className="flex items-center gap-1 hover:text-indigo-600 transition-colors uppercase"
                                        >
                                            <User className="w-3 h-3" /> Author
                                            <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'author' ? 'text-indigo-600' : 'text-gray-300'}`} />
                                        </button>
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-left">
                                        Type
                                    </th>

                                    <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase text-center">
                                        Qty
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-right">
                                        <button
                                            onClick={() => handleSort('price')}
                                            className="flex items-center justify-end gap-1 hover:text-indigo-600 transition-colors uppercase w-full"
                                        >
                                            Sale Price
                                            <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'price' ? 'text-indigo-600' : 'text-gray-300'}`} />
                                        </button>
                                    </th>

                                    <th className="px-3 py-3 text-xs font-semibold text-gray-500 uppercase text-center">
                                        Royalty %
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-indigo-600 uppercase text-center">
                                        Royalty Amt
                                    </th>

                                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase text-center">
                                        <button
                                            onClick={() => handleSort('date')}
                                            className="flex items-center gap-1 mx-auto hover:text-indigo-600 transition-colors uppercase"
                                        >
                                            <Calendar className="w-3 h-3" /> Date
                                            <ArrowUpDown className={`w-3 h-3 ${sortConfig.key === 'date' ? 'text-indigo-600' : 'text-gray-300'}`} />
                                        </button>
                                    </th>
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
                                            <td className="px-6 py-4 text-sm text-center font-bold text-indigo-600">₹{t.royaltyAmount?.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm text-center-gray-500">
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
