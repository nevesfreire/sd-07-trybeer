import React from 'react';
import AdminProfile from '../../components/AdminProfile';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminProfilePage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Perfil" />
      <AdminProfile />
    </div>
  );
};

export default AdminProfilePage;
