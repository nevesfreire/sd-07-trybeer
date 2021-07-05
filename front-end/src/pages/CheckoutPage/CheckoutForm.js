import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../../context';

import { saveItem } from '../../services/localStorage';
import api from '../../services/api';

function CheckoutForm() {
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [purchaseSucceeded, setPurchaseSucceeded] = useState('');

  const history = useHistory();

  const { cart, resetCart } = useContext(Context);

  const purchaseFinished = () => {
    const ALERT_TIME = 4000;
    setPurchaseSucceeded('Compra realizada com sucesso!');
    saveItem('cart', []);
    setTimeout(() => {
      resetCart();
      history.push('/products');
    }, ALERT_TIME);
  };

  const handlePurchFinish = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'))
      || { name: null, role: null };
    try {
      const purchRes = await api.registerPurchase({ cart, houseNumber, street, token });
      return purchRes.error
        ? alert(purchRes.message)
        : purchaseFinished();
    } catch (err) {
      alert('Alguma coisa deu errado');
    }
  };

  return (
    <form
      onSubmit={ (e) => handlePurchFinish(e) }
      className="form-wrapper"
    >
      <div className="form-container checkout-form-container">
        <label htmlFor="street">
          Endereço:
          <input
            id="street"
            data-testid="checkout-street-input"
            placeholder="Av. Atlantica"
            type="text"
            onChange={ ({ target }) => setStreet(target.value) }
            value={ street }
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            id="number"
            data-testid="checkout-house-number-input"
            placeholder="34"
            type="text"
            onChange={ ({ target }) => setHouseNumber(target.value) }
            value={ houseNumber }
          />
        </label>
        <button
          data-testid="checkout-finish-btn"
          type="submit"
          disabled={ street === '' || houseNumber === '' }
        >
          Finalizar pedido
        </button>
        <div>{ purchaseSucceeded }</div>
      </div>
    </form>
  );
}

export default CheckoutForm;
