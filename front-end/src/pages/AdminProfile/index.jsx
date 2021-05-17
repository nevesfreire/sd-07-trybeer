import React from 'react';
import { Container } from 'react-bootstrap';
import AdminProfile from '../../components/AdminProfile';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminProfilePage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Perfil" />
      <Container
      fluid
      style={ {
        height: '100vh',
        paddingTop: '50px',
        width: '70vh',
        color: 'rgb(227,183,88)',
      } }
    >
      <AdminProfile />
    </Container>
    </div>
  );
};

export default AdminProfilePage;
