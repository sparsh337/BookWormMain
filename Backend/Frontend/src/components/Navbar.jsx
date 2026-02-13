import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, BookOpen, LogOut, User, Search, Home, Library, Book, Crown, Info, Mail, Settings, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem('theme') === 'dark');
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        placeholder="Search for books ..."
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

                    <Link to="/about-us" className="nav-item">
                        <Info size={18} /> <span>About Us</span>
                    </Link>

                    <Link to="/contact-us" className="nav-item">
                        <Mail size={18} /> <span>Contact Us</span>
                    </Link>

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
                        <div className="user-menu-container" ref={dropdownRef}>
                            <div
                                className="user-menu-trigger"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {user.profileImage ? (
                                    <img src={user.profileImage} alt={user.userName} className="avatar" style={{ objectFit: 'cover' }} />
                                ) : (
                                    <div className="avatar">
                                        {user.userName?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span style={{ fontWeight: 500 }}>{user.userName}</span>
                            </div>

                            {showDropdown && (
                                <div className="dropdown-menu">
                                    <Link
                                        to="/library"
                                        className="dropdown-item"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <Library size={16} /> <span>Library</span>
                                    </Link>
                                    <Link
                                        to="/myshelf"
                                        className="dropdown-item"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <Book size={16} /> <span>My Shelf</span>
                                    </Link>
                                    <div className="dropdown-divider"></div>

                                    <div className="dropdown-section-title">
                                        <Settings size={14} /> <span>Settings</span>
                                    </div>

                                    <div className="dropdown-item-static">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                                                <span>Dark Mode</span>
                                            </div>
                                            <label className="theme-toggle">
                                                <input
                                                    type="checkbox"
                                                    checked={isDarkMode}
                                                    onChange={() => setIsDarkMode(!isDarkMode)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="dropdown-divider"></div>

                                    <button onClick={() => { logout(); setShowDropdown(false); }} className="dropdown-item text-danger">
                                        <LogOut size={16} /> <span>Logout</span>
                                    </button>
                                </div>
                            )}
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
