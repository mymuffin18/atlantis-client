import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	longitude: null,
	latitude: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_POPUP':
			return {
				longitude: action.payload.longitude,
				latitude: action.payload.latitude,
			};
		case 'REMOVE_POPUP':
			return initialState;
		default:
			return initialState;
	}
};
const PopupContext = createContext();
const PopupContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<PopupContext.Provider value={{ state, dispatch }}>
			{props.children}
		</PopupContext.Provider>
	);
};

export const usePopup = () => {
	return useContext(PopupContext);
};
export default PopupContextProvider;
