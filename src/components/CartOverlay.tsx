
import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartHeader from './CartHeader';
import CartError from './CartError';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartOverlay: React.FC = () => {
  console.log('🚀 CartOverlay component is rendering');
  
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

  console.log('🛒 CartOverlay render state:', { 
    isCartOpen, 
    cartItemsLength: cartItems.length,
    totalItems: getTotalItems(),
    cartItems: cartItems
  });

  const totalItems = getTotalItems();

  const handlePlaceOrder = async () => {
    console.log('📦 Placing order...');
    const success = await placeOrder();
    if (success) {
      alert('Order placed successfully!');
    }
  };

  const handleClose = () => {
    console.log('❌ Closing cart overlay');
    setIsCartOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    console.log('🎯 Backdrop clicked, closing cart');
    e.stopPropagation();
    setIsCartOpen(false);
  };

  const handlePanelClick = (e: React.MouseEvent) => {
    console.log('📱 Panel clicked, preventing close');
    e.stopPropagation();
  };

  return (
    <>
      {/* Always visible debug box */}
      <div 
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '12px 16px',
          backgroundColor: '#ff0000',
          color: 'white',
          zIndex: 999999,
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '8px',
          pointerEvents: 'none',
          fontFamily: 'monospace',
          border: '3px solid #ffffff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        🛒 CART DEBUG<br/>
        Open: {isCartOpen ? 'YES' : 'NO'}<br/>
        Items: {cartItems.length}<br/>
        Total: {totalItems}
      </div>
      
      {/* Cart Overlay - using simple conditional rendering with Tailwind classes */}
      {isCartOpen && (
        <div 
          data-testid="cart-overlay"
          id="cart-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={handleBackdropClick}
        >
          {/* Cart Panel */}
          <div 
            data-testid="cart-panel"
            className="w-96 h-full bg-white shadow-2xl transform translate-x-0 transition-transform duration-300 ease-in-out"
            onClick={handlePanelClick}
          >
            <div className="h-full overflow-y-auto">
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
                {cartItems.length > 0 ? (
                  <div className="space-y-6 mb-6">
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={`${item.product.id}-${index}`}
                        item={item}
                        index={index}
                        onUpdateQuantity={updateQuantity}
                        isPlacingOrder={isPlacingOrder}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm mt-2">Add some products to get started!</p>
                  </div>
                )}

                <CartSummary
                  totalPrice={getTotalPrice()}
                  cartItemsCount={cartItems.length}
                  isPlacingOrder={isPlacingOrder}
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartOverlay;
