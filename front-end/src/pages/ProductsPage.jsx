import React from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import ProductsComponent from '../components/ProductsComponent';

function Products() {
  return (
    <>
      <HeaderBurguer titulo="TryBeer" />
      <ProductsComponent />
    </>
  );
}

export default Products;
