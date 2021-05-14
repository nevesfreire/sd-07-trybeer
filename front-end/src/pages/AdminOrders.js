import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchAdminOrders } from '../actions';
import AdminSidebar from '../components/AdminSidebar';
import AdminOrderCard from '../components/OrderCard';

export default function AdminOrders() {
  const ordersList = useSelector(({ adminOrders }) => adminOrders);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const { isLoadind, orders, error } = ordersList;
  const sortedOrders = orders.sort((a, b) => a.id - b.id);
  const deliveredOrders = sortedOrders.filter((order) => order.status === 'delivered');
  const pendingOrders = sortedOrders.filter((order) => order.status === 'pending');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  return (
    <>
      <h1>Pedidos Pendentes</h1>
      <AdminSidebar />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { (error || !user) && setShouldRedirect('/login')
        && localStorage.removeItem('user') }
      { isLoadind === true ? 'Carregando...'
        : (
          <div>
            <label htmlFor="AdminOrderCard">
              Pendentes
              { pendingOrders
                .map((item, i) => <AdminOrderCard key={ i } order={ item } pos={ i } />) }
            </label>
            <label htmlFor="AdminOrderCard">
              Entregue
              { deliveredOrders
                .map((item, i) => <AdminOrderCard key={ i } order={ item } pos={ i } />) }
            </label>
          </div>
        ) }
    </>
  );
}
