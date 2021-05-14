import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopMenu } from '../../components';
import TrybeerContext from '../../context/TrybeerContext';
import { getSaleByUserId } from '../../service/trybeerApi';
import './style.css';

export default function Orders() {
  const history = useHistory();
  const { userLogged } = useContext(TrybeerContext);
  const [ordersFromUser, setOrdersFromUser] = useState([]);

  const listOrdes = async () => {
    const orders = await getSaleByUserId(userLogged.id);
    setOrdersFromUser(orders);
    console.log(orders);
  };

  useEffect(() => {
    listOrdes();
  }, []);

  return (
    <div>
      <TopMenu topTitle="Meus Pedidos" />
      <h6>{userLogged.name}</h6>
      <h6>{userLogged.email}</h6>
      <h6>{userLogged.role}</h6>
      <h6>{userLogged.id}</h6>
      <div>
        {ordersFromUser.map((order) => (
          <button
            type="button"
            className="cardOrder"
            key={ order.id - 1 }
            data-testid={ `${order.id - 1}-order-card-container` }
            onClick={ () => history.push(`/orders/${order.id}`) }
          >
            <span
              data-testid={ `${order.id - 1}-order-number` }
            >
              Pedido {order.id}
            </span>
            <h2 data-testid={ `${order.id - 1}-order-date` }>{order.sale_date}</h2>
            <h2
              data-testid={ `${order.id - 1}-order-total-value` }
            >
              {order.total_price}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
