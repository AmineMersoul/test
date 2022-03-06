import React from 'react';
import Signin from './Signin';
import Dashboard from './Dashboard';
import Search from './Search';
import Company from './Company';
import { Routes, Route, Link } from 'react-router-dom';
import User from './User';

function App() {
  return <div className="App">
    <Routes>
      <Route path='/' element={<Signin />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route path='' element={<Search />} />
        <Route path='company' element={<Company />} />
        <Route path='user' element={<User />} />
      </Route>
    </Routes>
  </div>
}

export default App;
