import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import TopMenu from '../../component/TopMenu';
import OrdersCard from '../../component/OrdersCard';
import { getToLocalStorage } from '../../utils/localStorage';
import { requestGetOrdersAPI } from '../../services';
import './style.css';

function AdminOrders() {
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
    // console.log('ordersList', ordersList);
    if (ordersList.status !== StatusCodes.OK) return history.push('/login');
    setOders(ordersList.data);
  };

  useEffect(() => {
    handleRequestGetOrdersAPI();
  }, [handleRequestGetOrdersAPI]);

  return (
    <div className="admin-orders-container">
      <TopMenu title="Meus Pedidos" />
      {!orders.length ? (
        <h3 className="admin-orders-card-container">
          <strong>Você não tem pedidos ainda :(</strong>
        </h3>
      ) : (
        <div className="admin-orders-card-container">
          {orders.map((order) => <OrdersCard key={ order.id } order={ order } />)}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
