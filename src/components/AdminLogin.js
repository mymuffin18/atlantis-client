import React, { useState } from 'react';
import { admin_login } from '../api/atlantis-api';
import { useAdminAuth } from '../context/AdminAuthContextProvider';

function AdminLogin() {
  const [adminLoginEmail, setAdminLoginEmail] = useState('');
  const [adminLoginPassword, setAdminLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAdminAuth();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await admin_login(
      adminLoginEmail,
      adminLoginPassword
    );
    if (error !== '') {
      console.log('this is error', error);
      setError(error);
      setLoading(false);
    } else {
      console.log('login response', data);
      setLoading(false);
      dispatch({
        type: 'LOGIN',
        payload: { admin: data.admin, token: data.token },
      });
    }
  };

  return (
    <div className='h-screen flex flex-col items-center text-black'>
      <div className='w-screen bg-black flex flex-row items-center h-1/12'>
        <div className='bg-black text-4xl lg:text-5xl w-5/6 lg:w-4/5 ml-12'>
          <h1 className='text-white'>ATLANTIS</h1>
        </div>
      </div>
      <div className='w-screen h-11/12 flex justify-center items-center'>
        <div className='w-full lg:w-1/4 h-fit flex justify-center lg:border-8 border-slate-400 rounded-3xl'>
          <div className='w-3/4'>
            <div className='text-5xl mb-10 mt-5'>
              <h1 className='text-black'>Login</h1>
            </div>
            <div className='mb-5'>
              {error && <span className='text-sm text-red-500'>{error}</span>}
            </div>
            <div className='mb-5'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='email'
                placeholder='Enter your Email'
                value={adminLoginEmail}
                onChange={(e) => setAdminLoginEmail(e.target.value)}
              />
            </div>
            <div className='mb-10'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='password'
                placeholder='Enter your password'
                value={adminLoginPassword}
                onChange={(e) => setAdminLoginPassword(e.target.value)}
              />
            </div>
            <div className='flex flex-col items-center mb-10'>
              <button
                className='w-1/2 bg-white text-black px-10 py-2 rounded-full border-slate-400 border-4 hover:bg-black hover:text-white'
                onClick={handleLogin}
                disabled={loading}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
