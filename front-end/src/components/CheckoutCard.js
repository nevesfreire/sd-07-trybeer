import React from 'react';
import { PropTypes } from 'prop-types';

const CheckoutCard = ({ cartItem, index, cart, setCart }) => {
  const removeCartItem = () => {
    const filteredCart = cart.filter((e) => e.id !== cartItem.id);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    setCart(filteredCart);
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
          {cartItem.quantidade}
        </p>
      </div>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ removeCartItem }
      >
        retirar
      </button>
    </div>
  );
};

CheckoutCard.propTypes = {
  cartItem: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  cart: PropTypes.number.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CheckoutCard;
