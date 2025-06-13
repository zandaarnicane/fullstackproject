
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import ProductListing from '../components/ProductListing';
import ProductDetail from '../components/ProductDetail';
import { fetchProducts } from '../api/getProducts';
import { useCart } from '../contexts/CartContext';

const Index = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { isCartOpen } = useCart();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  const categoryList: string[] = Array.from(new Set(products.map((p) => p.category)));
  const [activeCategory, setActiveCategory] = React.useState('All');

  const currentProduct = productId ? products.find((p) => p.id === productId) : null;
  const currentCategoryProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    navigate('/');
  };

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  React.useEffect(() => {
    if (productId && currentProduct) {
      setActiveCategory(currentProduct.category);
    }
  }, [productId, currentProduct]);

  if (isLoading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading products.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        categories={['All', ...categoryList]}
      />

      {/* Main Content with overlay effect when cart is open */}
      <main
        className={`${
          isCartOpen ? 'opacity-30 pointer-events-none' : ''
        } transition-opacity duration-200`}
      >
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
    </div>
  );
};

export default Index;
