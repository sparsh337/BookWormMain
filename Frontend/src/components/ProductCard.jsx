import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Clock, Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, mode, ownedStatus }) => {
    const { addToCart, removeFromCart, cartItems } = useCart();

    const handleAction = (e) => {
        e.stopPropagation(); // Prevent navigation to details
        if (ownedStatus && ownedStatus.tranType === 'P') return; // Already purchased

        if (mode === 'library') {
            addToCart(product.productId, 1, 'L', 0);
        } else {
            addToCart(product.productId, 1);
        }
    };

    // ... existing authorNames ...

    const authorNames = product.authors?.map(a => a.authorName).join(', ') || 'Unknown Author';
    const currency = '₹';

    // ... existing isSelected ...
    const isSelected = mode === 'library' && cartItems.some(item =>
        item.product.productId == product.productId && item.tranType == 'L'
    );

    // Ownership Labels
    const getOwnershipBadge = () => {
        if (!ownedStatus) return null;
        if (ownedStatus.tranType === 'P') return <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">PURCHASED</div>;
        if (ownedStatus.tranType === 'R') return <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">RENTED</div>;
        if (ownedStatus.tranType === 'L') return <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">LIBRARY</div>;
        return null;
    };

    return (
        <div
            className={`card h-full flex flex-col relative overflow-hidden group transition-all duration-300 ${isSelected ? 'shadow-xl scale-[1.02]' : ''} ${ownedStatus ? 'opacity-90' : ''}`}
            style={{
                border: isSelected ? '3px solid #4f46e5' : '1px solid transparent',
                backgroundColor: isSelected ? '#eef2ff' : 'white'
            }}
        >
            {/* Image Area */}
            <Link to={`/products/${product.productId}${mode === 'library' ? '?mode=library' : ''}`} className="bg-gray-100 h-64 w-full rounded-md mb-4 overflow-hidden relative block cursor-pointer">
                {/* Image or Placeholder */}
                {getImageForProduct(product.productName) ? (
                    <img
                        src={getImageForProduct(product.productName)}
                        alt={product.productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                        <BookIcon />
                    </div>
                )}

                {/* Badges Container */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                    {/* Ownership Badge (Priority) */}
                    {getOwnershipBadge()}

                    {/* Discount badge */}
                    {!ownedStatus && product.offerPrice && product.offerPrice < product.basePrice && (
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            SALE
                        </div>
                    )}
                    {/* Rent badge */}
                    {!ownedStatus && product.rentable && (
                        <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            RENT
                        </div>
                    )}
                    {/* Library badge */}
                    {!ownedStatus && product.library && (
                        <div className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            LIBRARY
                        </div>
                    )}
                </div>
            </Link>

            <div className="flex-1 flex flex-col">
                <div className="text-xs text-indigo-500 font-semibold mb-1 uppercase tracking-wide">
                    {product.genre?.genreDesc || 'General'}
                </div>

                <Link to={`/products/${product.productId}${mode === 'library' ? '?mode=library' : ''}`} className="text-lg font-bold mb-1 hover:text-accent transition-colors line-clamp-2">
                    {product.productName}
                </Link>

                <div className="text-sm text-gray-500 mb-3 line-clamp-1">
                    by {authorNames}
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.offerPrice ? (
                            <>
                                <span className="text-xl font-bold text-accent">{currency}{product.offerPrice}</span>
                                <span className="text-sm text-gray-400 line-through">{currency}{product.basePrice}</span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-accent">{currency}{product.basePrice}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Owned State: Show Checkmark or Info */}
                        {ownedStatus ? (
                            <Link
                                to={mode === 'library' ? '/library' : '/myshelf'}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200 hover:bg-gray-200"
                            >
                                {ownedStatus.tranType === 'P' ? 'OWNED' : (ownedStatus.tranType === 'R' ? 'RENTED' : 'IN LIB')}
                            </Link>
                        ) : (
                            /* Not Owned: Show Buttons */
                            <>
                                {product.rentable && mode !== 'library' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product.productId, 1, 'R', 7);
                                        }}
                                        className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all transform active:scale-95"
                                        title="Rent for 7 Days"
                                    >
                                        <Clock size={20} />
                                    </button>
                                )}

                                {mode === 'library' ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isSelected) {
                                                removeFromCart(product.productId);
                                            } else {
                                                addToCart(product.productId, 1, 'L', 0);
                                            }
                                        }}
                                        className="p-2 text-white rounded-full shadow-sm transition-all transform active:scale-95"
                                        style={{
                                            backgroundColor: isSelected ? '#ef4444' : '#4f46e5'
                                        }}
                                        title={isSelected ? "Remove from Library" : "Add to Library"}
                                    >
                                        {isSelected ? <Minus size={20} /> : <Plus size={20} />}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleAction}
                                        className="p-2 bg-gray-100 rounded-full hover:bg-accent hover:text-white transition-all transform active:scale-95"
                                        title="Add to Cart"
                                    >
                                        <ShoppingCart size={20} />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple SVG placeholder
const BookIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
)

// Helper to map product names to local images
const getImageForProduct = (name) => {
    if (!name) return '/images/placeholder_1.png';
    const lower = name.toLowerCase();

    // Specific Mappings
    if (lower.includes('1984')) return '/images/1984.jpg';
    if (lower.includes('atomic')) return '/images/atomic habbits.jpg';
    if (lower.includes('deep work')) return '/images/Deep_Work.jpg';
    if (lower.includes('alchemist')) return '/images/alchemist.jpg';
    if (lower.includes('mrutyunjay')) return '/images/Mrutyunjay_Marathi_novel.jpg';

    // Dynamic Placeholder Logic (deterministic based on name length)
    const placeholders = [
        '/images/placeholder_1.png',
        '/images/placeholder_2.png',
        '/images/placeholder_3.png'
    ];

    // Pick based on char code sum to be consistent
    const charSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return placeholders[charSum % placeholders.length];
};

export default ProductCard;
