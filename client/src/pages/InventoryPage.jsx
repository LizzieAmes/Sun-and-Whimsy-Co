import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries'; 
import { DELETE_PRODUCT } from '../utils/mutations'; 
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
import EditProductForm from '../components/EditProductForm';

const InventoryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(), 
  });
  

  const handleDelete = async (productId) => {
    try {
      await deleteProduct({
        variables: { id: productId },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal" mb="4">
        Add New Product
      </Button>

      {data.products.map((product, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" my={2}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text>Description: {product.description}</Text>
          <Text>Price: ${product.price.toFixed(2)}</Text>
          <Text>Categories: {product.categories.join(', ')}</Text>
          {product.categories.includes('clothes') && product.sizes && (
            <Text>
              Sizes:{' '}
              {product.sizes
                .map((size) => `${size.size}: ${size.count}`)
                .join(', ')}
            </Text>
          )}
          <Text>Stock: {product.stock}</Text>
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.name} boxSize="100px" />
          )}
          <Button
            colorScheme="yellow"
            mr={3}
            onClick={() => handleEdit(product)}
          >
            Edit
          </Button>
          <Button colorScheme="red" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedProduct ? 'Edit Product' : 'Add a New Product'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedProduct ? (
              <EditProductForm product={selectedProduct} onClose={onClose} />
            ) : (
              <AddProductForm />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InventoryPage;
