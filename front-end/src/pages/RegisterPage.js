import React from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/Drink.me.png';

function RegisterPage() {
  return (
    <div className="form-page login-page">
      <img className="logo" src={logo} alt="drink.me logo" />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
