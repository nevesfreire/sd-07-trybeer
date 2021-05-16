import React, { useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import OrderCardAdmin from './OrderCardAdmin';
import api from '../services/api';
import '../css/orders.css';

const Admin = () => {
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
        .post('/admin/orders', params)
        .then((result) => setOrders(result.data))
        .catch((err) => console.log(`error: ${err}`));
    };
    getAllOrdersByid();
  }, [params]);

  console.log(loggedUser.id);
  return (
    <div className="container">
      {!loggedUser.id && <Redirect to="/login" />}
      <div>
        <div className="container-int">
          <div className="myOrder-body">
            {orders.map((actual, index) => (
              <OrderCardAdmin
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
      ;
    </div>
  );
};

export default Admin;
