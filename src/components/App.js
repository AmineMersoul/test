import React from 'react';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Search from './Search';
import Company from './Company';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import User from './User';
import Account from './Account';

function App() {

  const useAuth = () => {
    const user = { loggedIn: localStorage.getItem("token") };
    return user && user.loggedIn;
  }

  const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to='/login' />;
  }

  return <div className="App">
    <Routes>
      <Route path='/login' element={<Signin />} />
      <Route element={<ProtectedRoute />}>
        <Route path='' element={<Dashboard />}>
          <Route path='' element={<Search />} />
          <Route path='company' element={<Company />} />
          <Route path='user' element={<User />} />
          <Route path='account' element={<Account />} />
        </Route>
      </Route>
    </Routes>
  </div>
}

export default App;
