import React from 'react';
import { Button } from '@chakra-ui/react';

const ProductButton = ({ children, onClick }) => (
  <Button
    backgroundColor="pink.100"
    color="pink.800"
    _hover={{ bg: 'pink.200' }}
    _active={{ bg: 'pink.300' }}
    borderRadius="full"
    boxShadow="md"
    onClick={onClick}
  >
    {children}
  </Button>
);

export default ProductButton;
