// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const { typeDefs } = require('./schemas/schema');
// const { resolvers } = require('./schemas/resolvers');
// const connectDatabase = require('./database');
// // require('dotenv').config({ path: '../.env' });
// // const { port } = require('./config/config');

// require('dotenv').config();

// async function startServer() {
//   const app = express();

//   // Connect to the database
//   connectDatabase();

//   // Create Apollo Server
//   const apolloServer = new ApolloServer({ typeDefs, resolvers });

//   await apolloServer.start();

//   // Apply Apollo GraphQL middleware and set the path to /graphql
//   apolloServer.applyMiddleware({ app, path: '/graphql' });

//   // Start the server
//   app.listen(process.env.PORT, () => {
//     console.log(
//       `Server running at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
//     );
//   });
// }

// startServer();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
