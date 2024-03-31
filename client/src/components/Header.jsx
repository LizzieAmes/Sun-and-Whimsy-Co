import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

const Header = () => {
  const bgColor = useColorModeValue('pink.100', 'pink.700'); // Light mode pink, dark mode deeper pink

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={bgColor}
      color="white"
    >
      <Flex align="center" mr={5}>
        <Image
          src="/path-to-your-logo.svg" // Your logo
          alt="Sun & Whimsy Co"
          style={{ width: '2rem', height: 'auto' }}
        />
        <Text fontSize="lg" fontWeight="bold" marginLeft="1rem">
          Sun & Whimsy Co
        </Text>
      </Flex>

      <Box display={{ base: 'none', md: 'flex' }} mt={{ base: 4, md: 0 }}>
        {/* Navigation Items */}
        <Button variant="ghost">Products</Button>
        <Button variant="ghost">Orders</Button>
        {/* More nav items */}
      </Box>

      {/* Profile Icon/Button - Placeholder for actual functionality */}
      <Button colorScheme="pink">Logout</Button>
    </Flex>
  );
};

export default Header;
