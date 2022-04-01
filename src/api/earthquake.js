import axios from 'axios';
import { API_URL } from './atlantis-api';

export const getEarthquakes = async (token) => {
	let data = [];
	let status;
	try {
		const res = await axios.get(`${API_URL}/api/v1/earthquakes`, {
			headers: { authorization: token },
		});
		data = res.data;
	} catch (e) {
		console.log(e.response);
		status = e.response.status;
	}

	return { data, status };
};
