import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import CustomCheckout from '../components/CustomCheckout';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import { Grid, Button, Form, Segment } from 'semantic-ui-react';


function Checkout() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const { totalKart, setTotalKart} = useContext(CentralContext);

  
  useEffect(() => {
    let localtotal = 0 
    const total = JSON.parse(localStorage.getItem('cart'));
    total && total.map(item => {
      localtotal = localtotal + item[1] * item[2] 
    })
    setTotalKart(localtotal)
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
  }, [cart]);

  const remButton = async (id) => {
    console.log(cart)
    console.log(id)
    const newCart = cart.splice( 1 , 1)
    console.log(newCart)
  }

  const history = useHistory();

  const renderProdutsCart = () => {
    const products = JSON.parse(localStorage.getItem('product'));
    // const cart = JSON.parse(localStorage.getItem('cart'));
    return (
      <div>
        <p>
          Produtos
        </p>
        <ol>
          {cart &&
            cart.map((beer, index) => (
              <CustomCheckout 
                key={beer.id} 
                index={index} 
                beer={beer}
                removeButton={remButton}
              />
            ))}
        </ol>
      </div>
    );
  };
  return (
    <div>
      <Grid container >
      <Grid.Column>
      <CustomHeader message='Finalizar Pedido' />
      </Grid.Column>
      <Header  as="h1" color="orange" textAlign="center"
      >
      </Header>
      </Grid>
      <Form size="large">

      <Segment stacked>
      {renderProdutsCart()}
          <p data-testid="order-total-value">{`R$ ${totalKart
            .toFixed(2)
            .replace('.', ',')}`}
        </p>
        </Segment>


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