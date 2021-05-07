import React from 'react';
import { Header } from 'semantic-ui-react';
import CustomTopMenu from '../components/CustomTopMenu';

function Products() {
  return (
    <Header as="h1" color="orange" textAlign="center">
      <CustomTopMenu />
      <div data-testid="top-title">
        TryBeer
      </div>
    </Header>
  );
}

export default Products;
