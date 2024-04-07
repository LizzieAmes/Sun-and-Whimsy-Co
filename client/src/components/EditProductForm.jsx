import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../utils/mutations';

const EditProductForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    categories: [],
    stock: '',
    imageUrl: '',
    sizes: [],
  });
  const toast = useToast();
  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        categories: product.categories.join(', '), // Assuming categories are stored as an array
        stock: product.stock.toString(),
        price: product.price.toString(),
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, price, categories, stock, imageUrl } =
      formData;
    try {
      await updateProduct({
        variables: {
          id,
          name,
          description,
          price: parseFloat(price),
          categories: categories.split(',').map((cat) => cat.trim()), // Assuming you want to split categories by commas
          stock: parseInt(stock, 10),
          imageUrl,
        },
      });
      toast({
        title: 'Product updated',
        description: 'The product details have been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal
    } catch (error) {
      toast({
        title: 'Error updating product',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="sm"
    >
      {/* Form fields go here */}
      <FormControl isRequired mt={4}>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={formData.name} onChange={handleInputChange} />
      </FormControl>

      {/* Description Field */}
      <FormControl isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Price Field */}
      <FormControl isRequired mt={4}>
        <FormLabel>Price</FormLabel>
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />
      </FormControl>

      {/* Categories Field */}
      <FormControl isRequired mt={4}>
        <FormLabel>Categories</FormLabel>
        <Input
          name="categories"
          value={formData.categories}
          onChange={handleInputChange}
          placeholder="Enter categories separated by commas"
        />
      </FormControl>

      {/* Stock Field */}
      <FormControl isRequired mt={4}>
        <FormLabel>Stock</FormLabel>
        <NumberInput min={0}>
          <NumberInputField
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </NumberInput>
      </FormControl>

      {/* Image URL Field */}
      <FormControl mt={4}>
        <FormLabel>Image URL</FormLabel>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          placeholder="http://example.com/image.jpg"
        />
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
        Update Product
      </Button>
    </Box>
  );
};

export default EditProductForm;
