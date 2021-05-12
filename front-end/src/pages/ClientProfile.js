import React from 'react';
import Profile from '../components/Profile';
import MenuTop from '../components/MenuTop';
import '../style/profile.css';

function ClientProfile() {
  return (
    <div className="form-page products-page">
      <MenuTop title="Meu perfil" />
      <Profile />

    </div>
  );
}

export default ClientProfile;
