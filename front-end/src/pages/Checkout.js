import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Button, Form, Segment } from 'semantic-ui-react';
import CustomCheckout from '../components/CustomCheckout';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';

import checkout from '../service/checkout';
import { fetchOrderById } from '../service/order';

function Checkout() {
  const { totalKart, setTotalKart } = useContext(CentralContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const history = useHistory();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [finish, setFinish] = useState(false);

  let cumTotal = 0;

  const remButton = (id) => {
    const cartFilter = cart.filter((item) => item[0] !== id);
    setCart(cartFilter);
  };

  const checkoutButton = async () => {
    const { id } = JSON.parse(localStorage.getItem('token'));
    const userId = id;
    const totalPrice = totalKart;
    const timeOut = 8000;
    const msg = await checkout(
      userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    );
    setFinish(true);
    fetchOrderById();
    setTimeout(() => {
      setFinish(true);
      history.push('/products');
    }, timeOut);
  };

  useEffect(() => {
    cart
    && cart.map((item) => {
      cumTotal += (item[1] * item[2]);
    });
    setTotalKart(cumTotal);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, finish]);

  useEffect(() => {}, [finish]);

  const renderProdutsCart = () => (
    <div>
      <Grid columns="4">

        {totalKart === 0 ? <span>'Não há produtos no carrinho'</span> : null }
        { !cart ? (
          null
        ) : (
          cart.map((beer, index) => (
            <Grid.Column key={ beer.id }>
              <CustomCheckout
                index={ index }
                beer={ beer }
                removeButton={ remButton }
              />
            </Grid.Column>
          ))
        )}
      </Grid>
    </div>
  );
  return (
    <div>
      <Grid container>
        <Grid.Column>
          <CustomHeader message="Finalizar Pedido" />
        </Grid.Column>
      </Grid>
      <Container>
        {renderProdutsCart()}
      </Container>
      <Form size="large">
        <Grid>
          <Grid.Row data-testid="order-total-value">
            <span>{`R$ ${totalKart.toFixed(2).replace('.', ',')}`}</span>
          </Grid.Row>
        </Grid>

        <Segment stacked>
          <Form.Input
            data-testid="checkout-street-input"
            fluid
            label="Rua"
            placeholder="Endereço"
            name="street"
            onChange={ (e) => setDeliveryAddress(e.target.value) }

          />
          <Form.Input
            data-testid="checkout-house-number-input"
            fluid
            label="Número da casa"
            placeholder="Número da casa"
            type="text"
            name="numHouse"
            onChange={ (e) => setDeliveryNumber(e.target.value) }

          />

          <Button
            data-testid="checkout-finish-btn"
            disabled={ !totalKart || !deliveryNumber || !deliveryAddress }
            onClick={ () => checkoutButton() }
            color="orange"
            size="large"
          >
            Finalizar pedido
          </Button>
          { finish ? <span>Compra realizada com sucesso!</span> : null}
        </Segment>
      </Form>
    </div>
  );
}
export default Checkout;
