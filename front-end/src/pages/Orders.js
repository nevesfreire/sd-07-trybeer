import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin, Header, OrdersClientCard, OrdersAdmCard } from '../components';
import { getOrdersForAdmin, getOrdersForUser } from '../api';

import ls from '../services';

function Orders() {
  const history = useHistory();

  const [user, setUser] = useState();
  const [orders, setOrders] = useState();

  const getOrdersByRole = async (token, role, id) => {
    if (role === 'administrator') {
      const getSalesAdmin = await getOrdersForAdmin(token);
      return setOrders(getSalesAdmin.data);
    }
    const getSalesUser = await getOrdersForUser(token, id);
    return setOrders(getSalesUser.data);
  };

  const getUserLogged = useCallback(async () => {
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    setUser(dataUser);
    const { token, role, id } = dataUser;
    await getOrdersByRole(token, role, id);
  }, [history]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    <div className="first-div">
      {
        user && user.role === 'administrator'
          ? (
            <>
              <HeaderAdmin title="Admin - Pedidos" />
              <div>
                {
                  orders && orders.map((item, index) => (
                    <OrdersAdmCard
                      key={ index }
                      order={ item.sale }
                      index={ index }
                    />))
                }
              </div>
            </>
          )
          : (
            <>
              <Header title="Meus Pedidos" />
              <div>
                {
                  orders && orders.map((item, index) => (<OrdersClientCard
                    key={ index }
                    order={ item }
                    index={ index }
                  />))
                }
              </div>
            </>
          )
      }
    </div>
  );
}

export default Orders;
