import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import Menu from '../components/Menu';
import Header from '../components/Header';
import api from '../services/api';
import '../css/orders.css';

const Orders = () => {
  const URL = '/orders';

  const [orders, setOrders] = useState([
    {
      id: 1,
      delivery_number: '1',
      sale_date: '10-12-2011',
      total_price: '100',
    },
  ]);

  const loggedUser = JSON.parse(localStorage.getItem('data')) || { id: null };
  const params = {
    headers: { 'content-type': 'application/json' },
    id: loggedUser.id,
  };

  useEffect(() => {
    const getAllOrdersByid = async () => {
      api
        .post(URL, params)
        .then((result) => setOrders(result.data))
        .catch((err) => console.log(`error: ${err}`));
    };
    getAllOrdersByid();
  }, [URL, params]);

  return (
    <div className="container">
      {loggedUser.id === null ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <Header title="Meus Pedidos" />
          <div className="container-int">
            <Menu />
            <div className="myOrder-body">
              {orders.map((actual, index) => (
                <OrderCard
                  position={ index }
                  key={ actual.delivery_number }
                  deliveryNumber={ actual.delivery_number }
                  saleDate={ actual.sale_date }
                  totalPrice={ actual.total_price }
                />
              ))}
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default Orders;
