
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange, categories }) => {
  const { getTotalItems, setIsCartOpen, isCartOpen } = useCart();
  const totalItems = getTotalItems();

  console.log('🔥 Header render - Cart state:', { isCartOpen, totalItems });

  const handleCartClick = () => {
    console.log('🖱️ Cart button clicked! Current state:', isCartOpen);
    console.log('📍 About to set cart open to true');
    setIsCartOpen(true);
    console.log('✅ setIsCartOpen(true) called');
  };

  const handleTestCartClick = () => {
    console.log('🧪 TEST CART button clicked!');
    console.log('🔍 Current cart state before:', isCartOpen);
    setIsCartOpen(true);
    console.log('🔍 setIsCartOpen(true) called from test button');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <nav className="flex space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
                className={`text-sm font-medium uppercase tracking-wide border-b-2 pb-4 transition-colors ${
                  activeCategory === category
                    ? 'text-green-500 border-green-500'
                    : 'text-gray-900 border-transparent hover:text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Enhanced Test Cart Button */}
            <button
              onClick={handleTestCartClick}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded font-bold hover:bg-red-600 transition-colors"
              style={{ zIndex: 1000 }}
            >
              🧪 TEST CART
            </button>

            <div className="relative">
              <button
                data-testid="cart-btn"
                onClick={handleCartClick}
                className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition-colors relative border-2 border-gray-200"
                style={{ zIndex: 1000 }}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;