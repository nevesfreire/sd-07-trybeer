import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getStorage,
  setStorage,
  calculateTotalProductsPrice } from '../../services/localStorage';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import format from '../../util/format';

function ListItem({ product: { name, price, id, quantity } }, index) {
  const { changeTotalPrice } = Creators;

  const dispatch = useDispatch();

  const removeFromCart = () => {
    const cart = getStorage('cart');
    const newCart = cart.filter((element) => element.id !== id);
    const updateTotalPrice = calculateTotalProductsPrice(newCart);
    dispatch(changeTotalPrice(updateTotalPrice));
    setStorage('cart', newCart);
  };

  const totalProductPrice = () => Math.round((Number(price) * 100) * quantity) / 100;

  return (
    <li>
      <h6 data-testid={ `${index}-product-qtd-input` }>{ quantity }</h6>
      <h6 data-testid={ `${index}-product-name` }>{ name }</h6>
      <h6 data-testid={ `${index}-product-unit-price` }>{ format(price) }</h6>
      <h6 data-testid={ `${index}-product-total-value` }>{ format(totalProductPrice) }</h6>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ () => removeFromCart() }
      >
        X
      </button>
    </li>
  );
}

export default ListItem;

ListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    url_image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
