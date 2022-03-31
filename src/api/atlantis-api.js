import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000';

export const register = async (firstName, lastName, email, password) => {
	let errors = {};
	let data = {};
	try {
		const response = await axios.post(`${API_URL}/users`, {
			user: {
				firstName,
				lastName,
				email,
				password,
			},
		});
		data = {
			user: response.data.data,
			token: response.headers.authorization,
		};
	} catch (e) {
		errors = e.response.data.errors;
	}

	return { data, errors };
};

export const login = async (email, password) => {
	let data = {};
	let error = '';
	try {
		const response = await axios.post(`${API_URL}/users/sign_in`, {
			user: {
				email,
				password,
			},
		});
		console.log(response);
		data = {
			user: response.data.data,
			token: response.headers.authorization,
		};
	} catch (e) {
		error = e.response.data.error;
		// errors = error.response.data.errors.full_messages;
		console.log(error);
	}

	return { data, error };
};

export const admin_login = async (email, password) => {
	let data = {};
	let error = '';
	try {
		const response = await axios.post(`${API_URL}/admins/sign_in`, {
			user: {
				email,
				password,
			},
		});

		data = {
			user: response.data.data,
			token: response.headers.authorization,
		};
	} catch (e) {
		error = e.response.data.error;
	}

	return { data, error };
};
