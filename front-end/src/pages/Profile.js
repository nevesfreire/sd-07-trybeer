import React from 'react';
import PropTypes from 'prop-types';
import ComponentProfile from '../components/Profile';
import Footer from '../components/Footer';
import AsideLogo from '../components/AsideLogo';
import '../css/login.css';
import '../css/profile.css';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Profile = (props) => {
  const { history } = props;
  return (
    <div className="container-out-login">
      <Header title="Meu perfil" />
      <Menu path={ history } />
      <div className="container-form-int">
        <ComponentProfile />
        <AsideLogo />
      </div>
      <Footer />
    </div>
  );
};

Profile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Profile;
