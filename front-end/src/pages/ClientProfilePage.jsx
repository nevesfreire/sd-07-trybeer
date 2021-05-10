import React from 'react';
import { Redirect } from 'react-router-dom';
import HeaderBurguer from '../components/HeaderBurger';
import UpdateForm from '../components/UpdateForm';

function ClientProfile() {
  const client = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <HeaderBurguer titulo="Meu Perfil" />
      { !client || !client.token ? <Redirect to="/login" /> : <UpdateForm />}
    </div>
  );
}

export default ClientProfile;
