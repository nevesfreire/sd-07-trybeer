import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchOrders } from '../actions';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const ordersList = useSelector(({ order }) => order);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const { isLoading, order, error } = ordersList;
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || error) {
      setShouldRedirect('/login');
    } else {
      dispatch(fetchOrders(user.token));
    }
  }, []);

  return (
    <>
      <Header title="Meus Pedidos" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { isLoading === true ? 'Carregando...' : order
        .map((item, i) => <OrderCard key={ i } order={ item } position={ i } />) }
    </>
  );
}
