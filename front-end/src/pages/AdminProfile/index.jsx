import React from 'react';
import AdminProfile from '../../components/AdminProfile';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminProfilePage = () => {
  AuthVerification();

  return (
    <Container className="d-flex flex-column align-items-center"
    data-testid="top-title"
    style={ { marginTop: '5vh' } }
    >
      <Header title="Perfil" />
      <div
      style={ { marginTop: '5vh' } }>
      <AdminProfile />
      </div>
    </Container>
  );
};

export default AdminProfilePage;
