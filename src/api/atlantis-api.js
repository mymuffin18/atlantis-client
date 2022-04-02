import axios from 'axios';

export const API_URL = 'https://atlantis-avion.herokuapp.com';

export const register = async (firstName, lastName, email, password) => {
	let errors = {};
	let data = {};
	try {
		const response = await axios.post(`${API_URL}/users`, {
			user: {
				first_name: firstName,
				last_name: lastName,
				email,
				password,
			},
		});
		console.log(response);
		data = {
			user: response.data,
			token: response.headers.authorization,
		};
	} catch (e) {
		errors = e.response.data.errors;
		console.log(e.response);
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
			admin: {
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

export const logout = async (token) => {
	try {
		const res = await axios.delete(`${API_URL}/admins/sign_out`, {
			headers: {
				authorization: token,
			},
		});
		console.log(res.data);
	} catch (error) {
		console.log(error.response);
	}
};

export const logoutUser = async (token) => {
	try {
		const res = await axios.delete(`${API_URL}/users/sign_out`, {
			headers: {
				authorization: token,
			},
		});
		console.log(res.data);
	} catch (error) {
		console.log(error.response);
	}
};
