import React from 'react';
import Profile from '../components/Profile';
import MenuTop from '../components/MenuTop';

function ClientProfile() {
  return (
    <div className="form-page">
      <MenuTop title="Meu perfil" />
      <Profile />

    </div>
  );
}

export default ClientProfile;
