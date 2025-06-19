
import React from 'react';
import { X } from 'lucide-react';

interface CartHeaderProps {
  totalItems: number;
  isPlacingOrder: boolean;
  onClose: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ totalItems, isPlacingOrder, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium">
        My Bag, {totalItems === 1 ? '1 Item' : `${totalItems} Items`}
      </h2>
      <button
        onClick={() => {
          console.log('Close button clicked');
          onClose();
        }}
        className="p-1 text-gray-400 hover:text-gray-600"
        disabled={isPlacingOrder}
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CartHeader;
