// server/schemas/schema.js

const { gql } = require('apollo-server-express');

// GraphQL schema definitions
const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    products: [Product]
    product(id: ID!): Product
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addProduct(
      name: String!
      description: String!
      price: Float!
      categories: [String]
      stock: Int
      imageUrl: String
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      categories: [String]
      stock: Int
      imageUrl: String
    ): Product
    deleteProduct(id: ID!): Product
    createOrder(products: [ProductOrderInput]!): Order
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    address: String
    paymentDetails: PaymentDetails
  }

  type PaymentDetails {
    cardNumber: String
    expiryDate: Date
    CVV: Number
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    categories: [String]
    stock: Int
    imageUrl: String
  }

  type Order {
    id: ID!
    user: User!
    products: [ProductOrder]
    orderDate: Date!
    status: String!
  }

  type ProductOrder {
    product: Product!
    quantity: Int!
  }

  input ProductOrderInput {
    productId: ID!
    quantity: Int!
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

module.exports = { typeDefs, resolvers };
