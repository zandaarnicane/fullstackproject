
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  isPlacingOrder: boolean;
  orderError: string | null;
  setIsCartOpen: (value: boolean) => void;
  addToCart: (product: Product, selectedAttributes: { [key: string]: string }) => void;
  updateQuantity: (itemIndex: number, newQuantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  placeOrder: (customerInfo?: { email?: string; name?: string; address?: string }) => Promise<boolean>;
  clearOrderError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpenState] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  console.log('🏪 CartProvider render - State:', { 
    isCartOpen, 
    cartItemsLength: cartItems.length, 
    isInitialized,
    cartItems: cartItems.map(item => ({ name: item.product.name, quantity: item.quantity }))
  });

  // Enhanced setIsCartOpen with debugging
  const setIsCartOpen = (value: boolean) => {
    console.log('🔧 setIsCartOpen called with value:', value);
    console.log('🔧 Previous isCartOpen value:', isCartOpen);
    setIsCartOpenState(value);
    console.log('🔧 setIsCartOpenState called with:', value);
  };

  useEffect(() => {
    console.log('📊 isCartOpen state changed to:', isCartOpen);
  }, [isCartOpen]);

  useEffect(() => {
    console.log('🚀 CartProvider initializing...');
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('💾 Found saved cart in localStorage:', parsedCart);
        setCartItems(parsedCart);
        if (parsedCart.length > 0) {
          console.log('🎯 Found items in localStorage, opening cart overlay');
          setIsCartOpen(true);
        }
      } else {
        console.log('💾 No saved cart found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading cart from localStorage:', error);
    }
    setIsInitialized(true);
    console.log('✅ CartProvider initialized');
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        console.log('💾 Saving cart to localStorage:', cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('❌ Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Product, selectedAttributes: { [key: string]: string }) => {
    console.log('🛍️ addToCart called with product:', product.name, 'attributes:', selectedAttributes);
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        console.log('📈 Updated existing item quantity to:', newItems[existingItemIndex].quantity);
        return newItems;
      } else {
        console.log('➕ Adding new item to cart');
        return [...prevItems, { product, quantity: 1, selectedAttributes }];
      }
    });
    console.log('🎯 Opening cart after adding item');
    setIsCartOpen(true);
  };

  const updateQuantity = (itemIndex: number, newQuantity: number) => {
    console.log('🔢 updateQuantity called with index:', itemIndex, 'newQuantity:', newQuantity);
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter((_, index) => index !== itemIndex));
    } else {
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity = newQuantity;
        return newItems;
      });
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.prices[0].amount * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('🔢 getTotalItems called, returning:', total);
    return total;
  };

  const clearCart = () => {
    console.log('🗑️ clearCart called');
    setCartItems([]);
    setIsCartOpen(false);
    setOrderError(null);
  };

  const clearOrderError = () => {
    setOrderError(null);
  };

  const placeOrder = async (customerInfo?: { email?: string; name?: string; address?: string }): Promise<boolean> => {
    if (cartItems.length === 0) {
      setOrderError('Cart is empty');
      return false;
    }

    setIsPlacingOrder(true);
    setOrderError(null);

    try {
      // Simple mock order placement without GraphQL
      console.log('📦 Placing order with items:', cartItems);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('✅ Order placed successfully');
      clearCart();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
      console.error('❌ Order placement failed:', error);
      setOrderError(errorMessage);
      return false;
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const value = {
    cartItems,
    isCartOpen,
    isPlacingOrder,
    orderError,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    placeOrder,
    clearOrderError
  };

  if (!isInitialized) {
    console.log('⏳ CartProvider not initialized yet, showing loading...');
    return <div>Loading cart...</div>;
  }

  console.log('🎭 CartProvider rendering with value:', {
    cartItemsLength: value.cartItems.length,
    isCartOpen: value.isCartOpen,
    totalItems: value.getTotalItems()
  });

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.error('❌ useCart must be used within a CartProvider - context is undefined');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};