import React from 'react';
import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

const AddAdminForm = ({ formData, onChange, onSubmit }) => {
  const toast = useToast();

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl isRequired mt={4}>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Name" name="name" value={formData.name} onChange={onChange} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" name="email" type="email" value={formData.email} onChange={onChange} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" name="password" type="password" value={formData.password} onChange={onChange} />
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={formData.loading} type="submit">
        Add Admin
      </Button>
    </form>
  );
};

export default AddAdminForm;
