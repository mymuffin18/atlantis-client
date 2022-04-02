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

export const earthquakeDetail = async (id) => {
	let data = {};

	try {
		console.log('sending id', id);
		const res = await axios.get(
			`https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=${id}&format=geojson`
		);
		data = res.data;
	} catch (e) {
		console.log('earthquake detail error: ', e.response);
	}

	return data;
};
