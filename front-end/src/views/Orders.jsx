import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { OrderClient } from '../components';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchAPIfor } from '../services';

export default function Orders() {
  const { productsDispatch, productState } = useContext(GlobalContext);

  useEffect(() => {
    fetchAPIfor('/sale').then(({ sales }) => {
      productsDispatch({ type: actionType.REQUEST_SALES, payload: sales });
    }).catch(() => {
      productsDispatch({ type: actionType.USER_INVALID });
    });
  }, [productsDispatch]);

  if (!productState.isUserValid) return <Redirect to="/" />;

  return (
    <div>
      <TopBar title="Meus Pedidos" />
      {
        productState.sales.map((order, index) => (
          <OrderClient order={ order } index={ index } key={ index } />
        ))
      }
    </div>
  );
}
