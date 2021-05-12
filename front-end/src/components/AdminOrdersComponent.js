import React, { useState, useEffect } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';
import { getOrders } from '../helpers/apiHelper';

function AdminOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderLoading = () => <h1>LOADING...</h1>;

  useEffect(() => {
    getOrders().then((data) => {
      console.log('chamado', data);
      setOrders(data.sales);
      setIsLoading(false);
    });
    // setOrders(ordersReturn.sales);
    // setIsLoading(false);
  }, []);

  const renderOrderList = () => orders.map((order, index) => {
    const { id, delivery_address, delivery_number, total_price, status } = order;
    return (
      <div key={ id }>
        <p data-testid={ `${index}-order-number` }>
          Pedido {id}
        </p>
        <p data-testid={ `${index}-order-address` }>
          {`${delivery_address}, ${delivery_number}`}
        </p>
        <p data-testid={ `${index}-order-total-value` }>
          R$
          {' '}
          {total_price.replace('.', ',')}
        </p>
        <p data-testid={ `${index}-order-status` }>{status}</p>
        <br />
      </div>
    );
  });

  if (getUser() === null || getUser().role !== 'administrator') {
    return <Redirect to="/login" />;
  }

  return (
    <Sidebar.Pusher>
      <Segment basic>{isLoading ? renderLoading() : renderOrderList()}</Segment>
    </Sidebar.Pusher>
  );
}

export default AdminOrdersComponent;
