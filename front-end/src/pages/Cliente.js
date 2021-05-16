import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ComponentProducts from '../components/Products';

const Cliente = () => {
  const TITLE = 'TryBeer';
  return (
    <div className="container-register">
      <Header title={ TITLE } />
      <Menu />
      <div>
        <ComponentProducts />
      </div>
    </div>
  );
};

export default Cliente;
