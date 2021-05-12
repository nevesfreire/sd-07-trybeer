import React, { useEffect, useState } from 'react';
import { getCartItems, getCartTotalPrice, deleteFromCart } from '../utils/localStorage';

function CartList(props) {
  const {
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
  } = props;
  // let stringTotal = `${totalCartPrice}`;
  // const ZERO = 0;
  // if (totalCartPrice > ZERO) {
  //   stringTotal = stringTotal.replace('.', ',');
  // }
  console.log(totalCartPrice);
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
                {`${cartItems.price}`.replace('.', ',')}
                {' '}
                un)
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                R$
                {`${totalPrice.toFixed(2)}`.replace('.', ',')}
              </p>
              <button
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
        Total: R$
        {' '}
        {`${totalCartPrice}`.replace('.', ',')}
      </p>
    </>
  );
}

export default CartList;
