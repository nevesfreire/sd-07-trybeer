import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

import TopMenu from '../../../commons/simple/TopMenu';

import SideBar from '../../../commons/composed/SideBar';

function Orders() {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const getToken = () => {
      const tokenUser = localStorage.getItem('token');
      if (!tokenUser) history.push('/login');
      const userData = jwtDecode(tokenUser);
      setRole(userData.role);
      setIsLoading(false);
    };

    getToken();
  }, [history]);

  return (
    <div>
      { isLoading && <h1>Loading...</h1> }
      { !isLoading && role !== 'administrator' && <TopMenu title="Meus Pedidos" /> }
      { !isLoading && role === 'administrator' && <SideBar isAdmin /> }
    </div>
  );
}

export default Orders;
