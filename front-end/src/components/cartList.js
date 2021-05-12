import React from 'react';
import { getCartItems, getCartTotalPrice, deleteFromCart } from '../utils/localStorage';

function CartList(props) {
  const {
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
  } = props;
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
  cart: PropTypes.Array.isRequired,
  setCart: PropTypes.func.isRequired,
  totalCartPrice: PropTypes.number.isRequired,
  setTotalCartPrice: PropTypes.func.isRequired,
};

export default CartList;
