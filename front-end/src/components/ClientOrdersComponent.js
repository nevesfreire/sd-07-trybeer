import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Sidebar } from 'semantic-ui-react';

import OrderCardComponent from './OrderCardComponent';

import * as API from '../helpers/apiHelper';
import * as STORAGE from '../helpers/localStorageHelper';

function ClientOrdersComponent() {
  const [sales, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.fetchOrders().then((data) => {
      setOrders(data.sales);
      setIsLoading(false);
    });
  }, []);

  const rendersalesList = () => sales.map((sale) => (
    <OrderCardComponent key={ sale.id } sale={ sale } />
  ));

  const renderLoading = () => <h1>LOADING...</h1>;

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  return (
    <Sidebar.Pusher>
      <Segment basic>
        {isLoading ? renderLoading() : rendersalesList()}
      </Segment>
    </Sidebar.Pusher>
  );
}

export default ClientOrdersComponent;
