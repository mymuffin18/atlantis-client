import React, { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {
	user: {},
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload.user,
				token: action.payload.token,
			};
		case 'LOGOUT':
			return initialState;
		default:
			return initialState;
	}
};

const UserAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState, () => {
		const data = localStorage.getItem('user-auth');

		return data ? JSON.parse(data) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('user-auth', JSON.stringify(state));
	}, [state]);

	return (
		<UserAuthContext.Provider value={{ state, dispatch }}>
			{children}
		</UserAuthContext.Provider>
	);
};

export const useUserAuth = () => {
	return useContext(UserAuthContext);
};

export default UserAuthContextProvider;
