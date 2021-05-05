import React from 'react';
import ComponentLogin from '../components/Login';
import AsideLogo from '../components/AsideLogo';
import Footer from '../components/Footer';

const Login = () => (
  <div className="container-login">
    <ComponentLogin />
    <AsideLogo />
    <Footer />
  </div>
);

export default Login;
