import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';
import {
  AddWarning,
  ApproveDisapprove,
  DeletePending,
  PendingDisasters,
} from '../../api/atlantis-api';

function PendingDisaster() {
  const [pendingDisasters, setPendingDisasters] = useState([]);
  const { state } = useAdminAuth();
  const [approve, setApprove] = useState('');
  const [deletePending, setDeletePending] = useState('');
  const [double, setDouble] = useState(false);

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

  const handleAddWarning = async (id) => {
    await AddWarning(id, state.token);
  };

  return (
    <div>
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
                <td>{disaster.disaster.disaster_type}</td>
                <td>{disaster.disaster_level}</td>
                <td>{disaster.latitude}</td> <td>{disaster.longitude}</td>
                <td>{new Date(disaster.date_occured).toLocaleString()}</td>
                <td>{disaster.user.fullname}</td>
                <td>{disaster.votes}</td>
                <td className='flex justify-center gap-2'>
                  <button
                    onClick={() => handleApprove(disaster.id)}
                    className='bg-black text-white hover:bg-green-500 hover:text-black hover:font-bold'
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleAddWarning(disaster.user.id);
                    }}
                    className='bg-black text-white hover:bg-orange-500 hover:text-black hover:font-bold'
                  >
                    Spam
                  </button>
                  <button
                    onClick={() => handleDelete(disaster.id)}
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
