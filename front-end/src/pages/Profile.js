import React from 'react';
import ComponentProfile from '../components/Profile';
import Footer from '../components/Footer';
import '../css/login.css';
import '../css/profile.css';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Profile = () => (
  <div className="container-prodile">
    <Header title="Meu perfil" />
    <div className="container-content">
      <Menu />
      <div className="container-int-profile">
        <ComponentProfile />
      </div>
    </div>
    <Footer />
  </div>
);

export default Profile;
