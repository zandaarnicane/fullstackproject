
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CartOverlay: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();

  if (!isCartOpen) return null;

  const totalItems = getTotalItems();

  const handlePlaceOrder = () => {
    // Simulate GraphQL mutation - in real app this would call backend
    if (cartItems.length > 0) {
      console.log('Placing order:', cartItems);
      clearCart();
      alert('Order placed successfully!');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsCartOpen(false)} />
      
      {/* Cart Overlay */}
      <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">
              My Bag, {totalItems === 1 ? '1 Item' : `${totalItems} Items`}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="space-y-6 mb-6">
            {cartItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="flex space-x-4">
                  <img
                    src={item.product.gallery[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.brand}</p>
                    <p className="font-medium mt-1">${item.product.prices[0].amount.toFixed(2)}</p>
                    
                    {/* Product Attributes */}
                    {item.product.attributes.map((attribute) => (
                      <div 
                        key={attribute.id}
                        data-testid={`cart-item-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="mt-2"
                      >
                        <span className="text-sm font-medium text-gray-700">{attribute.name}: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {attribute.items.map((attrItem) => {
                            const isSelected = item.selectedAttributes[attribute.id] === attrItem.value;
                            const kebabValue = attrItem.value.toLowerCase().replace(/\s+/g, '-');
                            const kebabAttr = attribute.name.toLowerCase().replace(/\s+/g, '-');
                            
                            if (attribute.type === 'swatch') {
                              return (
                                <div
                                  key={attrItem.id}
                                  data-testid={`cart-item-attribute-${kebabAttr}-${kebabValue}${isSelected ? '-selected' : ''}`}
                                  className={`w-4 h-4 border ${
                                    isSelected ? 'border-gray-900 border-2' : 'border-gray-300'
                                  }`}
                                  style={{ backgroundColor: attrItem.value }}
                                />
                              );
                            } else {
                              return (
                                <span
                                  key={attrItem.id}
                                  data-testid={`cart-item-attribute-${kebabAttr}-${kebabValue}${isSelected ? '-selected' : ''}`}
                                  className={`text-xs px-2 py-1 border ${
                                    isSelected
                                      ? 'bg-gray-900 text-white border-gray-900'
                                      : 'bg-gray-100 text-gray-600 border-gray-300'
                                  }`}
                                >
                                  {attrItem.displayValue}
                                </span>
                              );
                            }
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex flex-col justify-between items-center">
                    <button
                      data-testid="cart-item-amount-increase"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    
                    <span data-testid="cart-item-amount" className="text-lg font-medium my-2">
                      {item.quantity}
                    </span>
                    
                    <button
                      data-testid="cart-item-amount-decrease"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total</span>
              <span data-testid="cart-total">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`w-full py-3 text-white font-medium uppercase tracking-wide ${
              cartItems.length > 0
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;
