import React, { useState, useEffect } from 'react';
import { ClearWarnings, UserLists } from '../../api/atlantis-api';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';

function UserList() {
	const [usersList, setUsersList] = useState([]);
	const { state, dispatch } = useAdminAuth();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		(async () => {
			setLoading(true);
			const data = await UserLists(state.token);
			if (data.status === 401) {
				setLoading(false);
				dispatchLogout();
			}
			setUsersList(data.data);

			setLoading(false);
			console.log(usersList);
		})();
	}, []);

	const handleClearWarnings = async (id) => {
		setLoading(true);
		const { data, status } = await ClearWarnings(id, state.token);
		if (status === 401) {
			dispatchLogout();
		}
		setUsersList(
			usersList.map((user) => {
				if (user.id === data.id) {
					return data;
				}
				return user;
			})
		);
		setLoading(false);
	};

	const dispatchLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<div className='h-screen overflow-y-auto overflow-x-hidden'>
			<div className='mb-10 mt-5'>
				<h1>User's List</h1>
			</div>
			<table class='table-auto w-full'>
				<thead>
					<tr className='text-center'>
						<th>last name</th>
						<th>first name</th>
						<th>email</th>
						<th>pending reports</th>
						<th>approved reports</th>
						<th>warning</th>
						<th>date of suspension</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{usersList.length > 0 &&
						usersList.map((user) => (
							<tr key={user.id}>
								<td>{user.last_name}</td>
								<td>{user.first_name}</td>
								<td>{user.email}</td>
								<td>{user.num_pending_report}</td>
								<td>{user.num_approved_report}</td>
								<td>{user.warning}</td>
								<td>{user.dateOfSuspension}</td>
								<td>
									<button
										disabled={loading}
										onClick={() =>
											handleClearWarnings(
												user.id
											)
										}
										className='bg-gray-300 px-3 py-1 hover:bg-gray-200 font-semibold'
									>
										clear
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default UserList;
