import React from 'react';
import { Redirect } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';

function ClientProfile() {
  const client = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      { !client || !client.token ? <Redirect to="/login" /> : <UpdateForm />}
    </div>
  );
}

export default ClientProfile;
