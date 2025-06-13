import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartOverlay: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation PlaceOrder($input: OrderInput!) {
          placeOrder(input: $input)
        }`,
        variables: {
          input: {
            items: cartItems.map(item => ({
              productId: Number(item.product.id),
              quantity: item.quantity,
              price: item.product.prices[0].amount,
              name: item.product.name,
              attributes: Object.entries(item.selectedAttributes).map(([key, value]) => ({ key, value })),
              total: item.quantity * item.product.prices[0].amount,
            })),
          },
        },
      }),
    });

    const result = await response.json();
    if (result.data?.placeOrder) {
      alert('Order placed successfully!');
      clearCart();
    } else {
      alert('Failed to place order.');
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        data-testid="cart-overlay-backdrop"
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      <div
        data-testid="cart-overlay"
        className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 data-testid="cart-title" className="text-lg font-medium">
              My Bag, {getTotalItems()} Item{getTotalItems() !== 1 ? 's' : ''}
            </h2>
            <button
              data-testid="cart-close-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div data-testid="cart-items" className="space-y-6 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} data-testid={`cart-item-${index}`} className="border-b border-gray-200 pb-6">
                <div className="flex space-x-4">
                  <div className="w-20 h-24 bg-gray-100 flex items-center justify-center">
                    {item.product.gallery?.[0] ? (
                      <img
                        src={item.product.gallery[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.brand}</p>
                    <p className="font-medium mt-1">
                      ${item.product.prices[0]?.amount.toFixed(2)}
                    </p>

                    {Object.entries(item.selectedAttributes).map(([key, value]) => (
                      <div key={key} className="mt-2 text-sm" data-testid={`item-attribute-${key}`}>
                        <span className="font-medium text-gray-700">{key}: </span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col justify-between items-center">
                    <button
                      data-testid={`qty-increase-${index}`}
                      onClick={() => updateQuantity(item.product.id, item.selectedAttributes, item.quantity + 1)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-lg font-medium my-2">{item.quantity}</span>
                    <button
                      data-testid={`qty-decrease-${index}`}
                      onClick={() => updateQuantity(item.product.id, item.selectedAttributes, item.quantity - 1)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div data-testid="cart-total" className="mb-6">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              data-testid="clear-cart-btn"
              onClick={clearCart}
              className="w-1/2 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
            >
              Clear Cart
            </button>
            <button
              data-testid="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className={`w-1/2 py-2 rounded text-sm text-white ${cartItems.length > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;
