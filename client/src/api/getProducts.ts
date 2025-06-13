const GRAPHQL_ENDPOINT = 'http://localhost/fullstackproject/graphql';

export async function fetchProducts() {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          products {
            id
            name
            brand
            category
            description
            gallery
            inStock
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
                value
                displayValue
              }
            }
          }
        }
      `,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("❌ Error loading products:", result.errors);
    throw new Error("Failed to load products");
  }

  return result.data.products;
}
