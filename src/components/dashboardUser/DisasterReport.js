import React, { useState } from 'react';
import { voteReport } from '../../api/disaster_reports';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';

const DisasterReport = ({ data: reportData = {} }) => {
	const { state: userState, dispatch: userDispatch } = useUserAuth();
	const { state: disasterState, dispatch: disasterDispatch } =
		useDisasterReports();

	const [data, setData] = useState(reportData);
	const [loading, setLoading] = useState(false);
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
	console.log(data);
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
					<strong>Description</strong>
				</p>
				<p className='text-justify text-wrap'>{data.description}</p>
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
		</div>
	);
};

export default DisasterReport;
