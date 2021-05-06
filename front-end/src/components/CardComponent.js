import React from 'react';
import PropTypes from 'prop-types';

import 'semantic-ui-css/semantic.min.css';
import { Card, Image, Button } from 'semantic-ui-react';

function CardComponent({ product }) {
  const { id, name, price, url_image: urlImage } = product;

  return (
    <Card>
      <Image src={ urlImage } wrapped ui={ false } />
      <Card.Content>
        <Card.Header>{name}</Card.Header>

        <Card.Description data-testid={ `${id}-product-price` }>
          <span>R$</span>
          {price}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Button>+</Button>
        <span>QTD</span>
        <Button>-</Button>
      </Card.Content>
    </Card>
  );
}

CardComponent.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

export default CardComponent;
