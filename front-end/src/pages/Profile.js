import React from 'react';
import ComponentProfile from '../components/Profile';
import Footer from '../components/Footer';
import AsideLogo from '../components/AsideLogo';
import '../css/login.css';
import '../css/profile.css';

const Profile = () => (
  <div className="container-out-login">
    <div className="container-form-int">
      <ComponentProfile />
      <AsideLogo />
    </div>
    <Footer />
  </div>
);

export default Profile;
