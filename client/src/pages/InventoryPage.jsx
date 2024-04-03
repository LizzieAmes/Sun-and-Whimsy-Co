import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries';
import {
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import AddProductForm from '../components/AddProductForm';

const InventoryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal" mb="4">
        Add New Product
      </Button>

      {products.map((product, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" my={2}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text>Description: {product.description}</Text>
          <Text>Price: ${product.price.toFixed(2)}</Text>
          <Text>Categories: {product.categories.join(', ')}</Text>{' '}
          <Text>Stock: {product.stock}</Text>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              boxSize="100px"
              objectFit="cover"
            />
          )}
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddProductForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InventoryPage;
