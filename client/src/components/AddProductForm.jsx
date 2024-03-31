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
  FormHelperText,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    image: null,
    sizes: [],
    type: '',
    packSize: '',
  });

  const [selectedType, setSelectedType] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

const handleImageChange = (e) => {
  if (e.target.files[0]) {
    setProduct({ ...product, image: e.target.files[0] });
  }
};

  const handleSizeChange = (size, valueString) => {
    const newSizeArray = product.sizes.map((s) =>
      s.size === size ? { ...s, count: valueString } : s
    );
    setProduct({ ...product, sizes: newSizeArray });
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setProduct({
      ...product,
      type,
      sizes:
        type === 'clothes'
          ? [
              { size: '12M', count: '' },
              { size: '18M', count: '' },
              { size: '2T', count: '' },
              { size: '3T', count: '' },
              { size: '4T', count: '' },
              { size: '5T', count: '' },
              { size: 'Adult S', count: '' },
              { size: 'Adult M', count: '' },
              { size: 'Adult L', count: '' },
              { size: 'Adult XL', count: '' },
            ]
          : [],
    });
  };

  useEffect(() => {
    if (selectedType === 'clothes') {
      const totalInventory = product.sizes.reduce(
        (acc, curr) => acc + Number(curr.count || 0),
        0
      );
      setProduct((prev) => ({ ...prev, inventory: totalInventory.toString() }));
    }
  }, [product.sizes, selectedType]);


  const resetForm = () => {
    setProduct({
      name: '',
      description: '',
      price: '',
      inventory: '',
      image: null,
      sizes: [],
      type: '',
      packSize: '',
    });
    setSelectedType('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
  const newProducts = [...existingProducts, product];
  localStorage.setItem('products', JSON.stringify(newProducts));

toast({
  title: 'Product added.',
  description: 'Select an option below.',
  status: 'success',
  duration: 5000,
  isClosable: true,
  position: 'top',
  render: ({ onClose }) => (
    <Box color="white" p={3} bg="blue.500" borderRadius="md">
      <p>Product added successfully.</p>
      <Button
        size="sm"
        onClick={() => {
          resetForm();
          onClose();
        }}
        mt={2}
      >
        Add Another
      </Button>
      <Button
        size="sm"
        onClick={() => {
          navigate('/inventory');
          onClose();
        }}
        mt={2}
        ml={2}
      >
        View Inventory
      </Button>
    </Box>
  ),
});

  resetForm();
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
      <FormControl id="itemType" isRequired mt={4}>
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

      {/* Conditional render based on selectedType */}
      {selectedType === 'clothes' &&
        product.sizes.map((s, index) => (
          <FormControl key={index} mt={4}>
            <FormLabel>{s.size} Size Inventory</FormLabel>
            <NumberInput
              min={0}
              onChange={(valueString) => handleSizeChange(s.size, valueString)}
            >
              <NumberInputField name={`size-${s.size}`} value={s.count} />
            </NumberInput>
          </FormControl>
        ))}

      {selectedType === 'stickers' && (
        <FormControl id="packSize" isRequired mt={4}>
          <FormLabel>Pack Size</FormLabel>
          <Input
            name="packSize"
            value={product.packSize}
            onChange={handleInputChange}
            placeholder="Number of stickers per pack"
          />
        </FormControl>
      )}

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
        <Input
          name="price"
          value={product.price}
          onChange={handleInputChange}
          placeholder="Product Price"
        />
      </FormControl>

      <FormControl id="inventory" isRequired mt={4}>
        <FormLabel>Inventory</FormLabel>
        <Input
          name="inventory"
          value={product.inventory}
          onChange={handleInputChange}
          placeholder="Total Inventory"
        />
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