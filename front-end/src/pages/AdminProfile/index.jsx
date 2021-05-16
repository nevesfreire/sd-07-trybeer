import React from 'react';
import AdminProfile from '../../components/AdminProfile';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminProfilePage = () => {
  AuthVerification();

  return (
    <div className="d-flex flex-column align-items-center"
    data-testid="top-title"
    style={ { marginTop: '5vh' } }
    >
      <Header title="Perfil" />
      <div className="d-flex flex-column align-items-center"
      style={ { marginTop: '5vh' } }>
      <AdminProfile />
      </div>
    </div>
  );
};

export default AdminProfilePage;
