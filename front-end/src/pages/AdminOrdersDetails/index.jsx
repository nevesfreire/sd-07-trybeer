import React from 'react';
import AdminOrdersDetails from '../../components/AdminOrdersDetails';
import { Container } from 'react-bootstrap';
// import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersDetailsPage = () => {
  AuthVerification();

  return (
    <Container className="d-flex flex-column align-items-center"
    style={ { marginTop: '5vh' } }>
      <AdminOrdersDetails />
    </Container>
  );
};

export default AdminOrdersDetailsPage;
