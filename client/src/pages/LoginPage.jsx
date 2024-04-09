import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Image,
  Center
} from '@chakra-ui/react';
import logo from '../assets/images/logo.png'; // Adjust the path as needed

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  // This is a placeholder for actual authentication logic
  if (credentials.username === 'admin' && credentials.password === 'password') {
    // Simulate setting an authentication token upon successful login
    localStorage.setItem('authToken', 'simulatedAuthToken');

    toast({ title: 'Login successful', status: 'success' });
    navigate('/admin'); // Navigate to the AdminDashboard upon successful login
  } else {
    toast({ title: 'Invalid credentials', status: 'error' });
  }
};

  return (
    <Center flexDirection="column" minH="100vh" p={4}>
      <Image
        src={logo}
        alt="Logo"
        mb={4} // Margin bottom for some space below the logo
        boxSize="100px" // Adjust the size as needed
      />
      <Text fontSize="2xl" mb={4}>Login to the Admin Dashboard</Text>
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m="40px auto"
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Login
        </Button>
      </form>
    </Box>
    </Center>
  );
}

export default LoginPage;
