import React, { useState } from 'react';
import { deleteReport, voteReport } from '../../api/disaster_reports';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';
const DisasterReport = ({ data: reportData = {}, setDisasterPopup }) => {
	const { state: userState, dispatch: userDispatch } = useUserAuth();
	const { state: disasterState, dispatch: disasterDispatch } =
		useDisasterReports();

	const [data, setData] = useState(reportData);
	const [loading, setLoading] = useState(false);
	console.log(data);
	const vote = async () => {
		setLoading(true);
		const { data: return_data, status } = await voteReport(
			data.id,
			userState.token
		);

		if (status === 401) {
			setLoading(false);
			userDispatch({ type: 'LOGOUT' });
		}
		disasterDispatch({
			type: 'EDIT_DISASTER',
			payload: { id: return_data.id, data: return_data },
		});
		setData(return_data);
		setLoading(false);
	};

	const handleDelete = async () => {
		setLoading(true);
		const status = await deleteReport(data.id, userState.token);

		if (status === 401) {
			alert('Please log in your account.');
			setLoading(false);
			userDispatch({ type: 'LOGOUT' });
		} else if (status === 204) {
			alert('Report deleted!');
			disasterDispatch({
				type: 'DELETE_DISASTER',
				payload: {
					data: data,
					id: data.id,
				},
			});
			setLoading(false);
			setDisasterPopup({});
		}
	};
	return (
		<div className='flex flex-col w-60 gap-2'>
			<div className='w-full flex gap-2 items-end'>
				<div className='h-10 w-10'>
					<img
						src={data.user.profile_pic}
						alt=''
						className='rounded-full w-full h-full border-4'
					/>
				</div>
				<div>
					<p className='text-xl'>{data.user.fullname}</p>
				</div>
			</div>

			<div className='flex gap-2'>
				<p>
					<strong>Description:</strong>
				</p>
				<p className='text-justify text-wrap'>{data.description}</p>
			</div>
			<div className='flex gap-2'>
				<p>
					<strong>Disaster Type:</strong>
				</p>
				<p className='text-justify text-wrap'>
					{data.disaster.disaster_type}
				</p>
			</div>
			<div className='flex gap-2'>
				<span>Date occured: </span>
				<span>{new Date(data.date_occured).toLocaleString()}</span>
			</div>
			<div className='flex flex-shrink-0'>
				{data.images &&
					data.images.map((img) => (
						<img src={img} alt='disaster' />
					))}
			</div>
			{data.approved === false && (
				<div className=''>
					<span>
						<strong>Number of votes: </strong>
						{data.votes}
					</span>
					<button
						className='popup-button button-blue rounded-lg block'
						disabled={loading}
						onClick={vote}
					>
						{data.voted ? 'Unlike' : 'Like'}
					</button>
				</div>
			)}

			{data.approved && (
				<div className='flex gap-2'>
					<p>
						<strong>Approved by:</strong>
					</p>
					<p className='text-justify text-wrap'>
						{data.approved_by}
					</p>
				</div>
			)}

			{data.user.id === userState.user.id && (
				<div>
					<div
						className='popup-button button-red rounded-lg block text-center cursor-pointer'
						onClick={handleDelete}
						disabled={loading}
					>
						Delete
					</div>
				</div>
			)}
		</div>
	);
};

export default DisasterReport;
