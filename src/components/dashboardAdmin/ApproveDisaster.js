import React, { useState, useEffect } from 'react';
import { ApproveDis, ApproveDisapprove } from '../../api/atlantis-api';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';

function ApproveDisaster() {
	const { state, dispatch } = useAdminAuth();
	const [approvedDisasters, setApprovedDisasters] = useState([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await ApproveDis(state.token);
			if (status === 401) {
				setLoading(false);
				alert('Please Log in');
				dispatchLogout();
			}
			setApprovedDisasters(data);

			setLoading(false);
		})();
	}, []);

	const handleDisapprove = async (id) => {
		setLoading(false);
		const { data, status } = await ApproveDisapprove(id, state.token);
		if (status === 401) {
			setLoading(false);
			dispatchLogout();
		}
		setApprovedDisasters(approvedDisasters.filter((d) => d.id !== id));
		setLoading(true);
		console.log(data);
	};

	const dispatchLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<div>
			<div className='mb-10 mt-5'>
				<h1>Approved Disaster Reports</h1>
			</div>
			<table class='table-auto w-full'>
				<thead>
					<tr className='text-center'>
						<th>type</th>
						<th>level</th>
						<th>latitude</th>
						<th>longitude</th>
						<th>date</th>
						<th>reported by</th>
						<th>actions</th>
					</tr>
				</thead>
				<tbody>
					{approvedDisasters.length > 0 &&
						approvedDisasters.map((disaster) => (
							<tr key={disaster.id}>
								<td>
									{disaster.disaster.disaster_type}
								</td>{' '}
								<td>{disaster.disaster_level}</td>
								<td>{disaster.latitude}</td>{' '}
								<td>{disaster.longitude}</td>{' '}
								<td>
									{new Date(
										disaster.date_occured
									).toLocaleString()}
								</td>
								<td>{disaster.user.fullname}</td>
								<td className='flex justify-center gap-2'>
									<button
										disabled={loading}
										onClick={() =>
											handleDisapprove(
												disaster.id
											)
										}
										className='bg-black text-white hover:bg-gray-300 hover:text-black'
									>
										disapprove
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default ApproveDisaster;
