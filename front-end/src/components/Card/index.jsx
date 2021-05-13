import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getStorage, setStorage } from '../../services/localStorage';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import format from '../../util/format';
import styles from './styles.module.scss';

function Card({ product: { url_image: image, name, price, id, quantity } }) {
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    if (quantity) setProductQuantity(quantity);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { updateCart } = Creators;

  const dispatch = useDispatch();

  const setCart = useCallback((newQuantity) => {
    const cart = getStorage('cart');
    // const totalProductPrice = Math.round((Number(price) * 100) * newQuantity) / 100;
    const newCart = cart.map((element) => (element.id === id
      ? { ...element, quantity: newQuantity } : element));
    dispatch(updateCart(newCart));
    setStorage('cart', newCart);
  }, [dispatch, id, updateCart]);

  const changeQuantity = useCallback((operation) => {
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
  }, [productQuantity, setCart]);

  return (
    <div className={ styles.card }>
      <div className={ styles.cardImg }>
        <img
          data-testid={ `${id - 1}-product-img` }
          src={ image }
          alt="img do produto"
        />
      </div>
      <hr />
      <div className={ styles.cardInfos }>
        <h5 data-testid={ `${id - 1}-product-name` }>{ name }</h5>
        <h6 data-testid={ `${id - 1}-product-price` }>{ format(price) }</h6>
        <div className={ styles.buttons }>
          <button
            type="button"
            data-testid={ `${id - 1}-product-minus` }
            onClick={ () => changeQuantity('minus') }
          >
            -
          </button>
          <span data-testid={ `${id - 1}-product-qtd` }>{ productQuantity }</span>
          <button
            type="button"
            data-testid={ `${id - 1}-product-plus` }
            onClick={ () => changeQuantity('plus') }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    url_image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
