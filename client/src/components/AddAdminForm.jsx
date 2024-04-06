import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

// Define the GraphQL mutation
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

const AddAdminForm = ({ formData, onChange }) => {
  const toast = useToast();
  const [signupAdmin, { loading }] = useMutation(SIGNUP_ADMIN, {
    onCompleted: (data) => {
      // You can use the returned data here if needed, for example:
      // console.log(data.signup.admin);
      toast({
        title: 'Admin created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // You might want to clear form or redirect user after signup
    },
    onError: (error) => {
      toast({
        title: 'Error creating admin.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupAdmin({ variables: { ...formData } });
  };

  // Everything within your component function should be returned inside a single return statement.
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired mt={4}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          name="name"
          placeholder="Enter admin's name"
          value={formData.name}
          onChange={onChange}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter admin's email"
          value={formData.email}
          onChange={onChange}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter a secure password"
          value={formData.password}
          onChange={onChange}
        />
      </FormControl>

      <Button
        mt={4}
        colorScheme="teal"
        isLoading={loading}
        type="submit"
        disabled={loading}
      >
        Add Admin
      </Button>
    </form>
  );
};

export default AddAdminForm;
