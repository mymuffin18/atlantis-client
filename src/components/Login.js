import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api/atlantis-api';
import { useUserAuth } from '../context/UserAuthContextProvider';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { dispatch } = useUserAuth();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await login(loginEmail, loginPassword);
    if (error !== '') {
      console.log('this is error', error);
      setError(error);
      setLoading(false);
    } else {
      console.log('login response', data);
      setLoading(false);
      dispatch({
        type: 'LOGIN',
        payload: { user: data.user, token: data.token },
      });
    }
  };

  return (
    <div>
      <div>
        <h1>LOGIN</h1>
      </div>
      <div>
        {error && <span className='text-sm text-red-500'>{error}</span>}
      </div>
      <div>
        <input
          type='email'
          placeholder='Enter your Email'
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <p>{loginEmail}</p>
      </div>
      <div>
        <input
          type='password'
          placeholder='Enter your password'
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <p>{loginPassword}</p>
      </div>
      <div>
        <button onClick={handleLogin} disabled={loading}>
          Login
        </button>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
}

export default Login;
