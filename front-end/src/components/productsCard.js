import React, { useState, useEffect } from 'react';
import ProductsButtons from './productsButtons';

function ProductsCard(props) {
  const { id, name, price, image, updateCart } = props;
  const [cartQuantity, setCartQuantity] = useState(0);
  const [update, setUpdate] = useState(false);
  
  const updateThis = () => {
    if(update) setUpdate(false);
    setUpdate(true);
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
    if (cart.length < 1) {
      cart.push(product);
    } else {
      if (!cart.includes(id)) {
        cart.push(product);
      } else {
        cart.forEach((product) => {
          if (product.id === id) {
            product.quantity = product.quantity + 1; 
          }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
    updateThis();
  }
  const getCart = () => { 
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length < 1) return false;
    if (!cart.includes(id)) return false; 
    cart.forEach((product) => {
      if (product.id === id) {
        setCartQuantity(product.quantity);
      }
    });
  }

  useEffect(() => {
    getCart();
  }, []);

  const removeCartItem = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach((product) => {
      if (product.id === id) {
        product.quantity = product.quantity - 1; 
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateThis();
  }
  const newImg = image.replace('http://localhost:3001', '../../..');
  console.log(newImg);
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
        quantity={cartQuantity}
        add={addCartItem}
        remove={removeCartItem}
      />
    </>
  );
}

export default ProductsCard;
