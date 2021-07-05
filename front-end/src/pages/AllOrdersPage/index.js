import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../../context';

import { Order, ClientMenu } from '../../components';

import api from '../../services/api';

import './styles.css';

function AllOrders() {
  const { orders, setOrders } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')) || { name: null, role: null };

  useEffect(() => {
    if (!user.name) history.push('/login');
    setIsLoading(true);
    api.getAllOrders(user.token).then((response) => {
      if (response.error) {
        setMessage('Nenhum pedido encontrado');
      } else {
        setOrders(response.message);
      }
    });
    setIsLoading(false);
  }, [history, setOrders, user.name, user.token]);

  return (
    <>
      <ClientMenu />
      <section className="orders-wrapper">
        <h1 data-testid="top-title">Meus Pedidos</h1>
        <strong>{ message }</strong>
        <div className="orders-container">
          {
            isLoading
              ? <h1 className="loading">Carregando</h1>
              : orders.map((item, index) => (
                <Order key={ index } order={ item } index={ index } />
              ))
          }
        </div>
      </section>
    </>
  );
}

export default AllOrders;
