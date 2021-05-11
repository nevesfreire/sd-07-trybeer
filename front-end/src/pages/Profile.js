import React from 'react';
import Header from '../components/Header';
import ClientProfile from '../components/ClientProfile';

const ProfilePage = () => (
  <div>
    <Header />
    <H1 data-testid="top-title">Meu perfil</H1>
    <ClientProfile />
  </div>
);

export default ProfilePage;
