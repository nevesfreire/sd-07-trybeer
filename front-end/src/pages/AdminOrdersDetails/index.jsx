import React from 'react';
import AdminOrdersDetails from '../../components/AdminOrdersDetails';
// import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const AdminOrdersDetailsPage = () => {
  AuthVerification();

  return (
    <div>
      <AdminOrdersDetails />
    </div>
  );
};

export default AdminOrdersDetailsPage;
