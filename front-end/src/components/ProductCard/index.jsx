import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';

export default function ProductCard(props) {
  const { product, index } = props;
  const { name, price } = product;
  const imageSrc = product.url_image;

  const [quantity, setQuantity] = useState(0);

  const plus = () => setQuantity(quantity + 1);
  const minus = () => setQuantity(quantity - 1);

  return (
    <Card style={ { width: '18rem' } }>
      <Card.Img
        variant="top"
        src={ imageSrc }
        data-testid={ `${index}-product-img` }
      />
      <Card.Body>
        <Card.Title
          data-testid={ `${index}-product-name` }
        >
          { name }
        </Card.Title>
        <Card.Text data-testid={ `${index}-product-price` }>
          {`R$ ${price.toString().replace('.', ',')}`}
        </Card.Text>
        <Button
          variant="primary"
          data-testid={ `${index}-product-minus` }
          onClick={ minus }
          id="num"
        >
          -
        </Button>
        <input
          readOnly
          type="text"
          value={ quantity }
          data-testid={ `${index}-product-qtd` }
        />
        <Button
          variant="primary"
          data-testid={ `${index}-product-plus` }
          onClick={ plus }
          id="num"
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
