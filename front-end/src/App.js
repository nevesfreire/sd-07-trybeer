import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';
import Products from './pages/Products';
import AdminProfile from './pages/Admin/Profile';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={ Login } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ Register } />
    <Route exact path="/products" component={ Products } />
    <Route exact path="/admin/profile" component={ AdminProfile } />
  </BrowserRouter>
);

export default App;
