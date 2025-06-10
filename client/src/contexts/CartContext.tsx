
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { addToCartAPI } from '../api/cart';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  addToCart: (product: Product, selectedAttributes: { [key: string]: string }) => void;
  updateQuantity: (itemIndex: number, newQuantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = async (product: Product, selectedAttributes: { [key: string]: string }) => {
    console.log('addToCart (server mode) called with:', product.name, selectedAttributes);

    try {
    const quantity = 1;
    const price = product.prices[0].amount;

    // Sagatavo attributes formātā: [{ key: 'Color', value: 'Red' }, ...]
    const attributesArray = Object.entries(selectedAttributes).map(([key, value]) => ({
      key,
      value,
    }));

    const updatedCart = await addToCartAPI(
      Number(product.id),
      product.name,
      price,
      quantity,
      attributesArray
    );

    if (!updatedCart) {
      console.warn('No cart returned from server');
      return;
    }

    const newItems: CartItem[] = updatedCart.items.map((item: any) => ({
      product: {
        id: item.productId,
        name: item.name,
        prices: [{ currency: "USD", amount: item.price }],
      },
      quantity: item.quantity,
      selectedAttributes: selectedAttributes, // Saglabā izvēlētās atribūtvērtības
    }));

    setCartItems(newItems);
    setIsCartOpen(true);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

  const updateQuantity = async (itemIndex: number, newQuantity: number) => {
    console.log('updateQuantity is not supported in server mode directly.');
    // Optional: Add API call here to update quantity via GraphQL if backend supports it
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.prices[0].amount;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    console.log('clearCart is not implemented in server mode.');
    // Optional: Add GraphQL mutation to clear cart server-side
  };

  const value: CartContextType = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};