import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';
import {
  ApproveDisapprove,
  DeletePending,
  PendingDisasters,
} from '../../api/atlantis-api';

function PendingDisaster() {
  const [pendingDisasters, setPendingDisasters] = useState([]);
  const { state } = useAdminAuth();
  const [approve, setApprove] = useState('');
  const [deletePending, setDeletePending] = useState('');

  useEffect(() => {
    (async () => {
      const data = await PendingDisasters(state.token);
      setPendingDisasters(data.data);
      console.log(pendingDisasters);
    })();
  }, []);

  const handleApprove = async (id) => {
    const data = await ApproveDisapprove(id, state.token);
    setApprove(data);
    console.log(data);
  };

  const handleDelete = async (id) => {
    const data = await DeletePending(id, state.token);
    setDeletePending(data);
    console.log(data);
  };
  return (
    <div>
      <div className='mb-10 mt-5'>
        <h1>Pending Disaster Reports</h1>
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
            <th>number of votes</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingDisasters.length > 0 &&
            pendingDisasters.map((disaster) => (
              <tr key={disaster.id}>
                <td>{disaster.disaster.disaster_type}</td>
                <td>{disaster.disaster_level}</td>
                <td>{disaster.latitude}</td> <td>{disaster.longitude}</td>
                <td>{new Date(disaster.date_occured).toLocaleString()}</td>
                <td>{disaster.user.fullname}</td>
                <td>{disaster.votes}</td>
                <td className='flex justify-center gap-2'>
                  <button
                    onClick={() => handleApprove(disaster.id)}
                    className='bg-green-500'
                  >
                    approve
                  </button>
                  <button
                    onClick={() => handleDelete(disaster.id)}
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

export default PendingDisaster;
