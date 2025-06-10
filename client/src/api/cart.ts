export const ADD_TO_CART_MUTATION = `
  mutation AddToCart(
    $productId: Int!,
    $name: String!,
    $price: Float!,
    $quantity: Int!,
    $attributes: [AttributeInput!],
    $total: Float!
  ) {
    addToCart(
      productId: $productId,
      name: $name,
      price: $price,
      quantity: $quantity,
      attributes: $attributes,
      total: $total
    ) {
      items {
        productId
        name
        price
        quantity
        total
      }
      totalQuantity
      totalPrice
    }
  }
`;

export const addToCartAPI = async (
  productId: number,
  name: string,
  price: number,
  quantity: number,
  attributes: { key: string; value: string }[]
) => {
  const res = await fetch("http://localhost/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: ADD_TO_CART_MUTATION,
      variables: {
        productId,
        name,
        price,
        quantity,
        attributes,
        total: price * quantity,
      },
    }),
  });

  const json = await res.json();
  return json.data?.addToCart;
};