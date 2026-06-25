import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

export interface CartItemData {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItemData[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  showToast: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItemData[]>(() => {
    const saved = localStorage.getItem('hlt_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('hlt_cart', JSON.stringify(items));
  }, [items]);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + ((item.product.promotionalPrice || item.product.price) * item.quantity), 0);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, showToast }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

