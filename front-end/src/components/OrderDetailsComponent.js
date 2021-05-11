import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Sidebar } from 'semantic-ui-react';

import OrderCardComponent from './OrderCardComponent';

import * as API from '../helpers/apiHelper';
import * as STORAGE from '../helpers/localStorageHelper';

function OrderDetailsComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});

  useEffect(() => {
    API.fetchOrderById().then((saleResponse) => {
      setSale(saleResponse);
      setIsLoading(false);
    });
  }, []);
  const renderLoading = () => <h1>LOADING...</h1>;
  if (STORAGE.getUser() === null) return <Redirect to="/login" />;
  if (!isLoading) {
    const rendersalesList = () => userSales.map((sale) => (
      <OrderCardComponent key={ sale.id } sale={ sale } />
    ));

    return (
      <Sidebar.Pusher>
        <Segment basic>
          { rendersalesList() }
        </Segment>
      </Sidebar.Pusher>
    );
  }
  return renderLoading();
}

export default OrderDetailsComponent;
