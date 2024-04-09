// const { DateTime } = require('graphql-scalars');

// GraphQL schema definitions
const typeDefs = `
  scalar DateTime
  scalar PositiveInt

  type Query {
    users: [User]
    user(id: ID!): User
    admins: [Admin]
    admin(id: ID!): Admin
    products: [Product]
    product(id: ID!): Product
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    signupUser(name: String!, email: String!, password: String!): AuthPayload
    loginUser(email: String!, password: String!): AuthPayload
    addProduct(
      name: String!
      description: String!
      price: Float!
      categories: [String]
      stock: PositiveInt
      imageUrl: String
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      categories: [String]
      stock: PositiveInt
      imageUrl: String
    ): Product
    deleteProduct(id: ID!): Product
    createOrder(products: [ProductOrderInput]!): Order
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    password: String!
    address: String
    paymentDetails: PaymentDetails
  }

  type PaymentDetails {
    cardNumber: String
    expiryDate: DateTime
    CVV: PositiveInt
  }

  type AuthPayload {
    token: String!
    admin: Admin!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    categories: [String]
    stock: PositiveInt
    imageUrl: String
  }

  type Order {
    id: ID!
    admin: Admin!
    products: [ProductOrder]
    orderDate: DateTime!
    status: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    address: String
    paymentDetails: PaymentDetails
  }
  
  type ProductOrder {
    product: Product!
    quantity: PositiveInt!
  }

  input ProductOrderInput {
    productId: ID!
    quantity: PositiveInt!
  }
`;

module.exports = typeDefs;
