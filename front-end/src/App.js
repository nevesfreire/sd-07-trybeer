import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={ Login } />
    <Route exact path="/login" component={ Login } />
  </BrowserRouter>
);

export default App;
