import React, { useContext, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import BeerContext from '../context/beerContext';
import ProductsButtons from './productsButtons';
import { getCartQuantity} from '../utils/localStorage';

function ProductsCard(props) {
  const { id, name, price, image, index, updateCart } = props;
  const [cartQuantity, setCartQuantity] = useState(0);

  // const updateCartQuantity = useCallback(() => {
  //   const cart = JSON.parse(localStorage.getItem('cart'));
  //   let thisProduct = [];
  //   thisProduct = cart.filter((cartproduct) => cartproduct.id === id);
  //   if (thisProduct.length > 0) {
  //     setCartQuantity(thisProduct[0].quantity);
  //   }
  //   updateCart();
  // }, [id, setCartQuantity, updateCart]);
  const updateCartQuantity = () => {
    setCartQuantity(getCartQuantity(id));
    updateCart();
  }

  const addCartItem = () => {
    const product = {
      id,
      name,
      price,
      image,
      quantity: 1,
    };
    const cart = JSON.parse(localStorage.getItem('cart'));
    let thisProduct = [];
    if (cart && cart.length >= 1) {
      thisProduct = cart.filter((cartproduct) => cartproduct.id === id);
    }
    if (thisProduct.length === 0) {
      cart.push(product);
    } else if (thisProduct.length < 1) {
      cart.push(product);
    } else {
      cart.forEach((cartproduct) => {
        if (cartproduct.id === id) {
          cartproduct.quantity += 1;
        }
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
  };

  useEffect(() => {
    const getCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart && cart.length < 1) return false;
      if (!cart.includes(id)) return false;
      cart.forEach((product) => {
        if (product.id === id) {
          setCartQuantity(product.quantity);
        }
      });
    };
    getCart();
    updateCartQuantity();
  }, []);

  const removeCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((product) => {
      if (product.id === id) {
        if (product.quantity > 0) {
          product.quantity -= 1;
        } else {
          product.quantity = 0;
        }
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
  };

  return (
    <>
      <span
        data-testid={ `${index}-product-price` }
      >
        {`R$ ${price.replace('.', ',')}`}
      </span>
      <img
        src={ image.replace(/\s/g, '') }
        alt={ name }

        data-testid={ `${index}-product-img` }
      />
      <span
        data-testid={ `${index}-product-name` }
      >
        {name}
      </span>
      <ProductsButtons
        index={ index }
        quantity={ cartQuantity }
        add={ addCartItem }
        remove={ removeCartItem }
      />
    </>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default ProductsCard;
