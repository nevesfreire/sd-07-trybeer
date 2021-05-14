import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../components/menuSideBar/Menu';
import CardButtons from '../components/screenCheckout/ItenCard';
import { useLocalStorage } from '../hooks';
import { GlobalContext, actionType, fetchAPIfor } from '../services';
import fetchApi from '../hooks/fetchApi';
import CODE from '../utils/statusCode';

function transformation(localStorage) {
  const arrayKeys = Object.keys(localStorage);
  const arrayMaster = arrayKeys.map((key) => ({
    productId: key,
    quantity: localStorage[key],
  }));
  return arrayMaster;
}

function total(objarray) {
  if (!objarray.length) return ('0,00');
  let sum = 0;
  for (let i = 0; i < objarray.length; i += 1) {
    const num = objarray[i].price * objarray[i].quantity;
    sum += num;
  }
  return (sum.toFixed(2).replace('.', ','));
}

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
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [storageState] = useLocalStorage('shoppingCart');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { productsDispatch, productState } = useContext(GlobalContext);

  if (!user) history.push('/');

  useEffect(() => {
    fetchAPIfor('/products').then((response) => {
      productsDispatch({ type: actionType.REQUEST_PRODUCTS, payload: response.products });
    }).catch(() => history.push('/'));
  }, [productsDispatch, history]);

  async function finalizar() {
    const arrayitems = transformation(storageState);
    const conta = total(horaDeMorfar(
      storageState,
      productState.products,
    )).replace(',', '.');
    const obj = {
      orderDetails: {
        total: conta,
        deliveryAddress: street,
        deliveryNumber: houseNumber,
      },
      orderItems: arrayitems,
    };
    const register = await fetchApi('/sale', 'POST', obj, user.token);
    setMessage(register.message);
    if (register.statusCode === CODE.CREATED) {
      const time = 2500;
      window.localStorage.removeItem('shoppingCart');
      setTimeout(() => history.push('/products'), time);
    }
  }
  const verify = (productState.products.length && horaDeMorfar(
    storageState, productState.products,
  ).length);
  return (
    <div>
      <TopBar title="Finalizar Pedido" />
      <h4 style={ { visibility: ((message.length > 0) ? 'visible' : 'hidden') } }>
        {message}
      </h4>
      {
        verify ? horaDeMorfar(
          storageState,
          productState.products,
        ).map((obj, i) => (<CardButtons
          key={ i }
          obj={ obj }
          index={ i }
        />))
          : <h4>Não há produtos no carrinho</h4>
      }
      <h4 data-testid="order-total-value">
        {`R$ ${total(horaDeMorfar(
          storageState,
          productState.products,
        ))}`}
      </h4>
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
        disabled={
          !horaDeMorfar(storageState, productState.products).length
          || houseNumber.length < 1
          || street.length < 1
        }
        onClick={ finalizar }
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
