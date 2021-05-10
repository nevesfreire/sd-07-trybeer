import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, AdminCardOrder } from '../../components';
import { getStorage } from '../../services/localStorage';

function AdmOrders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const user = getStorage('user');
    if (!user) {
      history.push('/login');
    }
    const cart = getStorage('purchase');
    setOrders(cart);
  }, [history]);

  if (!orders) {
    return (
      <div>
        <Header data-testid="top-title">Meus Pedidos</Header>
      </div>
    );
  }

  return (
    <div>
      <Header data-testid="top-title">Meus Pedidos</Header>
      {orders.map((order, index) => (
        <AdminCardOrder key={ index } order={ order } index={ index } />
      ))}
    </div>
  );
}

export default AdmOrders;
