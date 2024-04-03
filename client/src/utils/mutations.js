import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: Float!
    $categories: [String]
    $stock: PositiveInt
    $imageUrl: String
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      categories: $categories
      stock: $stock
      imageUrl: $imageUrl
    ) {
      id
      name
      description
      price
      categories
      stock
      imageUrl
    }
  }
`;
