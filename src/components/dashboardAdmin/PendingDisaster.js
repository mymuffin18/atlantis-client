import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';
import {
	AddWarning,
	ApproveDisapprove,
	DeletePending,
	PendingDisasters,
} from '../../api/atlantis-api';

function PendingDisaster() {
	const [loading, setLoading] = useState(false);
	const [pendingDisasters, setPendingDisasters] = useState([]);
	const { state, dispatch } = useAdminAuth();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await PendingDisasters(state.token);
			setPendingDisasters(data);
			if (status === 401) {
				setLoading(false);
				dispatchLogout();
			}
			setLoading(false);
		})();
	}, []);

	const handleApprove = async (id) => {
		setLoading(true);
		const { data, status } = await ApproveDisapprove(id, state.token);
		if (status === 401) {
			dispatchLogout();
		}
		setPendingDisasters(
			pendingDisasters.filter((disaster) => disaster.id !== data.id)
		);
		setLoading(false);
	};

	const handleDelete = async (id) => {
		setLoading(true);
		const { data, status } = await DeletePending(id, state.token);
		if (status === 401) {
			dispatchLogout();
		}
		setPendingDisasters(pendingDisasters.filter((d) => d.id !== id));

		setLoading(false);
	};

	const handleAddWarning = async (id) => {
		setLoading(true);
		const { data, status } = await AddWarning(id, state.token);
		if (status === 401) {
			dispatchLogout();
		}
		await fetchDisasters();
		setLoading(false);
	};

	const fetchDisasters = async () => {
		setLoading(true);
		const { data, status } = await PendingDisasters(state.token);
		if (status === 401) {
			setLoading(false);
			dispatchLogout();
		}
		setPendingDisasters(data);
		setLoading(false);
	};

	const dispatchLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<div className='overflow-y-auto overflow-x-hidden h-screen'>
			<div className='mb-10 mt-5'>
				<h1>Pending Disaster Reports</h1>
			</div>
			<table class='table-auto w-full'>
				<thead>
					<tr className='text-center'>
						<th>Type</th>
						<th>Level</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Date</th>
						<th>Reported by</th>
						<th>Number of Votes</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{pendingDisasters.length > 0 &&
						pendingDisasters.map((disaster) => (
							<tr key={disaster.id}>
								<td>
									{disaster.disaster.disaster_type}
								</td>
								<td>{disaster.disaster_level}</td>
								<td>{disaster.latitude}</td>{' '}
								<td>{disaster.longitude}</td>
								<td>
									{new Date(
										disaster.date_occured
									).toLocaleString()}
								</td>
								<td>{disaster.user.fullname}</td>
								<td>{disaster.votes}</td>
								<td className='flex justify-center gap-2'>
									<button
										disabled={loading}
										onClick={() =>
											handleApprove(
												disaster.id
											)
										}
										className='bg-black text-white hover:bg-green-500 hover:text-black hover:font-bold'
									>
										Approve
									</button>
									<button
										disabled={loading}
										onClick={() => {
											handleAddWarning(
												disaster.user.id
											);
										}}
										className='bg-black text-white hover:bg-orange-500 hover:text-black hover:font-bold'
									>
										Spam
									</button>
									<button
										disabled={loading}
										onClick={() =>
											handleDelete(disaster.id)
										}
										className='bg-black text-white hover:bg-red-500 hover:text-black hover:font-bold'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default PendingDisaster;
