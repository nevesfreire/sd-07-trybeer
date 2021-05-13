import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import numbers from '../helpers/Numbers';
import CheckoutCard from './CheckoutCard';

const CheckoutBody = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  // console.log(token);

  // ainda está mockado no Beer.js
  // const cart = JSON.parse(localStorage.getItem('cart'));

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  // cart mockado
  // const cart = [
  //   { nome: 'cerva1', preco: 10.0, quantidade: 3 },
  //   { nome: 'cerva2', preco: 5.0, quantidade: 6 },
  // ];

  // saida: id do usuario, preço total, endereço, delivery number, sale date, status

  console.log(`CheckoutBody cart: ${typeof cart}`);

  const [priceTotal, setPriceTotal] = useState(
    JSON.parse(localStorage.getItem('productPriceTotals')) || { value: 0.0 },
  );

  const priceTotalReduced = Object.values(priceTotal).reduce(
    (curr, next) => curr + next,
    numbers.ZERO,
  );

  const redirectToProduct = () => {
    history.push('/products');
    setCart([]);
  };

  return (
    <div className="checkout-list-container">
      {/* {console.log(token)} */}
      {!token && <Redirect to="/login" />}
      {/* {console.log(`Render beer: ${Beers}`)} */}
      <h3 data-testid="top-title">Finalizar Pedido</h3>
      <button
        data-testid="checkout-finish-btn"
        type="button"
        disabled={ !priceTotalReduced && street === '' && houseNumber === '' }
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
      {priceTotalReduced === 0 ? (
        <h3>Não há produtos no carrinho</h3>
      ) : (
        cart.map((cartItem, index) => (
          <CheckoutCard
            key={ index }
            cartItem={ cartItem }
            index={ index }
            setPriceTotal={ setPriceTotal }
            priceTotal={ priceTotal }
          />
        ))
      )}
      <form className="form-checkout">
        <label htmlFor="street" className="form-checkout-street">
          Rua
          <input
            data-testid="checkout-street-input"
            id="street"
            type="street"
            name="street"
            className="label-login"
            onChange={ (event) => setStreet(event.target.value) }
          />
        </label>

        <label htmlFor="houseNumber" className="form-checkout-address">
          Número da casa
          <input
            data-testid="checkout-house-number-input"
            id="houseNumber"
            type="houseNumber"
            name="houseNumber"
            className="label-login"
            onChange={ (event) => setHouseNumber(event.target.value) }
          />
        </label>
        {priceTotalReduced === 0 ? (
          <span>Não há produtos no carrinho</span>
        ) : (
          <p />
        )}
      </form>
    </div>
  );
};

export default CheckoutBody;
