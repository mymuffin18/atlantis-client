import React, { useEffect, useState } from 'react';
import { logoutUser } from '../../api/atlantis-api';
import {
	getApprovedReports,
	getUnapprovedReports,
	getDisasterTypes,
	postReport,
} from '../../api/disaster_reports';
import { getEarthquakes } from '../../api/earthquake';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';
import Header from './Header';
import Map from './Map';
import { Link } from 'react-router-dom';
import useLocation from '../hooks/useLocation';
import _ from 'lodash';

function DashboardUser() {
	const user = useUserAuth();
	const { dispatch: dispatchEarthquake } = useEarthquakes();
	const [loading, setLoading] = useState(false);
	const { dispatch: disasterReportDispatch } = useDisasterReports();
	const location = useLocation();
	const [earthquakeCheck, setEarthquakeCheck] = useState(false);
	const [pendingReportsCheck, setPendingReportsCheck] = useState(false);
	const [approvedReportsCheck, setApprovedReportsCheck] = useState(true);
	const { state, dispatch } = useUserAuth();
	const [disasterTypes, setDisasterTypes] = useState([]);
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
			await fetchDisasterTypes();
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

	const searchType = (disaster_search) => {
		for (let i = 0; i < disasterTypes.length; i++) {
			if (disasterTypes[i].disaster_type === disaster_search) {
				return disasterTypes[i].id;
			}
		}

		return null;
	};

	const fetchDisasterTypes = async () => {
		setLoading(true);
		const { data, status } = await getDisasterTypes(state.token);
		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		}
		setDisasterTypes(data);

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

	const handleSendTsunamiReport = async () => {
		setLoading(true);
		let today = new Date().toJSON();
		const data = {
			disaster_id: searchType('tsunami'),
			disaster_level: 'Danger',
			description: 'This is an immediate report',
			date_occured: today,
			longitude: location.longitude,
			latitude: location.latitude,
		};

		const { return_data, status, errors } = await postReport(
			data,
			user.state.token
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			alert(errors);
		} else {
			disasterReportDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			setLoading(false);
			alert('Report Created! We will review your report.');
		}
	};

	const handleSendFloodReport = async () => {
		setLoading(true);
		let today = new Date().toJSON();
		const data = {
			disaster_id: searchType('flood'),
			disaster_level: 'Danger',
			description: 'This is an immediate report',
			date_occured: today,
			longitude: location.longitude,
			latitude: location.latitude,
		};

		const { return_data, status, errors } = await postReport(
			data,
			user.state.token
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			alert(errors);
		} else {
			disasterReportDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			setLoading(false);
			alert('Report Created! We will review your report.');
		}
	};

	const handleSendLandslideReport = async () => {
		setLoading(true);
		let today = new Date().toJSON();
		const data = {
			disaster_id: searchType('landslide'),
			disaster_level: 'Danger',
			description: 'This is an immediate report',
			date_occured: today,
			longitude: location.longitude,
			latitude: location.latitude,
		};

		const { return_data, status, errors } = await postReport(
			data,
			user.state.token
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			alert(errors);
		} else {
			disasterReportDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			setLoading(false);
			alert('Report Created! We will review your report.');
		}
	};

	const handleSendTornadoReport = async () => {
		setLoading(true);
		let today = new Date().toJSON();
		const data = {
			disaster_id: searchType('tornado'),
			disaster_level: 'Danger',
			description: 'This is an immediate report',
			date_occured: today,
			longitude: location.longitude,
			latitude: location.latitude,
		};

		const { return_data, status, errors } = await postReport(
			data,
			user.state.token
		);

		if (status === 401) {
			setLoading(false);
			dispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			alert(errors);
		} else {
			disasterReportDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			setLoading(false);
			alert('Report Created! We will review your report.');
		}
	};

	const handleLogout = async () => {
		dispatch({ type: 'LOADING_START' });
		await logoutUser(state.token);
		dispatch({ type: 'LOADING_FINISH' });

		dispatch({ type: 'LOGOUT' });
	};
	return (
		<div className='h-screen'>
			{/* <Header /> */}
			<div className='w-full bg-black flex flex-row items-center h-1/12'>
				<div className=' text-white text-4xl lg:text-5xl w-2/3 lg:w-4/5 md:ml-12 xs:ml-2'>
					ATLANTIS
				</div>
				<div className=' w-1/3 flex justify-end gap-2'>
					<Link to='/notification'>
						<button className='btn btn-primary'>notif</button>
					</Link>

					<button
						onClick={handleLogout}
						className='btn btn-primary'
						disabled={state.loading}
					>
						logout
					</button>
				</div>
			</div>
			<div className='h-11/12 w-full'>
				<div className='h-full'>
					<section>
						{loading ? (
							<div className='flex justify-center bg-red-500'>
								<span className=''>Loading...</span>
							</div>
						) : (
							<div className='flex justify-center gap-2 bg-red-500 h-1/12'>
								<div>
									<input
										type='checkbox'
										name='Earthquakes'
										value='earthquake data'
										checked={earthquakeCheck}
										onChange={() =>
											setEarthquakeCheck(
												(t) => !t
											)
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
											setPendingReportsCheck(
												(t) => !t
											)
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
											setApprovedReportsCheck(
												(t) => !t
											)
										}
									/>
									Reported disasters
								</div>
							</div>
						)}
						<div className='h-5/6'>
							<Map
								earthquakeCheck={earthquakeCheck}
								pendingReportsCheck={
									pendingReportsCheck
								}
								approvedReportsCheck={
									approvedReportsCheck
								}
							/>
						</div>
						<div className='lg:hidden xs:absolute bottom-0 bg-red-500 w-full h-1/12'>
							<div className='flex flex-col items-center'>
								<div>Report Disaster Immediately</div>
								<div className='flex justify-center gap 2 items-center'>
									<button
										className='bg-green-500'
										onClick={
											handleSendFloodReport
										}
									>
										Flood
									</button>
									<button
										className='bg-blue-500'
										onClick={
											handleSendLandslideReport
										}
									>
										Landslide
									</button>
									<button
										className='bg-orange-500'
										onClick={
											handleSendTsunamiReport
										}
									>
										Tsunami
									</button>
									<button
										className='bg-yellow-500'
										onClick={
											handleSendTornadoReport
										}
									>
										Tornado
									</button>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default DashboardUser;
