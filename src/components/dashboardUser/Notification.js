import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContextProvider';
import { getUnapprovedReports } from '../../api/disaster_reports';
import { TiArrowBack } from 'react-icons/ti';
import { usePopup } from '../../context/PopupContextProvider';

function Notification() {
	const [pendingDisasters, setPendingDisasters] = useState([]);
	const { state } = useUserAuth();
	const navigate = useNavigate();
	const { dispatch } = usePopup();
	useEffect(() => {
		(async () => {
			const data = await getUnapprovedReports(state.token);
			setPendingDisasters(data.data);
			console.log(pendingDisasters);
		})();
	}, []);

	const handleNavigate = (disaster) => {
		dispatch({
			type: 'SET_POPUP',
			payload: {
				longitude: disaster.longitude,
				latitude: disaster.latitude,
			},
		});
		navigate('/user', { replace: true });
	};
	return (
		<div className='h-screen'>
			{/* <Header /> */}
			<div className='flex flex-col h-full'>
				<div className='w-full bg-black flex flex-row items-center h-1/12'>
					<div className=' text-white text-4xl lg:text-5xl w-2/3 lg:w-4/5 md:ml-12 ml-2'>
						ATLANTIS
					</div>
					<div className=' w-1/3 flex justify-end mr-2 md:mr-12'>
						<Link to='/user'>
							{' '}
							<button className='text-white text-3xl'>
								<TiArrowBack />
							</button>
						</Link>
					</div>
				</div>
				<div className='h-11/12 w-full'>
					<div className='my-3'>
						<h1>Notification</h1>
					</div>
					<div className='mx-2 overflow-y-auto overflow-x-hidden'>
						{pendingDisasters.length > 0 &&
							pendingDisasters
								.sort((a, b) =>
									a.itemM > b.itemM ? 1 : -1
								)
								.map((disaster) => (
									<p
										className='text-xs md:text-base mb-2 cursor-pointer'
										onClick={() =>
											handleNavigate(disaster)
										}
									>
										A reported{' '}
										{
											disaster.disaster
												.disaster_type
										}{' '}
										at{' '}
										{new Date(
											disaster.date_occured
										).toLocaleString()}
									</p>
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Notification;
