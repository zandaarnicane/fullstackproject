const GRAPHQL_ENDPOINT = 'http://localhost/fullstackproject/graphql';

export async function fetchCart() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          cart {
            items {
              productId
              name
              price
              quantity
              attributes {
                key
                value
              }
            }
            total
          }
        }
      `,
    }),
  });

  const result = await response.json();
  return result.data?.cart;
}

export async function addToCart(variables: {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  attributes: { key: string; value: string }[];
  total?: number;
}) {
  const { productId, name, price, quantity, attributes } = variables;
  const total = variables.total ?? price * quantity;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation AddToCart(
          $productId: Int!
          $name: String!
          $price: Float!
          $quantity: Int!
          $attributes: [CartItemAttributeInput!]
          $total: Float!
        ) {
          addToCart(
            productId: $productId
            name: $name
            price: $price
            quantity: $quantity
            attributes: $attributes
            total: $total
          ) {
            items {
              productId
              name
              price
              quantity
              attributes {
                key
                value
              }
            }
            total
          }
        }
      `,
      variables: { productId, name, price, quantity, attributes, total },
    }),
  });

  const result = await response.json();
  return result.data?.addToCart;
}

export async function updateCartItem(productId: number, quantity: number) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation UpdateCartItem($productId: Int!, $quantity: Int!) {
          updateCartItem(productId: $productId, quantity: $quantity) {
            items {
              productId
              name
              price
              quantity
              attributes {
                key
                value
              }
            }
            total
          }
        }
      `,
      variables: { productId, quantity },
    }),
  });

  const result = await response.json();
  return result.data?.updateCartItem;
}

export async function clearCart() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation {
          clearCart
        }
      `,
    }),
  });

  const result = await response.json();
  return result.data?.clearCart;
}
