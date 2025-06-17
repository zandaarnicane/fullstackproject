
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { ApiService } from '../services/apiService';
import { OrderInput, OrderItemInput } from '../types/graphql';

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  console.log('CartProvider render - isCartOpen:', isCartOpen, 'cartItems length:', cartItems.length, 'initialized:', isInitialized);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
       const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        // Auto-open cart if there are items after page refresh
        if (parsedCart.length > 0) {
          console.log('Found items in localStorage, opening cart overlay');
          setIsCartOpen(true);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Product, selectedAttributes: { [key: string]: string }) => {
    console.log('addToCart called with product:', product.name, 'attributes:', selectedAttributes);
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        console.log('Updated existing item quantity to:', newItems[existingItemIndex].quantity);
        return newItems;
      } else {
        console.log('Adding new item to cart');
        return [...prevItems, { product, quantity: 1, selectedAttributes }];
      }
    });
    console.log('Setting isCartOpen to true');
    setIsCartOpen(true);
  };

  const updateQuantity = (itemIndex: number, newQuantity: number) => {
    console.log('updateQuantity called with index:', itemIndex, 'newQuantity:', newQuantity);
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
    console.log('getTotalItems called, returning:', total);
    return total;
  };

  const clearCart = () => {
    console.log('clearCart called');
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
      // Convert cart items to GraphQL format
      const orderItems: OrderItemInput[] = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedAttributes: item.selectedAttributes,
        price: item.product.prices[0].amount,
      }));

      const orderInput: OrderInput = {
        items: orderItems,
        customerInfo,
      };

      console.log('Placing order with GraphQL:', orderInput);
      const orderResponse = await ApiService.createOrder(orderInput);
      
      console.log('Order created successfully:', orderResponse);
      clearCart();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
      console.error('Order placement failed:', error);
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
    setIsCartOpen: (value: boolean) => {
      console.log('setIsCartOpen called with value:', value);
      setIsCartOpen(value);
    },
    addToCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    placeOrder,
    clearOrderError
  };

  if (!isInitialized) {
    return <div>Loading cart...</div>;
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.error('useCart must be used within a CartProvider - context is undefined');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
