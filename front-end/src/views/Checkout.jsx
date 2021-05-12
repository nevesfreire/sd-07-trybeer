import React, { useContext, useState } from 'react';
import TopBar from '../components/menuSideBar/Menu';
import CardButtons from '../components/screenCheckout/ItenCard';
import { useLocalStorage } from '../hooks';
import { GlobalContext } from '../services';

function horaDeMorfar(storageState, products) {
  const arrayKeys = Object.keys(storageState);
  const arrayMaster = arrayKeys.map((key) => {
    const product = products.find(({ id }) => JSON.stringify(id) === key);
    const obj = { ...product, quantity: storageState[key] };
    return obj;
  });
  return (arrayMaster);
}

export default function Checkout() {
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [storageState] = useLocalStorage('shoppingCart');
  const { productState } = useContext(GlobalContext);
  const PowerRangers = horaDeMorfar(storageState, productState.products);
  return (
    <div>
      <TopBar title="Finalizar Pedido" />
      {
        PowerRangers.length ? PowerRangers.map((obj, i) => (<CardButtons
          key={ i }
          obj={ obj }
          index={ i }
        />))
          : <h4>Não há produtos no carrinho</h4>
      }
      <label htmlFor="streetCheckout">
        <h4>Rua:</h4>
        <input
          data-testid="checkout-street-input"
          id="streetCheckout"
          name="street"
          onChange={ ({ target: { value } }) => setStreet(value) }
          type="text"
          value={ street }
        />
      </label>
      <label htmlFor="houseNumberCheckout">
        <h4>Número da casa:</h4>
        <input
          data-testid="checkout-house-number-input"
          id="houseNumberCheckout"
          name="houseNumber"
          onChange={ ({ target: { value } }) => setHouseNumber(value) }
          type="text"
          value={ houseNumber }
        />
      </label>
      <button
        data-testid="checkout-finish-btn"
        disabled={ !PowerRangers.length || houseNumber.length < 1 || street.length < 1 }
        // onClick={ handleRegister }
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
