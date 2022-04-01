import React, { useEffect, useState } from 'react';
import { logoutUser } from '../../api/atlantis-api';
import { getEarthquakes } from '../../api/earthquake';
import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';
import Header from './Header';
import Map from './Map';

function DashboardUser() {
	const user = useUserAuth();
	const { dispatch: dispatchEarthquake } = useEarthquakes();
	const [loading, setLoading] = useState(false);
	const handleLogout = async () => {
		await logoutUser(user.state.token);

		user.dispatch({ type: 'LOGOUT' });
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getEarthquakes(user.state.token);
			if (status === '401') {
				user.dispatch({ type: 'LOGOUT' });
			}
			dispatchEarthquake({ type: 'GET_EARTHQUAKES', payload: data });

			setLoading(false);
		})();
	}, []);
	return (
		<div className='h-screen'>
			{/* <div>Dashboard User</div>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div> */}
			<Header />

			<section>
				{loading && (
					<div className='flex justify-center'>
						<span className=''>Loading...</span>
					</div>
				)}
				<div className='h-full w-full'>
					<Map />
				</div>
			</section>
		</div>
	);
}

export default DashboardUser;
