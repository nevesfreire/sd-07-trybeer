import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ComponentProducts from '../components/Products';
import '../css/client.css';

const Cliente = () => (
  <div className="container-register">
    <Header title="TryBeer" />
    <div className="container-body">
      <Menu />
      <ComponentProducts />
    </div>
  </div>
);

export default Cliente;
