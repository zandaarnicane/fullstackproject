import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToCart } = useCart();

  const handleQuickShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock) {
      const defaultAttributes: { [key: string]: string } = {};
      product.attributes.forEach(attr => {
        if (attr.items.length > 0) {
          defaultAttributes[attr.id] = attr.items[0].value;
        }
      });
      addToCart(product, defaultAttributes);
    }
  };

  const kebabCaseName = product.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      data-testid={`product-card-${kebabCaseName}`}
      className="group cursor-pointer bg-white p-4 relative"
      onClick={() => onProductClick(product.id)}
    >
      <div className="relative overflow-hidden rounded-lg" data-testid="product-image-wrapper">
        <img
          data-testid={`product-image-${kebabCaseName}`}
          src={product.gallery[0]}
          alt={product.name}
          className={`w-full h-64 object-cover transition-transform group-hover:scale-105 ${
            !product.inStock ? 'filter grayscale opacity-50' : ''
          }`}
        />

        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            data-testid="product-out-of-stock"
          >
            <span className="bg-white text-gray-600 px-4 py-2 text-lg font-medium rounded">
              OUT OF STOCK
            </span>
          </div>
        )}

        {product.inStock && (
          <button
            data-testid={`quick-shop-btn-${kebabCaseName}`}
            onClick={handleQuickShop}
            className="absolute bottom-4 right-4 bg-green-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-green-600"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mt-4" data-testid="product-info">
        <h3 className="text-lg font-light text-gray-900" data-testid="product-name">
          {product.name}
        </h3>
        <p className="text-lg font-medium text-gray-900 mt-1" data-testid="product-price">
          ${product.prices[0].amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
