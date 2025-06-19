
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  index: number;
  onUpdateQuantity: (index: number, quantity: number) => void;
  isPlacingOrder: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, index, onUpdateQuantity, isPlacingOrder }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
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
            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
            disabled={isPlacingOrder}
            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-3 h-3" />
          </button>
          
          <span data-testid="cart-item-amount" className="text-lg font-medium my-2">
            {item.quantity}
          </span>
          
          <button
            data-testid="cart-item-amount-decrease"
            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
            disabled={isPlacingOrder}
            className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
