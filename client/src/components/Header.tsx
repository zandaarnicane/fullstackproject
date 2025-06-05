
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ activeCategory, onCategoryChange, categories }) => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  const handleCartClick = () => {
    console.log('Cart button clicked, setting isCartOpen to true');
    setIsCartOpen(true);
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

          <div className="relative">
            <button
              data-testid="cart-btn"
              onClick={handleCartClick}
              className="bg-white text-black p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
