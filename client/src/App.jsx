import React from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Layout from './components/Layout';
const httpLink = createHttpLink({
  uri: '/graphql',
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><LoginPage /></Layout>} />
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />
            <Route path="/admin" element={<Layout><ProtectedRoute><AdminDashboard /></ProtectedRoute></Layout>} />
            <Route path="/inventory" element={<Layout><InventoryPage /></Layout>} />
            {/* More routes */}
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;