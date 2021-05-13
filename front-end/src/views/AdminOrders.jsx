import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { GlobalContext, actionType, fetchAPIfor } from '../services';
import SideBarAdmin from '../components/sideBarAdmin';
import Menu from './style/AdminOrders';
import { OrderAdmin } from '../components';

export default function AdminOrders() {
  const { productsDispatch, productState } = useContext(GlobalContext);

  useEffect(() => {
    fetchAPIfor('/order').then(({ orders }) => {
      productsDispatch({ type: actionType.REQUEST_ORDERS, payload: orders });
    }).catch(() => {
      productsDispatch({ type: actionType.USER_INVALID });
    });
  }, [productsDispatch]);

  if (!productState.isUserValid) return <Redirect to="/" />;

  return (
    <div>
      <Menu>
        <SideBarAdmin />
        {
          productState.orders.map((order, index) => (
            <OrderAdmin order={ order } index={ index } key={ index } />
          ))
        }
      </Menu>
    </div>
  );
}
