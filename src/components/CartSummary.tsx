
import React from 'react';

interface CartSummaryProps {
  totalPrice: number;
  cartItemsCount: number;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  totalPrice, 
  cartItemsCount, 
  isPlacingOrder, 
  onPlaceOrder 
}) => {
  return (
    <>
      {/* Cart Total */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Total</span>
          <span data-testid="cart-total">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={cartItemsCount === 0 || isPlacingOrder}
        className={`w-full py-3 text-white font-medium uppercase tracking-wide transition-colors ${
          cartItemsCount > 0 && !isPlacingOrder
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isPlacingOrder ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Placing Order...
          </div>
        ) : (
          'Place Order'
        )}
      </button>
    </>
  );
};

export default CartSummary;