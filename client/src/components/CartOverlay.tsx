
import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartHeader from './CartHeader';
import CartError from './CartError';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartOverlay: React.FC = () => {
  console.log('CartOverlay component is rendering');
  
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems, 
    placeOrder,
    isPlacingOrder,
    orderError,
    clearOrderError
  } = useCart();

  console.log('CartOverlay render - isCartOpen:', isCartOpen, 'cartItems:', cartItems);

  const totalItems = getTotalItems();

  const handlePlaceOrder = async () => {
    const success = await placeOrder();
    if (success) {
      alert('Order placed successfully!');
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const handleBackdropClick = () => {
    console.log('Backdrop clicked, closing cart');
    setIsCartOpen(false);
  };

  if (isCartOpen) {
    console.log('CartOverlay IS RENDERING - overlay should be visible');
  }

  return (
    <>
      {/* Debug box - ALWAYS visible */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '4px 8px',
        backgroundColor: 'red',
        color: 'white',
        zIndex: 10000,
        fontSize: '12px',
        pointerEvents: 'none'
      }}>
        🛒 CartOverlay Debug: open = {isCartOpen ? 'true' : 'false'} | items = {cartItems.length}
      </div>
      
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={handleBackdropClick} 
          />
          
          {/* Cart Overlay */}
          <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <CartHeader 
                totalItems={totalItems}
                isPlacingOrder={isPlacingOrder}
                onClose={handleClose}
              />

              {/* Error Display */}
              {orderError && (
                <CartError 
                  error={orderError}
                  onClearError={clearOrderError}
                />
              )}

              {/* Cart Items */}
              <div className="space-y-6 mb-6">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    index={index}
                    onUpdateQuantity={updateQuantity}
                    isPlacingOrder={isPlacingOrder}
                  />
                ))}
              </div>

              <CartSummary
                totalPrice={getTotalPrice()}
                cartItemsCount={cartItems.length}
                isPlacingOrder={isPlacingOrder}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartOverlay;
