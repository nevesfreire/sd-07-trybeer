import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStorage,
  setStorage,
  calculateTotalProductsPrice } from '../services/localStorage';
import { Creators } from '../store/ducks/reducers/clientInfo';

function Card({ product }) {
  const [productQuantity, setProductQuantity] = useState(0);

  const { url_image: urlImage, name, price, id, quantity } = product;

  useEffect(() => {
    if (quantity) setProductQuantity(quantity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { changeTotalPrice } = Creators;

  const dispatch = useDispatch();

  const setCart = (newQuantity) => {
    const cart = getStorage('cart');
    // const totalProductPrice = Math.round((Number(price) * 100) * newQuantity) / 100;
    const newCart = cart.map((element) => (element.id === id
      ? { ...element, quantity: newQuantity } : element));
    const updateTotalPrice = calculateTotalProductsPrice(newCart);
    dispatch(changeTotalPrice(updateTotalPrice));
    setStorage('cart', newCart);
  };

  const changeQuantity = (operation) => {
    if (operation === 'minus' && productQuantity > 0) {
      const newQuantity = productQuantity - 1;
      setProductQuantity(newQuantity);
      setCart(newQuantity);
    }
    if (operation === 'plus') {
      const newQuantity = productQuantity + 1;
      setProductQuantity(newQuantity);
      setCart(newQuantity);
    }
    return null;
  };

  return (
    <div>
      <img
        data-testid={ `${id - 1}-product-img` }
        src={ urlImage }
        alt={ name }
      />
      <h5
        data-testid={ `${id - 1}-product-price` }
      >
        { `R$ ${price}` }
      </h5>
      <h6
        data-testid={ `${id - 1}-product-name` }
      >
        { name }

      </h6>
      <button
        type="button"
        data-testid={ `${id - 1}-product-minus` }
        onClick={ () => changeQuantity('minus') }
      >
        -
      </button>
      <span
        data-testid={ `${id - 1}-product-qtd` }
      >
        { productQuantity }

      </span>
      <button
        type="button"
        data-testid={ `${id - 1}-product-plus` }
        onClick={ () => changeQuantity('plus') }
      >
        +
      </button>
    </div>
  );
}

export default Card;
