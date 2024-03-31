import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  FormHelperText,
  Box,
  useToast,
} from '@chakra-ui/react';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    image: null,
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you would typically handle form submission to your backend
    console.log('Form submitted:', product);
    toast({
      title: 'Product added.',
      description: "We've added your product.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          value={product.name}
          onChange={handleInputChange}
          placeholder="Product Name"
        />
      </FormControl>

      <FormControl id="description" isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          placeholder="Product Description"
        />
      </FormControl>

      <FormControl id="price" isRequired mt={4}>
        <FormLabel>Price</FormLabel>
        <NumberInput min={0} precision={2} step={0.01}>
          <NumberInputField
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </NumberInput>
      </FormControl>

      <FormControl id="inventory" isRequired mt={4}>
        <FormLabel>Inventory</FormLabel>
        <NumberInput min={0}>
          <NumberInputField
            name="inventory"
            value={product.inventory}
            onChange={handleInputChange}
          />
        </NumberInput>
        <FormHelperText>
          Enter the total inventory for this item.
        </FormHelperText>
      </FormControl>

      <FormControl id="image" mt={4}>
        <FormLabel>Product Image</FormLabel>
        <Input type="file" name="image" onChange={handleImageChange} />
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
