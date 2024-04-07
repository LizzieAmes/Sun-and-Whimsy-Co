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
import AddAdminForm from '../../components/AddAdminForm';
import SalesChart from '../../components/SalesChart';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutation
const SIGNUP_ADMIN = gql`
  mutation SignupAdmin($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      admin {
        id
        name
        email
      }
    }
  }
`;

function AdminDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const [signupAdmin, { loading, error }] = useMutation(SIGNUP_ADMIN);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupAdmin({ variables: formData });
      onClose(); // Close modal on success
      // Reset form data or display a success message
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display error message)
    }
  };

  // Example stats and salesData for SalesChart
  const stats = [
    { label: 'Total Products', number: 120 },
    { label: 'Total Orders', number: 350 },
    { label: 'Revenue', number: '$25,000' },
  ];

  const salesData = [
    { name: 'Clothes', sales: 250 },
    { name: 'Stickers', sales: 50 },
    { name: 'Accessories', sales: 50 },
    // More categories as needed
  ];

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size="xl">Admin Dashboard 🌟</Heading>
        <Button onClick={onOpen} colorScheme="teal">Add New Admin</Button>
      </Flex>

      <SimpleGrid columns={[1, null, 3]} spacing="40px" mb={5}>
        {stats.map((stat, index) => (
          <Stat key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <StatLabel>{stat.label}</StatLabel>
            <StatNumber>{stat.number}</StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      {/* Assuming SalesChart is a component you've created */}
      <SalesChart data={salesData} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AddAdminForm 
              formData={formData} 
              onChange={handleChange} 
              onSubmit={handleSubmit} 
              loading={loading}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
export default AdminDashboard;