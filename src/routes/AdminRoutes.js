import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContextProvider';

const AdminRoutes = (props) => {
  const { state } = useAdminAuth();
  if (!state.token) {
    return <Navigate to='/admin' replace={true} />;
  }
  return props.children;
};

export default AdminRoutes;
