import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import numbers from '../helpers/Numbers';
import CheckoutCard from './CheckoutCard';

const CheckoutBody = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  // console.log(token);

  // ainda está mockado no Beer.js
  const { cart } = JSON.parse(localStorage.getItem('cart'));

  // cart mockado
  // const cart = [
  //   { nome: 'cerva1', preco: 10.0, quantidade: 3 },
  //   { nome: 'cerva2', preco: 5.0, quantidade: 6 },
  // ];
  console.log(`CheckoutBody cart: ${typeof (cart)}`);

  const [priceTotal, setPriceTotal] = useState(
    JSON.parse(localStorage.getItem('productPriceTotals')) || { value: 0.0 },
  );

  const priceTotalReduced = Object.values(priceTotal).reduce(
    (curr, next) => curr + next,
    numbers.ZERO,
  );

  const redirectToProduct = () => {
    history.push('/products');
  };

  return (
    <div className="checkout-list-container">
      {/* {console.log(token)} */}
      {!token && <Redirect to="/login" />}
      {/* {console.log(`Render beer: ${Beers}`)} */}
      <h3 data-testid="top-title">Finalizar Pedido</h3>
      <button
        data-testid="checkout-bottom-btn"
        type="button"
        disabled={ !priceTotalReduced }
        onClick={ redirectToProduct }
      >
        Finalizar Pedido
      </button>
      <div>
        Valor total do carrinho
        <p data-testid="order-total-value">
          {`R$ ${priceTotalReduced.toFixed(2).replace('.', ',')}`}
        </p>
      </div>
      {cart.map((cartItem, index) => (
        <CheckoutCard
          key={ index }
          cartItem={ cartItem }
          index={ index }
          setPriceTotal={ setPriceTotal }
          priceTotal={ priceTotal }
        />
      ))}
    </div>
  );
};

export default CheckoutBody;
