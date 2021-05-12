import React from 'react';
import PropTypes from 'prop-types';
import { getCartItems, getCartTotalPrice, deleteFromCart } from '../utils/localStorage';

function CartList(props) {
  const {
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
  } = props;
  console.log(cart);
  return (
    <>
      { totalCartPrice < 1 && <h4>Não há produtos no carrinho</h4> }
      <ul>
        {totalCartPrice > 0 && cart.map((cartItems, index) => {
          const totalPrice = cartItems.price * cartItems.quantity.toFixed(2);
          return (
            <li key={ cartItems.id }>
              <p data-testid={ `${index}-product-qtd-input` }>{cartItems.quantity}</p>
              <p data-testid={ `${index}-product-name` }>
                -
                {cartItems.name}
              </p>
              <p data-testid={ `${index}-product-unit-price` }>
                (R$
                {`(R$ ${cartItems.price} un)`.replace('.', ',')}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${totalPrice.toFixed(2)}`.replace('.', ',')}
              </p>
              <button
                type="button"
                data-testid={ `${index}-removal-button` }
                onClick={ () => {
                  deleteFromCart(cartItems.id);
                  setCart(getCartItems());
                  setTotalCartPrice(getCartTotalPrice());
                } }
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <p data-testid="order-total-value">
        {`Total: R$ ${totalCartPrice}`.replace('.', ',')}
      </p>
    </>
  );
}

CartList.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  setCart: PropTypes.func.isRequired,
  totalCartPrice: PropTypes.node.isRequired,
  setTotalCartPrice: PropTypes.func.isRequired,
};

export default CartList;
