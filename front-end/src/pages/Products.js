import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  Segment,
  Header,
  Container,
  Card,
} from 'semantic-ui-react';
import CustomRenderProducts from '../components/CustomRenderProducts';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import CustomTopMenu from '../components/CustomTopMenu';

function Products() {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  useEffect(() => {
    const total = JSON.parse(localStorage.getItem('cart'));
    let memo = 0;
    if (total) {
      total.map((item) => {
        memo = item[1] * item[2];
        return memo;
      });
    }
    setTotalKart(memo);
  }, [setTotalKart]);

  useEffect(() => {}, [totalKart]);

  const history = useHistory();

  return (
    <div>
      <CustomHeader message="TryBeer" />
      <Grid>
        <Grid.Column>
          <Grid.Column>
            <CustomTopMenu />
          </Grid.Column>
        </Grid.Column>
        <Header as="h1" color="orange" textAlign="center" />
      </Grid>
      <Container style={{ margin: 'auto' }, { padding: '20'}}>
        <CustomRenderProducts />
      </Container>
      <Segment textAlign="center">
        <Button
          circular="true"
          size="big"
          color="orange"
          data-testid="checkout-bottom-btn"
          disabled={!totalKart}
          onClick={() => history.push('/checkout')}
        >
          Ver Carrinho
          <p data-testid="checkout-bottom-btn-value">
            {`R$ ${totalKart.toFixed(2).replace('.', ',')}`}
          </p>
        </Button>
      </Segment>
    </div>
  );
}
export default Products;
