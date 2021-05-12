import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Sidebar, Button } from 'semantic-ui-react';

import AdminCardDetails from './AdminCardDetails';

import * as API from '../helpers/apiHelper';
import * as STORAGE from '../helpers/localStorageHelper';

function AdminDetailsComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});
  const [status, setStatus] = useState('Pendente');
  const { id } = useParams();

  useEffect(() => {
    if (STORAGE.getUser() !== null) {
      API.fetchOrderById(id).then((saleResponse) => {
        setSale(saleResponse);
        console.log(saleResponse);
        setIsLoading(false);
      });
    }
  }, [id, status]);

  const handleClick = async () => {
    await API.fetchChangeStatus(id);
    setStatus('Entregue');
  };

  const showStatus = (string) => (string === 'pendente'
    ? string.replace('p', 'P')
    : string.replace('e', 'E'));

  const renderLoading = () => <h1>LOADING...</h1>;

  const renderProductList = () => sale.map((s, index) => (
    <AdminCardDetails key={ s.sale_id } sale={ s } index={ index } />
  ));

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  if (isLoading) return renderLoading();

  return (
    <Sidebar.Pusher>
      <Segment basic>
        <span data-testid="order-number">{`Pedido ${id} - `}</span>
        <span data-testid="order-status">
          {showStatus(sale[0].status)}
        </span>
        {renderProductList()}
        <span data-testid="order-total-value">
          {`R$ ${sale[0].total_price.replace('.', ',')}`}
        </span>
        {sale[0].status === 'pendente' && (
          <Button data-testid="mark-as-delivered-btn" onClick={ handleClick }>
            Marcar como entregue
          </Button>
        )}
      </Segment>
    </Sidebar.Pusher>
  );
}

export default AdminDetailsComponent;
