import React from 'react';
import ClientProfile from '../../components/ClientProfile';
import MenuBurger from '../../components/Menu';
// import CreateUserForm from '../../components/CreateUserForm';

const ClientProfilePage = () => (
  <div className="d-flex flex-column align-items-center"
  >
    <MenuBurger />
    <h1
    data-testid="top-title"
    style={ { marginTop: '5vh' } }
    >Meu perfil
    </h1>
    <div
    style={ { marginTop: '5vh' } }
    >
      <ClientProfile />
    </div>
  </div>
);

export default ClientProfilePage;
