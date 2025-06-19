
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
      
      {/* Cart Overlay with maximum z-index */}
      {isCartOpen && (
        <div 
          id="cart-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999998,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={handleBackdropClick}
        >
          {/* Cart Panel */}
          <div 
            style={{
              width: '384px',
              height: '100vh',
              backgroundColor: 'white',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transform: 'translateX(0)',
              transition: 'transform 300ms ease-in-out',
              zIndex: 999999,
              position: 'relative'
            }}
            onClick={handlePanelClick}
          >
            <div style={{ height: '100%', overflowY: 'auto' }}>
              <div style={{ padding: '24px' }}>
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
                  <div style={{ marginBottom: '24px' }}>
                    {cartItems.map((item, index) => (
                      <div key={`${item.product.id}-${index}`} style={{ marginBottom: '24px' }}>
                        <CartItem
                          item={item}
                          index={index}
                          onUpdateQuantity={updateQuantity}
                          isPlacingOrder={isPlacingOrder}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: '#6B7280' }}>
                    <p style={{ fontSize: '18px' }}>Your cart is empty</p>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>Add some products to get started!</p>
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
