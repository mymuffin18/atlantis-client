import React from 'react';
import { logout } from '../../api/atlantis-api';
import { useAdminAuth } from '../../context/AdminAuthContextProvider';
import { Link } from 'react-router-dom';

function Sidebar() {
  const admin = useAdminAuth();
  const handleLogout = async () => {
    await logout(admin.state.token);

    admin.dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className='h-screen bg-black text-white text-center'>
      <div className='mb-10 mt-5'>
        <h1 className='text-white underline'>ATLANTIS</h1>
      </div>
      <Link to='userlist'>
        <div className='py-10 hover:bg-slate-600'>
          <h2>User's List</h2>
        </div>
      </Link>
      <Link to='approved-disaster'>
        <div className='py-10 hover:bg-slate-600'>
          <h2>Approved Disaster reports</h2>
        </div>
      </Link>
      <Link to='pending-disaster'>
        <div className='py-10 hover:bg-slate-600'>
          <h2>Pending Disaster reports</h2>
        </div>
      </Link>
      <div className='absolute bottom-2 left-5'>
        <button className='bg-slate-700' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
