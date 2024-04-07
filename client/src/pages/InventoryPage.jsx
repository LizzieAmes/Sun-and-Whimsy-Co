import React, { useState, useMemo } from 'react';
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
  Heading,
  SimpleGrid,
  Flex,
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

  const productsByCategory = useMemo(() => {
    const grouped = {};
    data?.products.forEach((product) => {
      product.categories.forEach((category) => {
        if (!grouped[category]) grouped[category] = [];
        grouped[category].push(product);
      });
    });
    return grouped;
  }, [data]);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct({
        variables: { id: productId },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    onOpen(); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;

 return (
   <Box paddingX="5%">
     <Heading as="h1" size="xl" textAlign="center" my={5}>
       ✨ Inventory ✨
     </Heading>
     <Flex justifyContent="center" my={5}>
       <Button onClick={onOpen} colorScheme="teal" size="lg" fontSize="lg">
         Add New Product
       </Button>
     </Flex>

     {Object.entries(productsByCategory).map(([category, products]) => (
       <Box key={category} mb={10}>
         <Heading size="lg" my={5} textAlign="center" textTransform="capitalize">
           {category}
         </Heading>
         <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="40px">
           {products.map((product) => (
             <Box
               key={product.id}
               p={5}
               shadow="md"
               borderWidth="1px"
               borderRadius="lg"
               overflow="hidden"
               m="0 auto"
             >
               <Heading fontSize="lg" mb={2}>
                 {product.name}
               </Heading>
               <Text isTruncated mb={2}>
                 Description: {product.description}
               </Text>
               <Text mb={2}>Price: ${product.price.toFixed(2)}</Text>
               <Text mb={4}>Stock: {product.stock}</Text>
               {product.imageUrl && (
                 <Image
                   src={product.imageUrl}
                   alt={product.name}
                   boxSize="200px"
                   mb={4}
                   objectFit="cover"
                 />
               )}
               <Flex justifyContent="space-between">
                 {' '}
                 
                 <Button
                   colorScheme="yellow"
                   onClick={() => handleEdit(product)}
                 >
                   Edit
                 </Button>
                 <Button
                   colorScheme="red"
                   onClick={() => handleDelete(product.id)}
                 >
                   Delete
                 </Button>
               </Flex>
             </Box>
           ))}
         </SimpleGrid>
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
             <AddProductForm onClose={onClose} />
           )}
         </ModalBody>
       </ModalContent>
     </Modal>
   </Box>
 );
};
export default InventoryPage;
