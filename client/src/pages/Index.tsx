
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductListing from '../components/ProductListing';
import ProductDetail from '../components/ProductDetail';
import CartOverlay from '../components/CartOverlay';
import { mockProducts, categories } from '../data/mockData';
import { useCart } from '../hooks/useCart';

const Index = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const { isCartOpen } = useCart();

  const currentProduct = productId ? mockProducts.find(p => p.id === productId) : null;
  const currentCategoryProducts = categories.find(c => c.name === activeCategory)?.products || [];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    navigate('/');
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    if (productId && currentProduct) {
      setActiveCategory(currentProduct.category);
    }
  }, [productId, currentProduct]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories.map(c => c.name)}
      />
      
      {/* Main Content with overlay effect when cart is open */}
      <main className={`${isCartOpen ? 'opacity-30 pointer-events-none' : ''} transition-opacity duration-200`}>
        {currentProduct ? (
          <ProductDetail product={currentProduct} />
        ) : (
          <ProductListing
            products={currentCategoryProducts}
            categoryName={activeCategory}
            onProductClick={handleProductClick}
          />
        )}
      </main>

      <CartOverlay />
    </div>
  );
};

export default Index;
