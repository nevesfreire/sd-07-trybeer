import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import Menu from '../components/Menu';
import Header from '../components/Header';
import api from '../services/api';
import '../css/orders.css';

const Orders = () => {
  const URL = 'localhost:3001/ordes';
  const [orders, setOrders] = useState([
    { id: 1, delivery_number: '1', sale_date: '10-12-2011', total_price: 100 },
  ]);
  const params = { id: 1 }; // esse id tem que ser buscado ainda.
  const getAllOrdersByid = async () => {
    api
      .get(URL, params)
      .then((result) => setOrders(result.data))
      .catch((err) => console.log(`error: ${err}`));
  };

  useEffect(() => {
    getAllOrdersByid();
  });

  return (
    <div className="container">
      <Header title="Meus Pedidos" />
      <div className="container-int">
        <Menu />
        <div className="myOrder-body">
          {
            orders.map((actual) => (
              <OrderCard
                key={ actual.id }
                deliveryNumber={ actual.delivery_number }
                saleDate={ actual.sale_date }
                totalPrice={ actual.total_price }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;
