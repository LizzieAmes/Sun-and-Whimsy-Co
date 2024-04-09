import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.loggedIn(); // Use authService to check if logged in

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;