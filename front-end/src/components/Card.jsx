import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { getStorage, setStorage } from '../services/localStorage';
import { changeTotalPrice } from '../actions';

function Card(product) {
  const ZERO = 0;
  const ONE = 1;

  const [quantity, setQuantity] = useState(ZERO);

  const dispatch = useDispatch();
  
  const { url_image, name, price } = product;

  const setCart = () => {
    const cart = getStorage('cart');
    const totalProductPrice = price * quantity;
    cart.forEach(product => {
       if(product.name === name) {
         product.quantity = quantity;
       }
    });
    cart.totalPrice += totalProductPrice;
    dispatch(changeTotalPrice(cart.totalPrice));
    setStorage('cart', cart);
  }

  const changeQuantity = (operation) => {
    if (operation === 'minus' && quantity > ZERO) {
      setQuantity(quantity - ONE);
      setCart();
    }
    if (operation === 'plus') {
      setQuantity(quantity + ONE);
      setCart();
    }
  }

  return (
    <div>
      <img src={ url_image } />
      <h5>{ price }</h5>
      <h6>{ name }</h6>
      <button
        type="button"
        onClick={ changeQuantity("plus") }
      >
        -
      </button>
      <span>{ quantity }</span>
      <button
        type="button"
        onClick={ changeQuantity("minus") }
      >
        +
      </button>
    </div>
  )
}

export default Card;
