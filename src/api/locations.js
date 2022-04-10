import axios from 'axios';
import { API_URL } from './atlantis-api';

export const addLocation = async (locationName, longitude, latitude, token) => {
	try {
		const res = await axios.post(
			`${API_URL}/api/v1/locations`,
			{
				locname: locationName,
				longitude: longitude,
				latitude: latitude,
			},
			{ headers: { authorization: token } }
		);
		var data = res.data;
		console.log(data);
	} catch (e) {
		var errors = e.response.data;
		var status = e.response.status;
		console.log(e.response);
	}

	return { data, errors, status };
};

export const getLocations = async (token) => {
	let data = [];
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/locations`, {
			headers: { authorization: token },
		});
		data = res.data;
	} catch (e) {
		status = e.response.status;
	}

	return { data, status };
};
