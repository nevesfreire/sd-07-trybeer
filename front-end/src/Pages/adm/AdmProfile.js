import React from 'react';
import { Redirect } from 'react-router-dom';
import SidebarAdm from '../../Components/SidebarAdm';

function AdmProfile() {
  const { email, name } = JSON.parse(localStorage.getItem('user'));

  if (!localStorage.getItem('user')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <SidebarAdm name="Perfil" />
      <label htmlFor="profile-name">
        Name
        <input
          readOnly
          value={ name }
          name="name"
          data-testid="profile-name"
          type="text"
        />

      </label>
      <label htmlFor="profile-email">
        Email
        <input
          readOnly
          value={ email }
          name="email"
          data-testid="profile-email"
          type="text"
        />
      </label>
    </div>
  );
}

export default AdmProfile;
