import React from 'react';
// import AdminOrdersDetails from '../../components/AdminOrdersDetails';
import MenuBurger from '../../components/Menu';
import { MainDiv, FormWrapper, H1 } from './styles';
// import AuthVerification from '../../components/AuthVerification';

const AdminOrdersDetailsPage = () => {
  // AuthVerification();
  return (
    <MainDiv>
      <MenuBurger />
      <H1 data-testid="top-title">Detalhes do Pedido</H1>
      <FormWrapper>
        {/* <AdminOrdersDetails /> */}
      </FormWrapper>
    </MainDiv>
  );
};

export default AdminOrdersDetailsPage;
