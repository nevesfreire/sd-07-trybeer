import React, { useState, useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../actions';

export default function Card({ product, position }) {
  const INITIAL_VALUE = 0;
  const ROUNDING_OPTION = 2;
  const ADD_ITEM = 1;
  const REMOVE_ITEM = -1;
  const cartList = useSelector(({ cart }) => cart);
  /*   const [cartQuantity, setCartQuantity] = useState(INITIAL_VALUE); */
  const dispatch = useDispatch();

  const manageQuantity = (productFound, cart) => {
    const amountToSplice = 1;
    if (productFound.quantity !== 0) {
      const newPosition = cart.findIndex((item) => item.id === productFound.id);
      cart.splice(newPosition, amountToSplice, productFound);
      /*       setCartQuantity(cart); */
      dispatch(update(cart));
    } else {
      const filteredCart = cart.filter((item) => item.id !== productFound.id);
      /*       setCartQuantity(filteredCart); */
      dispatch(update(filteredCart));
    }
  };

  const getNewQuantity = (newProduct) => {
    /*     const cartCopy = [...cartQuantity]; */
    const cartCopy = [...cartList];
    const productFound = cartCopy.find((item) => item.id === newProduct.id);
    if (productFound) {
      manageQuantity(productFound, cartCopy);
    } else {
      /*       const newCart = [...cartQuantity, newProduct]; */
      const newCart = [...cartList, newProduct];
      /*       setCartQuantity(newCart); */
      dispatch(update(newCart));
    }
  };

  const getValue = (id) => {
    /*     const isPresent = cartQuantity.find((item) => item.id === id); */
    const isPresent = cartList.find((item) => item.id === id);
    if (isPresent) return isPresent.quantity;
    return INITIAL_VALUE;
  };

  const manageNewProductInfo = (type, value, productSelected) => {
    const { id, name, price } = productSelected;
    const newProductInfo = {
      id,
      name,
      price,
      quantity: 0,
      totalPrice: 0,
    };
    if (type === 'input') {
      newProductInfo.quantity = value;
      newProductInfo.totalPrice = value * price;
    } else {
      newProductInfo.quantity = getValue(productSelected.id) + value;
      newProductInfo.totalPrice = value * price;
    }
    getNewQuantity(newProductInfo);
  };

  const handleChange = (type, value, productSelected) => {
    manageNewProductInfo(type, value, productSelected);
  };

  const handleClick = (type, value, productSelected) => {
    manageNewProductInfo(type, value, productSelected);
  };

  return (
    <div key={ position }>
      <img
        data-testid={ `${position}-product-img` }
        src={ product.url_image }
        alt={ `Product ${product.name} ${position}` }
      />
      <h4 data-testid={ `${position}-product-name` }>{ product.name }</h4>
      <span data-testid={ `${position}-product-price` }>
        { `R$ ${product.price.toFixed(ROUNDING_OPTION)}` }
      </span>
      <div>
        <button
          type="button"
          data-testid={ `${position}-product-minus` }
          onClick={ () => handleClick('remove', REMOVE_ITEM, product) }
        >
          -
        </button>
        <input
          type="number"
          name="quantity"
          data-testid={ `${position}-product-qtd` }
          defaultValue={ getValue(product.id) }
          min={ INITIAL_VALUE }
          onChange={ (event) => handleChange('input', event.target.value, product) }
        />
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
