import React, { useContext, useEffect } from 'react';
import { ScreenProducts } from '../components';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchProducts } from '../services';

export default function Products() {
  const { productsDispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchProducts().then(({ products }) => {
      productsDispatch({ type: actionType.REQUEST_PRODUCTS, payload: products });
    });
  }, [productsDispatch]);

  return (
    <div>
      <TopBar />
      <ScreenProducts />
    </div>
  );
}
