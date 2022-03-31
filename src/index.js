import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AdminAuthContextProvider from './context/AdminAuthContextProvider';
import UserAuthContextProvider from './context/UserAuthContextProvider';

ReactDOM.render(
	<AdminAuthContextProvider>
		<UserAuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserAuthContextProvider>
	</AdminAuthContextProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
