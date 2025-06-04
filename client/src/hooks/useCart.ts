
import { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, selectedAttributes: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { product, quantity: 1, selectedAttributes }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemIndex: number, newQuantity: number) => {
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
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  };
};
