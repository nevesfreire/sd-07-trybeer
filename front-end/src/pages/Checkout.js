import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  Segment,
  Card,
  Header,
  Message,
  Icon } from 'semantic-ui-react';
import CustomCheckout from '../components/CustomCheckout';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';

import checkout from '../service/checkout';
import { fetchOrderById } from '../service/order';
import CustomTopMenu from '../components/CustomTopMenu';
// import { findByLabelText } from '@testing-library/dom';

function Checkout() {
  const { totalKart, setTotalKart } = useContext(CentralContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const history = useHistory();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [finish, setFinish] = useState(false);

  const remButton = useCallback((id) => {
    const cartFilter = cart.filter((item) => item[0] !== id);
    setCart(cartFilter);
  }, [cart]);

  const checkoutButton = async () => {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const userId = id;
    const totalPrice = totalKart;

    await checkout({
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    });
    setFinish(true);
    fetchOrderById();
    const time = 8000;
    setTimeout(() => {
      setFinish(true);
      history.push('/products');
    }, time);
  };

  useEffect(() => {
    let cumTotal = 0;
    if (cart) {
      cart.map((item) => {
        const price = item[1];
        const quantity = item[2];
        cumTotal += (price * quantity);
        return cumTotal;
      });
    }

    setTotalKart(cumTotal);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, finish, setTotalKart]);

  useEffect(() => {}, [finish]);

  const renderProdutsCart = useCallback(() => (
    <div style={ { display: 'flex', margin: 'auto', width: '100%' } }>
      <Container>
        <Card.Group centered>
          {totalKart === 0 ? <span>Não há produtos no carrinho</span> : null }
          { !cart ? (
            null
          ) : (
            cart.map((beer, index) => (
              <CustomCheckout
                key={ index }
                index={ index }
                beer={ beer }
                removeButton={ remButton }
              />
            ))
          )}
        </Card.Group>
      </Container>
    </div>
  ), [cart, remButton, totalKart]);

  return (
    <div
      style={ {
        width: '100%',
        height: '100%',
        padding: '10px 50px',
        backgroundColor: 'rgb(33, 33, 33)' } }
    >
      <Container>
        <Header style={ { display: 'flex', alignItems: 'center' } }>
          <CustomTopMenu />
          <CustomHeader message="Finalizar Pedido" />
        </Header>
      </Container>
      <Container>
        {renderProdutsCart()}
      </Container>
      <Form size="large">
        <Segment
          textAlign="center"
          raised
          // compact
          inverted
          color="orange"
          data-testid="order-total-value"
          style={ {
            marginTop: 10,
            fontWeight: 800,
            boxShadow: '5px 5px 4px rgba(0, 0, 0, 2)' } }
        >
          <p>{`Total do pedido - R$ ${totalKart.toFixed(2).replace('.', ',')}`}</p>
        </Segment>

        <Segment
          stacked
          style={ { backgroundColor: 'rgb(33, 33, 33)', textAlign: 'center' } }
        >
          <Form.Input
            data-testid="checkout-street-input"
            fluid
            icon="home"
            iconPosition="left"
            // label="Rua"
            placeholder="Endereço"
            name="street"
            onChange={ (e) => setDeliveryAddress(e.target.value) }

          />
          <Form.Input
            data-testid="checkout-house-number-input"
            fluid
            icon="sort numeric down"
            iconPosition="left"
            // label="Número da casa"
            placeholder="Número da casa"
            type="text"
            name="numHouse"
            onChange={ (e) => setDeliveryNumber(e.target.value) }

          />
          { finish ?
            <Message icon positive>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Compra realizada com sucesso!</Message.Header>
                Aguarde, esta tela será redirecionada.
                Obrigado!
              </Message.Content>
            </Message>
            : null}

          <Button
            data-testid="checkout-finish-btn"
            disabled={ !totalKart || !deliveryNumber || !deliveryAddress }
            onClick={ () => checkoutButton() }
            color="orange"
            size="large"
          >
            Finalizar pedido
          </Button>

          {/* { finish ? <span>Compra realizada com sucesso!</span> : null} */}
        </Segment>
      </Form>
    </div>
  );
}
export default Checkout;
