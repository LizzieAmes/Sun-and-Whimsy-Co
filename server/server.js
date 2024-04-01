const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schemas/schema');
const { resolvers } = require('./schemas/resolvers');
const connectDatabase = require('./database');
// require('dotenv').config({ path: '../.env' });
// const { port } = require('./config/config');

require('dotenv').config();

async function startServer() {
  const app = express();

  // Connect to the database
  connectDatabase();

  // Create Apollo Server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();

  // Apply Apollo GraphQL middleware and set the path to /graphql
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Start the server
  app.listen(process.env.PORT, () => {
    console.log(
      `Server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
}

startServer();
