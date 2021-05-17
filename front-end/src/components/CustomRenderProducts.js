import React from 'react';
import { Card } from 'semantic-ui-react';

import CustomProductCard from './CustomProductCard';
import { getProduct } from '../helpers/localStorage';

const CustomRenderProducts = () => {
  const products = getProduct();
  return (
    <Card.Group
      stackable="true"
      style={ { padding: 10 } }
    >
      {products
      && products.map((beer, index) => (
        <CustomProductCard key={ beer.id } index={ index } beer={ beer } />
      ))}
    </Card.Group>
  );
};

export default CustomRenderProducts;
