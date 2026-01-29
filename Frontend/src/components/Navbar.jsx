import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, BookOpen, LogOut, User, Search, Home, Library, Book, Crown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchTerm.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
            } else {
                navigate('/products');
            }
        }
    };

    const cartCount = cartItems.length;

    return (
        <nav className="navbar">
            <div className="container nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <BookOpen size={32} />
                    <span>BookWorm</span>
                </Link>

                {/* Search Bar */}
                <div className="search-bar">
                    <Search
                        size={18}
                        className="text-light cursor-pointer"
                        onClick={handleSearch}
                    />
                    <input
                        type="text"
                        placeholder="Search for books, authors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>

                {/* Actions */}
                <div className="nav-links">
                    <Link to="/" className="nav-item">
                        <Home size={18} /> <span>Home</span>
                    </Link>

                    <Link to="/products" className="nav-item">
                        <BookOpen size={18} /> <span>Books</span>
                    </Link>

                    <Link to="/membership" className="nav-item">
                        <Crown size={18} /> <span>Membership</span>
                    </Link>

                    {user && (
                        <Link to="/library" className="nav-item">
                            <Library size={18} /> <span>Library</span>
                        </Link>
                    )}

                    {user && (
                        <Link to="/myshelf" className="nav-item">
                            <Book size={18} /> <span>My Shelf</span>
                        </Link>
                    )}

                    {user && (
                        <Link to="/cart" className="nav-item cart-icon">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="cart-badge">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {user ? (
                        <div className="user-menu">
                            <div className="flex items-center gap-2">
                                {user.profileImage ? (
                                    <img src={user.profileImage} alt={user.userName} className="avatar" style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div className="avatar">
                                        {user.userName?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span style={{ fontWeight: 500 }}>{user.userName}</span>
                            </div>
                            <button onClick={logout} className="text-danger" title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="btn btn-secondary">Log in</Link>
                            <Link to="/register" className="btn btn-primary">Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
