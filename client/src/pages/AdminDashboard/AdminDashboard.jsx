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
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h1" size="xl">
          Admin Dashboard 🌟
        </Heading>
        <Button onClick={onOpen} colorScheme="teal">
          Add New Admin
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

      <SalesChart data={salesData} />
    
 
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Pass formData, handleChange, and handleSubmit as props */}
            <AddAdminForm 
              formData={formData} 
              onChange={handleChange} 
              onSubmit={handleSubmit} 
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminDashboard;
//   return (
//     <Box p={5}>
//       <Flex justify="space-between" align="center" mb={5}>
//         <Heading as="h1" size="xl">
//           Admin Dashboard 🌟
//         </Heading>
//         <Button onClick={onOpen} colorScheme="teal">
//           Add New Product
//         </Button>
//       </Flex>

//       <SimpleGrid columns={[1, null, 3]} spacing="40px" mb={5}>
//         {stats.map((stat, index) => (
//           <Stat
//             key={index}
//             p={5}
//             shadow="md"
//             borderWidth="1px"
//             borderRadius="lg"
//           >
//             <StatLabel>{stat.label}</StatLabel>
//             <StatNumber>{stat.number}</StatNumber>
//           </Stat>
//         ))}
//       </SimpleGrid>

//       {/* Include the SalesChart component and pass the salesData to it */}
//       <SalesChart data={salesData} />

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add a New Product</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <AddProductForm />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }

// export default AdminDashboard;