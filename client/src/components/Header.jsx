import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import AuthService from '../utils/auth';

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
  // const isLogginIn = true;

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
          src={logo}
          alt="Sun & Whimsy Co"
          boxSize="100px" // Set a fixed size the logo
        />
        <Text fontSize="5xl" fontWeight="bold" marginLeft="1rem">
          Sun & Whimsy Co
        </Text>
      </Flex>

      <Flex align="center" mt={{ base: 4, md: 0 }}>
        <Button as={Link} to="/admin" variant="ghost" mr={4}>
          Dashboard
        </Button>
        <Button as={Link} to="/inventory" variant="ghost" mr={4}>
          Inventory
        </Button>
        
        <Button colorScheme="pink" onClick={() => AuthService.logout()}>Logout</Button>
        {/* {isLoggedIn && <Button colorScheme="pink">Logout</Button>} */}
      </Flex>
    </Flex>
  );
};

export default Header;
