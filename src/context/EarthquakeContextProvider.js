import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	earthquakes: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_EARTHQUAKES':
			return {
				earthquakes: action.payload,
			};
		default:
			return initialState;
	}
};

const EarthquakeContext = createContext();
const EarthquakeContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<EarthquakeContext.Provider value={{ state, dispatch }}>
			{props.children}
		</EarthquakeContext.Provider>
	);
};

export const useEarthquakes = () => {
	return useContext(EarthquakeContext);
};
export default EarthquakeContextProvider;
