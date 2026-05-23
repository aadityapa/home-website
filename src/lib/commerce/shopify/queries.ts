export const COLLECTIONS_CATALOG_QUERY = `
  query StorefrontCatalog($first: Int!, $productsFirst: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          products(first: $productsFirst) {
            edges {
              node {
                id
                handle
                title
                description
                availableForSale
                totalInventory
                featuredImage {
                  url
                  altText
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 20) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      quantityAvailable
                      price {
                        amount
                        currencyCode
                      }
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
