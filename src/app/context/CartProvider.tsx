"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '../interfaces/interface-props';

const CartContext = createContext<{
    cart: CartItem[];
    addToCart: (product: CartItem) => void;
    totalAmount: number;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (cartItem) => cartItem.productId === item.productId
            );

            if (existingItem) {
                return currentCart.map((cartItem) =>
                    cartItem.productId === item.productId
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                return [...currentCart, item];
            }
        });
    };

    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{ cart, addToCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart deve ser usado dentro do CartProvider");
    }
    return context;
};
