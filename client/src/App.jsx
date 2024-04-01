import React from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
// import ProductListPage from './pages/ProductListPage';
// import Login from './pages/Log'; 
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex flexDirection="column" minHeight="100vh">
          <Header />
          <Box as="main" flex="1">
            <Routes>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/inventory" element={<InventoryPage />} />

              {/* More routes */}
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
