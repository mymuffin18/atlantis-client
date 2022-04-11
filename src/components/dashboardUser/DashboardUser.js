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
import { MdNotificationsNone } from 'react-icons/md';
import { BsChevronDown } from 'react-icons/bs';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

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
	const { buttonProps, itemProps, isOpen } = useDropdownMenu(1);
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
		} else if (status === 403) {
			alert('You are suspended from reporting.');
		} else if (!_.isEmpty(errors)) {
			console.log(errors);
		} else {
			disasterReportDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			setLoading(false);
			alert('Report Created! We will review your report.');
		}
		setLoading(false);
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
		} else if (status === 403) {
			alert('You are suspended from reporting.');
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
		setLoading(false);
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
		} else if (status === 403) {
			alert('You are suspended from reporting.');
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
		setLoading(false);
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
		} else if (status === 403) {
			alert('You are suspended from reporting.');
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
		setLoading(false);
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
				<div className=' text-white text-4xl lg:text-5xl w-4/5 lg:w-4/5 md:ml-12 ml-2'>
					ATLANTIS
				</div>
				<div className=' w-1/5 flex justify-end items-center'>
					<div className='flex justify-end'>
						<Link to='/notification'>
							<MdNotificationsNone className='text-white text-3xl' />
						</Link>
					</div>

					<div className='flex flex-col'>
						<button
							{...buttonProps}
							className='text-white absolute right-0 top-1'
						>
							<BsChevronDown />
						</button>

						<div
							onClick={handleLogout}
							className={`mt-5 bg-blue-900 text-white ${
								isOpen ? 'visible' : ''
							}`}
							role='menu'
							disabled={state.loading}
						>
							Logout
						</div>
					</div>
				</div>
			</div>
			<div className='h-11/12 w-full'>
				<div className='h-full'>
					<section>
						{loading ? (
							<div className='flex justify-center bg-slate-500'>
								<span className=''>Loading...</span>
							</div>
						) : (
							<div className='flex justify-center gap-2 text-sm md:text-base bg-slate-500 text-white'>
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
						<div className='lg:hidden absolute bottom-0 bg-black w-full h-1/8'>
							<div className='flex flex-col items-center'>
								<div className='font-bold text-red-700'>
									Report Disaster Immediately!!!
								</div>
								<div className='flex justify-center gap-2 items-center'>
									<button
										className='bg-white font-semibold hover:bg-slate-500'
										onClick={
											handleSendFloodReport
										}
									>
										Flood
									</button>
									<button
										className='bg-white font-semibold hover:bg-slate-500'
										onClick={
											handleSendLandslideReport
										}
									>
										Landslide
									</button>
									<button
										className='bg-white font-semibold hover:bg-slate-500'
										onClick={
											handleSendTsunamiReport
										}
									>
										Tsunami
									</button>
									<button
										className='bg-white font-semibold hover:bg-slate-500'
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
