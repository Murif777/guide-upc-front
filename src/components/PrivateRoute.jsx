import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../helpers/axios_helper';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!getAuthToken(); // Verifica si el token está presente

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
