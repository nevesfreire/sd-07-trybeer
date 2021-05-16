import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import TopMenu from '../../component/TopMenu';
import OrdersCard from '../../component/OrdersCard';
import { getToLocalStorage } from '../../utils/localStorage';
import { requestGetOrdersAPI } from '../../services';

export default function Orders() {
  const history = useHistory();
  const [orders, setOders] = useState([]);

  const validateToken = () => {
    const user = getToLocalStorage('user');
    if (!user || !user.token) return false;
    return true;
  };

  const handleRequestGetOrdersAPI = async () => {
    if (!validateToken()) {
      return history.push('/login');
    }
    const ordersList = await requestGetOrdersAPI();
    if (ordersList.status !== StatusCodes.OK) return history.push('/login');
    setOders(ordersList.data);
  };

  useEffect(() => {
    handleRequestGetOrdersAPI();
  }, [handleRequestGetOrdersAPI]);

  if (!orders.length) return <h3>Loading...</h3>;

  return (
    <>
      <TopMenu title="Meus Pedidos" />
      {
        orders.map((order) => <OrdersCard key={ order.id } order={ order } />)
      }
    </>
  );
}
