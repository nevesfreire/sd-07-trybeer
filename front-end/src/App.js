import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={ Login } />
    <Route exact path="/login" component={ Login } />
    <Route exact path="/register" component={ Register } />
  </BrowserRouter>
);

export default App;
