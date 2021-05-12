import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';
import TrybeerContext from '../store/context';
import acessLocalStorage from '../services';

function Checkout() {
  const [adress, setAdress] = useState();
  const [number, setNumber] = useState();
  const [notification, setNotification] = useState(false);
  const { cart, deleteItem } = useContext(TrybeerContext);
  const history = useHistory();

  useEffect(() => {
    const user = acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    if (!user) return history.push('/login');
  }, [history]);

  const handleClick = () => {
    const TIME = 3000;
    setNotification(!notification);
    setTimeout(() => {
      history.push('/products');
    }, TIME);
  };

  const sumItens = cart ? Object.keys(cart)
    .reduce(
      (acc, value) => (
        acc + (parseFloat(cart[value].item.price)) * (cart[value].quantity)
      ), 0,
    ) : 0;

  return (
    <div>
      <div>
        <Header title="Finalizar Pedido" />
      </div>
      <h2>Produtos</h2>
      {
        sumItens === 0 ? (<span>Não há produtos no carrinho</span>)
          : (

            Object.keys(cart).map((key, index) => (
              // const { quantity, item} = cart[key];
              <li key={ key }>
                <span
                  data-testid={ `${index}-product-qtd-input` }
                >
                  {cart[key].quantity}
                </span>
                <br />
                <span
                  data-testid={ `${index}-product-name` }
                >
                  {cart[key].item.name}
                </span>
                <br />
                <span
                  data-testid={ `${index}-product-unit-price` }
                >
                  {`(R$ ${cart[key].item.price.split('.').join(',')} un)`}
                </span>
                <br />
                <span
                  data-testid={ `${index}-product-total-value` }
                >
                  {`R$ ${(cart[key].item.price * cart[key].quantity)
                    .toFixed(2).split('.').join(',')}`}
                </span>
                <br />
                <button
                  data-testid={ `${index}-removal-button` }
                  type="button"
                  onClick={ () => deleteItem(cart[key].item) }
                >
                  X
                </button>
              </li>
            ))
          )
      }
      <span
        data-testid="order-total-value"
      >
        {`R$ ${(sumItens).toFixed(2).split('.').join(',')}`}
      </span>
      <br />
      <label
        htmlFor="streetinput"
      >
        Rua
        <br />
        <input
          onChange={ (e) => setAdress(e.target.value) }
          data-testid="checkout-street-input"
          id="streetinput"
          name="streetinput"
          type="text"
        />
      </label>
      <br />
      <label
        htmlFor="checkout-house-number-input"
      >
        Numero da Casa
        <br />
        <input
          onChange={ (e) => setNumber(e.target.value) }
          data-testid="checkout-house-number-input"
          id="checkout-house-number-input"
          name="checkout-house-number-input"
          type="text"
        />
      </label>
      <br />
      {
        notification ? (<div>Compra realizada com sucesso!</div>) : ''
      }
      <button
        onClick={ () => handleClick() }
        disabled={ !((adress && number && sumItens !== 0)) }
        data-testid="checkout-finish-btn"
        type="button"
      >
        Finalizar Pedido
      </button>

    </div>
  );
}

export default Checkout;
