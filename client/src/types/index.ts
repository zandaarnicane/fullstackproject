
export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: ProductAttribute[];
  prices: Price[];
  brand: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

export interface AttributeItem {
  displayValue: string;
  value: string;
  id: string;
}

export interface Price {
  currency: string;
  amount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: { [key: string]: string };
}

export interface Category {
  name: string;
  products: Product[];
}
