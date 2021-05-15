import React from 'react';
import Header from '../components/Header';

import Menu from '../components/Menu';
import ComponentProducts from '../components/Products';

const Cliente = (props) => {
  const { history } = props;
  return (
      <div className="container-register">
        <Header title="TryBeer" />
        <Menu path={ history } />
        <div>
          <ComponentProducts />
        </div>
    </div>
   );
  };

export default Cliente;
