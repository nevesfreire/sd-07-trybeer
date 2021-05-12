import React from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/Drink.me.png';
import '../style/login.css';

function Login() {
  return (
    <div className="form-page login-page">
      <img className="logo" src={logo} alt="drink.me logo" />
      <LoginForm />
    </div>
  );
}

export default Login;
