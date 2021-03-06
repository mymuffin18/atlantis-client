import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
	unapprovedDisasters: [],
	approvedDisasters: [],
};
const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_UNAPPROVED_DISASTERS':
			return {
				...state,
				unapprovedDisasters: action.payload,
			};
		case 'GET_APPROVED_DISASTERS':
			return {
				...state,
				approvedDisasters: action.payload,
			};
		case 'CREATE_DISASTER':
			return {
				...state,
				unapprovedDisasters: [
					...state.unapprovedDisasters,
					action.payload,
				],
			};

		case 'EDIT_DISASTER':
			if (action.payload.data.approved) {
				return {
					...state,
					approvedDisaster: state.approvedDisaster.map(
						(disaster) => {
							if (disaster.id === action.payload.id) {
								return action.payload.data;
							}
							return disaster;
						}
					),
				};
			} else {
				return {
					...state,
					unapprovedDisasters: state.unapprovedDisasters.map(
						(disaster) => {
							if (disaster.id === action.payload.id) {
								return action.payload.data;
							}
							return disaster;
						}
					),
				};
			}

		case 'DELETE_DISASTER':
			if (action.payload.data.approved) {
				return {
					...state,
					approvedDisasters: state.approvedDisasters.filter(
						(disaster) => disaster.id !== action.payload.id
					),
				};
			} else {
				return {
					...state,
					unapprovedDisasters: state.unapprovedDisasters.filter(
						(disaster) => disaster.id !== action.payload.id
					),
				};
			}
		default:
			return initialState;
	}
};

const DisasterReportContext = createContext();
const DisasterReportContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<DisasterReportContext.Provider value={{ state, dispatch }}>
			{children}
		</DisasterReportContext.Provider>
	);
};

export const useDisasterReports = () => {
	return useContext(DisasterReportContext);
};

export default DisasterReportContextProvider;
