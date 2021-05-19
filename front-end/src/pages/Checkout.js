import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bulma-components';
import { Header } from '../components';
import TrybeerContext from '../store/context';
import acessLocalStorage from '../services';
import { createNewSale } from '../api';

function Checkout() {
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [notification, setNotification] = useState(false);
  const [userState, setUserState] = useState({});
  const { cart, deleteItem } = useContext(TrybeerContext);
  const history = useHistory();

  useEffect(() => {
    const user = acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    if (!user) return history.push('/login');
    setUserState(user);
  }, [history]);

  const sumItens = cart ? Object.keys(cart)
    .reduce(
      (acc, value) => (
        acc + (parseFloat(cart[value].item.price)) * (cart[value].quantity)
      ), 0,
    ) : 0;

  const handleClick = async () => {
    const TIME = 3000;

    const saleToSend = {
      userId: userState.id,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate: new Date(),
      totalPrice: sumItens.toFixed(2),
      status: 'Pendente',
      products: [{
        ...cart,
      }],
    };
    const { token } = userState;
    const sendSaleToDb = await createNewSale(saleToSend, token);

    if (!sendSaleToDb) return;
    setNotification(!notification);
    setTimeout(() => {
      history.push('/products');
    }, TIME);
  };

  return (
    <div
      className="mt-6 pt-3 is-justify-content-center"
      style={ { maxWidth: '80rem', minWidth: '80rem' } }
    >
      <div>
        <Header title="Finalizar Pedido" />
      </div>
      <div
        className="card is-inline-flex is-flex-wrap-wrap is-justify-content-center mt-3"
        style={ { maxWidth: '80rem', minWidth: '80rem' } }
      >
        <span
          className="button is-medium is-fullwidth is-fixed-bottom is-white is-size-3"
        >
          <strong>Produtos</strong>
        </span>
        {
          sumItens === 0 ? (<span>Não há produtos no carrinho</span>)
            : (

              Object.keys(cart).map((key, index) => (
                // const { quantity, item} = cart[key];
                <Card key={ key } className="m-2">
                  <Card.Content className="is-size-5">
                    <span
                      data-testid={ `${index}-product-qtd-input` }
                    >
                      {`Quantidade: `}<strong>{`${cart[key].quantity}`}</strong>
                    </span>
                    <br />
                    <span
                      data-testid={ `${index}-product-name` }
                    >
                      {`Produto: `}<strong>{`${cart[key].item.name}`}</strong>
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
                      <strong>{`R$ ${(cart[key].item.price * cart[key].quantity)
                        .toFixed(2).split('.').join(',')}`}</strong>
                    </span>
                    <br />
                    <Button
                      className="is-fullwidth is-danger is-outlined"
                      data-testid={ `${index}-removal-button` }
                      type="button"
                      onClick={ () => deleteItem(cart[key].item) }
                    >
                      X
                    </Button>
                  </Card.Content>
                </Card>
              ))
            )
        }
      </div>
      <Card
        className="mt-3"
        data-testid="order-total-value"
      >
        <div className="mt-3 p-4 is-align-items-center is-size-4">
          <strong>{`Total: R$ ${(sumItens).toFixed(2).split('.').join(',')}`}</strong>
        </div>
      </Card>
      <Card className="mt-3 p-3">
        <label
          htmlFor="teste"
          className="is-size-5"
        >
          <strong>Endereço de entrega:</strong>
        </label>
        <br/>
        <label
          htmlFor="streetinput"
          className="is-size-5"
        >
          Rua
          <br />
          <input
            onChange={ (e) => setAddress(e.target.value) }
            data-testid="checkout-street-input"
            class="input"
            id="streetinput"
            name="streetinput"
            type="text"
          />
        </label>
        <br />
        <br />
        <label
          htmlFor="checkout-house-number-input"
          className="is-size-5"
        >
          Numero da Casa
          <br />
          <input
            onChange={ (e) => setNumber(e.target.value) }
            data-testid="checkout-house-number-input"
            class="input column is-one-quarter"
            id="checkout-house-number-input"
            name="checkout-house-number-input"
            type="text"
          />
        </label>
        {
          notification ? (<div>Compra realizada com sucesso!</div>) : ''
        }
      </Card>

      <button
        className="button is-medium is-fullwidth is-warning is-fixed-bottom mt-3"
        onClick={ () => handleClick() }
        disabled={ !((address && number && sumItens !== 0)) }
        data-testid="checkout-finish-btn"
        type="button"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default Checkout;
