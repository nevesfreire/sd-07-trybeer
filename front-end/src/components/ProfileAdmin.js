import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

function ProfileAdmin() {
  const TITLE_PROFILE_ADMIN = 'Perfil';

  const data = JSON.parse(localStorage.getItem('data'));
  const token = localStorage.getItem('token');

  const { name, email } = data;
  return (
    <div>
      {token && <Redirect to="/login" />}
      <Header title={ TITLE_PROFILE_ADMIN } />
      <div>
        <p data-testid="profile-email">{ email }</p>
        <p data-testid="profile-name">{ name }</p>
      </div>
    </div>
  );
}

export default ProfileAdmin;
