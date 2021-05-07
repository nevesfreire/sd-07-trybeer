import React from 'react';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminHome = () => {
  AuthVerification();

  return (
    <Header title="TryBeer" />
  );
};

export default AdminHome;
