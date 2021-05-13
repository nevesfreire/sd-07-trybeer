import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin } from '../components';
import { getOrders } from '../api';

import ls from '../services';

function Orders() {
  const history = useHistory();

  const getUserLogged = useCallback(async () => {
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    const { token } = dataUser;
    const getSales = await getOrders(token);
    console.log(getSales);
  }, [history]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    <div className="first-div">
      <HeaderAdmin title="Admin - Pedidos" />
      <h1><strong>Pedidos</strong></h1>
    </div>
  );
}

export default Orders;
