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
		<div className='h-screen flex flex-col items-center text-black'>
			<div className='w-screen bg-black flex flex-row items-center h-1/12'>
				<Link
					to='/'
					className='bg-black text-white text-4xl lg:text-5xl w-5/6 lg:w-4/5 ml-12'
				>
					ATLANTIS
				</Link>
			</div>
			<div className='w-screen h-11/12 flex justify-center items-center'>
				<div className='w-full lg:w-1/4 h-fit flex justify-center lg:border-8 border-slate-400 rounded-3xl'>
					<div className='w-3/4'>
						<div className='mb-10 mt-5'>
							<h1 className='text-black'>Login</h1>
						</div>
						<div className='mb-5'>
							{error && (
								<span className='text-sm text-red-500'>
									{error}
								</span>
							)}
						</div>
						<div className='mb-5'>
							<input
								className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
								type='email'
								placeholder='Enter your Email'
								value={loginEmail}
								onChange={(e) =>
									setLoginEmail(e.target.value)
								}
							/>
						</div>
						<div className='mb-10'>
							<input
								className='rounded-lg w-full h-10 px-1 text-black border-slate-600 border-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black'
								type='password'
								placeholder='Enter your password'
								value={loginPassword}
								onChange={(e) =>
									setLoginPassword(e.target.value)
								}
							/>
						</div>
						<div className='flex flex-col items-center'>
							<button
								className='w-1/2 bg-white text-black px-10 py-2 rounded-full border-slate-400 border-4 hover:bg-black hover:text-white'
								onClick={handleLogin}
								disabled={loading}
							>
								Login
							</button>
						</div>
						<div className='flex justify-center text-slate-400 mb-10'>
							<Link
								className='text-blue-600 italic mr-2'
								to='/register'
							>
								<span className='whitespace-nowrap'>
									Register{' '}
								</span>
							</Link>{' '}
							|{' '}
							<Link
								className='text-blue-600 italic ml-2'
								to='/'
							>
								<span className='whitespace-nowrap'>
									{' '}
									back
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
