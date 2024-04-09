import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Flex, Box } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Flex direction="column" minHeight="100vh">
    <Header />
    <Box flex="1">{children}</Box>
    <Footer />
  </Flex>
);

export default Layout;
