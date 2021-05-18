import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchOrders } from '../actions';
import OrderCard from '../components/OrderCard';

export default function Orders() {
  const ordersList = useSelector(( { order } ) => order);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const { isLoading, order, error } = ordersList;
  // const sortedOrders = order.sort((a, b) => a.id - b.id);
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(user.email, user.token));
    }
  ,[dispatch]);

  return (
    <>
    {console.log(ordersList)}
      <Header title="Meus pedidos" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { (error || !user) && setShouldRedirect('/login')
        && localStorage.removeItem('user') }
      {/* { isLoading === true ? 'Carregando...' : sortedOrders
        .map((item, i) => <OrderCard key={ i } order={ item } position={ i } />) } */}
    </>
  );
}
