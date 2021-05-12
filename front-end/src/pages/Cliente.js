import React from 'react';
import Header from '../components/Header';

import Menu from '../components/Menu';
import ComponentProducts from '../components/Products';

const Cliente = () => (
  <div className="container-register">
    <Header title="TryBeer" />
    <Menu />
    <div>
      <ComponentProducts />
    </div>
  </div>
);

export default Cliente;
