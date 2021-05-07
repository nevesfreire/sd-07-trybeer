import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import ListItem from '../ListItem';
import * as API from '../../services/api';
import format from '../../util/format';

function Checkout({ products }) {
  const totalPrice = useSelector((state) => state.client.totalPrice);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  return (
    <div>
      <Header>Finalizar Pedido</Header>
      { showMessage }
      { !totalPrice ? <h3>Não há produtos no carrinho</h3> : (
        <ul>
          { products.map((product, index) => (
            <ListItem key={ product.id } product={ product } index={ index } />)) }
        </ul>) }
      <span data-testid="order-total-value">{ format(totalPrice) }</span>
      <h5>Endereço</h5>
      <label htmlFor="street">
        <h6>Rua:</h6>
        <input
          placeholder="Rua"
          type="text"
          value={ street }
          data-testid="checkout-street-input"
          onChange={ ({ target }) => setStreet(target.value) }
        />
      </label>
      <label htmlFor="house-number">
        <h6>Número da casa:</h6>
        <input
          placeholder="Número da casa"
          type="text"
          value={ houseNumber }
          data-testid="checkout-house-number-input"
          onChange={ ({ target }) => setHouseNumber(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="checkout-finish-btn"
        disabled={ !totalPrice || !street || !houseNumber }
        onClick={ () => {
          API.sendSale(street, houseNumber, totalPrice, products);
        } }
      >
        Finalizar pedido
      </button>
    </div>
  );
}

export default Checkout;
