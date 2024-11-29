import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedItems = localStorage.getItem('cartItems');
            return savedItems ? JSON.parse(savedItems) : [];
        } catch (error) {
            console.error("Error parsing cartItems from localStorage:", error);
            return [];
        }
    });

    // Update localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        console.log("Current cartItems:", cartItems);

        if (!Array.isArray(cartItems)) {
            console.error("cartItems is not an array");
            return;
        }

        const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
        if (existingItem && existingItem.quantity > 1) {
            setCartItems(cartItems.map(cartItem =>
                cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            ));
        } else {
            setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
