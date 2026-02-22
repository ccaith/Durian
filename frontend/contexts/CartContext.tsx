import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useUser } from '@/contexts/UserContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void; // <-- added
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
const [userCarts, setUserCarts] = useState<Record<string, CartItem[]>>({});
const { user } = useUser();
const cart = user ? userCarts[user.id] || [] : [];

  const addToCart = (item: CartItem) => {
  if (!user) return;

  setUserCarts(prev => {
    const currentCart = prev[user.id] || [];

    const existing = currentCart.find(p => p.id === item.id);

    let updatedCart;

    if (existing) {
      updatedCart = currentCart.map(p =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...currentCart, { ...item, quantity: 1 }];
    }

    return {
      ...prev,
      [user.id]: updatedCart
    };
  });
};

  const removeFromCart = (id: string) => {
  if (!user) return;

  setUserCarts(prev => {
    const currentCart = prev[user.id] || [];
    const updatedCart = currentCart.filter(p => p.id !== id);

    return {
      ...prev,
      [user.id]: updatedCart
    };
  });
};

  const clearCart = () => {
  if (!user) return;

  setUserCarts(prev => ({
    ...prev,
    [user.id]: []
  }));
};

  const updateQuantity = (id: string, quantity: number) => {
  if (!user || quantity < 1) return;

  setUserCarts(prev => {
    const currentCart = prev[user.id] || [];

    const updatedCart = currentCart.map(p =>
      p.id === id ? { ...p, quantity } : p
    );

    return {
      ...prev,
      [user.id]: updatedCart
    };
  });
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};