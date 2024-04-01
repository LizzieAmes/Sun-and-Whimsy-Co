import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Heading,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import AddProductForm from '../../components/AddProductForm';
import SalesChart from '../../components/SalesChart';


function AdminDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stats = [
    { label: 'Total Products', number: 120 },
    { label: 'Total Orders', number: 350 },
    { label: 'Revenue', number: '$25,000' },
  ];

  const salesData = [
    { name: 'Clothes', sales: 250 },
    { name: 'Stickers', sales: 50 },
    { name: 'Accessories', sales: 50 },
    // Add more categories as needed
  ];

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size="xl">
          Admin Dashboard 🌟
        </Heading>
        <Button onClick={onOpen} colorScheme="teal">
          Add New Product
        </Button>
      </Flex>

      <SimpleGrid columns={[1, null, 3]} spacing="40px" mb={5}>
        {stats.map((stat, index) => (
          <Stat
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
          >
            <StatLabel>{stat.label}</StatLabel>
            <StatNumber>{stat.number}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      {/* Include the SalesChart component and pass the salesData to it */}
      <SalesChart data={salesData} />

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
}

export default AdminDashboard;