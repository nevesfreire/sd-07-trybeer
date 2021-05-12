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
      console.log('chamado', data)
      setOrders(data.sales);
      setIsLoading(false);
    });
    // setOrders(ordersReturn.sales);
    // setIsLoading(false);
  }, []);

  const renderOrderList = () =>
    orders.map((order) => {
      const { id, delivery_address, delivery_number, total_price } = order;
      return (
        <div>
          <p>Pedido: {id}</p>
          <p>{`${delivery_address}, ${delivery_number}`}</p>
          <p>R${total_price}</p>
          <br></br>
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
