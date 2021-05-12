import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function Details({ item, index }) {
  const [productQtd, setProductQtd] = useState('');
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      setProductQtd(`${index}-product-qtd`);
    } else {
      setProductQtd(`${index}-product-qtd-input`);
    }
  }, []);

  return (
    <div
      className="item-details"
      key={ index }
    >
      <p
        className="item-quantity"
        data-testid={ productQtd }
      >
        { item.quantity }
      </p>
      <p
        data-testid={ `${index}-product-name` }
      >
        {item.name}
      </p>
      <p
        data-testid={ `${index}-order-unit-price` }
      >
        (
        {`R$ ${parseFloat(item.price)
          .toFixed(2)
          .toString()
          .replace('.', ',')}`}
        )
      </p>
      <div>
        Subtotal:
        <p
          data-testid={ `${index}-product-total-value` }
        >
          R$
          {' '}
          {
            (parseFloat(item.price) * parseFloat(item.quantity))
              .toFixed(2)
              .toString()
              .replace('.', ',')
          }
      </p>
      </div>
      {/*
      <p
        data-testid={ `${index}-product-qtd` }
      >
        {item.quantity}
      </p> */}
    </div>
  );
}

Details.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Details;
