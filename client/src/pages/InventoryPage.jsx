import React, { useState, useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  const productsWithImageUrls = storedProducts.map((product) => {
    // Only attempt to create an object URL if product.image is a File object
    if (product.image && product.image instanceof File) {
      const imageUrl = URL.createObjectURL(product.image);
      return { ...product, imageUrl };
    }
    return product;
  });

  setProducts(productsWithImageUrls);

  // Clean up object URLs when the component unmounts
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
      {products.map((product, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" my={2}>
          <Text fontSize="xl">{product.name}</Text>
          {/* Ensure imageUrl exists before attempting to display it */}
          {product.imageUrl && (
            <Image src={product.imageUrl} alt={product.name} boxSize="100px" />
          )}
          {/* Display other product details as needed */}
        </Box>
      ))}
    </Box>
  );
};

export default InventoryPage;
