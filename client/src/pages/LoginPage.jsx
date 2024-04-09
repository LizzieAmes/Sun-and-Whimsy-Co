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
import logo from '../assets/images/logo.png';
import { LOGIN_ADMIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';


function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

const [loginAdmin, { loading: loginLoading }] = useMutation(LOGIN_ADMIN, {
  onCompleted: (data) => {
    localStorage.setItem('authToken', data.login.token); // Save the token
    toast({ title: 'Login successful', status: 'success' });
    navigate('/admin');
  },
  onError: (error) => {
    toast({
      title: 'Login failed',
      description: error.message,
      status: 'error',
    });
  },
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loginAdmin({
    variables: {
      email: credentials.email, 
      password: credentials.password,
    },
  });
};

  return (
    <Center flexDirection="column" minH="100vh" p={4}>
      <Image src={logo} alt="Logo" mb={4} boxSize="200px" />
      <Text fontSize="2xl" mb={4}>
        Login To View The Admin Dashboard
      </Text>
      <Box
        w="lg" // Changed from maxW to w for fixed width and increased size
        borderWidth="2px" // Slightly thicker border
        borderRadius="xl" // More pronounced border radius
        overflow="hidden"
        p={8} // Increased padding for more internal space
        m="40px auto"
        boxShadow="lg" // Optional: Added a shadow for more depth
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit" size="lg">
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
}

export default LoginPage;
