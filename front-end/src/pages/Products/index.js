import React from 'react';
import Header from '../../components/Header';
import ProductsList from '../../components/ProductsList';
import AuthVerification from '../../components/AuthVerification';

const Products = () => {
  AuthVerification();

  return (
    <>
      <Header title="TryBeer" />
      <ProductsList />
    </>
  );
};
export default Products;
