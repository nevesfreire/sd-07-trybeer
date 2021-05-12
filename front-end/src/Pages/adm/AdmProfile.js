import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../Components/Header';

function AdmProfile() {
  const { email, name } = JSON.parse(localStorage.getItem('user'));

  if (!localStorage.getItem('user')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header name="Perfil" />
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
