import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    inventory: 0,
    image: '',
    categories: [],
    sizes: [],
  });
  const [selectedType, setSelectedType] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [addProduct, { loading }] = useMutation(ADD_PRODUCT);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setProduct((prevState) => ({
      ...prevState,
      categories: [newType],
      sizes: newType === 'clothes' ? prevState.sizes : [],
    }));
  };

  const handleAddSize = () => {
    setProduct((prevState) => ({
      ...prevState,
      sizes: [...prevState.sizes, { size: '', count: 0 }],
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...product.sizes];
    updatedSizes[index][field] = value;
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let variables = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.inventory),
    };

    try {
      await addProduct({ variables });
      toast({
        title: 'Product added',
        description: 'Your product was successfully added!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/inventory'); // Navigate to the inventory page
    } catch (error) {
      toast({
        title: 'Error adding product',
        description: error.message,
        status: 'error',
        duration: 9000,
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
      <FormControl isRequired mt={4}>
        <FormLabel>Item Type</FormLabel>
        <Select
          placeholder="Select type"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="stickers">Stickers</option>
          <option value="clothes">Clothes</option>
          <option value="accessories">Accessories</option>
        </Select>
      </FormControl>
      {selectedType === 'clothes' &&
        product.sizes.map((size, index) => (
          <Box key={index} display="flex" mt={4}>
            <FormControl isRequired>
              <FormLabel>Size</FormLabel>
              <Input
                value={size.size}
                onChange={(e) =>
                  handleSizeChange(index, 'size', e.target.value)
                }
              />
            </FormControl>
            <FormControl isRequired ml={4}>
              <FormLabel>Count</FormLabel>
              <NumberInput min={0} defaultValue={size.count}>
                <NumberInputField
                  onChange={(e) =>
                    handleSizeChange(index, 'count', parseInt(e.target.value))
                  }
                />
              </NumberInput>
            </FormControl>
          </Box>
        ))}
      <Button
        onClick={handleAddSize}
        mt={2}
        colorScheme="blue"
        size="sm"
        isDisabled={selectedType !== 'clothes'}
      >
        Add Size
      </Button>
      <FormControl isRequired mt={4}>
        <FormLabel>Name</FormLabel>
        <Input name="name" value={product.name} onChange={handleInputChange} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Price</FormLabel>
        <Input
          name="price"
          type="number"
          value={product.price}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Inventory</FormLabel>
        <Input
          name="inventory"
          type="number"
          value={product.inventory}
          onChange={handleInputChange}
        />
      </FormControl>
      {/* <FormControl mt={4}> */}
        {/* <FormLabel>Product Image</FormLabel>
        <Input name="image" type="file" onChange={handleImageChange} />
      </FormControl> */}
      <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
