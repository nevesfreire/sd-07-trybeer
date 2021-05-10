import React from 'react';
import ComponentBeers from './Beers';

const ComponentProducts = () => {
  const title = 'Products';
  return (
    <div>
      <h1>{title}</h1>
      <ComponentBeers />
    </div>
  );
};

export default ComponentProducts;
