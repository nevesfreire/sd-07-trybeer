import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import ProductsList from '../../components/ProductsList';
import AuthVerification from '../../components/AuthVerification';

const Products = () => {
  AuthVerification();

  return (
    <Container>
      <Header title="TryBeer" />
      <ProductsList />
    </Container>
  );
};
export default Products;
