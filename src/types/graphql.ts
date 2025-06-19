
import { Product } from './index';
// GraphQL Input Types
export interface OrderItemInput {
  productId: string;
  quantity: number;
  selectedAttributes: Record<string, string>;
  price: number;
}

export interface OrderInput {
  items: OrderItemInput[];
  userId?: string;
  customerInfo?: {
    email?: string;
    name?: string;
    address?: string;
  };
}

// GraphQL Response Types
export interface OrderResponse {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    selectedAttributes: Record<string, string>;
    price: number;
  }>;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

// Re-export existing types
export * from './index';
