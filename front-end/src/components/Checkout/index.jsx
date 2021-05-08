import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import ListItem from '../ListItem';
import * as API from '../../services/api';
import { clearStorage, setPurchaseStorage } from '../../services/localStorage';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import format from '../../util/format';

function Checkout({ products }) {
  const totalPrice = useSelector((state) => state.client.totalPrice);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const timeToRedirect = 2000;
    if (showMessage) {
      clearStorage('cart');
      dispatch(Creators.checkout());
      setTimeout(() => {
        history.push('/products');
      }, timeToRedirect);
    }
  }, [showMessage, history, dispatch]);

  if (showMessage) return <h1>Compra realizada com sucesso!</h1>;

  return (
    <div>
      <Header>Finalizar Pedido</Header>
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
          setShowMessage(true);
          API.sendSale(street, houseNumber, totalPrice, products);
          setPurchaseStorage(products.filter((product) => product.quantity));
        } }
      >
        Finalizar pedido
      </button>
    </div>
  );
}

export default Checkout;

Checkout.propTypes = {
  products: PropTypes.objectOf(PropTypes.string).isRequired,
};
