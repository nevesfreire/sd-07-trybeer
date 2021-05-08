import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

import { Form, Button, Card, Media, Image, Heading } from 'react-bulma-components';

const { Control, Field, Input } = Form;

function ProductCard({ item, index }) {
  const { name, url_image } = item;
  let price = item.price;
  price = price.split('.').join(',');
  const [qtt, setQtt] = useState(0);

  const sumQtt = () => {
    setQtt(qtt + 1);
  };
  const subQtt = () => {
    const zero = 0;
    if(qtt > zero) setQtt(qtt - 1);
  };

  return (<>
    <Card>
      <Card.Content>
        <Media>
          <Media.Item renderAs="figure" align="left">
            <Image
              data-testid={`${index}-product-img`}
              size={64}
              alt="64x64"
              src= { url_image }
            />
          </Media.Item>
          <Media.Item>
            <Heading
              data-testid={`${index}-product-name`}
              size={4}
            >{ name }</Heading>
            <Heading subtitle size={6} data-testid={`${index}-product-price`} >
              { `R$ ${price}` }
            </Heading>
          </Media.Item>
        </Media>
      </Card.Content>
      <Button
        type="button"
        data-testid={`${index}-product-plus`}
        onClick={ () => sumQtt() }
      >
        <FontAwesomeIcon icon={faPlus} fixedWidth />
      </Button>
      <div
        data-testid={`${index}-product-qtd`}
      >
        { qtt }
      </div>
      <Button
        type="button"
        data-testid={`${index}-product-minus`}
        onClick={ () => subQtt() }
      >
        <FontAwesomeIcon icon={faMinus} fixedWidth />
      </Button>
    </Card>
  </>)
};

export default ProductCard;