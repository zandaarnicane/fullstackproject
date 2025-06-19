
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface CartErrorProps {
  error: string;
  onClearError: () => void;
}

const CartError: React.FC<CartErrorProps> = ({ error, onClearError }) => {
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
        <span className="text-red-700 text-sm">{error}</span>
        <button
          onClick={onClearError}
          className="ml-auto text-red-500 hover:text-red-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartError;
