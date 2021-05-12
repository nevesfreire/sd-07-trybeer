import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Sidebar } from 'semantic-ui-react';

import OrderDetailsCardComponent from './OrderDetailsCardComponent';

import * as API from '../../helpers/apiHelper';
import * as STORAGE from '../../helpers/localStorageHelper';

function OrderDetailsComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (STORAGE.getUser() !== null) {
      API.fetchOrderById(id).then((saleResponse) => {
        setSale(saleResponse);
        setIsLoading(false);
      });
    }
  }, [id]);

  const convertToDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/0${month}`;
  };

  const renderLoading = () => <h1>LOADING...</h1>;

  const renderProductList = () => sale.map((s, index) => (
    <OrderDetailsCardComponent key={ s.sale_id } sale={ s } index={ index } />
  ));

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  if (isLoading) return renderLoading();

  return (
    <Sidebar.Pusher>
      <Segment basic>
        <span data-testid="order-number">{`Pedido ${id}`}</span>
        {' '}
        <span data-testid="order-date">
          {convertToDate(new Date(sale[0].sale_date))}
        </span>
        {renderProductList()}
        <span data-testid="order-total-value">
          {`R$ ${sale[0].total_price.replace('.', ',')}`}
        </span>
      </Segment>
    </Sidebar.Pusher>
  );
}

export default OrderDetailsComponent;
