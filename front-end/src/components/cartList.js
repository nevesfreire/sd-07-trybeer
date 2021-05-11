import React, { useEffect, useState } from 'react';
import { getCartItems, getCartTotalPrice, deleteFromCart } from '../utils/localStorage'

function CartList(props) {
  const {
    cart,
    setCart,
    totalCartPrice,
    setTotalCartPrice,
  } = props;
  let stringTotal = `${totalCartPrice}`;
  const ZERO = 0;
  if (totalCartPrice > ZERO) {
    stringTotal = stringTotal.replace('.', ',');
  }
  return(
    <ul>
      {cart.map((cartItems, index) => {
        const totalPrice = cartItems.price * cartItems.quantity.toFixed(2);
        return(
          <li key={cartItems.id}>
            <p data-testid={`${index}-product-qtd-input`}>{cartItems.quantity}</p>
            <p data-testid={`${index}-product-name`}>-{cartItems.name}</p>
            <p data-testid={`${index}-product-unit-price`}>R$ {cartItems.price} un</p>
            <p data-testid={`${index}-product-total-value`}>R$ {totalPrice}</p>
            <button
              data-testid={`${index}-removal-button`}
              onClick={() =>{
                deleteFromCart(cartItems.id);
                setCart(getCartItems());
                setTotalCartPrice(getCartTotalPrice());
              }}
            >
              X
            </button>
          </li>
        );
      })}
      <h2 data-testid="order-total-value">Total: R$ {stringTotal}</h2>
    </ul>
  );
}


export default CartList;