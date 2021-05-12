import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';

function AdminProfile() {
  return (
    <>
      <HeaderBurguer titulo="Perfil" isAdmin />
      <div>
        admin
      </div>
    </>
  );
}

export default AdminProfile;
