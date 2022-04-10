import React, { useState, useEffect } from 'react';
import { ClearWarnings, UserLists } from '../../api/atlantis-api';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';

function UserList() {
  const [usersList, setUsersList] = useState([]);
  const { state } = useAdminAuth();

  useEffect(() => {
    (async () => {
      const data = await UserLists(state.token);
      setUsersList(data.data);
      console.log(usersList);
    })();
  }, []);

  const handleClearWarnings = async (id) => {
    await ClearWarnings(id, state.token);
  };

  return (
    <div>
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
              <tr key='user.id'>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.num_pending_report}</td>
                <td>{user.num_approved_report}</td>
                <td>{user.warning}</td>
                <td>{user.dateOfSuspension}</td>
                <td>
                  <button
                    onClick={() => handleClearWarnings(user.id)}
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
