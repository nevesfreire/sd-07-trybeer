// https://reactrouter.com/web/example/auth-workflow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

const ProtectedRoute = ({ redirect, ...rest }) => {
  const isAuth = () => true;

  return isAuth()
    ? <Route {...rest} />
    : <Redirect to={redirect} />
};

function App() {
  return <h1>Hello world</h1>;
};

export default App;
