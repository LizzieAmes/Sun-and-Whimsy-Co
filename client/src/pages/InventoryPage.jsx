import React, { useState, useEffect } from 'react';
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
import AddProductForm from '../components/AddProductForm'; // 

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const productsWithImageUrls = storedProducts.map((product) => {
      if (product.image && product.image instanceof File) {
        const imageUrl = URL.createObjectURL(product.image);
        return { ...product, imageUrl };
      }
      return product;
    });

    setProducts(productsWithImageUrls);

    return () => {
      productsWithImageUrls.forEach((product) => {
        if (product.imageUrl) {
          URL.revokeObjectURL(product.imageUrl);
        }
      });
    };
  }, []);

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal" mb="4" mt="6" ml="4">
        Add New Product
      </Button>

      {products.map((product, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" my={2}>
          <Text fontSize="xl">{product.name}</Text>
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.name} boxSize="100px" />
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
