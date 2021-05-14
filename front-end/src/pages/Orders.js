import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderAdmin, Header, OrdersClientCard, Loading } from '../components';
import { getOrdersForAdmin, getOrdersForUser } from '../api';

import ls from '../services';

function Orders() {
  const history = useHistory();

  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getOrdersByRole = async (token, role, id) => {
    if (role === 'administrator') {
      const getSalesAdmin = await getOrdersForAdmin(token);
      setOrders(getSalesAdmin.data);
      console.log(getSalesAdmin.data);
    } else {
      const getSalesUser = await getOrdersForUser(token, id);
      setOrders(getSalesUser.data);
      console.log(getSalesUser.data);
    }
  };

  const getUserLogged = useCallback(async () => {
    const dataUser = await ls.acessLocalStorage.getUserLocalStorage();
    if (!dataUser) return history.push('/login');
    setUser(dataUser);
    const { token, role, id } = dataUser;
    const getOreders = await getOrdersByRole(token, role, id);
    if (getOreders) setIsLoading(false);
  }, [history, setUser]);

  useEffect(() => {
    getUserLogged();
  }, [getUserLogged]);

  return (
    { isLoading ?
      (
      <div className="first-div">
        {
          user && user.role === 'administrator'
            ? <HeaderAdmin title="Admin - Pedidos" />
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
    )
    :
    <Loading />
    }

  );
}

export default Orders;
