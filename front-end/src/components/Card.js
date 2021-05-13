import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import numbers from '../helpers/Numbers';

const Card = ({ beer, cart, setCart, index }) => {
  const { id, preco, imagem, nome } = beer;
  const [quantity, setQuantity] = useState(0);

  const productOfCart = cart.find((prod) => prod.id === id) || {
    id, preco, imagem, nome,
  };

  const setInQuantity = async (value) => {
    setQuantity(value);
    let newCart = [...cart];

    newCart = newCart.filter((cart1) => cart1.id !== id);
    if (value) {
      newCart = [
        ...newCart,
        {
          ...productOfCart,
          total: (value * beer.preco),
          quantidade: value,
        },
      ];
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <div
      key={ nome }
      className="product-item-container"
    >
      <img
        data-testid={ `${index}-product-img` }
        src={ imagem }
        alt={ nome }
      />
      <h3 data-testid={ `${index}-product-name` }>{ nome }</h3>
      <p data-testid={ `${index}-product-price` }>
        { `R$ ${preco.replace('.', ',')}` }
      </p>
      <div>
        Quantidade
        <p data-testid={ `${index}-product-qtd` }>
          {productOfCart.total / preco || quantity}
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
  index: PropTypes.number.isRequired,
  beer: PropTypes.shape().isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Card;
