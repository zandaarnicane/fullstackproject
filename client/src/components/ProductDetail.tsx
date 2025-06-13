import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import parse from 'html-react-parser';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const handleAttributeSelect = (attributeId: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeId]: value
    }));
  };

  const isAddToCartEnabled = () => {
    return product.attributes.every(attr => selectedAttributes[attr.id]);
  };

  const handleAddToCart = async () => {
  if (isAddToCartEnabled() && product.inStock) {
    try {
      await addToCart(product, selectedAttributes); // <-- būtiski!
      console.log('✅ Produkts pievienots!');
    } catch (e) {
      console.error('❌ Neizdevās pievienot grozam', e);
    }
  }
};


  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 border-2 ${
                    index === currentImageIndex ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div data-testid="product-gallery" className="flex-1 relative">
              <img
                src={product.gallery[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />

              {product.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-normal text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{product.brand}</p>
          </div>

          {/* Product Attributes */}
          {product.attributes.map((attribute) => (
            <div key={attribute.id} data-testid={`product-attribute-${attribute.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <h3 className="text-lg font-medium text-gray-900 mb-3 uppercase tracking-wide">
                {attribute.name}:
              </h3>
              <div className="flex flex-wrap gap-2">
                {attribute.items.map((item) => {
                  const isSelected = selectedAttributes[attribute.id] === item.value;

                  if (attribute.type === 'swatch') {
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleAttributeSelect(attribute.id, item.value)}
                        className={`w-8 h-8 border-2 ${
                          isSelected ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: item.value }}
                        title={item.displayValue}
                      />
                    );
                  } else {
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleAttributeSelect(attribute.id, item.value)}
                        className={`px-4 py-2 border text-sm font-medium ${
                          isSelected
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-900 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {item.displayValue}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          ))}

          {/* Price */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 uppercase tracking-wide">Price:</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${product.prices[0].amount.toFixed(2)}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            data-testid="add-to-cart"
            onClick={handleAddToCart}
            disabled={!isAddToCartEnabled() || !product.inStock}
            className={`w-full py-4 text-white font-medium uppercase tracking-wide ${
              isAddToCartEnabled() && product.inStock
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Product Description */}
          <div data-testid="product-description" className="pt-6">
            <div className="prose prose-sm text-gray-600">
              {parse(product.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
