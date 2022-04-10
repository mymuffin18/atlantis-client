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
      <div className='h-1/8 flex justify-center items-center border-b-2 border-gray-400'>
        <h1 className='text-white'>ATLANTIS</h1>
      </div>
      <Link to='userlist'>
        <div className='h-1/8 flex justify-center items-center hover:bg-slate-600'>
          <h2>User's List</h2>
        </div>
      </Link>
      <Link to='approved-disaster'>
        <div className='h-1/8 flex justify-center items-center hover:bg-slate-600'>
          <h2>Approved Disaster Reports</h2>
        </div>
      </Link>
      <Link to='pending-disaster'>
        <div className='h-1/8 flex justify-center items-center hover:bg-slate-600'>
          <h2>Pending Disaster Reports</h2>
        </div>
      </Link>
      <div className='h-1/2 flex justify-center items-end'>
        {/* <div className='absolute bottom-2 left-5'> */}
        <div
          className='border-t-2 border-gray-400 hover:bg-red-800 hover:font-bold w-full h-1/8 flex justify-center items-center'
          onClick={handleLogout}
        >
          <div className='text-2xl'>Logout</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
