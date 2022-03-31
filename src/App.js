import './App.css';
import Login from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';

function App() {
	return (
		<>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='admin-login' element={<AdminLogin />} />
			</Routes>
		</>
	);
}

export default App;
