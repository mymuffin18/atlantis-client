import React, { useEffect, useState } from 'react';
import { logoutUser } from '../../api/atlantis-api';
import {
	getApprovedReports,
	getUnapprovedReports,
} from '../../api/disaster_reports';
import { getEarthquakes } from '../../api/earthquake';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';
import Header from './Header';
import Map from './Map';

function DashboardUser() {
	const user = useUserAuth();
	const { dispatch: dispatchEarthquake } = useEarthquakes();
	const [loading, setLoading] = useState(false);
	const { dispatch: disasterReportDispatch } = useDisasterReports();

	const [earthquakeCheck, setEarthquakeCheck] = useState(false);
	const [pendingReportsCheck, setPendingReportsCheck] = useState(false);
	const [approvedReportsCheck, setApprovedReportsCheck] = useState(true);
	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getEarthquakes(user.state.token);
			if (status === 401) {
				setLoading(false);
				user.dispatch({ type: 'LOGOUT' });
			}
			dispatchEarthquake({ type: 'GET_EARTHQUAKES', payload: data });
			await getAllPendingDisasters();
			await getAllApprovedDisasters();
			setLoading(false);
		})();
	}, [user.state.token]);

	const getAllApprovedDisasters = async () => {
		setLoading(true);
		const { data, status } = await getApprovedReports(user.state.token);
		if (status === 401) {
			setLoading(false);
			user.dispatch({ type: 'LOGOUT' });
		}
		disasterReportDispatch({
			type: 'GET_APPROVED_DISASTERS',
			payload: data,
		});
		setLoading(false);
	};

	const getAllPendingDisasters = async () => {
		setLoading(true);
		const { data, status } = await getUnapprovedReports(user.state.token);
		if (status === 401) {
			setLoading(false);
			user.dispatch({ type: 'LOGOUT' });
		}
		console.log('unapproved', data);
		disasterReportDispatch({
			type: 'GET_UNAPPROVED_DISASTERS',
			payload: data,
		});
		setLoading(false);
	};
	return (
		<div className='h-screen'>
			<Header />

			<section>
				{loading ? (
					<div className='flex justify-center '>
						<span className=''>Loading...</span>
					</div>
				) : (
					<div className='flex justify-center gap-2'>
						<div>
							<input
								type='checkbox'
								name='Earthquakes'
								value='earthquake data'
								checked={earthquakeCheck}
								onChange={() =>
									setEarthquakeCheck((t) => !t)
								}
							/>{' '}
							Earthquakes
						</div>
						<div>
							<input
								type='checkbox'
								name='pending data'
								checked={pendingReportsCheck}
								onChange={() =>
									setPendingReportsCheck((t) => !t)
								}
							/>{' '}
							Pending Reports
						</div>
						<div>
							<input
								type='checkbox'
								name='approved data'
								checked={approvedReportsCheck}
								onChange={() =>
									setApprovedReportsCheck((t) => !t)
								}
							/>
							Reported disasters
						</div>
					</div>
				)}
				<div className='h-full w-full'>
					<Map
						earthquakeCheck={earthquakeCheck}
						pendingReportsCheck={pendingReportsCheck}
						approvedReportsCheck={approvedReportsCheck}
					/>
				</div>
			</section>
		</div>
	);
}

export default DashboardUser;
