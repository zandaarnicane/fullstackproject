
import { graphqlClient } from '../utils/graphqlClient';
import { GET_PRODUCTS, GET_PRODUCT_BY_ID, CREATE_ORDER } from '../graphql/queries';
import { 
  Product, 
  OrderInput, 
  OrderResponse, 
  ProductsResponse, 
  ProductResponse 
} from '../types/graphql';

export class ApiService {
  static async getProducts(category?: string): Promise<Product[]> {
    try {
      const response = await graphqlClient.request<ProductsResponse>(
        GET_PRODUCTS,
        { category: category === 'all' ? undefined : category }
      );
      return response.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to load products');
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      const response = await graphqlClient.request<ProductResponse>(
        GET_PRODUCT_BY_ID,
        { id }
      );
      return response.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to load product');
    }
  }

  static async createOrder(orderData: OrderInput): Promise<OrderResponse> {
    try {
      // Validate order data before sending
      this.validateOrderData(orderData);
      
      const response = await graphqlClient.request<{ createOrder: OrderResponse }>(
        CREATE_ORDER,
        { input: orderData }
      );
      return response.createOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  private static validateOrderData(orderData: OrderInput): void {
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    for (const item of orderData.items) {
      if (!item.productId) {
        throw new Error('Each item must have a product ID');
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error('Each item must have a valid quantity');
      }
      if (!item.price || item.price <= 0) {
        throw new Error('Each item must have a valid price');
      }
    }
  }
}
