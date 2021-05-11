import React from 'react';
import { Redirect } from 'react-router';

const AdminProfileForm = () => {
  const name = JSON.parse(localStorage.getItem('name'));
  const email = JSON.parse(localStorage.getItem('email'));

  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }

  return (
    <div>
      <h1 data-testid="top-title">
        Perfil
      </h1>
      <h1 data-testid="profile-name">
        {`Nome: ${name}`}
      </h1>
      <h1 data-testid="profile-email">
        {`Email: ${email}`}
      </h1>
    </div>
  );
};

export default AdminProfileForm;
