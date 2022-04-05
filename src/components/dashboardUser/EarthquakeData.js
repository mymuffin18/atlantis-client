import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { earthquakeDetail } from '../../api/earthquake';

const EarthquakeData = ({ id }) => {
	const [loading, setLoading] = useState(false);
	const [earthquake, setEarthquake] = useState({});

	useEffect(() => {
		(async () => {
			setLoading(true);

			const data = await earthquakeDetail(id);
			setEarthquake(data);
			console.log(data);
			setLoading(false);
		})();
	}, [id]);

	const convertTime = (time) => {
		const date = new Date(time);
		return `${date.toLocaleString()}`;
	};

	return (
		<div>
			<h1 className='text-center text-xl'>Earthquake Detail</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				!_.isEmpty(earthquake) && (
					<div>
						<p>Place: {earthquake.properties.place}</p>
						<p>Magnitude: {earthquake.properties.mag}</p>
						<p>
							Depth: {earthquake.geometry.coordinates[2]}{' '}
							km
						</p>
						<p>
							Event Time:{' '}
							{convertTime(earthquake.properties.time)}
						</p>
					</div>
				)
			)}
		</div>
	);
};

export default EarthquakeData;
