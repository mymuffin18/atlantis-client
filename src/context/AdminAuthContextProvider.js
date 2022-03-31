import React, { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {
	admin: {},
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				admin: action.payload.admin,
				token: action.payload.token,
			};
		case 'LOGOUT':
			return initialState;
		default:
			return initialState;
	}
};

const AdminAuthContext = createContext();

const AdminAuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState, () => {
		const data = localStorage.getItem('admin-auth');

		return data ? JSON.parse(data) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('admin-auth', JSON.stringify(state));
	}, [state]);

	return (
		<AdminAuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => {
	return useContext(AdminAuthContext);
};

export default AdminAuthContextProvider;
