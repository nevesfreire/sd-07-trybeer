import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin, OrdersCard } from '.';
import { getOrdersForAdmin } from '../api';

import ls from '../services';

function Orders() {
  const [ordersState, setOrdersState] = useState([]);
  const history = useHistory();

  const getUserLogged = useCallback(async () => {
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    const { token } = dataUser;
    const getSales = await getOrdersForAdmin(token);
    setOrdersState(getSales.data);
  }, [history]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    <div className="first-div">
      <HeaderAdmin title="Admin - Pedidos" />
      <h1><strong>Pedidos</strong></h1>
      {
        ordersState.map((item, index) => {
          delete item.sale.user;
          delete item.sale.userId;
          item.sale.totalPrice = item.sale.total_price;
          delete item.total_price;
          return <OrdersCard key={ index } item={ item.sale } index={ index } />;
        })
      }
      <br />
    </div>
  );
}

export default Orders;
