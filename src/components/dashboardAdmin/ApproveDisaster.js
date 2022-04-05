import React, { useState, useEffect } from 'react';
import { ApproveDis, ApproveDisapprove } from '../../api/atlantis-api';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';

function ApproveDisaster() {
  const { state } = useAdminAuth();
  const [approvedDisasters, setApprovedDisasters] = useState([]);
  const [disapprovedDisaster, setDisapprovedDisaster] = useState('');

  useEffect(() => {
    (async () => {
      const data = await ApproveDis(state.token);
      setApprovedDisasters(data.data);
      console.log(approvedDisasters);
    })();
  }, []);

  const handleDisapprove = async (id) => {
    const data = await ApproveDisapprove(id, state.token);
    setDisapprovedDisaster(data);
    console.log(data);
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
                <td>{disaster.disaster.disaster_type}</td>{' '}
                <td>{disaster.disaster_level}</td>
                <td>{disaster.latitude}</td> <td>{disaster.longitude}</td>{' '}
                <td>{new Date(disaster.date_occured).toLocaleString()}</td>
                <td>{disaster.user.fullname}</td>
                <td className='flex justify-center gap-2'>
                  <button
                    onClick={() => handleDisapprove(disaster.id)}
                    className='bg-green-500'
                  >
                    disapprove
                  </button>
                  <button
                    // onClick={() => handleDelete(disaster.id)}
                    className='bg-red-500'
                  >
                    delete
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
