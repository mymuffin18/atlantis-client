import React, { useState, useEffect } from 'react';
import { UserLists } from '../../api/atlantis-api';
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

  return (
    <div>
      <div className='mb-10 mt-5'>
        <h1>User's List</h1>
      </div>
      <table class='table-auto w-1/4'>
        <thead>
          <tr className='text-center'>
            <th>last name</th>
            <th>first name</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 &&
            usersList.map((user) => (
              <tr>
                <td>{user.last_name}</td>
                <td>{user.first_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
