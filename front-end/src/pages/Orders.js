import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchOrders } from '../actions';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const ordersList = useSelector(({ orders }) => orders);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const { isLoading, orders, error } = ordersList;
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || error) {
      return setShouldRedirect('/login');
    }
    dispatch(fetchOrders(user.token));
  }, [dispatch]);

  return (
    <>
      <Header title="Meus Pedidos" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { isLoading === true ? <p>Carregando...</p> : orders
        .map((item, i) => <OrderCard key={ i } order={ item } position={ i } />) }
    </>
  );
}
