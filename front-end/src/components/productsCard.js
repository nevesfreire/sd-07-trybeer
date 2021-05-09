import React, { useState, useEffect } from 'react';
import ProductsButtons from './productsButtons';

function ProductsCard(props) {
  const { id, name, price, image, updateCart } = props;
  const [cartQuantity, setCartQuantity] = useState(0);
  const [update, setUpdate] = useState(false);

  const updateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let thisProduct = [];
    thisProduct = cart.filter((cartproduct) => cartproduct.id === id);
    if (thisProduct.length > 0) {
      setCartQuantity(thisProduct[0].quantity);
    }
    updateCart();
  };
  const updateThis = () => {
    if (update) setUpdate(false);
    setUpdate(true);
  };

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
    if (cart.length >= 1) {
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
    console.log('adicionou');
    updateCartQuantity();
  };

  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length < 1) return false;
    if (!cart.includes(id)) return false;
    cart.forEach((product) => {
      if (product.id === id) {
        setCartQuantity(product.quantity);
      }
    });
  };

  useEffect(() => {
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
    console.log('removeu');
    updateCartQuantity();
  };

  return (
    <>
      <span
        data-testid="0-product-price"
      >
        {price}
      </span>
      {/* <img
        src={newImg}
        alt={name}
        data-testid="0-product-img"
      >
        Imagem produto
      </img> */}
      <span
        data-testid="0-product-name"
      >
        {name}
      </span>
      <ProductsButtons
        quantity={ cartQuantity }
        add={ addCartItem }
        remove={ removeCartItem }
      />
    </>
  );
}

export default ProductsCard;
