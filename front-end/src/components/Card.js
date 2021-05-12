import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import numbers from '../helpers/Numbers';

const Card = ({ beer, index, priceTotal, setPriceTotal }) => {
  const [quantity, setQuantity] = useState(0);

  const setInQuantity = async (value) => {
    setQuantity(value);
    const newPriceTotal = { ...priceTotal, [index]: (value * beer.preco) };
    localStorage.setItem('productPriceTotals', JSON.stringify(newPriceTotal));
    setPriceTotal(newPriceTotal);
  };

  return (
    <div
      key={ beer.nome }
      // data-testid={  }
      className="product-item-container"
    >
      <img
        data-testid={ `${index}-product-img` }
        src={ beer.imagem }
        alt={ beer.nome }
      />
      <h3 data-testid={ `${index}-product-name` }>{beer.nome}</h3>
      <p data-testid={ `${index}-product-price` }>
        { `R$ ${beer.preco.replace('.', ',')}` }
      </p>
      <div>
        Quantidade
        <p data-testid={ `${index}-product-qtd` }>
          {priceTotal[index] / beer.preco || quantity}
        </p>
      </div>
      <button
        type="button"
        data-testid={ `${index}-product-plus` }
        onClick={ () => setInQuantity(quantity + numbers.UM) }
      >
        +
      </button>
      <button
        type="button"
        data-testid={ `${index}-product-minus` }
        onClick={ () => {
          if (quantity) setInQuantity(quantity - numbers.UM);
          else setInQuantity(numbers.ZERO);
        } }
      >
        -
      </button>
    </div>
  );
};

Card.propTypes = {
  beer: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  priceTotal: PropTypes.number.isRequired,
  setPriceTotal: PropTypes.func.isRequired,
};

export default Card;
