import React from 'react';
import ComponentProfile from '../components/Profile';
import Footer from '../components/Footer';
import AsideLogo from '../components/AsideLogo';
import '../css/login.css';
import '../css/profile.css';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Profile = () => {
  const TITLE = 'Meu perfil';
  return (
    <div className="container-out-login">
      <Header title={ TITLE } />
      <Menu />
      <div className="container-form-int">
        <ComponentProfile />
        <AsideLogo />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
