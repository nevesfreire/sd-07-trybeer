import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button, Card, Media, Image, Heading } from 'react-bulma-components';

function ProductCard({ item, index }) {
  const { name, urlImage } = item;
  let { price } = item;
  price = price.split('.').join(',');
  const [qtt, setQtt] = useState(0);

  const sumQtt = () => {
    setQtt(qtt + 1);
  };
  const subQtt = () => {
    const zero = 0;
    if (qtt > zero) setQtt(qtt - 1);
  };

  return (
    <div>
      <Card>
        <Card.Content>
          <Media.Item renderAs="figure" align="left">
            <Image
              data-testid={ `${index}-product-img` }
              size={ 64 }
              alt="64x64"
              src={ urlImage }
            />
          </Media.Item>
          <Media.Item>
            <Heading
              data-testid={ `${index}-product-name` }
              size={ 4 }
            >
              { name }
            </Heading>
            <Heading subtitle size={ 6 } data-testid={ `${index}-product-price` }>
              { `R$ ${price}` }
            </Heading>
          </Media.Item>
        </Card.Content>
        <Button
          data-testid={ `${index}-product-plus` }
          onClick={ () => sumQtt() }
        >
          <FontAwesomeIcon icon={ faPlus } fixedWidth />
        </Button>
        <div
          data-testid={ `${index}-product-qtd` }
        >
          { qtt }
        </div>
        <Button
          data-testid={ `${index}-product-minus` }
          onClick={ () => subQtt() }
        >
          <FontAwesomeIcon icon={ faMinus } fixedWidth />
        </Button>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
