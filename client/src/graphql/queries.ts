
export const GET_PRODUCTS = `
  query GetProducts($category: String) {
    products(category: $category) {
      id
      name
      brand
      description
      category
      inStock
      gallery
      prices {
        currency
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = `
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      brand
      description
      category
      inStock
      gallery
      prices {
        currency
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
    }
  }
`;

export const CREATE_ORDER = `
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      status
      total
      createdAt
      items {
        id
        productId
        quantity
        selectedAttributes
        price
      }
    }
  }
`;
