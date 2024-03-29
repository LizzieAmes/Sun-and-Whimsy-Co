// server/schemas/schema.js

const { gql } = require('apollo-server-express');

// GraphQL schema definitions
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

module.exports = { typeDefs, resolvers };
