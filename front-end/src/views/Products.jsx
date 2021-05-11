import React, { useCallback, useContext, useEffect } from 'react';
import TopBar from '../components/menuSideBar/Menu';
import { GlobalContext, actionType, fetchProducts } from '../services';

export default function Products() {
  const { productsDispatch, products: test } = useContext(GlobalContext);

  const updateProducts = useCallback(() => {
    fetchProducts().then(({ products }) => {
      productsDispatch({ type: actionType.REQUEST_PRODUCTS, payload: products });
    });
  }, [productsDispatch]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  console.log(test);
  return (
    <div>
      <TopBar />
      <h1>Cliente-produtos</h1>
    </div>
  );
}
