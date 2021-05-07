import React from 'react';
import Header from '../../components/Header';
import AuthVerification from '../../components/AuthVerification';

const Products = () => {
  AuthVerification();

  return (
    <Header title="TryBeer" />
  );
};

export default Products;
