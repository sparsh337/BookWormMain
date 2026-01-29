import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        if (user?.userId) {
            fetchCart();
            fetchTotal();
        } else {
            setCartItems([]);
            setCartTotal(0);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const response = await api.get(`/cart/${user.userId}`);
            setCartItems(response.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    };

    const fetchTotal = async () => {
        if (!user?.userId) return;
        try {
            const response = await api.get(`/cart/total/${user.userId}`);
            setCartTotal(response.data);
        } catch (error) {
            console.error("Error fetching total", error);
        }
    };

    const addToCart = async (productId, quantity = 1, tranType = 'P', rentDays = null) => {
        if (!user) {
            toast.warning("Please login to add items to cart");
            return;
        }
        try {
            // API expects params: userId, productId, quantity, tranType, rentDays
            const params = {
                userId: user.userId,
                productId,
                quantity,
                tranType
            };

            if (rentDays) {
                params.rentDays = rentDays;
            }

            await api.post(`/cart/add`, null, { params });
            if (tranType === 'R') {
                toast.success(`Added to cart for ${rentDays || 7}-day Rental!`);
            } else if (tranType === 'L') {
                toast.success("Added to Library Cart!");
            } else {
                toast.success("Added to cart!");
            }
            fetchCart();
            fetchTotal();
        } catch (error) {
            console.error("Error adding to cart", error);
            // Robust error extraction
            let errorMessage = "Failed to add to cart";

            if (error.response && error.response.data) {
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (typeof error.response.data === 'string' && error.response.data.trim()) {
                    errorMessage = error.response.data;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        }
    };

    const removeFromCart = async (productId) => {
        if (!user) return;
        try {
            await api.delete(`/cart/${user.userId}/product/${productId}`);
            setCartItems(prev => prev.filter(item => item.product.productId !== productId));
            fetchTotal();
            toast.info("Item removed");
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    const reduceQuantity = async (productId) => {
        if (!user) return;
        try {
            await api.put(`/cart/${user.userId}/product/${productId}/decrease`);
            fetchCart();
            fetchTotal();
        } catch (error) {
            console.error("Error reducing quantity", error);
        }
    }

    const clearCart = async () => {
        if (!user) return;
        try {
            await api.delete(`/cart/clear/${user.userId}`);
            setCartItems([]);
            setCartTotal(0);
            toast.info("Cart cleared");
        } catch (error) {
            console.error("Error clearing cart", error);
        }
    };

    const value = {
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        reduceQuantity,
        clearCart,
        refreshCart: fetchCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
