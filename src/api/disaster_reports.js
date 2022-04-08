import axios from 'axios';
import { API_URL } from './atlantis-api';

export const addReport = async (data, token) => {
	let return_data = {};
	let status;
	let errors = {};
	try {
		const res = await axios.post(
			`${API_URL}/api/v1/disaster_reports`,
			data,
			{
				headers: {
					authorization: token,
					'content-type': 'multipart/form-data',
				},
			}
		);
		return_data = res.data;
	} catch (e) {
		if (e.response.status === 401) {
			alert('Please log in.');
		}
		status = e.response.status;
		errors = e.response.data;
	}

	return { return_data, status, errors };
};

export const postReport = async (data, token) => {
	let status;
	let errors = {};
	let return_data = {};
	try {
		const res = await axios.post(
			`${API_URL}/api/v1/disaster_reports`,
			{ ...data },
			{
				headers: {
					authorization: token,
				},
			}
		);

		return_data = res.data;
	} catch (e) {
		status = e.response.status;
		errors = e.response.errors;
	}

	return { return_data, status, errors };
};

export const getApprovedReports = async (token) => {
	let data = [];
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/disaster_reports`, {
			headers: {
				authorization: token,
			},
		});
		data = res.data;
	} catch (e) {
		alert(e.response.data);
		status = e.response.status;
	}

	return { data, status };
};

export const getUnapprovedReports = async (token) => {
	let data = [];
	let status;

	try {
		const res = await axios.get(`${API_URL}/api/v1/pending_reports`, {
			headers: { authorization: token },
		});
		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};

export const getDisasterTypes = async (token) => {
	let data = {};
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/users/disasters`, {
			headers: { authorization: token },
		});

		data = res.data;
	} catch (e) {
		console.log(e.response);
		status = e.response.status;
	}
	return { data, status };
};

export const voteReport = async (id, token) => {
	let data = {};
	let status;
	try {
		const res = await axios.put(
			`${API_URL}/api/v1/disaster_reports/${id}/vote`,
			{},
			{ headers: { authorization: token } }
		);

		data = res.data;
	} catch (e) {
		console.log(e.response);
		status = e.response.status;
	}

	return { data, status };
};
