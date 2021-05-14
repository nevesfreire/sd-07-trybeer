import React from 'react';
import CustomProductCard from './CustomProductCard';
import { getProduct } from '../helpers/localStorage';
import { Card } from 'semantic-ui-react';

const CustomRenderProducts = () => {
  const products = getProduct();
  return (
    <Card.Group stackable='true'>
      {products &&
        products.map((beer, index) => (
          <CustomProductCard key={beer.id} index={index} beer={beer} />
        ))}
    </Card.Group>
  );
};

export default CustomRenderProducts;
