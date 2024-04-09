import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Flex, Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <Flex flexDirection="column" minHeight="100vh">
      {location.pathname !== '/login' && <Header />}
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
