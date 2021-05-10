import React from 'react';

import jwtDecode from 'jwt-decode';

import TopMenu from '../../../commons/simple/TopMenu';

import SideBar from '../../../commons/composed/SideBar';

function Orders() {
  const tokenUser = localStorage.getItem('token');
  const userData = jwtDecode(tokenUser);
  console.log(userData)
  const { role } = userData;

  return (
    <div>
      <TopMenu title="Meus Pedidos" /> 
      { role !== 'administrator' && <TopMenu title="Meus Pedidos" /> }
      { role === 'administrator'}<SideBar isAdmin={ true } />
    </div>
  );
}

export default Orders;
