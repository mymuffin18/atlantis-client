import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../api/atlantis-api';
import { useUserAuth } from '../../context/UserAuthContextProvider';

const Header = () => {
  const { state, dispatch } = useUserAuth();
  const handleLogout = async () => {
    dispatch({ type: 'LOADING_START' });
    await logoutUser(state.token);
    dispatch({ type: 'LOADING_FINISH' });

    dispatch({ type: 'LOGOUT' });
  };
  return (
    <nav className='h-screen'>
      <div className='h-1/5 flex justify-between items-center bg-black px-20'>
        <div>
          <h1 className='text-5xl text-white'>Atlantis</h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className='btn btn-primary'
            disabled={state.loading}
          >
            logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
