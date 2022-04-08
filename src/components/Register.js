import React, { useState } from 'react';
import { register } from '../api/atlantis-api';
import { useUserAuth } from '../context/UserAuthContextProvider';
import { Link } from 'react-router-dom';

function Register() {
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [firstNameErrors, setFirstNameErrors] = useState([]);
  const [registerLastName, setRegisterLastName] = useState('');
  const [lastNameErrors, setLastNameErrors] = useState([]);
  const [registerEmail, setRegisterEmail] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [passErrors, setPassErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState('');
  const { dispatch } = useUserAuth();

  const handleRegister = async (e) => {
    if (registerPassword !== registerConfirmPassword) {
      setConfirmPasswordError('Password not matched.');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    } else {
      setLoading(true);

      const { data, errors } = await register(
        registerFirstName,
        registerLastName,
        registerEmail,
        registerPassword
      );
      if (Object.keys(errors).length > 0) {
        setEmailErrors(errors.email);
        setPassErrors(errors.password);
        setFirstNameErrors(errors.first_name);
        setLastNameErrors(errors.last_name);
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
      } else {
        setFlash('Successful register');
        setEmailErrors([]);
        setPassErrors([]);
        setLoading(false);
        dispatch({
          type: 'LOGIN',
          payload: { user: data.user, token: data.token },
        });
      }
    }
    setLoading(false);
  };
  return (
    <div className='h-screen flex flex-col items-center text-white'>
      <div className='w-screen bg-black flex flex-row items-center h-1/12'>
        <div className='bg-black text-white text-4xl lg:text-5xl w-5/6 lg:w-4/5 ml-12'>
          ATLANTIS
        </div>
      </div>
      <div className='w-screen h-11/12 flex justify-center items-center'>
        <div className='w-full lg:w-1/4 h-fit flex justify-center lg:border-8 border-slate-400 rounded-3xl'>
          <div className='w-3/4'>
            <div className='text-5xl mb-10 mt-5'>
              <h1 className='text-black'>Sign up</h1>
            </div>
            <div className='mb-5'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='text'
                placeholder='Enter your First Name'
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
              />
              {firstNameErrors &&
                firstNameErrors.map((err, index) => (
                  <div key={index} className='text-xs text-red-500'>
                    First name {err}
                  </div>
                ))}
            </div>
            <div className='mb-5'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='text'
                placeholder='Enter your Last Name'
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
              />
              {lastNameErrors &&
                lastNameErrors.map((err, index) => (
                  <div key={index} className='text-xs text-red-500'>
                    Last name {err}
                  </div>
                ))}
            </div>
            <div className='mb-5'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='email'
                placeholder='Enter your Email'
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              {emailErrors &&
                emailErrors.map((err, index) => (
                  <div key={index} className='text-xs text-red-500'>
                    Email {err}
                  </div>
                ))}
            </div>

            <div className='mb-5'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black0'
                type='password'
                placeholder='Enter your password'
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              {passErrors &&
                passErrors.map((err, index) => (
                  <div key={index} className='text-xs text-red-500'>
                    Password {err}
                  </div>
                ))}
            </div>
            <div className='mb-10'>
              <input
                className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
                type='password'
                placeholder='Confirm your password'
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />

              {confirmPasswordError && (
                <div className='text-xs text-red-500'>
                  {confirmPasswordError}
                </div>
              )}
            </div>
            <div className='flex flex-col items-center'>
              <div>
                <button
                  className='bg-white text-black px-10 py-2 rounded-full border-slate-400 border-4 hover:bg-black hover:text-white'
                  onClick={handleRegister}
                  disabled={loading}
                >
                  Sign Up!
                </button>
              </div>
              <div className='w-full mb-10'>
                <div className='flex justify-end'>
                  <Link className='text-blue-600 italic' to='/'>
                    back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
