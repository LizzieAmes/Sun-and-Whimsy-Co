import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import ProductListPage from './pages/ProductListPage';
// import Login from './pages/Log'; // This should point to the correct file
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<HomePage />} />
          {/* Uncomment and correct the paths and component references as needed */}
          {/* <Route path="/products" element={<ProductListPage />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
