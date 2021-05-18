import React from 'react';
import { Redirect } from 'react-router';
import HeaderBurguer from '../components/HeaderBurger';
import Profile from '../components/AdminProfileComponent';
import { PageContainer } from '../styled/AdminContainers.styled';

function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem('user'));
  return (
    <PageContainer>
      <HeaderBurguer titulo="Perfil" isAdmin />
      {
        !admin || !admin.token ? (
          <Redirect to="/login" />
        ) : (
          <Profile name={ admin.name } email={ admin.email } />
        )
      }
    </PageContainer>
  );
}

export default AdminProfile;
