import React from 'react';
import MenuBurger from '../../components/Menu';

const Products = () => (
  <div>
    <header style={ { display: 'flex', justifyContent: 'center', background: 'gray' } }>
      <MenuBurger />
      <h1 data-testid="top-title">Trybeer</h1>
    </header>
    <h2 style={ { display: 'flex', justifyContent: 'center' } }>Produtos</h2>
  </div>
);

export default Products;
