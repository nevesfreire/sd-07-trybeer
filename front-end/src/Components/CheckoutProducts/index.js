import React, { useState, useEffect, useContext } from 'react';
import TrybeerContext from '../../context/TryBeerContext';
// import PropTypes from 'prop-types';

const CheckoutProducts = () => {
  const [cart, setCart] = useState([]);
  const { totalPrice, setTotalPrice } = useContext(TrybeerContext);
  const zero = 0;

  useEffect(() => {
    const LSCart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCartPriceLS = JSON.parse(localStorage.getItem('totalCartPrice'));
    const productsOnCart = LSCart.filter(({ quantity }) => quantity > zero);
    setTotalPrice(totalCartPriceLS);
    setCart(productsOnCart);
  }, []);

  const removeItem = (name, price, quantity) => {
    const LSCart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter((product) => name !== product.name);
    LSCart.forEach((product) => {
      if (name === product.name) {
        product.quantity = zero;
      }
    });
    const newTotal = (Math.round((totalPrice - price * quantity) * 100) / 100).toFixed(2);
    setTotalPrice(newTotal);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(LSCart));
    localStorage.setItem('totalCartPrice', JSON.stringify(Number(newTotal)));
  };

  return (
    <div>
      { cart.length === zero ? (
        <h3>Não há produtos no carrinho</h3>
      ) : (
        <div>
          <h3>Produtos</h3>
          { cart.map(({ name, quantity, price }, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-product-qtd-input` }>{ quantity }</p>
              <p data-testid={ `${index}-product-name` }>{ name }</p>
              <p data-testid={ `${index}-product-total-value` }>
                { `R$ ${(Number(price) * quantity).toFixed(2).replace('.', ',')}` }
              </p>
              <p
                data-testid={ `${index}-product-unit-price` }
              >
                { `(R$ ${price.replace('.', ',')} un)` }
              </p>
              <button
                data-testid={ `${index}-removal-button` }
                type="button"
                onClick={ () => removeItem(name, price, quantity) }
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      <p
        data-testid="order-total-value"
      >
        { `R$ ${Number(totalPrice).toFixed(2).replace('.', ',')}` }
      </p>
    </div>
  );
};

// Checkout.propTypes = {};

export default CheckoutProducts;
