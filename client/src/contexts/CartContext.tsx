import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, Product } from '../types';

const GRAPHQL_ENDPOINT = '/graphql';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  addToCart: (product: Product, selectedAttributes: { [key: string]: string }) => Promise<void>;
  updateQuantity: (
    productId: string,
    selectedAttributes: { [key: string]: string },
    quantity: number
  ) => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { cart { items { productId name price quantity attributes } } }`
        }),
      });
      const result = await response.json();
      const items = result.data?.cart?.items || [];
      setCartItems(
        items.map((item: any) => ({
          product: {
            id: item.productId.toString(),
            name: item.name,
            prices: [{ currency: 'USD', amount: item.price }],
            gallery: [],
            brand: '',
            attributes: [],
          },
          quantity: item.quantity,
          selectedAttributes: (item.attributes || []).reduce((acc: any, attr: any) => {
            acc[attr.key] = attr.value;
            return acc;
          }, {}),
        }))
      );
    } catch (error) {
      console.error('❌ Failed to fetch cart:', error);
    }
  };

  // ✅ Automātiski ielādē groza saturu uz lapas ielādi
  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, selectedAttributes: { [key: string]: string }) => {
    try {
      const attributeList = Object.entries(selectedAttributes).map(([key, value]) => ({ key, value }));
      const total = product.prices[0].amount;
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation AddToCart($productId: Int!, $name: String!, $price: Float!, $quantity: Int!, $attributes: [CartItemAttributeInput!], $total: Float!) {
              addToCart(productId: $productId, name: $name, price: $price, quantity: $quantity, attributes: $attributes, total: $total) {
                items { productId name price quantity attributes }
              }
            }
          `,
          variables: {
            productId: parseInt(product.id),
            name: product.name,
            price: total,
            quantity: 1,
            attributes: attributeList,
            total,
          },
        }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('❌ GraphQL errors:', result.errors);
      } else {
        console.log('✅ Item added to cart:', result.data);
        await fetchCart();
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
    }
  };

  const updateQuantity = async (
    productId: string,
    selectedAttributes: { [key: string]: string },
    quantity: number
  ) => {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation UpdateCartItem($productId: Int!, $quantity: Int!, $attributes: [CartItemAttributeInput!]) {
            updateCartItem(productId: $productId, quantity: $quantity, attributes: $attributes) {
              items { productId name price quantity attributes }
            }
          }`,
          variables: {
            productId: parseInt(productId),
            quantity,
            attributes: Object.entries(selectedAttributes).map(([key, value]) => ({ key, value }))
          },
        }),
      });
      await fetchCart();
    } catch (error) {
      console.error('❌ Failed to update quantity:', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.prices[0].amount * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
