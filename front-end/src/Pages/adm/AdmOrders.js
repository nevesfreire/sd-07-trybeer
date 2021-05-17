import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import SideBarAdm from '../../Components/SidebarAdm';

function AdmOrders() {
  const [sales, setSales] = useState(null);
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    if (user) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', user.token);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      fetch('http://localhost:3001/salesAdm', requestOptions)
        .then((response) => response.json())
        .then((saless) => setSales(saless));
    }
  }, []);

  if (localStorage.getItem('user') === null) return <Redirect to="/login" />;
  return (
    <div>
      <h1>Aqui é pedido</h1>
      <SideBarAdm />
      <div data-testid="top-title">Meus Pedidos</div>
      <hr />
      {sales !== null && (
        <div data-testid="0-order-card-container">
          {sales.map((order, index) => (
            <div key={ index }>
              <Link to={ `admin/orders/${order.id}` }>
                <span data-testid={ `${index}-order-number` }>
                  Pedido
                  {' '}
                  { order.id }
                </span>
                {' -'}
                <span data-testid={ `${index}-order-address` }>
                  {' '}
                  rua
                  {' '}
                  { order.delivery_address }
                  ,
                  {' '}
                  { order.delivery_number }
                </span>
                {' '}
                -
                {' '}
                <span data-testid={ `${index}-order-total-value` }>
                  R$
                  { ` ${order.total_price.replaceAll('.', ',')} - ` }
                </span>
                <span data-testid={ `${index}-order-status` }>
                  {order.status}
                </span>
                <hr />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdmOrders;
