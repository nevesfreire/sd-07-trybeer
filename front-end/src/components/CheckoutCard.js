import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import numbers from '../helpers/Numbers';

const CheckoutCard = ({ cartItem, index, priceTotal, setPriceTotal }) => {
  const [quantity, setQuantity] = useState(0);

  const setInQuantity = async (value) => {
    setQuantity(value);
    const newPriceTotal = { ...priceTotal, [index]: value * cartItem.preco };
    localStorage.setItem('productPriceTotals', JSON.stringify(newPriceTotal));
    setPriceTotal(newPriceTotal);
  };

  return (
    <div
      key={ cartItem.nome }
      // data-testid={  }
      className="product-item-container"
    >
      <h3 data-testid={ `${index}-product-name` }>{cartItem.nome}</h3>
      <p data-testid={ `${index}-product-unit-price` }>
        {/* { `R$ ${cart.preco.replace('.', ',')}` } */}
      </p>
      <div>
        Quantidade
        <p data-testid={ `${index}-product-qtd-input` }>
          {priceTotal[index] / cartItem.preco || quantity}
        </p>
      </div>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ () => setInQuantity(quantity + numbers.UM) }
      >
        retirar
      </button>
    </div>
  );
};

CheckoutCard.propTypes = {
  cartItem: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  priceTotal: PropTypes.number.isRequired,
  setPriceTotal: PropTypes.func.isRequired,
};

export default CheckoutCard;
