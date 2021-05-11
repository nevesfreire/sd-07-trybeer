import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import CustomCheckout from '../components/CustomCheckout';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import { Grid, Button, Form, Segment } from 'semantic-ui-react';

function Checkout() {
  const { totalKart, setTotalKart } = useContext(CentralContext);
  const history = useHistory();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));

  let teste = 0;
  const remButton = (id) => {
    const cartFilter = cart.filter((item) => item[0] !== id)
    
    setCart(cartFilter);
  };

  useEffect(() => {
    cart &&
    cart.map((item) => {
      teste += (item[1] * item[2]);
    });
    setTotalKart(teste);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const renderProdutsCart = () => {
    return (
      <div>
        <Grid columns="4">
          {(cart === [] || !cart) ? (
            <span>'Não há produtos no carrinho'</span>
          ) : (
            cart.map((beer, index) => (
              <Grid.Column>
                <CustomCheckout
                  key={beer.id}
                  index={index}
                  beer={beer}
                  removeButton={remButton}
                />
              </Grid.Column>
            ))
          )}
        </Grid>
      </div>
    );
  };
  return (
    <div>
      <Grid container>
        <Grid.Column>
          <CustomHeader message="Finalizar Pedido" />
        </Grid.Column>
      </Grid>
      <Container >
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
          />
          <Form.Input
            data-testid="checkout-house-number-input"
            fluid
            label="Número da casa"
            placeholder="Senha"
            type="text"
            name="numHouse"
          />

          <Button
            data-testid="checkout-finish-btn"
            disabled={!totalKart}
            onClick={() => history.push('/checkout')}
            color="orange"
            size="large"
          >
            Finalizar pedido
          </Button>
        </Segment>
      </Form>
    </div>
  );
}
export default Checkout;
