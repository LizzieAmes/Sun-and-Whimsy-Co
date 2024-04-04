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
// import AddProductForm from '../../components/AddProductForm';
import AddAdminForm from '../../components/AddAdminForm';
import SalesChart from '../../components/SalesChart';


function AdminDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Initialize formData state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle change in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission here, like calling an API to add an admin
    // After success, you can call onClose to close the modal
    onClose();
  };
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
      {/* Rest of the JSX code for AdminDashboard */}
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
              loading={loading} // Pass loading state to disable the button when submitting
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminDashboard;