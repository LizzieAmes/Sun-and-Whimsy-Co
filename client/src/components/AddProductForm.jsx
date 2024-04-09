import React, { useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    inventory: 0,
    image: '',
    categories: [],
  });
  const [selectedType, setSelectedType] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const [addProduct, { loading }] = useMutation(ADD_PRODUCT);
  const [imageURL, setImageURL] = useState('');
   const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false); 
   const cancelRef = useRef();
   const onCloseAlertDialog = () => setIsAlertDialogOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    try {
     const { data } = await axios.get('/api/cloudinary/upload-url');

     const imageUrl = `https://res.cloudinary.com/dsnhcqck0/image/upload/t_media_lib_thumb/${data.signature}/${file.name}`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', data.timestamp);
      formData.append('api_key', data.apiKey);
      formData.append('signature', data.signature);
      formData.append('cloud_name', data.cloudName);
      formData.append('upload_preset', 'sunandwhimsy');

      // Upload the image directly to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dsnhcqck0/image/upload`,
        formData
      );

      // Set the URL in state to be included when creating a new product
      setImageURL(response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setProduct((prevState) => ({
      ...prevState,
      categories: [newType],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageURL) {
      toast({
        title: 'Error',
        description:
          'Please wait for the image to finish uploading before submitting.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let variables = {
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.inventory),
      imageUrl: imageURL,
    };

    try {
      await addProduct({ variables });

         setProduct({
           name: '',
           description: '',
           price: 0,
           inventory: 0,
           image: '',
           categories: [],
         });
         setImageURL('');


      toast({
        title: 'Product added',
        description: 'Your product was successfully added!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setIsAlertDialogOpen(true);


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
    <FormControl mt={4}>
      <FormLabel>Product Image</FormLabel>
      <Input name="image" type="file" onChange={handleImageChange} />
    </FormControl>
    <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
      Add Product
    </Button>
    <AlertDialog
      isOpen={isAlertDialogOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlertDialog}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Product Added Successfully!
          </AlertDialogHeader>

          <AlertDialogBody>
            Would you like to add another product or view the inventory page?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseAlertDialog}>
              Add Another Product
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onCloseAlertDialog();
                window.location.href = '/inventory';
              }}
              ml={3}
            >
              View Inventory
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </Box>
);

};

export default AddProductForm;
