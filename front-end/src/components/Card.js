import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../actions';

export default function Card({ product, position }) {
  const INITIAL_VALUE = 0;
  const ROUNDING_OPTION = 2;
  const ADD_ITEM = 1;
  const REMOVE_ITEM = -1;
  const cartList = useSelector(({ cart }) => cart.cart);
  const dispatch = useDispatch();

  const manageQuantity = (productFound, cart) => {
    if (productFound.quantity !== 0) {
      const filteredCart = cart.filter((item) => item.id !== productFound.id);
      dispatch(update([...filteredCart, productFound]));
    } else {
      const filteredCart = cart.filter((item) => item.id !== productFound.id);
      dispatch(update(filteredCart));
    }
  };

  const getNewQuantity = (newProduct) => {
    const cartCopy = [...cartList];
    const productFound = cartCopy.find((item) => item.id === newProduct.id);
    if (productFound) {
      manageQuantity(newProduct, cartCopy);
    } else {
      const newCart = [...cartList, newProduct];
      dispatch(update(newCart));
    }
  };

  const getValue = (id) => {
    const isPresent = cartList.find((item) => item.id === id);
    if (isPresent) return isPresent.quantity;
    return INITIAL_VALUE;
  };

  const manageNewProductInfo = (value, productSelected) => {
    const { id, name, price } = productSelected;
    const newProductInfo = {
      id,
      name,
      price,
      quantity: 0,
      totalPrice: 0,
    };
    newProductInfo.quantity = getValue(productSelected.id) + value;
    newProductInfo.totalPrice = value * price;
    getNewQuantity(newProductInfo);
  };

  const handleClick = (type, value, productSelected) => {
    if ((getValue(productSelected.id) !== 0 && type === 'remove')
      || type === 'add') {
      manageNewProductInfo(value, productSelected);
    }
  };

  return (
    <div>
      <img
        data-testid={ `${position}-product-img` }
        src={ product.url_image }
        alt={ `Product ${product.name} ${position}` }
        height="50px"
      />
      <h4 data-testid={ `${position}-product-name` }>{ product.name }</h4>
      <span data-testid={ `${position}-product-price` }>
        { `R$ ${Number(product.price).toFixed(ROUNDING_OPTION)}` }
      </span>
      <div>
        <button
          type="button"
          data-testid={ `${position}-product-minus` }
          onClick={ () => handleClick('remove', REMOVE_ITEM, product) }
        >
          -
        </button>
        <p
          data-testid={ `${position}-product-qtd` }
        >
          { getValue(product.id) }
        </p>
        <button
          type="button"
          data-testid={ `${position}-product-plus` }
          onClick={ () => handleClick('add', ADD_ITEM, product) }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.number.isRequired,
};
