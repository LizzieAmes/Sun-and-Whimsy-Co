const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static files from the React app in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build'))); // Adjusted to point to 'build'

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html')); // Adjusted to point to 'build'
    });
  } else {
    // In development, you might not need to serve static files here,
    // especially if you're using Create React App's development server.
    // If you do need to serve static files in development, adjust as necessary.
    // Example: Serving static files from a 'public' directory (adjust as needed)
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // Removed the additional app.get('*') route outside the production check
  // to prevent it from conflicting with the above route.

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
