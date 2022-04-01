import './App.css';
import Login from './components/Login';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import { useAdminAuth } from './context/AdminAuthContextProvider';
import { useUserAuth } from './context/UserAuthContextProvider';
import Dashboard from './components/dashboardAdmin/Dashboard';
import UserList from './components/dashboardAdmin/UserList';
import ApproveDisaster from './components/dashboardAdmin/ApproveDisaster';
import DashboardUser from './components/dashboardUser/DashboardUser';

function App() {
  const admin = useAdminAuth();
  const user = useUserAuth();

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            admin.state.token ? (
              <Navigate replace={false} to='admin/dashboard' />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route
          path='/login'
          element={
            user.state.token ? (
              <Navigate replace={false} to='/user/dashboard' />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path='/register'
          element={
            user.state.token ? (
              <Navigate replace={false} to='/user/dashboard' />
            ) : (
              <Register />
            )
          }
        />

        <Route path='admin/dashboard' element={<Dashboard />}>
          <Route path='userlist' element={<UserList />} />
          <Route path='approved-disaster' element={<ApproveDisaster />} />
        </Route>

        <Route path='user/dashboard' element={<DashboardUser />}></Route>
      </Routes>
      {/* <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin-login" element={<AdminLogin />} />
      </Routes> */}
    </>
  );
}

export default App;
