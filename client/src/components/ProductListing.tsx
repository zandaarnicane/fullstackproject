import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductListingProps {
  products: Product[];
  categoryName: string;
  onProductClick: (productId: string) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({ products, categoryName, onProductClick }) => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-testid="product-listing"
    >
      <h2
        className="text-3xl font-normal text-gray-900 mb-8 capitalize"
        data-testid="category-heading"
      >
        {categoryName}
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="product-grid"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
