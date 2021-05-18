import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/card.css';
// import { update } from '../actions';

export default function Card({ product, position }) {
  const INITIAL_VALUE = 0;
  // const ROUNDING_OPTION = 2;
  const ADD_ITEM = 1;
  const REMOVE_ITEM = -1;
  // const cartList = useSelector(({ cart }) => cart.cart);
  // const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem('products'));
    if (getProducts) {
      setCart(getProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('products');
    localStorage.setItem('products', JSON.stringify(cart));
  }, [cart]);

  const manageQuantity = (productFound, cart) => {
    if (productFound.quantity !== 0) {
      const filteredCart = cart.filter((item) => item.id !== productFound.id);
      const cartProducts = [...filteredCart, productFound];
      // localStorage.setItem('products', JSON.stringify(cartProducts));
      setCart(cartProducts);
      // dispatch(update(cartProducts));
    } else {
      const filteredCart = cart.filter((item) => item.id !== productFound.id);
      setCart(filteredCart);
      // localStorage.removeItem('products');
      // localStorage.setItem('products', JSON.stringify(filteredCart));
      // dispatch(update(filteredCart));
    }
  };

  const getNewQuantity = (newProduct) => {
    // const cartCopy = [...cartList];
    const cartCopy = [...cart]
    const productFound = cartCopy.find((item) => item.id === newProduct.id);
    if (productFound) {
      manageQuantity(newProduct, cartCopy);
    } else {
      // const newCart = [...cartList, newProduct];
      const newCart = [...cart, newProduct];
      localStorage.setItem('products', JSON.stringify(newCart));
      setCart(newCart);
      // dispatch(update(newCart));
    }
  };

  const getValue = (id) => {
    // const isPresent = cartList.find((item) => item.id === id);
    const getProducts = JSON.parse(localStorage.getItem('products'));
      if (getProducts) {
      setCart(getProducts);
    const isPresent = cart.find((item) => item.id === id);
    if (isPresent) return isPresent.quantity;
    return INITIAL_VALUE;
  };
};

  const manageNewProductInfo = (value, productSelected) => {
    const { id, name, price } = productSelected;
    const newProductInfo = {
      id,
      name,
      price: Number(price),
      quantity: 0,
      totalPrice: 0,
    };
    newProductInfo.quantity = getValue(productSelected.id) + value;
    newProductInfo.totalPrice = newProductInfo.quantity * price;
    getNewQuantity(newProductInfo);
  };

  const handleClick = (type, value, productSelected) => {
    if ((getValue(productSelected.id) !== 0 && type === 'remove')
      || type === 'add') {
      manageNewProductInfo(value, productSelected);
    }
  };

  return (
    <div className="card">
      <img
        data-testid={ `${position}-product-img` }
        src={ product.url_image }
        alt={ `Product ${product.name} ${position}` }
        height="50px"
      />
      <h4 data-testid={ `${position}-product-name` }>{ product.name }</h4>
      <span data-testid="0-product-price" />
      <span data-testid={ `${position}-product-price` }>
        { `${new Intl.NumberFormat('pt-br',
          { style: 'currency', currency: 'BRL' }).format(product.price)}` }
      </span>
      <div>
        <button
          type="button"
          data-testid={ `${position}-product-minus` }
          className="btn-cart"
          onClick={ () => handleClick('remove', REMOVE_ITEM, product) }
        >
          -
        </button>
        <p
          data-testid={ `${position}-product-qtd` }
          className="product-price"
        >
          { getValue(product.id) }
        </p>
        <button
          type="button"
          className="btn-cart"
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
