import React from 'react';
import ClientProfile from '../../components/ClientProfile';
import MenuBurger from '../../components/Menu';
// import CreateUserForm from '../../components/CreateUserForm';

const ClientProfilePage = () => (
  <div>
    <MenuBurger />
    <h1 data-testid="top-title">Meu perfil</h1>
    <div>
      <ClientProfile />
    </div>
  </div>
);

export default ClientProfilePage;
