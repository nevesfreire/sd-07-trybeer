import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { getToken } from '../helpers/localStorage';

const CustomAdminProfile = () => {
  const token = getToken();
  const { name, email } = token;
  return (
    <div>
      <h1>Perfil</h1>
      <p data-testid="profile-name">{`Nome: ${name}`}</p>
      <p data-testid="profile-email">{`Email: ${email}`}</p>
    </div>
  );
};

export default CustomAdminProfile;
