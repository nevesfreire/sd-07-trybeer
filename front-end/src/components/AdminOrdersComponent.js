import React, { useState, useEffect } from 'react';
import { Segment, Sidebar } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';
import { fetchOrders } from '../helpers/apiHelper';

function AdminOrdersComponent() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const renderLoading = () => <h1>LOADING...</h1>;

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
      setIsLoading(false);
    });
  }, []);

  const showStatus = (string) => (string === 'pendente'
    ? string.replace('p', 'P')
    : string.replace('e', 'E'));

  const renderOrderList = () => orders.map((order, index) => {
    const {
      id,
      delivery_address: deliveryAddress,
      delivery_number: deliveryNumber,
      total_price: totalPrice,
      status,
    } = order;
    return (
      <Link to={ `/admin/orders/${id}` } key={ index }>
        <div>
          <p data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</p>
          <p data-testid={ `${index}-order-address` }>
            {`${deliveryAddress}, ${deliveryNumber}`}
          </p>
          <p data-testid={ `${index}-order-total-value` }>
            {`R$ ${totalPrice.replace('.', ',')}`}
          </p>
          <p data-testid={ `${index}-order-status` }>{showStatus(status)}</p>
          <br />
        </div>
      </Link>
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
