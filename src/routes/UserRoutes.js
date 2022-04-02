import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContextProvider';

const UserRoutes = (props) => {
	const { state } = useUserAuth();
	if (!state.token) {
		return <Navigate to='/user' replace={true} />;
	}
	return props.children;
};

export default UserRoutes;
