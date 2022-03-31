import React, { useState } from 'react';
import { register } from '../api/atlantis-api';

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

	const handleRegister = async (e) => {
		if (registerPassword !== registerConfirmPassword) {
			setConfirmPasswordError('Password not matched.');
			setRegisterEmail('');
			setRegisterPassword('');
			setRegisterConfirmPassword('');
		} else {
			e.preventDefault();
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
			}
			setLoading(false);
		}
	};

	return (
		<div>
			<div>
				<h1>Register</h1>
			</div>
			<div>
				<input
					type='text'
					placeholder='Enter your First Name'
					value={registerFirstName}
					onChange={(e) => setRegisterFirstName(e.target.value)}
				/>
				{firstNameErrors &&
					firstNameErrors.map((err, index) => (
						<div key={index}>
							<span className='text-xs text-red-500'>
								First name {err}
							</span>
						</div>
					))}
			</div>
			<div>
				<input
					type='text'
					placeholder='Enter your Last Name'
					value={registerLastName}
					onChange={(e) => setRegisterLastName(e.target.value)}
				/>
				{lastNameErrors &&
					lastNameErrors.map((err, index) => (
						<div key={index}>
							<span className='text-xs text-red-500'>
								Last name {err}
							</span>
						</div>
					))}
			</div>
			<div>
				<input
					type='email'
					placeholder='Enter your Email'
					value={registerEmail}
					onChange={(e) => setRegisterEmail(e.target.value)}
				/>
				{emailErrors &&
					emailErrors.map((err, index) => (
						<div key={index}>
							<span className='text-xs text-red-500'>
								Last name {err}
							</span>
						</div>
					))}
			</div>

			<div>
				<input
					type='password'
					placeholder='Enter your password'
					value={registerPassword}
					onChange={(e) => setRegisterPassword(e.target.value)}
				/>
				{passErrors &&
					passErrors.map((err, index) => (
						<div key={index}>
							<span className='text-xs text-red-500'>
								Password {err}
							</span>
						</div>
					))}
			</div>
			<div>
				<input
					type='password'
					placeholder='Confirm your password'
					value={registerConfirmPassword}
					onChange={(e) =>
						setRegisterConfirmPassword(e.target.value)
					}
				/>

				{confirmPasswordError && (
					<div>
						<span className='text-xs text-red-500'>
							{confirmPasswordError}
						</span>
					</div>
				)}
			</div>
			<div>
				<button onClick={handleRegister} disabled={loading}>
					Register
				</button>
			</div>
		</div>
	);
}

export default Register;
